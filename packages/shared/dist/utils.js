// ============================================================================
// Utility Functions
// ============================================================================
/**
 * Generate a unique ID using timestamp and random string
 */
export function generateId(prefix = '') {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 9);
    return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
}
/**
 * Calculate mastery score based on performance
 */
export function calculateMasteryScore(correctAnswers, totalQuestions, timeSpent, avgTimePerQuestion) {
    if (totalQuestions === 0)
        return 0;
    const accuracy = (correctAnswers / totalQuestions) * 100;
    const speedFactor = Math.min(avgTimePerQuestion / (timeSpent / totalQuestions), 1.5);
    const masteryScore = Math.min(accuracy * speedFactor, 100);
    return Math.round(masteryScore);
}
/**
 * Format time in seconds to human-readable format
 */
export function formatTime(seconds) {
    if (seconds < 60)
        return `${seconds}s`;
    if (seconds < 3600)
        return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
}
/**
 * Check if a date is today
 */
export function isToday(date) {
    const today = new Date();
    return (date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear());
}
/**
 * Calculate streak days
 */
export function calculateStreak(dates) {
    if (dates.length === 0)
        return 0;
    const sortedDates = dates.sort((a, b) => b.getTime() - a.getTime());
    let streak = 1;
    let currentDate = new Date(sortedDates[0]);
    for (let i = 1; i < sortedDates.length; i++) {
        const prevDate = new Date(currentDate);
        prevDate.setDate(prevDate.getDate() - 1);
        const checkDate = new Date(sortedDates[i]);
        if (checkDate.getDate() === prevDate.getDate() &&
            checkDate.getMonth() === prevDate.getMonth() &&
            checkDate.getFullYear() === prevDate.getFullYear()) {
            streak++;
            currentDate = checkDate;
        }
        else {
            break;
        }
    }
    return streak;
}
/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input) {
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}
/**
 * Deep clone an object
 */
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
/**
 * Debounce function
 */
export function debounce(func, wait) {
    let timeout = null;
    return (...args) => {
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
/**
 * Throttle function
 */
export function throttle(func, limit) {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
/**
 * Retry async function with exponential backoff
 */
export async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        }
        catch (error) {
            if (i === maxRetries - 1)
                throw error;
            const delay = baseDelay * Math.pow(2, i);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
    throw new Error('Max retries exceeded');
}
/**
 * Check if device is online
 */
export function isOnline() {
    return typeof navigator !== 'undefined' && navigator.onLine;
}
/**
 * Get device type
 */
export function getDeviceType() {
    if (typeof navigator === 'undefined')
        return 'web';
    const userAgent = navigator.userAgent.toLowerCase();
    if (/android/.test(userAgent))
        return 'android';
    if (/iphone|ipad|ipod/.test(userAgent))
        return 'ios';
    return 'web';
}
