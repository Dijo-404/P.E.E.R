// ============================================================================
// Conflict Resolution for Offline Sync
// ============================================================================

import type { LearningProgress, QuizAttempt } from '@vidyut/shared';

export type ConflictResolutionStrategy = 'last-write-wins' | 'merge' | 'custom';

export interface ConflictResolver<T> {
    resolve(local: T, remote: T): T;
}

/**
 * Last-Write-Wins resolver (uses timestamp)
 */
export class LastWriteWinsResolver<T extends { updatedAt?: Date; lastAccessedAt?: Date }>
    implements ConflictResolver<T> {
    resolve(local: T, remote: T): T {
        const localTime = local.updatedAt || local.lastAccessedAt || new Date(0);
        const remoteTime = remote.updatedAt || remote.lastAccessedAt || new Date(0);
        return localTime > remoteTime ? local : remote;
    }
}

/**
 * Learning Progress resolver (merges data intelligently)
 */
export class LearningProgressResolver implements ConflictResolver<LearningProgress> {
    resolve(local: LearningProgress, remote: LearningProgress): LearningProgress {
        // Use the one with higher mastery score
        if (local.masteryScore !== remote.masteryScore) {
            return local.masteryScore > remote.masteryScore ? local : remote;
        }

        // If same mastery, use the one with more attempts
        if (local.attemptsCount !== remote.attemptsCount) {
            return local.attemptsCount > remote.attemptsCount ? local : remote;
        }

        // Otherwise, use last-write-wins
        return local.lastAccessedAt > remote.lastAccessedAt ? local : remote;
    }
}

/**
 * Quiz Attempts resolver (keeps all unique attempts)
 */
export class QuizAttemptsResolver implements ConflictResolver<QuizAttempt[]> {
    resolve(local: QuizAttempt[], remote: QuizAttempt[]): QuizAttempt[] {
        const merged = new Map<string, QuizAttempt>();

        // Add all local attempts
        local.forEach((attempt) => merged.set(attempt.id, attempt));

        // Add remote attempts (only if not already present)
        remote.forEach((attempt) => {
            if (!merged.has(attempt.id)) {
                merged.set(attempt.id, attempt);
            }
        });

        return Array.from(merged.values()).sort(
            (a, b) => a.attemptedAt.getTime() - b.attemptedAt.getTime()
        );
    }
}

/**
 * Generic conflict resolver factory
 */
export function createConflictResolver<T>(
    strategy: ConflictResolutionStrategy,
    customResolver?: ConflictResolver<T>
): ConflictResolver<T> {
    switch (strategy) {
        case 'last-write-wins':
            return new LastWriteWinsResolver<any>();
        case 'custom':
            if (!customResolver) {
                throw new Error('Custom resolver required for custom strategy');
            }
            return customResolver;
        case 'merge':
        default:
            return new LastWriteWinsResolver<any>();
    }
}

/**
 * Resolve conflicts for a batch of records
 */
export function resolveConflicts<T>(
    localRecords: T[],
    remoteRecords: T[],
    resolver: ConflictResolver<T>,
    getId: (record: T) => string
): T[] {
    const merged = new Map<string, T>();

    // Add all local records
    localRecords.forEach((record) => merged.set(getId(record), record));

    // Resolve conflicts with remote records
    remoteRecords.forEach((remote) => {
        const id = getId(remote);
        const local = merged.get(id);

        if (local) {
            // Conflict detected, resolve it
            merged.set(id, resolver.resolve(local, remote));
        } else {
            // No conflict, add remote record
            merged.set(id, remote);
        }
    });

    return Array.from(merged.values());
}
