import type { KnowledgeCredit } from '@vidyut/shared';
/**
 * Transfer knowledge credits between users
 */
export declare function transferCredits(fromUserId: string, toUserId: string, amount: number, reason: KnowledgeCredit['reason'], metadata?: Record<string, any>): Promise<KnowledgeCredit>;
/**
 * Award credits to a user (from system)
 */
export declare function awardCredits(userId: string, amount: number, reason: KnowledgeCredit['reason'], metadata?: Record<string, any>): Promise<number>;
/**
 * Get user's credit balance
 */
export declare function getCreditBalance(userId: string): Promise<number>;
/**
 * Get credit transaction history
 */
export declare function getCreditHistory(userId: string, limit?: number): Promise<KnowledgeCredit[]>;
/**
 * Get total credits earned
 */
export declare function getTotalCreditsEarned(userId: string): Promise<number>;
/**
 * Get total credits spent
 */
export declare function getTotalCreditsSpent(userId: string): Promise<number>;
