<?php
require_once "view.php";
require_once "carosel.php";
class MainPage extends View
{
    public $user;
    function main($courses,$user=false)
    {
        if($user!=false)
            $this->user=$user;

        $this->including($courses);

        $this->navbar();
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
        echo '<div class="row ">';
        foreach ($courses as $cours)
        {
            echo '<div class="col-xxl-3 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 ">';
            $this->description($cours);
            echo '</div>';
        }
        echo '</div>';

    }
    public function description($cours)
    {

        $content='<a class="link-dark" style="text-decoration:none;" href="../'.$cours->translit.'">';
        if(isset($this->user))
            $content.='<div class="card p-2 m-2 my_border" style="height: 200px" >';
        else
            $content.='<div class="card p-2 m-2 my_border" style="height: 150px" >';

        $content.='  <div class="row ">';


        $content.='    <div class="col-5 m-2">';
        $content.='      <img src="'.$cours->picture.'" style="height:100px; width:125px" alt="...">';

        $content.='    </div>';
        $content.='    <div class="col-5">';
        $content.='      <div class="card-body ">';
        $content.='        <h3 style="font-weight:bold" >'.$cours->name.'</h3>';
        $content.='        <p class="card-text">'.$cours->description.'</p>';
        $content.='        <p class="card-text"><small class="text-muted">Уроков :'.$cours->count_topic.'</small></p>';


        $content.='      </div>';

        $content.='    </div>';
        if(isset($this->user))
        {
            $value = $this->user->find_lessons_cours($cours->id)/$cours->count_topic*100;
            $value_str = $this->user->find_lessons_cours($cours->id)." / ".$cours->count_topic;
            $content.='<div class="mx-auto progress col-11" role="progressbar" aria-label="Example with label" aria-valuenow="'.$value.'" aria-valuemin="0" aria-valuemax="100">';
            $content.='<div class="progress-bar " style="width: '.$value.'%">'.$value_str.'</div>';
            $content.='</div>';

        }
        $content.='  </div>';

        $content.='</div>';
        $content.='</a>';
        echo $content;
    }
    function list_($courses)
    {
        echo '<h2 class="px-4 mt-5" style="font-weight:bold" >Популярные темы</h2>';
        echo '<div class="row ">';
        foreach ($courses as $cours)
        {
            echo '<div class=" col-xxl-3 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12  ">';
            $this->item($cours);
            echo '</div>';
        }
        echo '</div>';

    }
    public function item($cours)
    {
        $content='<a class="link-dark" style="text-decoration:none;" href="../'.$cours->cours_translit.'/'.$cours->translit.'">';
        $content.='<div class="card p-2 m-2 my_border" style="height: 150px" >';
        $content.='  <div class="row ">';
        //$content.='    <div class="col-4">';
        //$content.='      <img src="'.$cours->picture.'" style="height:100px; width:125px" alt="...">';
        //$content.='    </div>';
        $content.='    <div class=" mx-auto col-12">';
        $content.='      <div class="  card-body ">';
        $content.='        <h3 style="font-weight:bold" class="card-title">'.$cours->name.'</h3>';
        $content.='        <p class="card-text">'.$cours->cours_name.'/'.$cours->chapter_name.'</p>';
        $content.='        <p class="card-text"> Прошли: '.$cours->counter.' человек</p>';
        // $content.='        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>';
        $content.='      </div>';
        $content.='    </div>';
        $content.='  </div>';
        $content.='</div>';
        $content.='</a>';
        echo $content;
    }
    public function show_topics($courses)
    {
        $content='<h2 class="px-4 mt-5" style="font-weight:bold" >Популярные темы</h2>';
        $content.='<ol class="list-group list-group-numbered">';
        foreach ($courses as $cours)
        {
            $content.='<a class="link-dark" style="text-decoration:none;" href="../'.$cours->cours_translit.'/'.$cours->translit.'">';
            $content.='<li class="list-group-item d-flex justify-content-between align-items-start">';
            $content.='    <div class="ms-2 me-auto">';
            $content.='      <div class="fw-bold">'.$cours->name.'</div>';
            $content.=      $cours->cours_name.'/'.$cours->chapter_name;
            $content.='    </div>';
            $content.='    <span class="badge bg-primary rounded-pill">'.$cours->counter.'</span>';
            $content.='  </li></a>';
        }


        $content.='</ol>';
        echo $content;
    }
    public function show_leaders($users)
    {
        $content='<h2 class="px-4 mt-5" style="font-weight:bold" >Лидеры </h2>';
        $content.='<ol class="list-group list-group-numbered">';
        foreach ($users as $user)
        {
            $content.='<li class="list-group-item d-flex justify-content-between align-items-start">';
            $content.='    <div class="ms-2 me-auto">';
            $content.='      <span class="fw-bold">'.$user->user_name.'</span>';
            //$content.='      Пройдено тем '.$user->counter.'   ';
            $content.='    </div>';
            $content.='    <span class="badge bg-primary rounded-pill">'.$user->counter.'</span>';
            $content.='  </li>';
        }


        $content.='</ol>';
        echo $content;
    }
}
