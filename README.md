# Vidyut Bandhu

**Offline-First AI Learning Platform for Rural Schools in India**

Vidyut Bandhu ("Friend of Lightning/Energy") is a complete open-source learning platform designed to work 100% offline after initial setup. It combines local AI inference, peer-to-peer sync, multi-language support, and gamification to empower students in rural areas with limited internet connectivity.

## Features

### Core Capabilities
- **100% Offline Operation** - Works without internet after first sync
- **Local AI Tutor** - 4-bit quantized Gemma-2B/Phi-3-mini running on-device
- **RAG Pipeline** - Semantic search over NCERT textbooks
- **Multi-Language** - Hindi, English, Tamil, Telugu, Bengali (speech + text)
- **P2P Sync** - Bluetooth & Wi-Fi Direct device-to-device sync
- **Gamification** - Points, badges, streaks, knowledge credits
- **Peer Tutoring** - Encrypted chat and micro-tutoring marketplace
- **Teacher Dashboard** - Mastery heatmaps and class analytics
- **Cross-Platform** - React PWA (web) + React Native (mobile) sharing 90% code
- **ESP32 Integration** - BLE-connected hardware for reminders

### Technical Stack

**Frontend:**
- React 18 + TypeScript
- Vite (web) + Expo (mobile)
- React Router for navigation
- Recharts for data visualization

**Data Layer:**
- SQLite (sql.js for web, expo-sqlite for mobile)
- Yjs CRDT for offline-first sync
- IndexedDB for persistence

**AI & ML:**
- llama.cpp WebAssembly (web)
- ONNX Runtime (mobile)
- ChromaDB-lite for vector search
- Vosk (speech-to-text)
- Piper (text-to-speech)

**Sync & P2P:**
- Bluetooth Low Energy
- Wi-Fi Direct (Android)
- End-to-end encryption

**Hardware:**
- ESP32 BLE firmware (Arduino)
- Vibration motor + LED + light sensor

## Project Structure

```
vidyut-bandhu/
├── apps/
│   ├── web/                    # React + Vite PWA
│   │   ├── src/
│   │   │   ├── pages/         # Dashboard, Learn, Chat, Profile
│   │   │   ├── components/    # Shared UI components
│   │   │   └── main.tsx       # Entry point
│   │   ├── vite.config.ts     # PWA configuration
│   │   └── package.json
│   │
│   ├── mobile/                 # React Native Expo app
│   │   ├── App.tsx            # Main app with navigation
│   │   ├── app.json           # Expo configuration
│   │   ├── src/screens/       # Mobile screens
│   │   └── package.json
│   │
│   └── admin/                  # Next.js Admin Portal
│       ├── app/               # Next.js app directory
│       ├── components/        # Admin UI components
│       ├── prisma/            # Database schema
│       ├── Dockerfile         # Docker configuration
│       ├── docker-compose.yml # Docker Compose setup
│       └── package.json
│
├── packages/
│   ├── shared/                 # Types, constants, utilities
│   ├── db/                     # SQLite schema & client
│   ├── sync/                   # Yjs CRDT sync logic
│   ├── ai/                     # AI inference (llama.cpp, ONNX)
│   ├── rag/                    # RAG pipeline (PDF, chunking, embeddings)
│   ├── speech/                 # Vosk STT + Piper TTS
│   ├── gamification/           # Points, badges, credits
│   └── p2p/                    # Bluetooth/Wi-Fi Direct sync
│
├── firmware/
│   └── esp32/                  # Arduino BLE firmware
│       ├── vidyut_bandhu.ino
│       └── README.md
│
├── data/
│   └── ncert-excerpts/         # Sample textbook content
│       ├── class6-math.txt
│       └── class6-science.txt
│
├── scripts/
│   ├── seed-db.ts              # Database seeding
│   └── process-textbooks.ts    # PDF processing pipeline
│
├── docs/
│   ├── ARCHITECTURE.md         # System architecture
│   ├── DEPLOYMENT.md           # Deployment guide
│   └── OFFLINE_STRATEGY.md     # Offline-first design
│
├── package.json                # Root workspace config
├── pnpm-workspace.yaml
└── README.md                   # This file
```

## Quick Start

### Prerequisites

- Node.js 18+ and pnpm 8+
- For mobile: Android Studio or Xcode
- For ESP32: Arduino IDE with ESP32 support

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/vidyut-bandhu.git
cd vidyut-bandhu

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Running the Web App

```bash
# Development mode
pnpm dev:web

# Production build
pnpm build:web

# Preview production build
cd apps/web && pnpm preview
```

The app will be available at `http://localhost:5173`

### Running the Mobile App

```bash
# Start Expo development server
cd apps/mobile && pnpm start

# Scan QR code with Expo Go app on your device
# Or run on emulator/simulator:

# Run on Android
cd apps/mobile && pnpm android

# Run on iOS (macOS only)
cd apps/mobile && pnpm ios
```

See [apps/mobile/README.md](apps/mobile/README.md) for detailed mobile app setup.

### Running the Admin Portal

```bash
# Development mode
cd apps/admin && pnpm dev

# Or with Docker
cd apps/admin && docker-compose up -d
```

The admin portal will be available at `http://localhost:3000`

See [apps/admin/README.md](apps/admin/README.md) for detailed admin portal setup and Docker deployment.

### Installing PWA

1. Open the web app in Chrome/Edge
2. Click the install icon in the address bar
3. The app will be installed and work offline

## AI Models Setup

The AI models are **not included** in this repository due to size. Download them separately:

### For Web (llama.cpp WebAssembly)

```bash
# Create models directory
mkdir -p apps/web/public/models

# Download Gemma-2B 4-bit GGUF model
wget https://huggingface.co/TheBloke/gemma-2b-it-GGUF/resolve/main/gemma-2b-it.Q4_K_M.gguf \
  -O apps/web/public/models/gemma-2b-it-q4_k_m.gguf
```

### For Mobile (ONNX Runtime)

```bash
# Create models directory
mkdir -p apps/mobile/assets/models

# Download Phi-3-mini 4-bit ONNX model
# Visit: https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-onnx
# Download the quantized INT4 version
```

### Speech Models

```bash
# Vosk models (download for each language)
# English: https://alphacephei.com/vosk/models/vosk-model-small-en-in-0.4.zip
# Hindi: https://alphacephei.com/vosk/models/vosk-model-small-hi-0.22.zip
# Tamil, Telugu, Bengali: Check Vosk website

# Piper TTS models
# Visit: https://github.com/rhasspy/piper/releases
```

## For Rural Schools - Deployment Guide

### Option 1: Raspberry Pi Server

1. **Hardware Needed:**
   - Raspberry Pi 4 (4GB+ RAM)
   - MicroSD card (32GB+)
   - Power supply
   - Optional: Battery backup

2. **Setup:**
   ```bash
   # Install Node.js on Raspberry Pi
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Clone and build
   git clone https://github.com/yourusername/vidyut-bandhu.git
   cd vidyut-bandhu
   npm install -g pnpm
   pnpm install
   pnpm build:web
   
   # Serve the app
   cd apps/web/dist
   python3 -m http.server 8080
   ```

3. **Access:**
   - Students connect to Pi's Wi-Fi hotspot
   - Open browser to `http://192.168.x.x:8080`
   - Install PWA for offline use

### Option 2: Android Tablets

1. Build the APK:
   ```bash
   cd apps/mobile
   npx expo build:android
   ```

2. Distribute APK to tablets via USB or local file sharing

3. Students install and use offline

### Option 3: Offline Content Distribution

1. **Initial Setup (with internet):**
   - Download all models and content
   - Seed database with NCERT textbooks
   - Build and test the app

2. **Distribution:**
   - Copy built app + models to USB drives
   - Distribute to schools
   - Students copy to their devices

3. **P2P Sync:**
   - Students sync progress via Bluetooth
   - No internet required after setup

## Development

### Adding New Content

```bash
# Process NCERT PDFs
pnpm process-textbooks

# Seed database
pnpm seed-db
```

### Running Tests

```bash
pnpm test
```

### Code Quality

```bash
# Lint
pnpm lint

# Format
pnpm format
```

## ESP32 Hardware Setup

See [firmware/esp32/README.md](firmware/esp32/README.md) for detailed instructions.

**Quick Summary:**
1. Flash the Arduino sketch to ESP32
2. Pair with mobile app via Bluetooth
3. Set reminder times in app
4. Device vibrates/blinks LED at study times

## Gamification System

### Points
- Quiz correct answer: 10 points
- First try bonus: +5 points
- Daily login: 5 points
- 7-day streak: 20 points bonus
- Content completion: 50 points
- Mastery achieved: 100 points

### Badges
- **First Steps** - Complete first lesson
- **Week Warrior** - 7-day streak
- **Math Master** - Master 10 math topics
- **Science Explorer** - Complete 20 science topics
- **Helpful Friend** - Help 5 peers
- **Point Collector** - Earn 1000 points

### Knowledge Credits
- Earn credits by helping peers
- Spend credits to get help from advanced students
- Creates a peer tutoring economy

## Supported Languages

- English
- हिंदी (Hindi)
- தமிழ் (Tamil)
- తెలుగు (Telugu)
- বাংলা (Bengali)

Both UI and voice support for all languages.

## Architecture

### Offline-First Design

1. **Data Layer:** SQLite for structured data, IndexedDB for blobs
2. **Sync Layer:** Yjs CRDT for conflict-free merging
3. **Network Layer:** Works offline, syncs when online
4. **P2P Layer:** Bluetooth/Wi-Fi Direct for device-to-device sync

### AI Pipeline

```
User Question
    ↓
RAG Retrieval (ChromaDB-lite)
    ↓
Context + Question → Prompt
    ↓
Local AI Model (Gemma/Phi-3)
    ↓
Response
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

- NCERT for public domain textbooks
- Vosk for offline speech recognition
- Piper for offline TTS
- llama.cpp for efficient inference
- The open-source community

## Support

- 📧 Email: support@vidyutbandhu.org
- 💬 Discord: [Join our community](https://discord.gg/vidyutbandhu)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/vidyut-bandhu/issues)

## Roadmap

- [ ] Support for more Indian languages (Kannada, Malayalam, Marathi)
- [ ] Offline video lessons
- [ ] Handwriting recognition for math problems
- [ ] Integration with government education portals
- [ ] Solar-powered ESP32 version
- [ ] Mesh networking for multi-device sync

---

**Built with love for rural education in India**

*"Empowering every student, everywhere, even offline"*
