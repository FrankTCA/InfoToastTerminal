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

$script = fopen("../runtime/updater.sh", "r");
$cmds = fread($script, filesize("../runtime/updater.sh"));
fclose($script);

echo exec($cmds);
echo "[[;green;]Done.]";