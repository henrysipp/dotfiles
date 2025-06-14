
#!/usr/bin/env bash
if ! command -v yay &> /dev/null; then
    git clone https://aur.archlinux.org/yay.git ~/yay
    pushd ~/yay
    makepkg -si --noconfirm
    popd
    rm -rf ~/yay
fi
