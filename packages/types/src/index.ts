export interface Student {
    id: string;
    name: string;
    email?: string;
    rollNumber: string;
    class: string;
    section?: string;
    dateOfBirth?: Date;
    phone?: string;
    parentPhone?: string;
    address?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Performance {
    id: string;
    studentId: string;
    subject: string;
    score: number;
    maxScore: number;
    testType: 'quiz' | 'exam' | 'assignment';
    testDate: Date;
    attendance?: number;
    remarks?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Assignment {
    id: string;
    title: string;
    description: string;
    subject: string;
    class: string;
    section?: string;
    dueDate: Date;
    maxScore: number;
    createdById: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Submission {
    id: string;
    assignmentId: string;
    studentId: string;
    content?: string;
    fileUrl?: string;
    submittedAt: Date;
    score?: number;
    feedback?: string;
    gradedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'TEACHER';
    createdAt: Date;
    updatedAt: Date;
}

// API Response types
export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
}
