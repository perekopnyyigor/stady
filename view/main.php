<?php
require_once "view.php";
require_once "carosel.php";
class MainPage extends View
{
    function main($courses,$user=false)
    {
        $this->includ();

        $this->navbar($user);
        Carosel::main();
        $this->list_chapters($courses);
    }
    function list_chapters($courses)
    {
        echo '<h2 class="px-4 mt-5" style="font-weight:bold" >Cписок курсов</h2>';
        echo '<div class="row px-4 mt-5">';
        foreach ($courses as $cours)
        {

            echo '<div class="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 mt-4 ">';

            echo '<a class="link-dark" style="text-decoration:none;" href="../index.php?action=open_cours&cours_id='.$cours->id.'">';
            echo '<div class="shadow card   p-4 border " >';
            echo '<img style="height:200px; width:250px" class="img-thumbnail" src="'.$cours->picture.'" class="card-img-top" alt="...">';
            echo '<h4 style="font-weight:bold" class="card-title">'.$cours->name.'</h4>';
            echo '<p style="font-weight:bold" class="card-text">'.$cours->description.'</p>';
            //echo '<a class="btn btn-primary" href="../index.php?action=open_cours&cours_id='.$cours->id.'">Пререйти</a>';
            echo '</div>';
            echo '</a>';
            echo '</div>';

        }
        echo '</div>';

    }
}
