// ============================================================================
// PDF Text Extraction for NCERT Textbooks
// ============================================================================
import pdf from 'pdf-parse';
/**
 * Extract text from PDF file
 */
export async function extractTextFromPDF(pdfBuffer, metadata) {
    try {
        // Convert ArrayBuffer to Buffer if needed
        const buffer = pdfBuffer instanceof ArrayBuffer
            ? Buffer.from(pdfBuffer)
            : pdfBuffer;
        const data = await pdf(buffer);
        return {
            text: data.text,
            pages: data.numpages,
            metadata: {
                title: data.info?.Title,
                author: data.info?.Author,
                ...metadata,
            },
        };
    }
    catch (error) {
        console.error('PDF extraction failed:', error);
        throw new Error(`Failed to extract text from PDF: ${error}`);
    }
}
/**
 * Extract text from PDF file path (Node.js only)
 */
export async function extractTextFromPDFFile(filePath, metadata) {
    const fs = await import('fs/promises');
    const buffer = await fs.readFile(filePath);
    return extractTextFromPDF(buffer, metadata);
}
/**
 * Clean extracted text (remove extra whitespace, fix formatting)
 */
export function cleanExtractedText(text) {
    return text
        .replace(/\r\n/g, '\n') // Normalize line endings
        .replace(/\n{3,}/g, '\n\n') // Remove excessive newlines
        .replace(/[ \t]+/g, ' ') // Normalize spaces
        .replace(/^\s+|\s+$/gm, '') // Trim lines
        .trim();
}
/**
 * Split PDF text by chapters (assumes "Chapter N" format)
 */
export function splitByChapters(text) {
    const chapters = [];
    const chapterRegex = /Chapter\s+(\d+)[:\s]*([^\n]+)/gi;
    let match;
    const matches = [];
    while ((match = chapterRegex.exec(text)) !== null) {
        matches.push({
            index: match.index,
            chapter: parseInt(match[1]),
            title: match[2].trim(),
        });
    }
    for (let i = 0; i < matches.length; i++) {
        const start = matches[i].index;
        const end = i < matches.length - 1 ? matches[i + 1].index : text.length;
        const content = text.substring(start, end).trim();
        chapters.push({
            chapter: matches[i].chapter,
            title: matches[i].title,
            content: cleanExtractedText(content),
        });
    }
    return chapters;
}
