import type { Student } from '@vidyut/shared';
export type PointsReason = 'quiz_correct' | 'quiz_first_try' | 'daily_login' | 'streak_bonus' | 'content_complete' | 'mastery_achieved' | 'peer_tutoring' | 'helping_peer';
/**
 * Award points to a user
 */
export declare function awardPoints(userId: string, reason: PointsReason, customAmount?: number): Promise<number>;
/**
 * Get user's current points
 */
export declare function getUserPoints(userId: string): Promise<number>;
/**
 * Get leaderboard (top users by points)
 */
export declare function getLeaderboard(options?: {
    limit?: number;
    grade?: number;
    schoolId?: string;
}): Promise<Student[]>;
/**
 * Calculate daily streak
 */
export declare function calculateDailyStreak(userId: string): Promise<number>;
/**
 * Award streak bonus if applicable
 */
export declare function checkAndAwardStreakBonus(userId: string): Promise<number>;
