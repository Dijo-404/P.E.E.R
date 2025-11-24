#!/bin/bash

# P.E.E.R Model Downloader Script

echo "Starting P.E.E.R Model Download..."

# 1. Web Models (llama.cpp WebAssembly)
echo "------------------------------------------------"
echo "Setting up Web Models..."
mkdir -p apps/web/public/models

# Gemma-2B 4-bit GGUF
if [ ! -f "apps/web/public/models/gemma-2b-it-q4_k_m.gguf" ]; then
    echo "Downloading Gemma-2B (Web)..."
    wget -q --show-progress https://huggingface.co/TheBloke/gemma-2b-it-GGUF/resolve/main/gemma-2b-it.Q4_K_M.gguf -O apps/web/public/models/gemma-2b-it-q4_k_m.gguf
else
    echo "Gemma-2B already exists. Skipping."
fi

# 2. Speech Models (Vosk)
echo "------------------------------------------------"
echo "Setting up Speech Models..."
mkdir -p packages/speech/models

# English Model
if [ ! -d "packages/speech/models/vosk-model-small-en-in-0.4" ]; then
    echo "Downloading Vosk Model (English)..."
    wget -q --show-progress https://alphacephei.com/vosk/models/vosk-model-small-en-in-0.4.zip -O vosk-en.zip
    unzip -q vosk-en.zip -d packages/speech/models/
    rm vosk-en.zip
else
    echo "Vosk English model already exists. Skipping."
fi

# Hindi Model
if [ ! -d "packages/speech/models/vosk-model-small-hi-0.22" ]; then
    echo "Downloading Vosk Model (Hindi)..."
    wget -q --show-progress https://alphacephei.com/vosk/models/vosk-model-small-hi-0.22.zip -O vosk-hi.zip
    unzip -q vosk-hi.zip -d packages/speech/models/
    rm vosk-hi.zip
else
    echo "Vosk Hindi model already exists. Skipping."
fi

# 3. Mobile Models (ONNX)
# Note: These are large and complex to download via single script without git lfs or specific file targeting.
# We will create the directory and add a placeholder note.
echo "------------------------------------------------"
echo "Setting up Mobile Models..."
mkdir -p apps/mobile/assets/models

echo "NOTE: Mobile ONNX models (Phi-3) require manual download or git-lfs due to repository structure."
echo "Please visit: https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-onnx"
echo "and place the 'cpu_and_mobile/cpu-int4-rtn-block-32' files into apps/mobile/assets/models/"

echo "------------------------------------------------"
echo "Download Complete!"
