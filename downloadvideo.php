<?php
    $id = $_GET["id"];
    $link = $_GET["link"];
    
    $content = file_get_contents($link);
    file_put_contents("stroage/$id.mp4",$content);

    echo "success";

?>