// ============================================================================
// Lightweight Vector Database for Offline RAG
// ============================================================================

import { getDatabase } from '@vidyut/db';
import { generateId } from '@vidyut/shared';
import type { RAGChunk, Subject } from '@vidyut/shared';
import { generateQuantizedEmbedding, dequantizeEmbedding, cosineSimilarity } from './embeddings';

export interface SearchResult {
    chunk: RAGChunk;
    similarity: number;
}

/**
 * Lightweight ChromaDB-like vector database using SQLite
 */
export class ChromaDBLite {
    /**
     * Add a document chunk to the vector database
     */
    async addChunk(
        contentId: string,
        text: string,
        metadata: {
            subject: Subject;
            grade: number;
            chapter: number;
            page?: number;
        }
    ): Promise<string> {
        const db = await getDatabase();
        const id = generateId('chunk');

        // Generate embeddings
        const embeddings = generateQuantizedEmbedding(text);

        await db.run(
            `INSERT INTO rag_chunks (id, content_id, text, embeddings, subject, grade, chapter, page, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id,
                contentId,
                text,
                embeddings,
                metadata.subject,
                metadata.grade,
                metadata.chapter,
                metadata.page || null,
                Date.now(),
            ]
        );

        return id;
    }

    /**
     * Search for similar chunks using vector similarity
     */
    async search(
        query: string,
        options: {
            subject?: Subject;
            grade?: number;
            topK?: number;
            minSimilarity?: number;
        } = {}
    ): Promise<SearchResult[]> {
        const { subject, grade, topK = 5, minSimilarity = 0.3 } = options;
        const db = await getDatabase();

        // Build query with filters
        let sql = 'SELECT * FROM rag_chunks WHERE 1=1';
        const params: any[] = [];

        if (subject) {
            sql += ' AND subject = ?';
            params.push(subject);
        }

        if (grade) {
            sql += ' AND grade = ?';
            params.push(grade);
        }

        const chunks = await db.all<any>(sql, params);

        // Generate query embedding
        const queryEmbedding = generateQuantizedEmbedding(query);
        const queryEmbeddingFloat = dequantizeEmbedding(queryEmbedding);

        // Calculate similarities
        const results: SearchResult[] = chunks
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
    async getChunksByContentId(contentId: string): Promise<RAGChunk[]> {
        const db = await getDatabase();
        const chunks = await db.all<any>(
            'SELECT * FROM rag_chunks WHERE content_id = ? ORDER BY created_at',
            [contentId]
        );

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
    async deleteChunksByContentId(contentId: string): Promise<void> {
        const db = await getDatabase();
        await db.run('DELETE FROM rag_chunks WHERE content_id = ?', [contentId]);
    }

    /**
     * Get total chunk count
     */
    async getChunkCount(): Promise<number> {
        const db = await getDatabase();
        const result = await db.get<{ count: number }>('SELECT COUNT(*) as count FROM rag_chunks');
        return result?.count || 0;
    }
}

/**
 * Global ChromaDB instance
 */
let chromaInstance: ChromaDBLite | null = null;

export function getChromaDB(): ChromaDBLite {
    if (!chromaInstance) {
        chromaInstance = new ChromaDBLite();
    }
    return chromaInstance;
}
