#!/usr/bin/env nu

# Install hypridle
try {
    run-external pacman "-S" "--needed" "--noconfirm" "hypridle"
} catch {
    print "Warning: Failed to install hypridle, it may already be installed"
}