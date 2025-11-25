// ============================================================================
// Knowledge Credits Ledger
// ============================================================================
import { getDatabase } from '@vidyut/db';
import { generateId } from '@vidyut/shared';
/**
 * Transfer knowledge credits between users
 */
export async function transferCredits(fromUserId, toUserId, amount, reason, metadata) {
    if (amount <= 0) {
        throw new Error('Amount must be positive');
    }
    const db = await getDatabase();
    // Check if sender has enough credits
    const sender = await db.get('SELECT knowledge_credits FROM users WHERE id = ?', [fromUserId]);
    if (!sender || sender.knowledge_credits < amount) {
        throw new Error('Insufficient knowledge credits');
    }
    // Create transaction record
    const id = generateId('credit');
    const createdAt = Date.now();
    await db.run(`INSERT INTO knowledge_credits (id, from_user_id, to_user_id, amount, reason, metadata, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`, [id, fromUserId, toUserId, amount, reason, JSON.stringify(metadata || {}), createdAt]);
    // Update balances
    await db.run('UPDATE users SET knowledge_credits = knowledge_credits - ? WHERE id = ?', [
        amount,
        fromUserId,
    ]);
    await db.run('UPDATE users SET knowledge_credits = knowledge_credits + ? WHERE id = ?', [
        amount,
        toUserId,
    ]);
    return {
        id,
        fromUserId,
        toUserId,
        amount,
        reason,
        metadata,
        createdAt: new Date(createdAt),
    };
}
/**
 * Award credits to a user (from system)
 */
export async function awardCredits(userId, amount, reason, metadata) {
    const db = await getDatabase();
    // Create transaction record (from system)
    const id = generateId('credit');
    await db.run(`INSERT INTO knowledge_credits (id, from_user_id, to_user_id, amount, reason, metadata, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`, [id, 'system', userId, amount, reason, JSON.stringify(metadata || {}), Date.now()]);
    // Update balance
    await db.run('UPDATE users SET knowledge_credits = knowledge_credits + ? WHERE id = ?', [
        amount,
        userId,
    ]);
    // Get updated balance
    const user = await db.get('SELECT knowledge_credits FROM users WHERE id = ?', [userId]);
    return user?.knowledge_credits || 0;
}
/**
 * Get user's credit balance
 */
export async function getCreditBalance(userId) {
    const db = await getDatabase();
    const user = await db.get('SELECT knowledge_credits FROM users WHERE id = ?', [userId]);
    return user?.knowledge_credits || 0;
}
/**
 * Get credit transaction history
 */
export async function getCreditHistory(userId, limit = 50) {
    const db = await getDatabase();
    const transactions = await db.all(`SELECT * FROM knowledge_credits
     WHERE from_user_id = ? OR to_user_id = ?
     ORDER BY created_at DESC
     LIMIT ?`, [userId, userId, limit]);
    return transactions.map((tx) => ({
        id: tx.id,
        fromUserId: tx.from_user_id,
        toUserId: tx.to_user_id,
        amount: tx.amount,
        reason: tx.reason,
        metadata: tx.metadata ? JSON.parse(tx.metadata) : undefined,
        createdAt: new Date(tx.created_at),
    }));
}
/**
 * Get total credits earned
 */
export async function getTotalCreditsEarned(userId) {
    const db = await getDatabase();
    const result = await db.get('SELECT SUM(amount) as total FROM knowledge_credits WHERE to_user_id = ?', [userId]);
    return result?.total || 0;
}
/**
 * Get total credits spent
 */
export async function getTotalCreditsSpent(userId) {
    const db = await getDatabase();
    const result = await db.get('SELECT SUM(amount) as total FROM knowledge_credits WHERE from_user_id = ?', [userId]);
    return result?.total || 0;
}
