// ============================================================================
// Unified Inference Engine
// ============================================================================
import { createLlamaWebModel } from './llama-web';
import { createOnnxMobileModel } from './onnx-mobile';
import { getDeviceType } from '@vidyut/shared';
/**
 * Unified inference engine that works across web and mobile
 */
export class AIInferenceEngine {
    constructor() {
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "isInitialized", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
    }
    async initialize() {
        if (this.isInitialized)
            return;
        const deviceType = getDeviceType();
        try {
            if (deviceType === 'web') {
                this.model = await createLlamaWebModel();
            }
            else {
                this.model = await createOnnxMobileModel();
            }
            this.isInitialized = true;
        }
        catch (error) {
            console.error('Failed to initialize AI model:', error);
            throw error;
        }
    }
    async chat(message, context) {
        await this.ensureInitialized();
        const prompt = this.buildChatPrompt(message, context);
        return await this.model.generate(prompt, {
            maxTokens: 256,
            temperature: 0.7,
        });
    }
    async explain(concept, grade) {
        await this.ensureInitialized();
        const prompt = this.buildExplanationPrompt(concept, grade);
        return await this.model.generate(prompt, {
            maxTokens: 512,
            temperature: 0.5,
        });
    }
    async solveProblem(problem, subject) {
        await this.ensureInitialized();
        const prompt = this.buildProblemSolvingPrompt(problem, subject);
        return await this.model.generate(prompt, {
            maxTokens: 512,
            temperature: 0.3,
        });
    }
    async generateQuiz(topic, difficulty) {
        await this.ensureInitialized();
        const prompt = this.buildQuizPrompt(topic, difficulty);
        const response = await this.model.generate(prompt, {
            maxTokens: 512,
            temperature: 0.8,
        });
        // Parse the response into quiz format
        return this.parseQuizResponse(response);
    }
    async ensureInitialized() {
        if (!this.isInitialized) {
            await this.initialize();
        }
    }
    buildChatPrompt(message, context) {
        let prompt = 'You are a helpful AI tutor for Indian students. Answer questions clearly and simply.\n\n';
        if (context) {
            prompt += `Context from textbook:\n${context}\n\n`;
        }
        prompt += `Student: ${message}\nTutor:`;
        return prompt;
    }
    buildExplanationPrompt(concept, grade) {
        return `Explain the concept "${concept}" to a Class ${grade} student in India. Use simple language and examples from daily life.\n\nExplanation:`;
    }
    buildProblemSolvingPrompt(problem, subject) {
        return `Solve this ${subject} problem step by step:\n\n${problem}\n\nSolution:`;
    }
    buildQuizPrompt(topic, difficulty) {
        return `Generate a ${difficulty} difficulty quiz question about "${topic}" with 4 multiple choice options. Format: Question, Option A, Option B, Option C, Option D, Correct Answer, Explanation.\n\nQuiz:`;
    }
    parseQuizResponse(response) {
        // Simple parsing logic - in production, use more robust parsing
        const lines = response.split('\n').filter(l => l.trim());
        return {
            question: lines[0] || 'Sample question',
            options: lines.slice(1, 5) || ['A', 'B', 'C', 'D'],
            correctAnswer: lines[5] || 'A',
            explanation: lines[6] || 'Explanation here',
        };
    }
    async destroy() {
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
let engineInstance = null;
export async function getInferenceEngine() {
    if (!engineInstance) {
        engineInstance = new AIInferenceEngine();
        await engineInstance.initialize();
    }
    return engineInstance;
}
