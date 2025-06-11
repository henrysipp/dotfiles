#!/usr/bin/env nu

# Update system and install base packages
sudo pacman -Syu
sudo pacman -S --needed --noconfirm git curl unzip

# Run terminal installers
let installers = (ls $"($env.PROJECT_ROOT)/install/terminal/*.nu" | get name)
for installer in $installers {
    source $installer
}