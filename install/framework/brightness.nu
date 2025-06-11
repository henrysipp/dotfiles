#!/usr/bin/env nu

# Add user to video group for brightness control and install brightnessctl
sudo usermod -a -G video $env.USER
sudo pacman -S --needed --noconfirm brightnessctl