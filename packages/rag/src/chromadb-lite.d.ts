import type { RAGChunk, Subject } from '@vidyut/shared';
export interface SearchResult {
    chunk: RAGChunk;
    similarity: number;
}
/**
 * Lightweight ChromaDB-like vector database using SQLite
 */
export declare class ChromaDBLite {
    /**
     * Add a document chunk to the vector database
     */
    addChunk(contentId: string, text: string, metadata: {
        subject: Subject;
        grade: number;
        chapter: number;
        page?: number;
    }): Promise<string>;
    /**
     * Search for similar chunks using vector similarity
     */
    search(query: string, options?: {
        subject?: Subject;
        grade?: number;
        topK?: number;
        minSimilarity?: number;
    }): Promise<SearchResult[]>;
    /**
     * Get chunks by content ID
     */
    getChunksByContentId(contentId: string): Promise<RAGChunk[]>;
    /**
     * Delete chunks by content ID
     */
    deleteChunksByContentId(contentId: string): Promise<void>;
    /**
     * Get total chunk count
     */
    getChunkCount(): Promise<number>;
}
export declare function getChromaDB(): ChromaDBLite;
