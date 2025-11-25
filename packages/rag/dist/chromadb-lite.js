// ============================================================================
// Lightweight Vector Database for Offline RAG
// ============================================================================
import { getDatabase } from '@vidyut/db';
import { generateId } from '@vidyut/shared';
import { generateQuantizedEmbedding, dequantizeEmbedding, cosineSimilarity } from './embeddings';
/**
 * Lightweight ChromaDB-like vector database using SQLite
 */
export class ChromaDBLite {
    /**
     * Add a document chunk to the vector database
     */
    async addChunk(contentId, text, metadata) {
        const db = await getDatabase();
        const id = generateId('chunk');
        // Generate embeddings
        const embeddings = generateQuantizedEmbedding(text);
        await db.run(`INSERT INTO rag_chunks (id, content_id, text, embeddings, subject, grade, chapter, page, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            id,
            contentId,
            text,
            embeddings,
            metadata.subject,
            metadata.grade,
            metadata.chapter,
            metadata.page || null,
            Date.now(),
        ]);
        return id;
    }
    /**
     * Search for similar chunks using vector similarity
     */
    async search(query, options = {}) {
        const { subject, grade, topK = 5, minSimilarity = 0.3 } = options;
        const db = await getDatabase();
        // Build query with filters
        let sql = 'SELECT * FROM rag_chunks WHERE 1=1';
        const params = [];
        if (subject) {
            sql += ' AND subject = ?';
            params.push(subject);
        }
        if (grade) {
            sql += ' AND grade = ?';
            params.push(grade);
        }
        const chunks = await db.all(sql, params);
        // Generate query embedding
        const queryEmbedding = generateQuantizedEmbedding(query);
        const queryEmbeddingFloat = dequantizeEmbedding(queryEmbedding);
        // Calculate similarities
        const results = chunks
            .map((chunk) => {
            const chunkEmbedding = dequantizeEmbedding(new Int8Array(chunk.embeddings));
            const similarity = cosineSimilarity(queryEmbeddingFloat, chunkEmbedding);
            return {
                chunk: {
                    id: chunk.id,
                    contentId: chunk.content_id,
                    text: chunk.text,
                    embeddings: Array.from(chunkEmbedding),
                    metadata: {
                        subject: chunk.subject,
                        grade: chunk.grade,
                        chapter: chunk.chapter,
                        page: chunk.page,
                    },
                },
                similarity,
            };
        })
            .filter((result) => result.similarity >= minSimilarity)
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, topK);
        return results;
    }
    /**
     * Get chunks by content ID
     */
    async getChunksByContentId(contentId) {
        const db = await getDatabase();
        const chunks = await db.all('SELECT * FROM rag_chunks WHERE content_id = ? ORDER BY created_at', [contentId]);
        return chunks.map((chunk) => ({
            id: chunk.id,
            contentId: chunk.content_id,
            text: chunk.text,
            embeddings: Array.from(dequantizeEmbedding(new Int8Array(chunk.embeddings))),
            metadata: {
                subject: chunk.subject,
                grade: chunk.grade,
                chapter: chunk.chapter,
                page: chunk.page,
            },
        }));
    }
    /**
     * Delete chunks by content ID
     */
    async deleteChunksByContentId(contentId) {
        const db = await getDatabase();
        await db.run('DELETE FROM rag_chunks WHERE content_id = ?', [contentId]);
    }
    /**
     * Get total chunk count
     */
    async getChunkCount() {
        const db = await getDatabase();
        const result = await db.get('SELECT COUNT(*) as count FROM rag_chunks');
        return result?.count || 0;
    }
}
/**
 * Global ChromaDB instance
 */
let chromaInstance = null;
export function getChromaDB() {
    if (!chromaInstance) {
        chromaInstance = new ChromaDBLite();
    }
    return chromaInstance;
}
