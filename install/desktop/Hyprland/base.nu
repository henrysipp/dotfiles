#!/usr/bin/env nu

# Install Hyprland base packages
try {
    run-external pacman "-S" "--needed" "--noconfirm" "hyprland" "hypridle" "hyprlock"
} catch {
    print "Warning: Failed to install some packages, they may already be installed"
}

# Get the original user from SUDO_USER environment variable
let user = if ($env.SUDO_USER? | is-empty) { $env.USER } else { $env.SUDO_USER }
let home = $"/home/($user)"

# Remove existing Hyprland config
rm -rf $"($home)/.config/hypr"

# Copy new Hyprland config from project root
cp -r $"($env.PROJECT_ROOT)/config/hypr" $"($home)/.config/hypr"

# Fix ownership if running as root
if (whoami) == "root" {
    chown -R $"($user):($user)" $"($home)/.config/hypr"
}

# Reload Hyprland configuration if hyprctl is available
try {
    run-external hyprctl reload
} catch {
    print "Note: Could not reload Hyprland - it may not be running"
}