import type { LearningProgress, QuizAttempt } from '@vidyut/shared';
export type ConflictResolutionStrategy = 'last-write-wins' | 'merge' | 'custom';
export interface ConflictResolver<T> {
    resolve(local: T, remote: T): T;
}
/**
 * Last-Write-Wins resolver (uses timestamp)
 */
export declare class LastWriteWinsResolver<T extends {
    updatedAt?: Date;
    lastAccessedAt?: Date;
}> implements ConflictResolver<T> {
    resolve(local: T, remote: T): T;
}
/**
 * Learning Progress resolver (merges data intelligently)
 */
export declare class LearningProgressResolver implements ConflictResolver<LearningProgress> {
    resolve(local: LearningProgress, remote: LearningProgress): LearningProgress;
}
/**
 * Quiz Attempts resolver (keeps all unique attempts)
 */
export declare class QuizAttemptsResolver implements ConflictResolver<QuizAttempt[]> {
    resolve(local: QuizAttempt[], remote: QuizAttempt[]): QuizAttempt[];
}
/**
 * Generic conflict resolver factory
 */
export declare function createConflictResolver<T>(strategy: ConflictResolutionStrategy, customResolver?: ConflictResolver<T>): ConflictResolver<T>;
/**
 * Resolve conflicts for a batch of records
 */
export declare function resolveConflicts<T>(localRecords: T[], remoteRecords: T[], resolver: ConflictResolver<T>, getId: (record: T) => string): T[];
