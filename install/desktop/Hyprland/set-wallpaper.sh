sudo -u $SUDO_USER -H bash << EOF
    echo $PROJECT_ROOT
    mkdir -p ~/Pictures
    rm -rf ~/Pictures/wallpaper
    cp -r "${PROJECT_ROOT}/wallpaper" ~/Pictures/wallpaper
EOF