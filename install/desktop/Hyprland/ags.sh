#!/usr/bin/env bash
REAL_USER=${SUDO_USER:-$USER}
REAL_HOME=$(eval echo ~$REAL_USER)

sudo -u $REAL_USER rm -rf "$REAL_HOME/.config/ags"
sudo -u $REAL_USER cp -r "$PROJECT_ROOT/ags" "$REAL_HOME/.config/ags"


yay -S --needed --noconfirm aylurs-gtk-shell-git