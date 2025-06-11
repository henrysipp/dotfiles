#!/usr/bin/env nu

# Install Visual Studio Code
# Run as the original user to avoid permission issues with AUR
let sudo_user = $env.SUDO_USER? | default $env.USER

with-env {SUDO_USER: $sudo_user} {
    sudo -u $sudo_user -H yay -S --needed --noconfirm visual-studio-code-bin
}