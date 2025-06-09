
if ! command -v yay &> /dev/null; then
    # Clone yay repository to your home directory
    git clone https://aur.archlinux.org/yay.git ~/yay

    # Go to the yay directory
    pushd ~/yay

    # Run makepkg as the current user (no sudo required)
    sudo -u $(whoami) makepkg -si

    # Return to the original directory
    popd

    # Clean up the yay directory
    rm -rf ~/yay
else
    echo "yay is already installed. Skipping installation."
fi
