-- ============================================================================
-- P.E.E.R SQLite Schema
-- Offline-first database for web and mobile
-- ============================================================================

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('student', 'teacher', 'admin')),
  grade INTEGER,
  section TEXT,
  school_id TEXT,
  language TEXT NOT NULL DEFAULT 'en',
  points INTEGER DEFAULT 0,
  knowledge_credits INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL,
  last_sync_at INTEGER,
  updated_at INTEGER NOT NULL
);

CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_school ON users(school_id);

-- Content Table
CREATE TABLE IF NOT EXISTS content (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL CHECK(subject IN ('math', 'science', 'english', 'hindi', 'social_studies')),
  grade INTEGER NOT NULL,
  chapter INTEGER NOT NULL,
  section TEXT NOT NULL,
  content TEXT NOT NULL,
  embeddings BLOB, -- Quantized embeddings for RAG
  language TEXT NOT NULL DEFAULT 'en',
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX idx_content_subject_grade ON content(subject, grade);
CREATE INDEX idx_content_chapter ON content(chapter);

-- Questions Table
CREATE TABLE IF NOT EXISTS questions (
  id TEXT PRIMARY KEY,
  content_id TEXT NOT NULL,
  question TEXT NOT NULL,
  options TEXT, -- JSON array for MCQ
  correct_answer TEXT NOT NULL,
  explanation TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK(difficulty IN ('easy', 'medium', 'hard')),
  points INTEGER NOT NULL DEFAULT 10,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE
);

CREATE INDEX idx_questions_content ON questions(content_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);

-- Learning Progress Table
CREATE TABLE IF NOT EXISTS learning_progress (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  content_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('not_started', 'in_progress', 'completed', 'mastered')),
  time_spent INTEGER DEFAULT 0,
  attempts_count INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  total_questions INTEGER DEFAULT 0,
  mastery_score INTEGER DEFAULT 0,
  last_accessed_at INTEGER NOT NULL,
  completed_at INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE,
  UNIQUE(user_id, content_id)
);

CREATE INDEX idx_progress_user ON learning_progress(user_id);
CREATE INDEX idx_progress_status ON learning_progress(status);
CREATE INDEX idx_progress_mastery ON learning_progress(mastery_score);

-- Quiz Attempts Table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  answer TEXT NOT NULL,
  is_correct INTEGER NOT NULL,
  time_spent INTEGER NOT NULL,
  attempted_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

CREATE INDEX idx_attempts_user ON quiz_attempts(user_id);
CREATE INDEX idx_attempts_question ON quiz_attempts(question_id);

-- Badges Table
CREATE TABLE IF NOT EXISTS badges (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  criteria_type TEXT NOT NULL,
  criteria_threshold INTEGER NOT NULL,
  criteria_subject TEXT,
  created_at INTEGER NOT NULL
);

-- User Badges (earned badges)
CREATE TABLE IF NOT EXISTS user_badges (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  badge_id TEXT NOT NULL,
  earned_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE,
  UNIQUE(user_id, badge_id)
);

CREATE INDEX idx_user_badges_user ON user_badges(user_id);

-- Knowledge Credits Ledger
CREATE TABLE IF NOT EXISTS knowledge_credits (
  id TEXT PRIMARY KEY,
  from_user_id TEXT NOT NULL,
  to_user_id TEXT NOT NULL,
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  metadata TEXT, -- JSON
  created_at INTEGER NOT NULL,
  FOREIGN KEY (from_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (to_user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_credits_from ON knowledge_credits(from_user_id);
CREATE INDEX idx_credits_to ON knowledge_credits(to_user_id);

-- Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY,
  from_user_id TEXT NOT NULL,
  to_user_id TEXT NOT NULL,
  message TEXT NOT NULL,
  encrypted INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL CHECK(type IN ('text', 'voice', 'image')),
  metadata TEXT, -- JSON
  sent_at INTEGER NOT NULL,
  delivered_at INTEGER,
  read_at INTEGER,
  FOREIGN KEY (from_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (to_user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_messages_from ON chat_messages(from_user_id);
CREATE INDEX idx_messages_to ON chat_messages(to_user_id);
CREATE INDEX idx_messages_sent ON chat_messages(sent_at);

-- Tutoring Sessions Table
CREATE TABLE IF NOT EXISTS tutoring_sessions (
  id TEXT PRIMARY KEY,
  tutor_id TEXT NOT NULL,
  student_id TEXT NOT NULL,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('requested', 'active', 'completed', 'cancelled')),
  credits_offered INTEGER NOT NULL,
  started_at INTEGER,
  ended_at INTEGER,
  rating INTEGER,
  feedback TEXT,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (tutor_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_sessions_tutor ON tutoring_sessions(tutor_id);
CREATE INDEX idx_sessions_student ON tutoring_sessions(student_id);
CREATE INDEX idx_sessions_status ON tutoring_sessions(status);

-- AI Conversations Table
CREATE TABLE IF NOT EXISTS ai_conversations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  messages TEXT NOT NULL, -- JSON array
  context TEXT, -- Retrieved RAG context
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_conversations_user ON ai_conversations(user_id);

-- RAG Chunks Table (for vector search)
CREATE TABLE IF NOT EXISTS rag_chunks (
  id TEXT PRIMARY KEY,
  content_id TEXT NOT NULL,
  text TEXT NOT NULL,
  embeddings BLOB NOT NULL, -- Quantized embeddings
  subject TEXT NOT NULL,
  grade INTEGER NOT NULL,
  chapter INTEGER NOT NULL,
  page INTEGER,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (content_id) REFERENCES content(id) ON DELETE CASCADE
);

CREATE INDEX idx_rag_subject_grade ON rag_chunks(subject, grade);
CREATE INDEX idx_rag_chapter ON rag_chunks(chapter);

-- Sync Logs Table
CREATE TABLE IF NOT EXISTS sync_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  device_id TEXT NOT NULL,
  sync_type TEXT NOT NULL CHECK(sync_type IN ('bluetooth', 'wifi_direct', 'internet')),
  data_types TEXT NOT NULL, -- JSON array
  records_count INTEGER NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('pending', 'in_progress', 'completed', 'failed')),
  started_at INTEGER NOT NULL,
  completed_at INTEGER,
  error TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_sync_user ON sync_logs(user_id);
CREATE INDEX idx_sync_device ON sync_logs(device_id);
CREATE INDEX idx_sync_status ON sync_logs(status);

-- Devices Table
CREATE TABLE IF NOT EXISTS devices (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('web', 'android', 'ios')),
  last_seen_at INTEGER NOT NULL,
  public_key TEXT, -- For E2E encryption
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_devices_user ON devices(user_id);

-- ESP32 Devices Table
CREATE TABLE IF NOT EXISTS esp32_devices (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  mac_address TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  is_paired INTEGER NOT NULL DEFAULT 0,
  battery_level INTEGER,
  last_sync_at INTEGER,
  reminder_enabled INTEGER NOT NULL DEFAULT 1,
  reminder_times TEXT NOT NULL, -- JSON array of HH:MM strings
  vibration_intensity INTEGER NOT NULL DEFAULT 50,
  led_brightness INTEGER NOT NULL DEFAULT 50,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_esp32_user ON esp32_devices(user_id);
CREATE INDEX idx_esp32_mac ON esp32_devices(mac_address);

-- ESP32 Sensor Data Table
CREATE TABLE IF NOT EXISTS esp32_sensor_data (
  id TEXT PRIMARY KEY,
  device_id TEXT NOT NULL,
  light_level INTEGER NOT NULL,
  timestamp INTEGER NOT NULL,
  FOREIGN KEY (device_id) REFERENCES esp32_devices(id) ON DELETE CASCADE
);

CREATE INDEX idx_sensor_device ON esp32_sensor_data(device_id);
CREATE INDEX idx_sensor_timestamp ON esp32_sensor_data(timestamp);

-- Yjs CRDT Documents (for collaborative editing)
CREATE TABLE IF NOT EXISTS yjs_documents (
  id TEXT PRIMARY KEY,
  doc_name TEXT NOT NULL UNIQUE,
  state_vector BLOB NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX idx_yjs_doc_name ON yjs_documents(doc_name);
