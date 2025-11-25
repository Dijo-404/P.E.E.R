export interface MockStudent {
    id: string;
    name: string;
    email: string;
    rollNumber: string;
    class: string;
    section: string;
    gender: 'male' | 'female';
    phone: string;
    parentPhone: string;
    attendance: number;
    totalPoints: number;
    currentStreak: number;
    joinedDate: Date;
}
export interface MockCourse {
    id: string;
    title: string;
    subject: string;
    class: string;
    description: string;
    totalModules: number;
    completedModules: number;
    progress: number;
    lastAccessed: Date;
    estimatedHours: number;
}
export interface MockProgress {
    courseId: string;
    courseName: string;
    subject: string;
    progress: number;
    quizzesCompleted: number;
    quizzesTotal: number;
    averageScore: number;
    timeSpent: number;
    lastActivity: Date;
}
export interface MockBadge {
    id: string;
    name: string;
    description: string;
    icon: string;
    earnedDate: Date | null;
    criteria: string;
    progress?: number;
}
export interface MockQuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
    subject: string;
    topic: string;
}
export interface MockCommunityPost {
    id: string;
    author: string;
    authorId: string;
    content: string;
    timestamp: Date;
    likes: number;
    replies: number;
    tags: string[];
}
export interface MockAssignment {
    id: string;
    title: string;
    subject: string;
    class: string;
    description: string;
    dueDate: Date;
    maxScore: number;
    submitted: boolean;
    score?: number;
    feedback?: string;
}
/**
 * Generate mock students
 */
export declare function generateMockStudents(count?: number): MockStudent[];
/**
 * Generate mock courses for a student
 */
export declare function generateMockCourses(studentClass: string, studentId: string): MockCourse[];
/**
 * Generate mock progress data for a student
 */
export declare function generateMockProgress(courses: MockCourse[], studentId: string): MockProgress[];
/**
 * Generate mock badges for a student
 */
export declare function generateMockBadges(totalPoints: number, currentStreak: number, seed: number): MockBadge[];
/**
 * Generate sample quiz questions
 */
export declare function generateMockQuizQuestions(subject: string, count?: number): MockQuizQuestion[];
/**
 * Generate mock community posts
 */
export declare function generateMockCommunityPosts(students: MockStudent[], count?: number): MockCommunityPost[];
/**
 * Generate mock assignments
 */
export declare function generateMockAssignments(studentClass: string, count?: number): MockAssignment[];
export declare const defaultMockData: {
    students: MockStudent[];
    readonly currentStudent: MockStudent;
    readonly currentStudentCourses: MockCourse[];
    readonly currentStudentProgress: MockProgress[];
    readonly currentStudentBadges: MockBadge[];
    readonly currentStudentAssignments: MockAssignment[];
    readonly communityPosts: MockCommunityPost[];
};
