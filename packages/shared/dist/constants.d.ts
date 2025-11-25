export declare const LANGUAGES: {
    readonly en: {
        readonly name: "English";
        readonly nativeName: "English";
    };
    readonly hi: {
        readonly name: "Hindi";
        readonly nativeName: "हिंदी";
    };
    readonly ta: {
        readonly name: "Tamil";
        readonly nativeName: "தமிழ்";
    };
    readonly te: {
        readonly name: "Telugu";
        readonly nativeName: "తెలుగు";
    };
    readonly bn: {
        readonly name: "Bengali";
        readonly nativeName: "বাংলা";
    };
};
export declare const SUBJECTS: {
    readonly math: {
        readonly name: "Mathematics";
        readonly icon: "";
    };
    readonly science: {
        readonly name: "Science";
        readonly icon: "";
    };
    readonly english: {
        readonly name: "English";
        readonly icon: "";
    };
    readonly hindi: {
        readonly name: "Hindi";
        readonly icon: "";
    };
    readonly social_studies: {
        readonly name: "Social Studies";
        readonly icon: "";
    };
};
export declare const GRADES: readonly [6, 7, 8, 9, 10];
export declare const POINTS: {
    readonly QUIZ_CORRECT: 10;
    readonly QUIZ_FIRST_TRY: 5;
    readonly DAILY_LOGIN: 5;
    readonly STREAK_BONUS: 20;
    readonly CONTENT_COMPLETE: 50;
    readonly MASTERY_ACHIEVED: 100;
    readonly PEER_TUTORING: 30;
    readonly HELPING_PEER: 15;
};
export declare const BADGES: readonly [{
    readonly id: "first_steps";
    readonly name: "First Steps";
    readonly description: "Complete your first lesson";
    readonly icon: "";
    readonly criteria: {
        readonly type: "custom";
        readonly threshold: 1;
    };
}, {
    readonly id: "math_master";
    readonly name: "Math Master";
    readonly description: "Achieve mastery in 10 math topics";
    readonly icon: "";
    readonly criteria: {
        readonly type: "mastery";
        readonly threshold: 10;
        readonly subject: "math";
    };
}, {
    readonly id: "science_explorer";
    readonly name: "Science Explorer";
    readonly description: "Complete 20 science experiments";
    readonly icon: "";
    readonly criteria: {
        readonly type: "mastery";
        readonly threshold: 20;
        readonly subject: "science";
    };
}, {
    readonly id: "helpful_friend";
    readonly name: "Helpful Friend";
    readonly description: "Help 5 peers with their doubts";
    readonly icon: "";
    readonly criteria: {
        readonly type: "peer_help";
        readonly threshold: 5;
    };
}, {
    readonly id: "week_warrior";
    readonly name: "Week Warrior";
    readonly description: "Maintain a 7-day learning streak";
    readonly icon: "";
    readonly criteria: {
        readonly type: "streak";
        readonly threshold: 7;
    };
}, {
    readonly id: "point_collector";
    readonly name: "Point Collector";
    readonly description: "Earn 1000 points";
    readonly icon: "";
    readonly criteria: {
        readonly type: "points";
        readonly threshold: 1000;
    };
}];
export declare const AI_MODELS: {
    readonly WEB: {
        readonly name: "Gemma-2B-4bit";
        readonly path: "/models/gemma-2b-it-q4_k_m.gguf";
        readonly contextLength: 2048;
    };
    readonly MOBILE: {
        readonly name: "Phi-3-mini-4bit";
        readonly path: "/models/phi-3-mini-4k-instruct-q4.onnx";
        readonly contextLength: 4096;
    };
};
export declare const SPEECH_MODELS: {
    readonly VOSK: {
        readonly en: "/models/vosk-model-small-en-in-0.4";
        readonly hi: "/models/vosk-model-small-hi-0.22";
        readonly ta: "/models/vosk-model-small-ta-0.1";
        readonly te: "/models/vosk-model-small-te-0.1";
        readonly bn: "/models/vosk-model-small-bn-0.1";
    };
    readonly PIPER: {
        readonly en: "/models/piper/en_IN-medium.onnx";
        readonly hi: "/models/piper/hi_IN-medium.onnx";
        readonly ta: "/models/piper/ta_IN-medium.onnx";
        readonly te: "/models/piper/te_IN-medium.onnx";
        readonly bn: "/models/piper/bn_IN-medium.onnx";
    };
};
export declare const SYNC_CONFIG: {
    readonly BATCH_SIZE: 100;
    readonly RETRY_ATTEMPTS: 3;
    readonly RETRY_DELAY: 1000;
    readonly BLUETOOTH_MTU: 512;
    readonly WIFI_DIRECT_CHUNK_SIZE: 8192;
};
export declare const DB_VERSION = 1;
export declare const DB_NAME = "peer_learning.db";
export declare const API_ENDPOINTS: {
    readonly SYNC: "/api/sync";
    readonly CONTENT: "/api/content";
    readonly USERS: "/api/users";
    readonly ANALYTICS: "/api/analytics";
};
export declare const ESP32_CONFIG: {
    readonly SERVICE_UUID: "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
    readonly CHARACTERISTIC_UUID: "beb5483e-36e1-4688-b7f5-ea07361b26a8";
    readonly REMINDER_TIMES_DEFAULT: readonly ["08:00", "16:00", "20:00"];
    readonly VIBRATION_DURATION: 500;
    readonly LED_BLINK_DURATION: 1000;
};
