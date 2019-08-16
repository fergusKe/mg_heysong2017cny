<?php
//¤U¸üÀÉ®×
/*$file_name = $_GET['file_name'];
//$file_path = "http://localhost/fct/maintenance/pdf/";
$file_path = "http://220.128.101.148/fct/maintenance/pdf/";
$file_size = filesize("maintenance/pdf/".$file_name);
header('Pragma: public');
header('Expires: 0');
header('Last-Modified: ' . gmdate('D, d M Y H:i ') . ' GMT');
header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
header('Cache-Control: private', false);
header('Content-Type: application/octet-stream');
header('Content-Length: ' . $file_size);
header('Content-Disposition: attachment; filename="' . $file_name . '";');
header('Content-Transfer-Encoding: binary');
readfile($file_path.$file_name);
*/

$file = $_GET['file_name'];
header("Content-Disposition: attachment; filename=" . urlencode($file));   
header("Content-Type: application/octet-stream");
header("Content-Type: application/download");
header("Content-Description: File Transfer");            
header("Content-Length: " . filesize($file));
flush(); // this doesn't really matter.
$fp = fopen($file, "r");
while (!feof($fp))
{
    echo fread($fp, 65536);
    flush(); // this is essential for large downloads
} 
fclose($fp); 
?>