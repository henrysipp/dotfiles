#!/usr/bin/env bash
REAL_USER=${SUDO_USER:-$USER}
REAL_HOME=$(eval echo ~$REAL_USER)

sudo -u $REAL_USER mkdir -p "$REAL_HOME/Pictures"
sudo -u $REAL_USER rm -rf "$REAL_HOME/Pictures/wallpaper"
sudo -u $REAL_USER cp -r "$PROJECT_ROOT/wallpaper" "$REAL_HOME/Pictures/wallpaper"