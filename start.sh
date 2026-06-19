#!/usr/bin/env bash
set -e

PORT=3000
cd "$(dirname "$0")"

# Start local server in background
npx --yes serve -p $PORT . &
SERVER_PID=$!

# Give server a moment to start
sleep 2

echo ""
echo "  Local:   http://localhost:$PORT"
echo ""
echo "  Starting public tunnel..."
echo "  (Copy the URL below and share it — it stays live while this terminal is open)"
echo ""

# Start tunnel — prints the public URL
npx --yes localtunnel --port $PORT

# If tunnel exits, kill the server
kill $SERVER_PID 2>/dev/null
