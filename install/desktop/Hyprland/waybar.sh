#!/usr/bin/env bash
sudo pacman -S --needed --noconfirm waybar

REAL_USER=${SUDO_USER:-$USER}
REAL_HOME=$(eval echo ~$REAL_USER)

sudo -u $REAL_USER rm -rf "$REAL_HOME/.config/waybar"
sudo -u $REAL_USER cp -r "$PROJECT_ROOT/config/waybar" "$REAL_HOME/.config/waybar"