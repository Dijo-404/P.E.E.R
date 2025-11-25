export interface LlamaModel {
    load(): Promise<void>;
    generate(prompt: string, options?: GenerateOptions): Promise<string>;
    unload(): Promise<void>;
}
export interface GenerateOptions {
    maxTokens?: number;
    temperature?: number;
    topP?: number;
    stopSequences?: string[];
}
/**
 * llama.cpp WebAssembly wrapper
 * Note: Requires llama.cpp compiled to WebAssembly
 */
export declare class LlamaWebModel implements LlamaModel {
    private context;
    private modelPath;
    constructor(modelPath?: string);
    load(): Promise<void>;
    generate(prompt: string, options?: GenerateOptions): Promise<string>;
    unload(): Promise<void>;
    /**
     * Simulate AI response (for development/testing)
     */
    private simulateResponse;
}
/**
 * Create and initialize a Llama model for web
 */
export declare function createLlamaWebModel(modelPath?: string): Promise<LlamaModel>;
