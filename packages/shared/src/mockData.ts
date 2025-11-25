// Centralized mock data generators for P.E.E.R platform
// Provides realistic, consistent data for development and testing

import {
    generateIndianName,
    generateRollNumber,
    generateSchoolTimestamp,
    generateRealisticScore,
    generateCompletionPercentage,
    generatePhoneNumber,
    generateEmail,
    generateAttendancePercentage,
    generateStudyStreak,
    generatePoints,
    SeededRandom,
} from './utils/generators';

export interface MockStudent {
    id: string;
    name: string;
    email: string;
    rollNumber: string;
    class: string;
    section: string;
    gender: 'male' | 'female';
    phone: string;
    parentPhone: string;
    attendance: number;
    totalPoints: number;
    currentStreak: number;
    joinedDate: Date;
}

export interface MockCourse {
    id: string;
    title: string;
    subject: string;
    class: string;
    description: string;
    totalModules: number;
    completedModules: number;
    progress: number;
    lastAccessed: Date;
    estimatedHours: number;
}

export interface MockProgress {
    courseId: string;
    courseName: string;
    subject: string;
    progress: number;
    quizzesCompleted: number;
    quizzesTotal: number;
    averageScore: number;
    timeSpent: number; // in minutes
    lastActivity: Date;
}

export interface MockBadge {
    id: string;
    name: string;
    description: string;
    icon: string;
    earnedDate: Date | null;
    criteria: string;
    progress?: number;
}

export interface MockQuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
    subject: string;
    topic: string;
}

export interface MockCommunityPost {
    id: string;
    author: string;
    authorId: string;
    content: string;
    timestamp: Date;
    likes: number;
    replies: number;
    tags: string[];
}

export interface MockAssignment {
    id: string;
    title: string;
    subject: string;
    class: string;
    description: string;
    dueDate: Date;
    maxScore: number;
    submitted: boolean;
    score?: number;
    feedback?: string;
}

// NCERT-aligned subjects and topics
const SUBJECTS_BY_CLASS: Record<string, string[]> = {
    '6': ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
    '7': ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
    '8': ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
    '9': ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
    '10': ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
};

const COURSE_MODULES: Record<string, { title: string; estimatedHours: number }[]> = {
    Mathematics: [
        { title: 'Number Systems', estimatedHours: 12 },
        { title: 'Algebra', estimatedHours: 15 },
        { title: 'Geometry', estimatedHours: 14 },
        { title: 'Mensuration', estimatedHours: 10 },
        { title: 'Data Handling', estimatedHours: 8 },
    ],
    Science: [
        { title: 'Physics', estimatedHours: 16 },
        { title: 'Chemistry', estimatedHours: 14 },
        { title: 'Biology', estimatedHours: 12 },
        { title: 'Environmental Science', estimatedHours: 6 },
    ],
    'Social Science': [
        { title: 'History', estimatedHours: 10 },
        { title: 'Geography', estimatedHours: 10 },
        { title: 'Civics', estimatedHours: 8 },
        { title: 'Economics', estimatedHours: 8 },
    ],
    English: [
        { title: 'Reading Comprehension', estimatedHours: 12 },
        { title: 'Writing Skills', estimatedHours: 10 },
        { title: 'Grammar', estimatedHours: 8 },
        { title: 'Literature', estimatedHours: 10 },
    ],
    Hindi: [
        { title: 'पाठ्य पुस्तक', estimatedHours: 12 },
        { title: 'व्याकरण', estimatedHours: 10 },
        { title: 'लेखन कौशल', estimatedHours: 8 },
    ],
};

const BADGES: Omit<MockBadge, 'earnedDate' | 'progress'>[] = [
    { id: 'first-steps', name: 'First Steps', description: 'Complete your first lesson', icon: '🎯', criteria: 'Complete 1 lesson' },
    { id: 'week-warrior', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', criteria: '7-day streak' },
    { id: 'math-master', name: 'Math Master', description: 'Master 10 math topics', icon: '🧮', criteria: 'Complete 10 math topics' },
    { id: 'science-explorer', name: 'Science Explorer', description: 'Complete 20 science topics', icon: '🔬', criteria: 'Complete 20 science topics' },
    { id: 'helpful-friend', name: 'Helpful Friend', description: 'Help 5 peers', icon: '🤝', criteria: 'Help 5 students' },
    { id: 'point-collector', name: 'Point Collector', description: 'Earn 1000 points', icon: '⭐', criteria: 'Earn 1000 points' },
    { id: 'perfect-score', name: 'Perfect Score', description: 'Score 100% in a quiz', icon: '💯', criteria: 'Score 100% in any quiz' },
    { id: 'early-bird', name: 'Early Bird', description: 'Submit 5 assignments early', icon: '🌅', criteria: 'Submit 5 assignments before deadline' },
];

/**
 * Generate mock students
 */
export function generateMockStudents(count: number = 50): MockStudent[] {
    const students: MockStudent[] = [];
    const classes = ['6', '7', '8', '9', '10'];
    const sections = ['A', 'B', 'C'];

    for (let i = 0; i < count; i++) {
        const seed = 1000 + i;
        const rng = new SeededRandom(seed);
        const { firstName, lastName, gender } = generateIndianName(seed);
        const classNum = rng.choice(classes);
        const section = rng.choice(sections);
        const studentNum = rng.nextInt(1, 50);

        students.push({
            id: `student-${i + 1}`,
            name: `${firstName} ${lastName}`,
            email: generateEmail(firstName, lastName),
            rollNumber: generateRollNumber(parseInt(classNum), section, studentNum),
            class: classNum,
            section,
            gender,
            phone: generatePhoneNumber(seed),
            parentPhone: generatePhoneNumber(seed + 10000),
            attendance: generateAttendancePercentage(seed),
            totalPoints: generatePoints(rng.nextInt(30, 180), seed),
            currentStreak: generateStudyStreak(seed),
            joinedDate: generateSchoolTimestamp(rng.nextInt(30, 180), seed),
        });
    }

    return students;
}

/**
 * Generate mock courses for a student
 */
export function generateMockCourses(studentClass: string, studentId: string): MockCourse[] {
    const subjects = SUBJECTS_BY_CLASS[studentClass] || SUBJECTS_BY_CLASS['6'];
    const courses: MockCourse[] = [];
    const rng = new SeededRandom(studentId.charCodeAt(0));

    subjects.forEach((subject, idx) => {
        const modules = COURSE_MODULES[subject] || [];
        const totalModules = modules.length;
        const daysSinceStart = rng.nextInt(10, 90);
        const progress = generateCompletionPercentage(daysSinceStart, idx);
        const completedModules = Math.floor((progress / 100) * totalModules);
        const estimatedHours = modules.reduce((sum, m) => sum + m.estimatedHours, 0);

        courses.push({
            id: `course-${subject.toLowerCase().replace(/ /g, '-')}-${studentClass}`,
            title: `Class ${studentClass} ${subject}`,
            subject,
            class: studentClass,
            description: `NCERT-aligned ${subject} course for Class ${studentClass}`,
            totalModules,
            completedModules,
            progress,
            lastAccessed: generateSchoolTimestamp(rng.nextInt(0, 7), idx),
            estimatedHours,
        });
    });

    return courses;
}

/**
 * Generate mock progress data for a student
 */
export function generateMockProgress(courses: MockCourse[], studentId: string): MockProgress[] {
    const rng = new SeededRandom(studentId.charCodeAt(0));

    return courses.map((course, idx) => ({
        courseId: course.id,
        courseName: course.title,
        subject: course.subject,
        progress: course.progress,
        quizzesCompleted: Math.floor(course.progress / 10),
        quizzesTotal: 10,
        averageScore: generateRealisticScore(100, idx),
        timeSpent: Math.floor(course.estimatedHours * 60 * (course.progress / 100)) + rng.nextInt(-20, 20),
        lastActivity: course.lastAccessed,
    }));
}

/**
 * Generate mock badges for a student
 */
export function generateMockBadges(totalPoints: number, currentStreak: number, seed: number): MockBadge[] {
    const rng = new SeededRandom(seed);

    return BADGES.map(badge => {
        let earned = false;
        let progress = 0;

        // Determine if badge is earned based on criteria
        if (badge.id === 'first-steps ') {
            earned = true;
        } else if (badge.id === 'week-warrior') {
            earned = currentStreak >= 7;
            progress = Math.min(100, (currentStreak / 7) * 100);
        } else if (badge.id === 'point-collector') {
            earned = totalPoints >= 1000;
            progress = Math.min(100, (totalPoints / 1000) * 100);
        } else {
            // Random chance for other badges
            earned = rng.next() < 0.3;
            progress = earned ? 100 : rng.nextInt(10, 80);
        }

        return {
            ...badge,
            earnedDate: earned ? generateSchoolTimestamp(rng.nextInt(7, 60), seed) : null,
            progress: earned ? undefined : progress,
        };
    });
}

/**
 * Generate sample quiz questions
 */
export function generateMockQuizQuestions(subject: string, count: number = 10): MockQuizQuestion[] {
    const questions: MockQuizQuestion[] = [];
    const rng = new SeededRandom(subject.charCodeAt(0));

    for (let i = 0; i < count; i++) {
        questions.push({
            id: `q-${subject}-${i + 1}`,
            question: `Sample ${subject} question ${i + 1}`,
            options: [
                'Option A',
                'Option B',
                'Option C',
                'Option D',
            ],
            correctAnswer: rng.nextInt(0, 3),
            explanation: 'This is the correct answer because...',
            difficulty: rng.choice(['easy', 'medium', 'hard'] as const),
            subject,
            topic: `Topic ${rng.nextInt(1, 5)}`,
        });
    }

    return questions;
}

/**
 * Generate mock community posts
 */
export function generateMockCommunityPosts(students: MockStudent[], count: number = 20): MockCommunityPost[] {
    const posts: MockCommunityPost[] = [];
    const rng = new SeededRandom(12345);

    const sampleTopics = [
        "Need help with quadratic equations",
        "Anyone want to form a study group for science?",
        "Tips for memorizing history dates?",
        "Shared my notes on photosynthesis",
        "Question about Newton's laws of motion",
        "Hindi grammar resources?",
        "Math homework help needed",
        "Scored 95 on my chemistry test!",
        "Best way to prepare for boards?",
        "Anyone else struggling with geography?"
    ];

    for (let i = 0; i < count; i++) {
        const author = rng.choice(students);
        const topic = rng.choice(sampleTopics);

        posts.push({
            id: `post-${i + 1}`,
            author: author.name,
            authorId: author.id,
            content: topic,
            timestamp: generateSchoolTimestamp(rng.nextInt(0, 30), i),
            likes: rng.nextInt(0, 25),
            replies: rng.nextInt(0, 10),
            tags: [rng.choice(['Math', 'Science', 'English', 'Help', 'Notes', 'Study Group'])],
        });
    }

    return posts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

/**
 * Generate mock assignments
 */
export function generateMockAssignments(studentClass: string, count: number = 10): MockAssignment[] {
    const assignments: MockAssignment[] = [];
    const subjects = SUBJECTS_BY_CLASS[studentClass] || SUBJECTS_BY_CLASS['6'];
    const rng = new SeededRandom(studentClass.charCodeAt(0));

    for (let i = 0; i < count; i++) {
        const subject = rng.choice(subjects);
        const daysAgo = rng.nextInt(-7, 30); // Some future, some past
        const isSubmitted = daysAgo > 0 && rng.next() < 0.7;

        const assignment: MockAssignment = {
            id: `assignment-${i + 1}`,
            title: `${subject} Assignment ${i + 1}`,
            subject,
            class: studentClass,
            description: `Complete exercises from Chapter ${rng.nextInt(1, 10)}`,
            dueDate: generateSchoolTimestamp(daysAgo, i),
            maxScore: rng.choice([20, 25, 50, 100]),
            submitted: isSubmitted,
        };

        if (isSubmitted) {
            assignment.score = generateRealisticScore(assignment.maxScore, i);
            assignment.feedback = rng.next() < 0.5 ? 'Good work! Keep it up.' : undefined;
        }

        assignments.push(assignment);
    }

    return assignments.sort((a, b) => b.dueDate.getTime() - a.dueDate.getTime());
}

// Export a default mock data set for easy use
export const defaultMockData = {
    students: generateMockStudents(50),
    get currentStudent() {
        return this.students[0];
    },
    get currentStudentCourses() {
        return generateMockCourses(this.currentStudent.class, this.currentStudent.id);
    },
    get currentStudentProgress() {
        return generateMockProgress(this.currentStudentCourses, this.currentStudent.id);
    },
    get currentStudentBadges() {
        return generateMockBadges(
            this.currentStudent.totalPoints,
            this.currentStudent.currentStreak,
            1
        );
    },
    get currentStudentAssignments() {
        return generateMockAssignments(this.currentStudent.class, 10);
    },
    get communityPosts() {
        return generateMockCommunityPosts(this.students, 20);
    },
};
