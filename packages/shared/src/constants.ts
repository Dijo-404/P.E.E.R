// ============================================================================
// Constants for Vidyut Bandhu Platform
// ============================================================================

export const LANGUAGES = {
    en: { name: 'English', nativeName: 'English' },
    hi: { name: 'Hindi', nativeName: 'हिंदी' },
    ta: { name: 'Tamil', nativeName: 'தமிழ்' },
    te: { name: 'Telugu', nativeName: 'తెలుగు' },
    bn: { name: 'Bengali', nativeName: 'বাংলা' },
} as const;

export const SUBJECTS = {
    math: { name: 'Mathematics', icon: '' },
    science: { name: 'Science', icon: '' },
    english: { name: 'English', icon: '' },
    hindi: { name: 'Hindi', icon: '' },
    social_studies: { name: 'Social Studies', icon: '' },
} as const;

export const GRADES = [6, 7, 8, 9, 10] as const;

// Gamification Constants
export const POINTS = {
    QUIZ_CORRECT: 10,
    QUIZ_FIRST_TRY: 5,
    DAILY_LOGIN: 5,
    STREAK_BONUS: 20,
    CONTENT_COMPLETE: 50,
    MASTERY_ACHIEVED: 100,
    PEER_TUTORING: 30,
    HELPING_PEER: 15,
} as const;

export const BADGES = [
    {
        id: 'first_steps',
        name: 'First Steps',
        description: 'Complete your first lesson',
        icon: '',
        criteria: { type: 'custom' as const, threshold: 1 },
    },
    {
        id: 'math_master',
        name: 'Math Master',
        description: 'Achieve mastery in 10 math topics',
        icon: '',
        criteria: { type: 'mastery' as const, threshold: 10, subject: 'math' as const },
    },
    {
        id: 'science_explorer',
        name: 'Science Explorer',
        description: 'Complete 20 science experiments',
        icon: '',
        criteria: { type: 'mastery' as const, threshold: 20, subject: 'science' as const },
    },
    {
        id: 'helpful_friend',
        name: 'Helpful Friend',
        description: 'Help 5 peers with their doubts',
        icon: '',
        criteria: { type: 'peer_help' as const, threshold: 5 },
    },
    {
        id: 'week_warrior',
        name: 'Week Warrior',
        description: 'Maintain a 7-day learning streak',
        icon: '',
        criteria: { type: 'streak' as const, threshold: 7 },
    },
    {
        id: 'point_collector',
        name: 'Point Collector',
        description: 'Earn 1000 points',
        icon: '',
        criteria: { type: 'points' as const, threshold: 1000 },
    },
] as const;

// AI Model Constants
export const AI_MODELS = {
    WEB: {
        name: 'Gemma-2B-4bit',
        path: '/models/gemma-2b-it-q4_k_m.gguf',
        contextLength: 2048,
    },
    MOBILE: {
        name: 'Phi-3-mini-4bit',
        path: '/models/phi-3-mini-4k-instruct-q4.onnx',
        contextLength: 4096,
    },
} as const;

// Speech Model Constants
export const SPEECH_MODELS = {
    VOSK: {
        en: '/models/vosk-model-small-en-in-0.4',
        hi: '/models/vosk-model-small-hi-0.22',
        ta: '/models/vosk-model-small-ta-0.1',
        te: '/models/vosk-model-small-te-0.1',
        bn: '/models/vosk-model-small-bn-0.1',
    },
    PIPER: {
        en: '/models/piper/en_IN-medium.onnx',
        hi: '/models/piper/hi_IN-medium.onnx',
        ta: '/models/piper/ta_IN-medium.onnx',
        te: '/models/piper/te_IN-medium.onnx',
        bn: '/models/piper/bn_IN-medium.onnx',
    },
} as const;

// Sync Constants
export const SYNC_CONFIG = {
    BATCH_SIZE: 100,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // ms
    BLUETOOTH_MTU: 512, // bytes
    WIFI_DIRECT_CHUNK_SIZE: 8192, // bytes
} as const;

// Database Constants
export const DB_VERSION = 1;
export const DB_NAME = 'vidyut_bandhu.db';

// API Endpoints (for when internet is available)
export const API_ENDPOINTS = {
    SYNC: '/api/sync',
    CONTENT: '/api/content',
    USERS: '/api/users',
    ANALYTICS: '/api/analytics',
} as const;

// ESP32 Constants
export const ESP32_CONFIG = {
    SERVICE_UUID: '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
    CHARACTERISTIC_UUID: 'beb5483e-36e1-4688-b7f5-ea07361b26a8',
    REMINDER_TIMES_DEFAULT: ['08:00', '16:00', '20:00'],
    VIBRATION_DURATION: 500, // ms
    LED_BLINK_DURATION: 1000, // ms
} as const;
