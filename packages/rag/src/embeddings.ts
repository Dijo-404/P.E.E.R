// ============================================================================
// Quantized Embeddings Generation
// ============================================================================

/**
 * Simple embedding generation using character-level features
 * In production, use a proper embedding model like sentence-transformers
 */
export function generateSimpleEmbedding(text: string, dimensions: number = 384): number[] {
    const embedding = new Array(dimensions).fill(0);

    // Simple character-based features (placeholder for real embeddings)
    const normalized = text.toLowerCase();

    for (let i = 0; i < normalized.length; i++) {
        const charCode = normalized.charCodeAt(i);
        const index = (charCode * i) % dimensions;
        embedding[index] += 1;
    }

    // Normalize
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return embedding.map(val => magnitude > 0 ? val / magnitude : 0);
}

/**
 * Quantize embeddings to reduce storage (float32 -> int8)
 */
export function quantizeEmbedding(embedding: number[]): Int8Array {
    // Scale to -128 to 127 range
    const quantized = new Int8Array(embedding.length);

    for (let i = 0; i < embedding.length; i++) {
        quantized[i] = Math.round(embedding[i] * 127);
    }

    return quantized;
}

/**
 * Dequantize embeddings back to floats
 */
export function dequantizeEmbedding(quantized: Int8Array): number[] {
    const embedding = new Array(quantized.length);

    for (let i = 0; i < quantized.length; i++) {
        embedding[i] = quantized[i] / 127;
    }

    return embedding;
}

/**
 * Calculate cosine similarity between two embeddings
 */
export function cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
        throw new Error('Embeddings must have same dimensions');
    }

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
        magnitudeA += a[i] * a[i];
        magnitudeB += b[i] * b[i];
    }

    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);

    if (magnitudeA === 0 || magnitudeB === 0) return 0;

    return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Batch generate embeddings for multiple texts
 */
export async function batchGenerateEmbeddings(
    texts: string[],
    dimensions: number = 384
): Promise<number[][]> {
    return texts.map(text => generateSimpleEmbedding(text, dimensions));
}

/**
 * Generate and quantize embedding in one step
 */
export function generateQuantizedEmbedding(text: string, dimensions: number = 384): Int8Array {
    const embedding = generateSimpleEmbedding(text, dimensions);
    return quantizeEmbedding(embedding);
}
