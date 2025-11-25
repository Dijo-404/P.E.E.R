import type { Subject } from '@vidyut/shared';
export interface ExtractedText {
    text: string;
    pages: number;
    metadata: {
        title?: string;
        author?: string;
        subject?: Subject;
        grade?: number;
    };
}
/**
 * Extract text from PDF file
 */
export declare function extractTextFromPDF(pdfBuffer: Buffer | ArrayBuffer, metadata?: Partial<ExtractedText['metadata']>): Promise<ExtractedText>;
/**
 * Extract text from PDF file path (Node.js only)
 */
export declare function extractTextFromPDFFile(filePath: string, metadata?: Partial<ExtractedText['metadata']>): Promise<ExtractedText>;
/**
 * Clean extracted text (remove extra whitespace, fix formatting)
 */
export declare function cleanExtractedText(text: string): string;
/**
 * Split PDF text by chapters (assumes "Chapter N" format)
 */
export declare function splitByChapters(text: string): Array<{
    chapter: number;
    title: string;
    content: string;
}>;
