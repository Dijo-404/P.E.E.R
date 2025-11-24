// ============================================================================
// Badge System
// ============================================================================

import { getDatabase } from '@vidyut/db';
import { BADGES, generateId } from '@vidyut/shared';
import type { Badge } from '@vidyut/shared';

/**
 * Initialize badges in database
 */
export async function initializeBadges(): Promise<void> {
    const db = await getDatabase();

    for (const badge of BADGES) {
        const existing = await db.get('SELECT id FROM badges WHERE id = ?', [badge.id]);

        if (!existing) {
            await db.run(
                `INSERT INTO badges (id, name, description, icon, criteria_type, criteria_threshold, criteria_subject, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    badge.id,
                    badge.name,
                    badge.description,
                    badge.icon,
                    badge.criteria.type,
                    badge.criteria.threshold,
                    'subject' in badge.criteria ? badge.criteria.subject : null,
                    Date.now(),
                ]
            );
        }
    }
}

/**
 * Check if user has earned a badge
 */
export async function checkBadgeEligibility(userId: string, badgeId: string): Promise<boolean> {
    const db = await getDatabase();

    // Check if already earned
    const existing = await db.get(
        'SELECT id FROM user_badges WHERE user_id = ? AND badge_id = ?',
        [userId, badgeId]
    );

    if (existing) return false;

    // Get badge criteria
    const badge = BADGES.find((b) => b.id === badgeId);
    if (!badge) return false;

    // Check criteria based on type
    switch (badge.criteria.type) {
        case 'points':
            return await checkPointsCriteria(userId, badge.criteria.threshold);

        case 'mastery':
            return await checkMasteryCriteria(
                userId,
                badge.criteria.threshold,
                badge.criteria.subject
            );

        case 'streak':
            return await checkStreakCriteria(userId, badge.criteria.threshold);

        case 'peer_help':
            return await checkPeerHelpCriteria(userId, badge.criteria.threshold);

        case 'custom':
            // Custom logic for specific badges
            return await checkCustomCriteria(userId, badgeId);

        default:
            return false;
    }
}

/**
 * Award a badge to a user
 */
export async function awardBadge(userId: string, badgeId: string): Promise<Badge | null> {
    const eligible = await checkBadgeEligibility(userId, badgeId);
    if (!eligible) return null;

    const db = await getDatabase();
    const id = generateId('badge');
    const earnedAt = Date.now();

    await db.run(
        'INSERT INTO user_badges (id, user_id, badge_id, earned_at) VALUES (?, ?, ?, ?)',
        [id, userId, badgeId, earnedAt]
    );

    const badge = BADGES.find((b) => b.id === badgeId);
    if (!badge) return null;

    return {
        ...badge,
        earnedAt: new Date(earnedAt).toISOString(),
    };
}

/**
 * Get all badges earned by a user
 */
export async function getUserBadges(userId: string): Promise<Badge[]> {
    const db = await getDatabase();

    const userBadges = await db.all<any>(
        `SELECT b.*, ub.earned_at
     FROM badges b
     JOIN user_badges ub ON b.id = ub.badge_id
     WHERE ub.user_id = ?
     ORDER BY ub.earned_at DESC`,
        [userId]
    );

    return userBadges.map((badge) => ({
        id: badge.id,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        criteria: {
            type: badge.criteria_type,
            threshold: badge.criteria_threshold,
            subject: badge.criteria_subject,
        },
        earnedAt: new Date(badge.earned_at).toISOString(),
    }));
}

/**
 * Check all badges for a user and award new ones
 */
export async function checkAndAwardAllBadges(userId: string): Promise<Badge[]> {
    const newBadges: Badge[] = [];

    for (const badge of BADGES) {
        const awarded = await awardBadge(userId, badge.id);
        if (awarded) {
            newBadges.push(awarded);
        }
    }

    return newBadges;
}

// Helper functions for criteria checking

async function checkPointsCriteria(userId: string, threshold: number): Promise<boolean> {
    const db = await getDatabase();
    const user = await db.get<{ points: number }>('SELECT points FROM users WHERE id = ?', [userId]);
    return (user?.points || 0) >= threshold;
}

async function checkMasteryCriteria(
    userId: string,
    threshold: number,
    subject?: string
): Promise<boolean> {
    const db = await getDatabase();

    let sql = `SELECT COUNT(*) as count
             FROM learning_progress lp
             JOIN content c ON lp.content_id = c.id
             WHERE lp.user_id = ? AND lp.status = 'mastered'`;
    const params: any[] = [userId];

    if (subject) {
        sql += ' AND c.subject = ?';
        params.push(subject);
    }

    const result = await db.get<{ count: number }>(sql, params);
    return (result?.count || 0) >= threshold;
}

async function checkStreakCriteria(_userId: string, _threshold: number): Promise<boolean> {
    // Would use calculateDailyStreak from points-engine
    // For now, simplified check
    return false; // Placeholder
}

async function checkPeerHelpCriteria(userId: string, threshold: number): Promise<boolean> {
    const db = await getDatabase();

    const result = await db.get<{ count: number }>(
        `SELECT COUNT(*) as count
     FROM tutoring_sessions
     WHERE tutor_id = ? AND status = 'completed' AND rating >= 4`,
        [userId]
    );

    return (result?.count || 0) >= threshold;
}

async function checkCustomCriteria(userId: string, badgeId: string): Promise<boolean> {
    // Custom logic for specific badges
    if (badgeId === 'first_steps') {
        const db = await getDatabase();
        const result = await db.get<{ count: number }>(
            'SELECT COUNT(*) as count FROM learning_progress WHERE user_id = ? AND status != "not_started"',
            [userId]
        );
        return (result?.count || 0) >= 1;
    }

    return false;
}
