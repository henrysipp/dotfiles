#!/usr/bin/env nu

# Install hyprpaper
try {
    run-external pacman "-S" "--needed" "--noconfirm" "hyprpaper"
} catch {
    print "Warning: Failed to install hyprpaper, it may already be installed"
}