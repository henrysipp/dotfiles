#!/bin/bash

# 1Password installation script for Arch Linux
# https://support.1password.com/install-linux/#arch-linux

if ! command -v 1password &> /dev/null; then
    # Import 1Password GPG key and install from AUR
    sudo -u $SUDO_USER -H bash << EOF
        rm -rf ~/1password 
        curl -sS https://downloads.1password.com/linux/keys/1password.asc | gpg --import
        git clone https://aur.archlinux.org/1password.git ~/1password
        cd ~/1password
        makepkg -si --noconfirm
EOF
    # Clean up the 1password directory
    sudo -u $SUDO_USER rm -rf ~/1password
else
    echo "1password is already installed. Skipping installation."
fi