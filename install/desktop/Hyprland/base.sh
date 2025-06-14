#!/usr/bin/env bash
sudo pacman -S --needed --noconfirm hyprland hypridle hyprlock

REAL_USER=${SUDO_USER:-$USER}
REAL_HOME=$(eval echo ~$REAL_USER)

sudo -u $REAL_USER rm -rf "$REAL_HOME/.config/hypr"
sudo -u $REAL_USER cp -r "$PROJECT_ROOT/config/hypr" "$REAL_HOME/.config/hypr"

sudo -u $REAL_USER hyprctl reload || true