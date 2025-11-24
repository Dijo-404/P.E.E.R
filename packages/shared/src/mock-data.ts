import {
    User,
    Course,
    Activity,
    Badge,
    Tutor,
    ChatMessage
} from './types';

export const MOCK_USERS: User[] = [
    {
        id: 'user-1',
        name: 'Rohan Kumar',
        role: 'student',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
        points: 1250,
        streak: 12,
        level: 5,
        masteryScore: 78,
        completedLessons: 24,
        language: 'hi', // Hindi
        preferences: {
            language: 'hi', // Hindi
            notifications: true,
            offlineMode: false
        }
    },
    {
        id: 'user-2',
        name: 'Test Student',
        role: 'student',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Test',
        points: 500,
        streak: 3,
        level: 2,
        masteryScore: 60,
        completedLessons: 10,
        language: 'en', // English
        preferences: {
            language: 'en', // English
            notifications: true,
            offlineMode: true
        }
    }
];

export const MOCK_USER = MOCK_USERS[0];

export const MOCK_COURSES: Course[] = [
    {
        id: 'math-101',
        title: 'Mathematics - Class 10',
        description: 'NCERT based comprehensive math course covering Algebra, Geometry, and Trigonometry.',
        thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
        progress: 65,
        totalLessons: 40,
        completedLessons: 26,
        tags: ['Math', 'NCERT', 'Class 10']
    },
    {
        id: 'sci-101',
        title: 'Science - Class 10',
        description: 'Physics, Chemistry, and Biology fundamentals explained with real-world examples.',
        thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
        progress: 42,
        totalLessons: 35,
        completedLessons: 15,
        tags: ['Science', 'Physics', 'Chemistry']
    },
    {
        id: 'hist-101',
        title: 'History - India & World',
        description: 'Explore the rich history of India and significant world events.',
        thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&q=80',
        progress: 10,
        totalLessons: 20,
        completedLessons: 2,
        tags: ['History', 'Social Science']
    }
];

export const MOCK_ACTIVITIES: Activity[] = [
    {
        id: 'act-1',
        title: 'Quadratic Equations Quiz',
        type: 'quiz',
        subject: 'Mathematics',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        score: 85,
        maxScore: 100,
        status: 'completed'
    },
    {
        id: 'act-2',
        title: 'Light: Reflection & Refraction',
        type: 'lesson',
        subject: 'Science',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        progress: 100,
        status: 'completed'
    },
    {
        id: 'act-3',
        title: 'Nationalism in India',
        type: 'reading',
        subject: 'History',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
        progress: 45,
        status: 'in-progress'
    }
];

export const MOCK_BADGES: Badge[] = [
    {
        id: 'badge-1',
        name: 'Early Bird',
        description: 'Completed a lesson before 8 AM',
        icon: 'sunrise',
        earnedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        category: 'engagement'
    },
    {
        id: 'badge-2',
        name: 'Math Whiz',
        description: 'Scored 100% in 3 Math quizzes',
        icon: 'calculator',
        earnedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        category: 'achievement'
    },
    {
        id: 'badge-3',
        name: 'Streak Master',
        description: 'Maintained a 7-day learning streak',
        icon: 'flame',
        earnedAt: null, // Not earned yet
        progress: 5,
        totalRequired: 7,
        category: 'consistency'
    }
];

export const MOCK_TUTORS: Tutor[] = [
    {
        id: 'tutor-1',
        name: 'Priya Sharma',
        specialty: 'Mathematics',
        rating: 4.8,
        reviews: 124,
        isOnline: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya'
    },
    {
        id: 'tutor-2',
        name: 'Rahul Verma',
        specialty: 'Science',
        rating: 4.5,
        reviews: 89,
        isOnline: false,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul'
    }
];

export const MOCK_CHAT_HISTORY: ChatMessage[] = [
    {
        id: 'msg-1',
        senderId: 'ai-assistant',
        text: 'Hello Rohan! How can I help you with your studies today?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        isAi: true
    },
    {
        id: 'msg-2',
        senderId: 'user-1',
        text: 'Can you explain Newton\'s Third Law?',
        timestamp: new Date(Date.now() - 1000 * 60 * 29).toISOString(),
        isAi: false
    },
    {
        id: 'msg-3',
        senderId: 'ai-assistant',
        text: 'Certainly! Newton\'s Third Law states that for every action, there is an equal and opposite reaction. This means that in every interaction, there is a pair of forces acting on the two interacting objects.',
        timestamp: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
        isAi: true
    }
];

export const MOCK_CLASS_ANALYTICS = {
    grade: 8,
    section: 'A',
    totalStudents: 35,
    activeStudents: 28,
    avgMastery: 68,
    topPerformers: [
        { name: 'Rahul Kumar', points: 850, mastery: 92 },
        { name: 'Priya Sharma', points: 780, mastery: 88 },
        { name: 'Amit Patel', points: 720, mastery: 85 },
    ],
    needsAttention: [
        { name: 'Student A', points: 120, mastery: 45 },
        { name: 'Student B', points: 95, mastery: 38 },
    ]
};
