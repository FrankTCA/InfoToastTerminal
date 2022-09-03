#!/usr/local/bin/zsh
# shellcheck disable=SC2225
SECONDS=$(date +%s)
cp -rv ~/terminal "~/term-backup/$SECONDS"
echo "Saved as /datastore/html/term-backup/$SECONDS"
echo "Deleting terminal directory."
rm -rf ~/terminal
echo "Cloning via git."
git clone --recursive https://github.com/FrankTCA/InfoToastTerminal ~/terminal
echo "[[;green;]Completed!]"