#!/usr/bin/env nu

# Only ask for default desktop app choices when running Gnome
# let optional_apps = ["1password" "Spotify" "Zoom" "Dropbox"]
# let default_optional_apps = "1password,Spotify,Zoom"
# $env.OMAKUB_FIRST_RUN_OPTIONAL_APPS = (
#     gum choose ...$optional_apps --no-limit --selected $default_optional_apps --height 7 --header "Select optional apps" 
#     | str join "\n" 
#     | str replace --all ' ' '-'
# )

let available_languages = ["Ruby on Rails" "Node.js" "Go" "PHP" "Python" "Elixir" "Rust" "Java"]
let selected_languages = "Ruby on Rails,Node.js"
$env.OMAKASE_FIRST_RUN_LANGUAGES = (
    gum choose ...$available_languages --no-limit --selected $selected_languages --height 10 --header "Select programming languages"
    | str join "\n"
)

# let available_dbs = ["MySQL" "Redis" "PostgreSQL"]
# let selected_dbs = "MySQL,Redis"
# $env.OMAKUB_FIRST_RUN_DBS = (
#     gum choose ...$available_dbs --no-limit --selected $selected_dbs --height 5 --header "Select databases (runs in Docker)"
#     | str join "\n"
# )

let available_desktops = ["Gnome" "Hyprland"]
let selected_desktop = "Hyprland"
$env.OMAKASE_SELECTED_DESKTOP = (
    gum choose ...$available_desktops --selected $selected_desktop --height 5 --header "Select desktop environment"
)