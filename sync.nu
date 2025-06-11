#!/usr/bin/env nu

let project_root = $env.FILE_PWD
$env.PROJECT_ROOT = $project_root

let selected_desktop = "Hyprland"
let desktop_path = ($project_root | path join "install" "desktop" $selected_desktop)

# Execute all .sh scripts in the desktop directory
ls $desktop_path
| where name =~ '\.sh$'
| get name
| each { |installer|
    print $"Executing ($installer)"
    try {
        bash $installer
    } catch {
        print $"Warning: ($installer) failed but continuing..."
    }
}