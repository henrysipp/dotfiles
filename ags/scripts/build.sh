#!/usr/bin/env bash

# Build script for AGS project
set -euo pipefail

echo "Building AGS project..."

# Clean previous build
rm -rf dist/*

# Compile TypeScript
echo "Compiling TypeScript..."
tsc

# Copy SCSS files
echo "Copying styles..."
cp src/style.scss dist/

# Copy any other assets if needed
# cp -r assets dist/ 2>/dev/null || true

echo "Build complete!"
