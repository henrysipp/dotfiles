
sudo -u $SUDO_USER -H bash << EOF
  ags quit
  rm -rf ~/.config/ags
  cp -r "${PROJECT_ROOT}/ags" ~/.config/ags
EOF
