#!/usr/bin/env nu

# Run desktop installers
let desktop_installers = (ls $"($env.PROJECT_ROOT)/install/desktop/*.nu" | get name)
for installer in $desktop_installers {
    source $installer
}

# Run desktop environment specific installers
let de_installers = (ls $"($env.PROJECT_ROOT)/install/desktop/($env.SELECTED_DESKTOP)/*.nu" | get name)
for installer in $de_installers {
    source $installer
}