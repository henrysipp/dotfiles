#!/usr/bin/env nu

print "Enter identification for git and autocomplete..."

# Get system name from passwd file
let system_name = (
    getent passwd $env.USER 
    | str split ':' 
    | get 4 
    | str split ',' 
    | get 0
)

# Commented out as in original script
# $env.OMAKUB_USER_NAME = (gum input --placeholder "Enter full name" --value $system_name --prompt "Name> ")
# $env.OMAKUB_USER_EMAIL = (gum input --placeholder "Enter email address" --prompt "Email> ")