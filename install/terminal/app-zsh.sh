#!/usr/bin/env bash
sudo pacman --needed --noconfirm -S zsh zsh-completions zsh-autosuggestions

REAL_USER=${SUDO_USER:-$USER}
REAL_HOME=$(eval echo ~$REAL_USER)

if [[ ! -d "$REAL_HOME/.oh-my-zsh" ]]; then
    sudo -u $REAL_USER sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended || true
fi
