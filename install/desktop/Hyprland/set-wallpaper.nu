#!/usr/bin/env nu

# Get the original user from SUDO_USER environment variable
let user = if ($env.SUDO_USER? | is-empty) { $env.USER } else { $env.SUDO_USER }
let home = $"/home/($user)"

print $env.PROJECT_ROOT

# Create Pictures directory
mkdir $"($home)/Pictures"

# Remove existing wallpaper folder
rm -rf $"($home)/Pictures/wallpaper"

# Copy wallpapers from project root
cp -r $"($env.PROJECT_ROOT)/wallpaper" $"($home)/Pictures/wallpaper"

# Fix ownership if running as root
if (whoami) == "root" {
    chown -R $"($user):($user)" $"($home)/Pictures/wallpaper"
}