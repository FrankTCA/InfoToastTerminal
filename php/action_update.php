<?php
include("creds.php");

if (!isset($_POST['admpass'])) {
    http_response_code(401);
    die("[[;red;]Please type a password!]");
}

$creds = new Creds();

if ($_POST['admpass'] != $creds->get_admin_pass()) {
    http_response_code(401);
    die("[[;red;]Access denied]");
}

$date = date("y-m-d.H:i");
$backupfile = "../../term-backup/$date/";
$from = "../../terminal/";

function copyfolder ($from, $to, $ext="*") {
    // (A1) SOURCE FOLDER CHECK
    if (!is_dir($from)) { exit("$from does not exist"); }

    // (A2) CREATE DESTINATION FOLDER
    if (!is_dir($to)) {
        if (!mkdir($to)) { exit("Failed to create $to"); };
        echo "$to created\n";
    }

    // (A3) GET ALL FILES + FOLDERS IN SOURCE
    $all = glob("$from$ext", GLOB_MARK);
    print_r($all);

    // (A4) COPY FILES + RECURSIVE INTERNAL FOLDERS
    if (count($all)>0) { foreach ($all as $a) {
        $ff = basename($a); // CURRENT FILE/FOLDER
        if (is_dir($a)) {
            copyfolder("$from$ff/", "$to$ff/");
        } else {
            if (!copy($a, "$to$ff")) { exit("Error copying $a to $to$ff"); }
            echo "$a copied to $to$ff\n";
        }
    }}
}

copyfolder($from, $backupfile);

echo "Copy finished. Now deleting files.\n";

// Function to delete all files
// and directories
function deleteAll($str)
{

    // Check for files
    if (is_file($str)) {

        // If it is file then remove by
        // using unlink function
        return unlink($str);
    } // If it is a directory.
    elseif (is_dir($str)) {

        // Get the list of the files in this
        // directory
        $scan = glob(rtrim($str, '/') . '/{.}*', GLOB_BRACE);

        // Loop through the list of files
        foreach ($scan as $index => $path) {

            // Call recursive function
            deleteAll($path);
        }

        // Remove the directory itself
        return @rmdir($str);
    }
}

deleteAll($from);

echo "Files deleted. Now moving on to git clone.\n";

exec("git clone --recursive https://github.com/FrankTCA/InfoToastTerminal /datastore/html/terminal");

echo "Git command ran. Now restoring credentials file.\n";

$stat = copy("$backupfile" . "php/creds.php", "./creds.php");

if (!$stat) {
    echo "[[;yellow;]WARNING: Credentials file could not be copied back! Check server manually!\n";
}

echo "[[;green;]Completed!]";

// Unused code
/*$script = fopen("../runtime/updater.sh", "r");
$cmds = fread($script, filesize("../runtime/updater.sh"));
fclose($script);

$cmdarr = explode("\n", $cmds);

$output = array("Starting program...");

foreach ($cmdarr as $cmd) {
    exec($cmd, $out1);
    $output = array_merge($output, $out1);
}

foreach ($output as $out) {
    echo $out . "\n";
}*/