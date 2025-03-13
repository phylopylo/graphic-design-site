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

# Wait for the server to be ready
echo "Waiting for server to be ready..."
sleep 5

# Run tests
echo "Running tests..."
npm test -- --run

# If tests pass, open the browser
if [ $? -eq 0 ]; then
    echo "Tests passed! Opening in browser..."
    # Open in Brave browser using Windows path
    BRAVE_PATH="/mnt/c/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"
    if [ -f "$BRAVE_PATH" ]; then
        "$BRAVE_PATH" "http://localhost:5173"
    else
        echo "Error: Brave browser not found at $BRAVE_PATH"
        kill $SERVER_PID
        exit 1
    fi

    # Show server output and wait for it to finish
    echo "Server is running. Press Ctrl+C to stop."
    wait $SERVER_PID
else
    echo "Tests failed! Stopping server and exiting."
    kill $SERVER_PID
    exit 1
fi 