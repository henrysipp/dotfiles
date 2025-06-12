#!/usr/bin/env nu

# Install hyprpaper
try {
    run-external pacman "-S" "--needed" "--noconfirm" "hyprsunset"
} catch {
    print "Warning: Failed to install hyprsunset, it may already be installed"
}