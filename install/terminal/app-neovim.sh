#!/usr/bin/env bash
sudo pacman -S --needed --noconfirm neovim

REAL_USER=${SUDO_USER:-$USER}
REAL_HOME=$(eval echo ~$REAL_USER)

if [ ! -d "$REAL_HOME/.config/nvim" ]; then
  sudo -u $REAL_USER git clone https://github.com/LazyVim/starter "$REAL_HOME/.config/nvim"
  sudo -u $REAL_USER rm -rf "$REAL_HOME/.config/nvim/.git"
fi
