export interface TextChunk {
    id: string;
    text: string;
    metadata: {
        chunkIndex: number;
        totalChunks: number;
        startChar: number;
        endChar: number;
        [key: string]: any;
    };
}
export interface ChunkingOptions {
    chunkSize?: number;
    chunkOverlap?: number;
    separator?: string;
}
/**
 * Chunk text with overlap for better retrieval
 */
export declare function chunkText(text: string, options?: ChunkingOptions, metadata?: Record<string, any>): TextChunk[];
/**
 * Chunk text by sentences (more granular)
 */
export declare function chunkBySentences(text: string, sentencesPerChunk?: number, metadata?: Record<string, any>): TextChunk[];
/**
 * Merge small chunks that are below minimum size
 */
export declare function mergeSmallChunks(chunks: TextChunk[], minSize?: number): TextChunk[];
