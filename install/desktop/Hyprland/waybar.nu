#!/usr/bin/env nu

# Install waybar
try {
    run-external pacman "-S" "--needed" "--noconfirm" "waybar"
} catch {
    print "Warning: Failed to install waybar, it may already be installed"
}

# Get the original user from SUDO_USER environment variable
let user = if ($env.SUDO_USER? | is-empty) { $env.USER } else { $env.SUDO_USER }
let home = $"/home/($user)"

# Remove existing waybar config
rm -rf $"($home)/.config/waybar"

# Copy new waybar config from project root
cp -r $"($env.PROJECT_ROOT)/config/waybar" $"($home)/.config/waybar"

# Fix ownership if running as root
if (whoami) == "root" {
    chown -R $"($user):($user)" $"($home)/.config/waybar"
}