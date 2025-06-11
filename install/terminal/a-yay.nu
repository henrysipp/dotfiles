#!/usr/bin/env nu

# Check if yay is installed
if not (which yay | is-empty) {
    print "yay is already installed. Skipping installation."
} else {
    # Clone yay repository to your home directory
    git clone https://aur.archlinux.org/yay.git ~/yay
    
    # Go to the yay directory
    cd ~/yay
    
    # Run makepkg as the current user (no sudo required)
    run-external sudo "-u" $env.USER "makepkg" "-si"
    
    # Return to the original directory
    cd -
    
    # Clean up the yay directory
    rm -rf ~/yay
}