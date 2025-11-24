// ============================================================================
// Text Chunking for RAG
// ============================================================================

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
export function chunkText(
    text: string,
    options: ChunkingOptions = {},
    metadata: Record<string, any> = {}
): TextChunk[] {
    const {
        chunkSize = 500, // characters
        chunkOverlap = 50,
        separator = '\n\n',
    } = options;

    const chunks: TextChunk[] = [];

    // Split by separator first (paragraphs)
    const paragraphs = text.split(separator).filter(p => p.trim().length > 0);

    let currentChunk = '';
    let currentStartChar = 0;
    let chunkIndex = 0;

    for (const paragraph of paragraphs) {
        // If adding this paragraph exceeds chunk size, save current chunk
        if (currentChunk.length + paragraph.length > chunkSize && currentChunk.length > 0) {
            chunks.push({
                id: `chunk_${chunkIndex}`,
                text: currentChunk.trim(),
                metadata: {
                    chunkIndex,
                    totalChunks: 0, // Will update later
                    startChar: currentStartChar,
                    endChar: currentStartChar + currentChunk.length,
                    ...metadata,
                },
            });

            // Start new chunk with overlap
            const overlapText = currentChunk.slice(-chunkOverlap);
            currentChunk = overlapText + ' ' + paragraph;
            currentStartChar += currentChunk.length - overlapText.length - paragraph.length - 1;
            chunkIndex++;
        } else {
            currentChunk += (currentChunk ? ' ' : '') + paragraph;
        }
    }

    // Add the last chunk
    if (currentChunk.trim().length > 0) {
        chunks.push({
            id: `chunk_${chunkIndex}`,
            text: currentChunk.trim(),
            metadata: {
                chunkIndex,
                totalChunks: 0,
                startChar: currentStartChar,
                endChar: currentStartChar + currentChunk.length,
                ...metadata,
            },
        });
    }

    // Update total chunks count
    const totalChunks = chunks.length;
    chunks.forEach(chunk => {
        chunk.metadata.totalChunks = totalChunks;
    });

    return chunks;
}

/**
 * Chunk text by sentences (more granular)
 */
export function chunkBySentences(
    text: string,
    sentencesPerChunk: number = 5,
    metadata: Record<string, any> = {}
): TextChunk[] {
    // Simple sentence splitting (can be improved with NLP library)
    const sentences = text
        .split(/[.!?]+/)
        .map(s => s.trim())
        .filter(s => s.length > 0);

    const chunks: TextChunk[] = [];

    for (let i = 0; i < sentences.length; i += sentencesPerChunk) {
        const chunkSentences = sentences.slice(i, i + sentencesPerChunk);
        const chunkText = chunkSentences.join('. ') + '.';

        chunks.push({
            id: `chunk_${i / sentencesPerChunk}`,
            text: chunkText,
            metadata: {
                chunkIndex: i / sentencesPerChunk,
                totalChunks: Math.ceil(sentences.length / sentencesPerChunk),
                startChar: 0, // Would need to calculate from original text
                endChar: 0,
                ...metadata,
            },
        });
    }

    return chunks;
}

/**
 * Merge small chunks that are below minimum size
 */
export function mergeSmallChunks(chunks: TextChunk[], minSize: number = 100): TextChunk[] {
    const merged: TextChunk[] = [];
    let currentMerged: TextChunk | null = null;

    for (const chunk of chunks) {
        if (chunk.text.length < minSize) {
            if (currentMerged) {
                currentMerged.text += ' ' + chunk.text;
                currentMerged.metadata.endChar = chunk.metadata.endChar;
            } else {
                currentMerged = { ...chunk };
            }
        } else {
            if (currentMerged) {
                merged.push(currentMerged);
                currentMerged = null;
            }
            merged.push(chunk);
        }
    }

    if (currentMerged) {
        merged.push(currentMerged);
    }

    return merged;
}
