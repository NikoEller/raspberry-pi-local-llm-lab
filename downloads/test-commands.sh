#!/usr/bin/env bash
set -u

echo "=== Active overclock configuration ==="
vcgencmd get_config arm_freq
vcgencmd get_config over_voltage_delta

echo
echo "=== Current state ==="
vcgencmd measure_clock arm
vcgencmd measure_temp
vcgencmd get_throttled
free -h

echo
echo "=== Qwen server process ==="
pgrep -af llama-server || true

echo
echo "Run this in a second terminal during a benchmark:"
echo "watch -n 1 'vcgencmd measure_clock arm; vcgencmd measure_temp; vcgencmd get_throttled; free -h'"
