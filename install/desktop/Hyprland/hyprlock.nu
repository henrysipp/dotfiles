#!/usr/bin/env nu

# Install hyprlock
try {
    run-external pacman "-S" "--needed" "--noconfirm" "hyprlock"
} catch {
    print "Warning: Failed to install hyprlock, it may already be installed"
}