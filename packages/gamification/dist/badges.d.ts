import type { Badge } from '@vidyut/shared';
/**
 * Initialize badges in database
 */
export declare function initializeBadges(): Promise<void>;
/**
 * Check if user has earned a badge
 */
export declare function checkBadgeEligibility(userId: string, badgeId: string): Promise<boolean>;
/**
 * Award a badge to a user
 */
export declare function awardBadge(userId: string, badgeId: string): Promise<Badge | null>;
/**
 * Get all badges earned by a user
 */
export declare function getUserBadges(userId: string): Promise<Badge[]>;
/**
 * Check all badges for a user and award new ones
 */
export declare function checkAndAwardAllBadges(userId: string): Promise<Badge[]>;
