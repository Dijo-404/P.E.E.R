import { User, Course, Activity, Badge, Tutor, ChatMessage } from './types';
export declare const MOCK_USERS: User[];
export declare const MOCK_USER: User;
export declare const MOCK_COURSES: Course[];
export declare const MOCK_ACTIVITIES: Activity[];
export declare const MOCK_BADGES: Badge[];
export declare const MOCK_TUTORS: Tutor[];
export declare const MOCK_CHAT_HISTORY: ChatMessage[];
export declare const MOCK_CLASS_ANALYTICS: {
    grade: number;
    section: string;
    totalStudents: number;
    activeStudents: number;
    avgMastery: number;
    topPerformers: {
        name: string;
        points: number;
        mastery: number;
    }[];
    needsAttention: {
        name: string;
        points: number;
        mastery: number;
    }[];
};
