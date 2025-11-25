// Utility functions for generating realistic mock data
// All functions use pseudo-random generation with realistic patterns
import { subDays, setHours, setMinutes } from 'date-fns';
// Indian first names by gender
const MALE_FIRST_NAMES = [
    'Aarav', 'Arjun', 'Aditya', 'Vihaan', 'Reyansh', 'Mohammed', 'Sai', 'Vivaan',
    'Ayaan', 'Krishna', 'Ishaan', 'Shaurya', 'Atharv', 'Pranav', 'Aarush',
    'Arnav', 'Kabir', 'Rudra', 'Advait', 'Aadhya', 'Dhruv', 'Ansh', 'Yuvraj',
    'Karthik', 'Rohan', 'Aakash', 'Siddharth', 'Ravi', 'Vikram', 'Arun'
];
const FEMALE_FIRST_NAMES = [
    'Aadhya', 'Saanvi', 'Sara', 'Aaradhya', 'Pari', 'Ananya', 'Diya', 'Aanya',
    'Isha', 'Navya', 'Riya', 'Kiara', 'Myra', 'Prisha', 'Aditi', 'Anika',
    'Kavya', 'Pari', 'Shanaya', 'Avni', 'Priya', 'Neha', 'Divya', 'Sneha',
    'Pooja', 'Anjali', 'Meera', 'Lakshmi', 'Kaveri', 'Radha'
];
const LAST_NAMES = [
    'Sharma', 'Verma', 'Patel', 'Kumar', 'Singh', 'Das', 'Jain', 'Gupta',
    'Reddy', 'Nair', 'Rao', 'Krishna', 'Iyer', 'Menon', 'Pillai', 'Agarwal',
    'Desai', 'Shah', 'Mehta', 'Kapoor', 'Malhotra', 'Chopra', 'Bansal',
    'Joshi', 'Mishra', 'Pandey', 'Sinha', 'Khan', 'Ahmed', 'Ali'
];
/**
 * Seeded random number generator for consistent results
 */
export class SeededRandom {
    constructor(seed = Date.now()) {
        Object.defineProperty(this, "seed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.seed = seed;
    }
    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }
    nextInt(min, max) {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }
    choice(array) {
        return array[this.nextInt(0, array.length - 1)];
    }
    shuffle(array) {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = this.nextInt(0, i);
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }
}
/**
 * Generate a realistic Indian name
 */
export function generateIndianName(seed) {
    const rng = new SeededRandom(seed);
    const gender = rng.next() > 0.5 ? 'male' : 'female';
    const firstName = gender === 'male'
        ? rng.choice(MALE_FIRST_NAMES)
        : rng.choice(FEMALE_FIRST_NAMES);
    const lastName = rng.choice(LAST_NAMES);
    return { firstName, lastName, gender };
}
/**
 * Generate a realistic roll number (format: 2024-CLASS-SECTION-XXX)
 */
export function generateRollNumber(classNum, section, studentNum) {
    const year = new Date().getFullYear();
    const paddedNum = studentNum.toString().padStart(3, '0');
    return `${year}-${classNum}-${section}-${paddedNum}`;
}
/**
 * Generate realistic timestamp during school hours (9 AM - 4 PM, weekdays)
 */
export function generateSchoolTimestamp(daysAgo = 0, seed) {
    const rng = new SeededRandom(seed);
    const date = subDays(new Date(), daysAgo);
    // Ensure weekday
    while (date.getDay() === 0 || date.getDay() === 6) {
        date.setDate(date.getDate() - 1);
    }
    // Set random time between 9 AM and 4 PM
    const hour = rng.nextInt(9, 16);
    const minute = rng.nextInt(0, 59);
    return setMinutes(setHours(date, hour), minute);
}
/**
 * Generate realistic score following normal distribution
 * Mean: 65, Std Dev: 15
 */
export function generateRealisticScore(maxScore = 100, seed) {
    const rng = new SeededRandom(seed);
    // Box-Muller transform for normal distribution
    const u1 = rng.next();
    const u2 = rng.next();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    // Mean 65, Std Dev 15
    const score = 65 + z0 * 15;
    // Clamp between 0 and maxScore
    return Math.max(0, Math.min(maxScore, Math.round(score)));
}
/**
 * Generate realistic completion percentage (follows learning curve)
 */
export function generateCompletionPercentage(daysSinceStart, seed) {
    const rng = new SeededRandom(seed);
    // Learning curve: fast at first, slows down
    const baseProgress = Math.min(100, (daysSinceStart / 90) * 100);
    const curve = Math.log(daysSinceStart + 1) / Math.log(91) * 100;
    const average = (baseProgress + curve) / 2;
    // Add some randomness (-10 to +10)
    const randomness = rng.nextInt(-10, 10);
    return Math.max(0, Math.min(100, Math.round(average + randomness)));
}
/**
 * Generate realistic phone number (Indian format)
 */
export function generatePhoneNumber(seed) {
    const rng = new SeededRandom(seed);
    const prefix = rng.choice(['98', '99', '97', '96', '95', '94', '93', '92', '91', '90']);
    const rest = rng.nextInt(10000000, 99999999);
    return `+91 ${prefix}${rest}`;
}
/**
 * Generate realistic email address
 */
export function generateEmail(firstName, lastName, domain = 'student.vidyut.org') {
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
}
/**
 * Generate realistic attendance percentage
 */
export function generateAttendancePercentage(seed) {
    const rng = new SeededRandom(seed);
    // Most students have 70-95% attendance
    const base = rng.nextInt(70, 95);
    const variance = rng.nextInt(-5, 5);
    return Math.max(0, Math.min(100, base + variance));
}
/**
 * Generate realistic dates within a range
 */
export function generateDateRange(startDaysAgo, endDaysAgo) {
    const dates = [];
    for (let i = startDaysAgo; i >= endDaysAgo; i--) {
        dates.push(subDays(new Date(), i));
    }
    return dates;
}
/**
 * Generate realistic study streak (max 30 days)
 */
export function generateStudyStreak(seed) {
    const rng = new SeededRandom(seed);
    // 20% chance of having a good streak (7-30 days)
    if (rng.next() < 0.2) {
        return rng.nextInt(7, 30);
    }
    // 80% chance of having a normal streak (1-7 days)
    return rng.nextInt(1, 7);
}
/**
 * Generate realistic points (based on activity level)
 */
export function generatePoints(daysSinceJoin, seed) {
    const rng = new SeededRandom(seed);
    // Average 50-100 points per day with variance
    const basePoints = daysSinceJoin * rng.nextInt(50, 100);
    const variance = rng.nextInt(-20, 20) / 100;
    return Math.round(basePoints * (1 + variance));
}
