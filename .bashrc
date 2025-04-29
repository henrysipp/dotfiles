#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
alias grep='grep --color=auto'
PS1='[\u@\h \W]\$ '

export SYSTEMD_EDITOR="nvim"
export GDK_SCALE=1
export GDK_DPI_SCALE=1
export QT_AUTO_SCREEN_SCALE_FACTOR=1
export QT_SCALE_FACTOR=1
export ELECTRON_OZONE_PLATFORM_HINT=auto
export MOZ_ENABLE_WAYLAND=1
export XDG_CURRENT_DESKTOP=Hyprland
export XDG_SESSION_TYPE=wayland
export QT_DPI=137 
# export ELECTRON_FORCE_DEVICE_SCALE_FACTOR=1.25


export ELECTRON_OZONE_PLATFORM_HINT=auto

if [[ -z $WAYLAND_DISPLAY ]] && [[ $(tty) = /dev/tty1 ]]; then
  export XDG_SESSION_TYPE=wayland
  export XDG_CURRENT_DESKTOP=Hyprland
  export XDG_SESSION_DESKTOP=Hyprland
  export GDK_BACKEND=wayland
  export QT_QPA_PLATFORM=wayland
  export SDL_VIDEODRIVER=wayland
  export CLUTTER_BACKEND=wayland
  export MOZ_ENABLE_WAYLAND=1
  sleep 1
  exec dbus-run-session Hyprland
fi

