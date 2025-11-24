export interface InferenceEngine {
    chat(message: string, context?: string): Promise<string>;
    explain(concept: string, grade: number): Promise<string>;
    solveProblem(problem: string, subject: string): Promise<string>;
    generateQuiz(topic: string, difficulty: string): Promise<any>;
}
/**
 * Unified inference engine that works across web and mobile
 */
export declare class AIInferenceEngine implements InferenceEngine {
    private model;
    private isInitialized;
    initialize(): Promise<void>;
    chat(message: string, context?: string): Promise<string>;
    explain(concept: string, grade: number): Promise<string>;
    solveProblem(problem: string, subject: string): Promise<string>;
    generateQuiz(topic: string, difficulty: string): Promise<any>;
    private ensureInitialized;
    private buildChatPrompt;
    private buildExplanationPrompt;
    private buildProblemSolvingPrompt;
    private buildQuizPrompt;
    private parseQuizResponse;
    destroy(): Promise<void>;
}
export declare function getInferenceEngine(): Promise<AIInferenceEngine>;
