// ============================================================================
// Points Engine for Gamification
// ============================================================================

import { getDatabase } from '@vidyut/db';
import { POINTS } from '@vidyut/shared';
import type { Student } from '@vidyut/shared';

export type PointsReason =
    | 'quiz_correct'
    | 'quiz_first_try'
    | 'daily_login'
    | 'streak_bonus'
    | 'content_complete'
    | 'mastery_achieved'
    | 'peer_tutoring'
    | 'helping_peer';

/**
 * Award points to a user
 */
export async function awardPoints(
    userId: string,
    reason: PointsReason,
    customAmount?: number
): Promise<number> {
    const db = await getDatabase();

    // Determine points amount
    const pointsMap: Record<PointsReason, number> = {
        quiz_correct: POINTS.QUIZ_CORRECT,
        quiz_first_try: POINTS.QUIZ_FIRST_TRY,
        daily_login: POINTS.DAILY_LOGIN,
        streak_bonus: POINTS.STREAK_BONUS,
        content_complete: POINTS.CONTENT_COMPLETE,
        mastery_achieved: POINTS.MASTERY_ACHIEVED,
        peer_tutoring: POINTS.PEER_TUTORING,
        helping_peer: POINTS.HELPING_PEER,
    };

    const points = customAmount || pointsMap[reason];

    // Update user points
    await db.run('UPDATE users SET points = points + ? WHERE id = ?', [points, userId]);

    // Get updated points
    const user = await db.get<{ points: number }>('SELECT points FROM users WHERE id = ?', [userId]);

    return user?.points || 0;
}

/**
 * Get user's current points
 */
export async function getUserPoints(userId: string): Promise<number> {
    const db = await getDatabase();
    const user = await db.get<{ points: number }>('SELECT points FROM users WHERE id = ?', [userId]);
    return user?.points || 0;
}

/**
 * Get leaderboard (top users by points)
 */
export async function getLeaderboard(
    options: {
        limit?: number;
        grade?: number;
        schoolId?: string;
    } = {}
): Promise<Student[]> {
    const { limit = 10, grade, schoolId } = options;
    const db = await getDatabase();

    let sql = 'SELECT * FROM users WHERE role = "student"';
    const params: any[] = [];

    if (grade) {
        sql += ' AND grade = ?';
        params.push(grade);
    }

    if (schoolId) {
        sql += ' AND school_id = ?';
        params.push(schoolId);
    }

    sql += ' ORDER BY points DESC LIMIT ?';
    params.push(limit);

    const users = await db.all<any>(sql, params);

    return users.map((user) => ({
        id: user.id,
        name: user.name,
        role: 'student',
        grade: user.grade,
        section: user.section,
        schoolId: user.school_id,
        language: user.language,
        points: user.points,
        knowledgeCredits: user.knowledge_credits,
        badges: [], // Would need to join with user_badges
        createdAt: new Date(user.created_at),
        lastSyncAt: user.last_sync_at ? new Date(user.last_sync_at) : undefined,
    }));
}

/**
 * Calculate daily streak
 */
export async function calculateDailyStreak(userId: string): Promise<number> {
    const db = await getDatabase();

    // Get all unique dates when user accessed content
    const accessDates = await db.all<{ date: string }>(
        `SELECT DISTINCT DATE(last_accessed_at / 1000, 'unixepoch') as date
     FROM learning_progress
     WHERE user_id = ?
     ORDER BY date DESC`,
        [userId]
    );

    if (accessDates.length === 0) return 0;

    let streak = 1;
    const today = new Date().toISOString().split('T')[0];
    let currentDate = new Date(accessDates[0].date);

    // Check if streak is still active (accessed today or yesterday)
    const daysSinceLastAccess = Math.floor(
        (new Date(today).getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastAccess > 1) return 0; // Streak broken

    // Count consecutive days
    for (let i = 1; i < accessDates.length; i++) {
        const prevDate = new Date(currentDate);
        prevDate.setDate(prevDate.getDate() - 1);

        const checkDate = new Date(accessDates[i].date);

        if (checkDate.toISOString().split('T')[0] === prevDate.toISOString().split('T')[0]) {
            streak++;
            currentDate = checkDate;
        } else {
            break;
        }
    }

    return streak;
}

/**
 * Award streak bonus if applicable
 */
export async function checkAndAwardStreakBonus(userId: string): Promise<number> {
    const streak = await calculateDailyStreak(userId);

    // Award bonus every 7 days
    if (streak > 0 && streak % 7 === 0) {
        return await awardPoints(userId, 'streak_bonus');
    }

    return 0;
}
