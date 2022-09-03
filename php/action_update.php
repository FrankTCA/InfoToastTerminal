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

$output = array("Starting program...");

foreach ($cmds as $cmd) {
    exec($cmd, $out1);
    $output = array_merge($output, $out1);
}

foreach ($output as $out) {
    echo $out . "\n";
}
echo "[[;green;]Done.]";