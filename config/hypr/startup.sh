#!/bin/zsh

# Log file
LOGFILE="/tmp/ags-startup.log"

# Function to log with timestamp
log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S'): $1" >>"$LOGFILE"
}

log "Starting AGS startup script"

# Activate mise
eval "$(mise activate bash)" 2>>"$LOGFILE"
export PATH="$PATH"
log "Mise activated, PATH: $PATH"

# Check if ags command is available
if command -v ags >/dev/null 2>&1; then
  log "AGS command found at: $(which ags)"
else
  log "ERROR: AGS command not found in PATH"
  exit 1
fi

# Kill existing AGS instance
log "Attempting to quit existing AGS instance"
ags quit >>"$LOGFILE" 2>&1 || log "No existing AGS instance or quit failed"
sleep 1

# Start AGS
log "Starting AGS"
exec ags run --gtk4 >>"$LOGFILE" 2>&1
