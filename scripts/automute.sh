#!/bin/bash

# List of application class names to manage
APPS=("steam_app_251290")  # Replace with your desired applications

# Function to mute an application
mute_app() {
    local app_name=$1
    # Get the node ID of the application
    node_id=$(wpctl status | grep -i "$app_name" | grep -oP '\d+(?=\.output)')
    if [ -n "$node_id" ]; then
        wpctl set-mute $node_id 1
    fi
}

# Function to unmute an application
unmute_app() {
    local app_name=$1
    node_id=$(wpctl status | grep -i "$app_name" | grep -oP '\d+(?=\.output)')
    if [ -n "$node_id" ]; then
        wpctl set-mute $node_id 0
    fi
}

# Initialize previous focused window
prev_focused=""

# Monitor focus changes
socat -U UNIX-CONNECT:$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket.sock - | while read -r line; do
    if [[ $line == *"activewindow>>"* ]]; then
        # Extract the class name of the focused window
        focused_class=$(echo $line | awk -F'>>' '{print $2}' | awk -F',' '{print $1}' | tr -d ' ')
        
        # Mute all other applications
        for app in "${APPS[@]}"; do
            if [[ "$app" != "$focused_class" ]]; then
                mute_app "$app"
            else
                unmute_app "$app"
            fi
        done
    fi
done
