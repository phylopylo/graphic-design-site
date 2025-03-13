#!/usr/bin/env bash
# run with wsl -e
# Navigate to the project directory
cd "$(dirname "$0")"

# Check if node_modules exists, if not run npm install
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the development server
echo "Starting development server..."
npm run dev &
SERVER_PID=$!

# Wait a few seconds for the server to start
echo "Waiting for server to be ready..."
sleep 5

# Open in Brave browser using Windows path
echo "Opening in Brave browser..."
BRAVE_PATH="/mnt/c/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"
if [ -f "$BRAVE_PATH" ]; then
    "$BRAVE_PATH" "http://localhost:5173"
else
    echo "Error: Brave browser not found at $BRAVE_PATH"
    exit 1
fi

# Show server output and wait for it to finish
echo "Server is running. Press Ctrl+C to stop."
wait $SERVER_PID 