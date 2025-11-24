// ============================================================================
// Core Types for Vidyut Bandhu Platform
// ============================================================================

// User & Authentication
export interface User {
    id: string;
    name: string;
    role: 'student' | 'teacher' | 'admin';
    grade?: number; // For students
    language: Language;
    createdAt: Date;
    lastSyncAt?: Date;
}

export interface Student extends User {
    role: 'student';
    grade: number;
    section?: string;
    schoolId?: string;
    points: number;
    knowledgeCredits: number;
    badges: Badge[];
}

export interface Teacher extends User {
    role: 'teacher';
    subjects: Subject[];
    grades: number[];
    schoolId?: string;
}

// Content & Learning
export type Subject = 'math' | 'science' | 'english' | 'hindi' | 'social_studies';
export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn'; // English, Hindi, Tamil, Telugu, Bengali

export interface Content {
    id: string;
    title: string;
    subject: Subject;
    grade: number;
    chapter: number;
    section: string;
    content: string; // Markdown or plain text
    embeddings?: number[]; // Quantized embeddings for RAG
    language: Language;
    createdAt: Date;
    updatedAt: Date;
}

export interface Question {
    id: string;
    contentId: string;
    question: string;
    options?: string[]; // For MCQ
    correctAnswer: string;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
}

// Progress & Learning Analytics
export interface LearningProgress {
    id: string;
    userId: string;
    contentId: string;
    status: 'not_started' | 'in_progress' | 'completed' | 'mastered';
    timeSpent: number; // in seconds
    attemptsCount: number;
    correctAnswers: number;
    totalQuestions: number;
    masteryScore: number; // 0-100
    lastAccessedAt: Date;
    completedAt?: Date;
}

export interface QuizAttempt {
    id: string;
    userId: string;
    questionId: string;
    answer: string;
    isCorrect: boolean;
    timeSpent: number;
    attemptedAt: Date;
}

// Gamification
export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    criteria: BadgeCriteria;
    earnedAt?: Date;
}

export interface BadgeCriteria {
    type: 'points' | 'streak' | 'mastery' | 'peer_help' | 'custom';
    threshold: number;
    subject?: Subject;
}

export interface KnowledgeCredit {
    id: string;
    fromUserId: string;
    toUserId: string;
    amount: number;
    reason: 'peer_tutoring' | 'content_creation' | 'helping' | 'reward';
    metadata?: Record<string, any>;
    createdAt: Date;
}

// Chat & Peer Tutoring
export interface ChatMessage {
    id: string;
    fromUserId: string;
    toUserId: string;
    message: string;
    encrypted: boolean;
    type: 'text' | 'voice' | 'image';
    metadata?: {
        questionId?: string;
        contentId?: string;
        voiceUrl?: string;
    };
    sentAt: Date;
    deliveredAt?: Date;
    readAt?: Date;
}

export interface TutoringSession {
    id: string;
    tutorId: string;
    studentId: string;
    subject: Subject;
    topic: string;
    status: 'requested' | 'active' | 'completed' | 'cancelled';
    creditsOffered: number;
    startedAt?: Date;
    endedAt?: Date;
    rating?: number;
    feedback?: string;
}

// AI & RAG
export interface AIConversation {
    id: string;
    userId: string;
    messages: AIMessage[];
    context?: string; // Retrieved context from RAG
    createdAt: Date;
    updatedAt: Date;
}

export interface AIMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
}

export interface RAGChunk {
    id: string;
    contentId: string;
    text: string;
    embeddings: number[];
    metadata: {
        subject: Subject;
        grade: number;
        chapter: number;
        page?: number;
    };
}

// Sync & P2P
export interface SyncLog {
    id: string;
    userId: string;
    deviceId: string;
    syncType: 'bluetooth' | 'wifi_direct' | 'internet';
    dataTypes: string[]; // ['progress', 'messages', 'content']
    recordsCount: number;
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
    startedAt: Date;
    completedAt?: Date;
    error?: string;
}

export interface Device {
    id: string;
    userId: string;
    name: string;
    type: 'web' | 'android' | 'ios';
    lastSeenAt: Date;
    publicKey?: string; // For E2E encryption
}

// ESP32 Integration
export interface ESP32Device {
    id: string;
    userId: string;
    macAddress: string;
    name: string;
    isPaired: boolean;
    batteryLevel?: number;
    lastSyncAt?: Date;
    settings: {
        reminderEnabled: boolean;
        reminderTimes: string[]; // HH:MM format
        vibrationIntensity: number; // 0-100
        ledBrightness: number; // 0-100
    };
}

export interface ESP32SensorData {
    id: string;
    deviceId: string;
    lightLevel: number; // 0-1023 (analog reading)
    timestamp: Date;
}

// Teacher Dashboard
export interface MasteryHeatmap {
    userId: string;
    subject: Subject;
    grade: number;
    data: {
        contentId: string;
        title: string;
        masteryScore: number; // 0-100
        studentsCount: number;
        avgTimeSpent: number;
    }[];
}

export interface ClassAnalytics {
    teacherId: string;
    grade: number;
    section: string;
    totalStudents: number;
    activeStudents: number; // Active in last 7 days
    avgMasteryScore: number;
    topPerformers: Student[];
    needsAttention: Student[];
    subjectProgress: {
        subject: Subject;
        avgProgress: number;
        completionRate: number;
    }[];
}
