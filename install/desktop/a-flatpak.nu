#!/usr/bin/env nu

# Install flatpak and configure flathub repository
sudo pacman -S --needed --noconfirm flatpak
sudo flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo