<?php
require_once "view.php";
require_once "carosel.php";
class MainPage extends View
{
    function main($courses,$user=false)
    {
        $this->including($courses);

        $this->navbar($user);
        Carosel::main();
        $this->list_chapters($courses);
    }
    function including($courses)
    {

        echo '
            <!DOCTYPE HTML>
        <html lang="">
        <head>
       <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="../js/bootstrap.min.js"></script>
        <script src="../js/bootstrap.bundle.min.js"></script>
        <meta name="google-site-verification" content="BH4EEAs4PRSW5c0Wbr3tiUtY_KxAF-c" />
        <link rel="canonical" href="https://studycard.ru" />';
        $this->count();
        echo '<!-- разметка курсов -->';
        echo $this->schema_list($courses);
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
    function schema_list($courses)
    {
        $content='
        <script type="application/ld+json">
       {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        ';
        $count=1;
        foreach ($courses as $cours)
        {
            $comma=true;
            if (count($courses)==$count)
                $comma=false;
            $content.=$this->schema_cours($cours,$count,$comma);
            $count++;
        }

        $content.=' ]}</script>';

        return $content;

    }
    function schema_cours($cours,$count,$comma)
    {
        $content='
        {
          "@type": "ListItem",
          "position": '.$count.',
          "item": {
            "@type": "Course",
            "url":"https://studycard.ru/'.$cours->translit.'",
            "name": "'.$cours->name.'",
            "description": "'.$cours->description.'",
            "provider": {
              "@type": "Organization",
              "name": "studycard",
              "sameAs": "https://studycard.ru"
           }
          }
        }
        ';
        if ($comma)
            $content.=',';
        return $content;
    }

    function list_chapters($courses)
    {
        echo '<h2 class="px-4 mt-5" style="font-weight:bold" >Cписок курсов</h2>';
        echo '<div class="row px-4 mt-5">';
        foreach ($courses as $cours)
        {
            echo '<div class="mx-auto  col-xxl-3 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-11 mt-2 ">';
            $this->description($cours);
            echo '</div>';
/*


            echo '<a class="link-dark" style="text-decoration:none;" href="../index.php?action=open_cours&cours_id='.$cours->id.'">';
            echo '<div class="shadow card   p-4 border " >';
            echo '<img style="height:200px; width:250px" class="img-thumbnail mx-auto " src="'.$cours->picture.'" class="card-img-top" alt="...">';
            echo '<h2 style="font-weight:bold" class="card-title">'.$cours->name.'</h2>';
            echo '<p style="font-weight:bold" class="card-text">'.$cours->description.'</p>';
            //echo '<a class="btn btn-primary" href="../index.php?action=open_cours&cours_id='.$cours->id.'">Пререйти</a>';
            echo '</div>';
            echo '</a>';
            echo '</div>';*/
        }
        echo '</div>';

    }
    public function description($cours)
    {
        $content='<a class="link-dark" style="text-decoration:none;" href="../'.$cours->translit.'">';
        $content.='<div class="shadow card   p-1 border " >';
        $content.='  <div class="row ">';
        $content.='    <div class="col-4">';
        $content.='      <img src="'.$cours->picture.'" style="height:100px; width:125px" alt="...">';
        $content.='    </div>';
        $content.='    <div class=" mx-auto col-6">';
        $content.='      <div class="  card-body p-1 m-1">';
        $content.='        <h3 style="font-weight:bold" class="card-title">'.$cours->name.'</h3>';
        $content.='        <p class="card-text">'.$cours->description.'</p>';
        // $content.='        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>';
        $content.='      </div>';
        $content.='    </div>';
        $content.='  </div>';
        $content.='</div>';
        $content.='</a>';
        echo $content;
    }
}
