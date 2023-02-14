<?php
require_once "view.php";
require_once "carosel.php";
class MainPage extends View
{
    function main($courses,$user=false)
    {
        $this->including();

        $this->navbar($user);
        Carosel::main();
        $this->list_chapters($courses);
    }
    function including()
    {

        echo '
            <!DOCTYPE HTML>
        <html lang="">
        <head>
       <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="../js/bootstrap.min.js"></script>
        <script src="../js/bootstrap.bundle.min.js"></script>
        <meta name="google-site-verification" content="BH4EEAs4PRSW5c0Wbr3tiUtY_KxAF-c" />';

        $this->count();
        echo '<link rel="stylesheet" href="../css/bootstrap.min.css" type="text/css"/>
   

        <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                
            
                <title>studycard</title>
            
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
                <link href="https://fonts.googleapis.com/css?family=Droid+Sans:400,700" rel="stylesheet">
               <!--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.8.1/baguetteBox.min.css">
                <link rel="stylesheet" href="../css/thumbnail-gallery.css">-->
                
                <link rel="stylesheet" href="../css/list.css">
                <link rel="stylesheet" href="../css/style.css">
       </head>
        ';
    }

    function list_chapters($courses)
    {
        echo '<h2 class="px-4 mt-5" style="font-weight:bold" >Cписок курсов</h2>';
        echo '<div class="row px-4 mt-5">';
        foreach ($courses as $cours)
        {

            echo '<div class="mx-auto  col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 mt-4 ">';

            echo '<a class="link-dark" style="text-decoration:none;" href="../index.php?action=open_cours&cours_id='.$cours->id.'">';
            echo '<div class="shadow card   p-4 border " >';
            echo '<img style="height:200px; width:250px" class="img-thumbnail mx-auto " src="'.$cours->picture.'" class="card-img-top" alt="...">';
            echo '<h2 style="font-weight:bold" class="card-title">'.$cours->name.'</h2>';
            echo '<p style="font-weight:bold" class="card-text">'.$cours->description.'</p>';
            //echo '<a class="btn btn-primary" href="../index.php?action=open_cours&cours_id='.$cours->id.'">Пререйти</a>';
            echo '</div>';
            echo '</a>';
            echo '</div>';

        }
        echo '</div>';

    }
}
