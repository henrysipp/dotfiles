#!/usr/bin/env nu

# Run framework installers
let installers = (ls $"($env.PROJECT_ROOT)/install/framework/*.nu" | get name)
for installer in $installers {
    source $installer
}