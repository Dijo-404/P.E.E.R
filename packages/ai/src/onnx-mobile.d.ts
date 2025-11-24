import type { LlamaModel, GenerateOptions } from './llama-web';
/**
 * ONNX Runtime wrapper for mobile
 * Note: Requires ONNX Runtime React Native package
 */
export declare class OnnxMobileModel implements LlamaModel {
    private session;
    private modelPath;
    constructor(modelPath?: string);
    load(): Promise<void>;
    generate(prompt: string, options?: GenerateOptions): Promise<string>;
    unload(): Promise<void>;
    private simulateResponse;
}
/**
 * Create and initialize an ONNX model for mobile
 */
export declare function createOnnxMobileModel(modelPath?: string): Promise<LlamaModel>;
