#!/usr/bin/env nu

# Exit immediately if something fails
# set -e

# Variables
let PROJECT_ROOT = ($env.PWD)
$env.PROJECT_ROOT = $PROJECT_ROOT

# Install gum first
source ($PROJECT_ROOT | path join "install" "terminal" "required" "app-gum.nu")

# Run first-run choices
source ($PROJECT_ROOT | path join "install" "first-run-choices.nu")

echo "Installing terminal and desktop tools..."

# Run terminal and desktop installation
source ($PROJECT_ROOT | path join "install" "terminal.nu")
source ($PROJECT_ROOT | path join "install" "desktop.nu")

# Logout to pickup changes
# gum confirm "Ready to reboot for all settings to take effect?" && sudo reboot
