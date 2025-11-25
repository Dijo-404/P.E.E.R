/**
 * Seeded random number generator for consistent results
 */
export declare class SeededRandom {
    private seed;
    constructor(seed?: number);
    next(): number;
    nextInt(min: number, max: number): number;
    choice<T>(array: T[]): T;
    shuffle<T>(array: T[]): T[];
}
/**
 * Generate a realistic Indian name
 */
export declare function generateIndianName(seed?: number): {
    firstName: string;
    lastName: string;
    gender: 'male' | 'female';
};
/**
 * Generate a realistic roll number (format: 2024-CLASS-SECTION-XXX)
 */
export declare function generateRollNumber(classNum: number, section: string, studentNum: number): string;
/**
 * Generate realistic timestamp during school hours (9 AM - 4 PM, weekdays)
 */
export declare function generateSchoolTimestamp(daysAgo?: number, seed?: number): Date;
/**
 * Generate realistic score following normal distribution
 * Mean: 65, Std Dev: 15
 */
export declare function generateRealisticScore(maxScore?: number, seed?: number): number;
/**
 * Generate realistic completion percentage (follows learning curve)
 */
export declare function generateCompletionPercentage(daysSinceStart: number, seed?: number): number;
/**
 * Generate realistic phone number (Indian format)
 */
export declare function generatePhoneNumber(seed?: number): string;
/**
 * Generate realistic email address
 */
export declare function generateEmail(firstName: string, lastName: string, domain?: string): string;
/**
 * Generate realistic attendance percentage
 */
export declare function generateAttendancePercentage(seed?: number): number;
/**
 * Generate realistic dates within a range
 */
export declare function generateDateRange(startDaysAgo: number, endDaysAgo: number): Date[];
/**
 * Generate realistic study streak (max 30 days)
 */
export declare function generateStudyStreak(seed?: number): number;
/**
 * Generate realistic points (based on activity level)
 */
export declare function generatePoints(daysSinceJoin: number, seed?: number): number;
