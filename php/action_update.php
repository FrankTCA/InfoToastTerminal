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

echo exec("../runtime/updater.sh");
echo "[[;green;]Done.]";