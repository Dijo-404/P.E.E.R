export interface User {
    id: string;
    name: string;
    role: 'student' | 'teacher' | 'admin';
    grade?: number;
    language: Language;
    avatar?: string;
    points?: number;
    streak?: number;
    level?: number;
    masteryScore?: number;
    completedLessons?: number;
    preferences?: {
        language: Language;
        notifications: boolean;
        offlineMode: boolean;
    };
    createdAt?: Date;
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
export type Subject = 'math' | 'science' | 'english' | 'hindi' | 'social_studies';
export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn';
export interface Content {
    id: string;
    title: string;
    subject: Subject;
    grade: number;
    chapter: number;
    section: string;
    content: string;
    embeddings?: number[];
    language: Language;
    createdAt: Date;
    updatedAt: Date;
}
export interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    tags: string[];
}
export interface Activity {
    id: string;
    title: string;
    type: 'quiz' | 'lesson' | 'reading';
    subject: string;
    timestamp: string;
    score?: number;
    maxScore?: number;
    progress?: number;
    status: 'completed' | 'in-progress' | 'not-started';
}
export interface Question {
    id: string;
    contentId: string;
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
}
export interface LearningProgress {
    id: string;
    userId: string;
    contentId: string;
    status: 'not_started' | 'in_progress' | 'completed' | 'mastered';
    timeSpent: number;
    attemptsCount: number;
    correctAnswers: number;
    totalQuestions: number;
    masteryScore: number;
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
export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    criteria?: BadgeCriteria;
    earnedAt?: string | null;
    category?: 'engagement' | 'achievement' | 'consistency';
    progress?: number;
    totalRequired?: number;
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
export interface ChatMessage {
    id: string;
    senderId?: string;
    fromUserId?: string;
    toUserId?: string;
    text?: string;
    message?: string;
    encrypted?: boolean;
    type?: 'text' | 'voice' | 'image';
    metadata?: {
        questionId?: string;
        contentId?: string;
        voiceUrl?: string;
    };
    timestamp?: string;
    sentAt?: Date;
    deliveredAt?: Date;
    readAt?: Date;
    isAi?: boolean;
}
export interface Tutor {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    isOnline: boolean;
    avatar: string;
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
export interface AIConversation {
    id: string;
    userId: string;
    messages: AIMessage[];
    context?: string;
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
export interface SyncLog {
    id: string;
    userId: string;
    deviceId: string;
    syncType: 'bluetooth' | 'wifi_direct' | 'internet';
    dataTypes: string[];
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
    publicKey?: string;
}
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
        reminderTimes: string[];
        vibrationIntensity: number;
        ledBrightness: number;
    };
}
export interface ESP32SensorData {
    id: string;
    deviceId: string;
    lightLevel: number;
    timestamp: Date;
}
export interface MasteryHeatmap {
    userId: string;
    subject: Subject;
    grade: number;
    data: {
        contentId: string;
        title: string;
        masteryScore: number;
        studentsCount: number;
        avgTimeSpent: number;
    }[];
}
export interface ClassAnalytics {
    teacherId: string;
    grade: number;
    section: string;
    totalStudents: number;
    activeStudents: number;
    avgMasteryScore: number;
    topPerformers: Student[];
    needsAttention: Student[];
    subjectProgress: {
        subject: Subject;
        avgProgress: number;
        completionRate: number;
    }[];
}
