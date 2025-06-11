#!/usr/bin/env nu

# Install and enable power-profiles-daemon for power management
sudo pacman -S --needed --noconfirm power-profiles-daemon
sudo systemctl enable --now power-profiles-daemon