#!/usr/bin/env nu

# Get the original user from SUDO_USER environment variable
let user = if ($env.SUDO_USER? | is-empty) { $env.USER } else { $env.SUDO_USER }
let home = $"/home/($user)"

# Remove existing AGS config
rm -rf $"($home)/.config/ags"

# Copy new AGS config from project root
cp -r $"($env.PROJECT_ROOT)/ags" $"($home)/.config/ags"

# Fix ownership if running as root
if (whoami) == "root" {
    chown -R $"($user):($user)" $"($home)/.config/ags"
}