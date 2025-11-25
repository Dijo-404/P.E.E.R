/**
 * Generate a unique ID using timestamp and random string
 */
export declare function generateId(prefix?: string): string;
/**
 * Calculate mastery score based on performance
 */
export declare function calculateMasteryScore(correctAnswers: number, totalQuestions: number, timeSpent: number, avgTimePerQuestion: number): number;
/**
 * Format time in seconds to human-readable format
 */
export declare function formatTime(seconds: number): string;
/**
 * Check if a date is today
 */
export declare function isToday(date: Date): boolean;
/**
 * Calculate streak days
 */
export declare function calculateStreak(dates: Date[]): number;
/**
 * Sanitize user input to prevent XSS
 */
export declare function sanitizeInput(input: string): string;
/**
 * Deep clone an object
 */
export declare function deepClone<T>(obj: T): T;
/**
 * Debounce function
 */
export declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void;
/**
 * Throttle function
 */
export declare function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void;
/**
 * Retry async function with exponential backoff
 */
export declare function retryWithBackoff<T>(fn: () => Promise<T>, maxRetries?: number, baseDelay?: number): Promise<T>;
/**
 * Check if device is online
 */
export declare function isOnline(): boolean;
/**
 * Get device type
 */
export declare function getDeviceType(): 'web' | 'android' | 'ios';
