#!/usr/bin/env nu

# 1Password installation script for Arch Linux
# https://support.1password.com/install-linux/#arch-linux

# Check if 1password is already installed
if (which 1password | is-empty) {
    # Get the sudo user or current user
    let sudo_user = $env.SUDO_USER? | default $env.USER
    
    # Import 1Password GPG key and install from AUR
    with-env {SUDO_USER: $sudo_user} {
        # Clean up any existing directory first
        sudo -u $sudo_user rm -rf ~/1password
        
        # Import GPG key
        curl -sS https://downloads.1password.com/linux/keys/1password.asc | sudo -u $sudo_user gpg --import
        
        # Clone and build from AUR
        sudo -u $sudo_user git clone https://aur.archlinux.org/1password.git ~/1password
        cd ~/1password
        sudo -u $sudo_user makepkg -si --noconfirm
    }
    
    # Clean up the 1password directory
    let sudo_user = $env.SUDO_USER? | default $env.USER
    sudo -u $sudo_user rm -rf ~/1password
} else {
    print "1password is already installed. Skipping installation."
}