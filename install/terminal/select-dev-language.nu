#!/usr/bin/env nu

# Install default programming languages
let languages = if "OMAKASE_FIRST_RUN_LANGUAGES" in $env {
    $env.OMAKASE_FIRST_RUN_LANGUAGES | split row ' '
} else {
    let available_languages = [
        "Ruby on Rails"
        "Node.js" 
        "Go"
        "PHP"
        "Python"
        "Elixir"
        "Rust"
    ]
    
    # Use gum to select languages
    let selected = (gum choose ...$available_languages --no-limit --height 10 --header "Select programming languages")
    $selected | lines
}

# Process selected languages
if ($languages | length) > 0 {
    for language in $languages {
        match $language {
            "Ruby" | "Ruby on Rails" => {
                mise use --global ruby@latest
                mise settings add idiomatic_version_file_enable_tools ruby
                mise x ruby -- gem install rails --no-document
            }
            "Node.js" => {
                mise use --global node@lts
            }
            "Go" => {
                mise use --global go@latest
            }
            "PHP" => {
                sudo add-apt-repository -y ppa:ondrej/php
                sudo apt -y install php8.4 php8.4-curl php8.4-apcu php8.4-intl php8.4-mbstring php8.4-opcache php8.4-pgsql php8.4-mysql php8.4-sqlite3 php8.4-redis php8.4-xml php8.4-zip
                
                # Download and install Composer
                http get https://getcomposer.org/installer | save composer-setup.php
                php composer-setup.php --quiet
                sudo mv composer.phar /usr/local/bin/composer
                rm composer-setup.php
            }
            "Python" => {
                mise use --global python@latest
            }
            "Elixir" => {
                mise use --global erlang@latest
                mise use --global elixir@latest
                mise x elixir -- mix local.hex --force
            }
            "Rust" => {
                # Install Rust using rustup
                http get --raw https://sh.rustup.rs | bash -s -- -y
            }
            "Java" => {
                mise use --global java@latest
            }
        }
    }
}