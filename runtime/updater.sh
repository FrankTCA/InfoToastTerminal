THETIME=$(date +%s)
BACKUPFILE="term-backup/$THETIME"
cp -rv ~/terminal "$HOME/$BACKUPFILE"
echo "Saved as $HOME/$BACKUPFILE"
echo "Deleting terminal directory."
rm -rf ~/terminal
echo "Cloning via git."
git clone --recursive https://github.com/FrankTCA/InfoToastTerminal ~/terminal
echo "Moving credentials file."
cp "$HOME/$BACKUPFILE/php/creds.php" "$HOME/terminal/php/creds.php"
echo "[[;green;]Completed!]"