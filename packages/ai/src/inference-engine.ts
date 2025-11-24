// ============================================================================
// Unified Inference Engine
// ============================================================================

import type { LlamaModel, GenerateOptions } from './llama-web';
import { createLlamaWebModel } from './llama-web';
import { createOnnxMobileModel } from './onnx-mobile';
import { getDeviceType } from '@vidyut/shared';

export interface InferenceEngine {
    chat(message: string, context?: string): Promise<string>;
    explain(concept: string, grade: number): Promise<string>;
    solveProblem(problem: string, subject: string): Promise<string>;
    generateQuiz(topic: string, difficulty: string): Promise<any>;
}

/**
 * Unified inference engine that works across web and mobile
 */
export class AIInferenceEngine implements InferenceEngine {
    private model: LlamaModel | null = null;
    private isInitialized = false;

    async initialize(): Promise<void> {
        if (this.isInitialized) return;

        const deviceType = getDeviceType();

        try {
            if (deviceType === 'web') {
                this.model = await createLlamaWebModel();
            } else {
                this.model = await createOnnxMobileModel();
            }
            this.isInitialized = true;
        } catch (error) {
            console.error('Failed to initialize AI model:', error);
            throw error;
        }
    }

    async chat(message: string, context?: string): Promise<string> {
        await this.ensureInitialized();

        const prompt = this.buildChatPrompt(message, context);
        return await this.model!.generate(prompt, {
            maxTokens: 256,
            temperature: 0.7,
        });
    }

    async explain(concept: string, grade: number): Promise<string> {
        await this.ensureInitialized();

        const prompt = this.buildExplanationPrompt(concept, grade);
        return await this.model!.generate(prompt, {
            maxTokens: 512,
            temperature: 0.5,
        });
    }

    async solveProblem(problem: string, subject: string): Promise<string> {
        await this.ensureInitialized();

        const prompt = this.buildProblemSolvingPrompt(problem, subject);
        return await this.model!.generate(prompt, {
            maxTokens: 512,
            temperature: 0.3,
        });
    }

    async generateQuiz(topic: string, difficulty: string): Promise<any> {
        await this.ensureInitialized();

        const prompt = this.buildQuizPrompt(topic, difficulty);
        const response = await this.model!.generate(prompt, {
            maxTokens: 512,
            temperature: 0.8,
        });

        // Parse the response into quiz format
        return this.parseQuizResponse(response);
    }

    private async ensureInitialized(): Promise<void> {
        if (!this.isInitialized) {
            await this.initialize();
        }
    }

    private buildChatPrompt(message: string, context?: string): string {
        let prompt = 'You are a helpful AI tutor for Indian students. Answer questions clearly and simply.\n\n';

        if (context) {
            prompt += `Context from textbook:\n${context}\n\n`;
        }

        prompt += `Student: ${message}\nTutor:`;
        return prompt;
    }

    private buildExplanationPrompt(concept: string, grade: number): string {
        return `Explain the concept "${concept}" to a Class ${grade} student in India. Use simple language and examples from daily life.\n\nExplanation:`;
    }

    private buildProblemSolvingPrompt(problem: string, subject: string): string {
        return `Solve this ${subject} problem step by step:\n\n${problem}\n\nSolution:`;
    }

    private buildQuizPrompt(topic: string, difficulty: string): string {
        return `Generate a ${difficulty} difficulty quiz question about "${topic}" with 4 multiple choice options. Format: Question, Option A, Option B, Option C, Option D, Correct Answer, Explanation.\n\nQuiz:`;
    }

    private parseQuizResponse(response: string): any {
        // Simple parsing logic - in production, use more robust parsing
        const lines = response.split('\n').filter(l => l.trim());
        return {
            question: lines[0] || 'Sample question',
            options: lines.slice(1, 5) || ['A', 'B', 'C', 'D'],
            correctAnswer: lines[5] || 'A',
            explanation: lines[6] || 'Explanation here',
        };
    }

    async destroy(): Promise<void> {
        if (this.model) {
            await this.model.unload();
            this.model = null;
        }
        this.isInitialized = false;
    }
}

/**
 * Global inference engine instance
 */
let engineInstance: AIInferenceEngine | null = null;

export async function getInferenceEngine(): Promise<AIInferenceEngine> {
    if (!engineInstance) {
        engineInstance = new AIInferenceEngine();
        await engineInstance.initialize();
    }
    return engineInstance;
}
