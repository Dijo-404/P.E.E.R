/**
 * Simple embedding generation using character-level features
 * In production, use a proper embedding model like sentence-transformers
 */
export declare function generateSimpleEmbedding(text: string, dimensions?: number): number[];
/**
 * Quantize embeddings to reduce storage (float32 -> int8)
 */
export declare function quantizeEmbedding(embedding: number[]): Int8Array;
/**
 * Dequantize embeddings back to floats
 */
export declare function dequantizeEmbedding(quantized: Int8Array): number[];
/**
 * Calculate cosine similarity between two embeddings
 */
export declare function cosineSimilarity(a: number[], b: number[]): number;
/**
 * Batch generate embeddings for multiple texts
 */
export declare function batchGenerateEmbeddings(texts: string[], dimensions?: number): Promise<number[][]>;
/**
 * Generate and quantize embedding in one step
 */
export declare function generateQuantizedEmbedding(text: string, dimensions?: number): Int8Array;
