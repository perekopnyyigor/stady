<?php
require_once "view.php";
class Cours extends View
{
    function main($cours,$topic="")
    {

        $this->including($cours,$topic);

        $this->navbar();

        $this->list_chapters($cours,$topic);
    }
    function including($cours,$topic)
    {
        echo '
        <!DOCTYPE HTML>
        <html lang="">
        <head>
        <meta name="google-site-verification" content="BH4EEAs4PRSW5c0Wbr3tiUtY_KxAF-c" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <script src="../js/bootstrap.min.js"></script>
        <script src="../js/bootstrap.bundle.min.js"></script>   
          <script src="../model_js/model.js"></script>         
          <script src="../controller_js/test_controller.js"></script>         
          <script src="../pages_js/test.js"></script>
          <script src="../pages_js/cours.js"></script> 
          <script src="../controller_js/cours_controller.js"></script>
        
         
        <link rel="stylesheet" href="../css/bootstrap.min.css" type="text/css"/>
        <link rel="stylesheet" href="../Katex/katex.min.css">
        <script src="../Katex/katex.min.js"></script>   
        <script src="../pages_js/card_code.js"></script>
        <script src="../controller_js/card_code_controller.js"></script>
           
     <link rel="stylesheet" href="../Code/styles/color-brewer.min.css">
    <script src="../Code/highlight.min.js"></script>

     <meta charset="utf-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1">';
            
     $this->seo($cours,$topic);
     $this->count();
     echo '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
     <link href="https://fonts.googleapis.com/css?family=Droid+Sans:400,700" rel="stylesheet">
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.8.1/baguetteBox.min.css">
                
                
                <link rel="stylesheet" href="../css/list.css">
                <link rel="stylesheet" href="../css/style.css">
       </head>
        <body>
';
    }
    function seo($cours,$top)
    {

        if($top!=null)
        {
            echo '<title>'.$top->name.'</title>';
            echo '<meta name="description" content="'.$top->name.' тесты">';
            echo ' <link rel="canonical" href="https://studycard.ru/'.$cours->translit.'/'.$top->translit.'">';
        }
        else
        {
            echo '<title>'.$cours->name.'</title>';
            echo ' <link rel="canonical" href="https://studycard.ru/'.$cours->translit.'" >';
            echo '<meta name="description" content="'.$cours->description.'">';
        }
        echo '<script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "'.$cours->name.'",
            "description": "'.$cours->description.'",
            "provider": {
            "@type": "Organization",
            "name": "studycard.ru",
            "sameAs": "https://studycard.ru"
          }
        }
        </script>';
        $picture='';

            if ($top->cards[0]->picture!=null)
                $picture=$top->cards[0]->picture[0];
        $picture=str_replace("../","https://studycard.ru/",$picture);

        if($top!=null) {
            echo '
        <meta property="og:title" content="'.$top->name.'"/>
        <meta property="og:description" content="'.$top->name.' тестирование и практика"/>
        <meta property="og:image" content="'.$picture.'"/>
        <meta property="og:type" content="article"/>
        <meta property="og:url" content= "https://studycard.ru/'.$cours->translit.'/'.$top->translit.'" />
        ';
        }

    }
    function breadcrumb($cours,$top="")
    {
        $result='';

        $result.='<nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'8\' height=\'8\'%3E%3Cpath d=\'M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z\' fill=\'%236c757d\'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">';

        $result.='<ol class="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">';

        $result.=' <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" class="breadcrumb-item my-1">';
        $result.='<a href="../" itemprop="item" ><span itemprop="name">Главная</span><meta itemprop="position" content="0"></a></li>';

        $result.='  <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" class="breadcrumb-item my-1">';
         $result.='<a itemprop="item" href="../'.$cours->translit.'"><span itemprop="name">'.$cours->name.'</span><meta itemprop="position" content="1"></a></li>';

        if ($top!="")
        {
            $result.='  <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" class="breadcrumb-item my-1">';
            $result.='<a itemprop="item" href="../'.$cours->translit.'/'.$top->translit.'"><span itemprop="name">'.$top->name.'</span><meta itemprop="position" content="2"></a></li>';

        }

        $result.='</ol>';
        $result.='</nav>';

        echo $result;
    }
    function menu($cours)
    {
        echo '<div class="row">';
        echo "<div class=' col-lg-3 col-md-4 col-12 '>";
        //echo '<h2 style="font-weight:bold" class="m-4">Курс: '.$cours->name.'</h2>';

        foreach ($cours->chapters as $chapter)
        {

            echo '<div class="list-group d-none d-md-block">';
            echo '<div class="list-group-item list-group-item-info" aria-current="true">';
            echo '<h3 style="font-weight:bold" class="m-lg-3 p-0">'.$chapter->name.'</h3></div>';
            foreach ($chapter->topics as $topic)
            {
                echo '<a class="list-group-item list-group-item-action" href="../'.$cours->translit.'/'.$topic->translit.'">';
                echo '<h3 style="font-weight:bold" class="m-lg-3">'.$topic->name.'</h3></a>';

            }

            echo "</div>";

        }


        /*echo '
            <div class="dropdown d-block d-md-none w-100">
              <button class="btn btn-primary btn-lg dropdown-toggle w-100"  type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span  style="font-weight:bold" >  Выберите тему </span>
              </button>
              <div class="dropdown-menu">';


        foreach ($cours->chapters as $chapter)
        {

            echo '<div class="list-group">';
            echo '<div class="list-group-item list-group-item-action active" aria-current="true"> '.$chapter->name.'</div>';
            foreach ($chapter->topics as $topic)
            {
                echo '<a class="list-group-item list-group-item-action" href="../index.php?action=open_topic&topic_id='.$topic->id.'&cours_id='.$cours->id.'">'.$topic->name.'</a>';

            }
            echo "</div>";

        }

        echo '</div>';
        echo '</div>';*/

        echo "</div>";
    }

    function button_back($cours="",$top="")
    {
        $href="../";
        if($top!="")
            $href="../".$cours->translit;
        $result='';
        $result.='<a class="mx-2" style="float: left" href="'.$href.'"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg></a>';
        echo $result;
    }

    function list_chapters($cours,$top="")
    {
        $user = new User($_SESSION["id"]);

        echo '<div class="">';
        echo '<div class="col-xl-2 col-lg-2 col-md-1 "></div>';
        echo '<div class="mx-auto  col-xl-8 col-lg-8 col-md-10 ">';
        ;
        $this->menu($cours);

        echo "<div id ='test' class='col-lg-9 col-md-8 col-12'>";
        $this->breadcrumb($cours,$top);
        echo "<section itemscope itemtype=\"http://schema.org/Article\">";
        if ($top!="" && $top!=null )
        {
            $this->button_back($cours,$top);
            echo '<h1 style="font-weight:bold"   itemprop="headline" class="m-4">'.$top->name.'</h1><br>';
            $this->hint($user,$cours);

            for($i=0;$i<count($top->cards);$i++)
            {
                echo ' <div class="card shadow mb-3">';
                echo ' <h2 itemprop="alternativeHeadline" style="font-weight:bold" class="mx-3" class="card-title">'.$top->cards[$i]->name.'</h2>';
                echo '  <div class="card-body ">';

                if($top->cards[$i]->picture!=null)
                {
                    //echo '<img width="200px" src="'.$top->cards[$i]->picture.'">';/*
                    for($j=0;$j<count($top->cards[$i]->picture);$j++)
                    {
                        echo '<img alt="'.$top->name.'" title="'.$top->name.'" width="200px" src="'.$top->cards[$i]->picture[$j].'">';
                    }
                }

                echo ' <div itemprop="articleBody" class="card-text" >'.$top->cards[$i]->task.'</div>';
                echo '<br>';
                echo ' <div itemprop="articleBody" class="card-text" >';
                if($top->cards[$i]->type == 2)
                    echo '   <formula>'.$top->cards[$i]->content.'</formula>';
                else if($top->cards[$i]->type == 1)
                    echo $top->cards[$i]->content;
                else if($top->cards[$i]->type == 3)
                    echo "<pre><code id='view' itemprop='articleBody' class='".$top->cards[$i]->language."' >".$top->cards[$i]->content."</code></pre>";

                echo '</div>';
                echo '</div>';
                echo '</div>';



            }

            //echo '<button id="'.$top->id.'" class=" btn btn-primary btn-lg" onclick="TestController.onload(this)"> <span  style="font-weight:bold" >Пройти тест</span></button>';
            echo ' <h2 itemprop="alternativeHeadline" style="font-weight:bold" class="mx-3">Пройдите тест на закрепление</h2>';
            $this->button_subscrid($cours,$top->id);
            echo "</div>";
        }
        else
        {
            echo $this->description($cours);//описание курса

        }



        echo "</div></div></div>";
        echo "<script >";
        echo '
                    let formula = document.getElementsByTagName("formula");
                      
                      
                        for (let i = 0; i < formula.length; i++)
                        {
                            let text = formula[i].innerHTML;
                            
                            katex.render(text, formula[i]);
                        }
                       hljs.highlightAll();     
                      
                    ';
        echo "</script>";

    }
    public function button_subscrid($cours,$top_id)
    {
        $_SESSION["back"]=$_SERVER['REQUEST_URI'];


        echo '
                <input type="hidden" id="cours_id" value="'.$cours->id.'">
                <input type="hidden" id="topic_id" value="'.$top_id.'">
                
                <button onclick="TestController.onload(this)" id="'.$top_id.'" class=" btn  btn-primary btn-lg " type="submit"> <span  style="font-weight:bold" >Пройти тест</span></button>                
               ';

    }
    public function description($cours)
    {
        $this->button_back();
        $content='<h1 style="font-weight:bold" class="m-4">Описание курса</h1>';

        $content.='<div class="card mb-3" style="">';
        $content.='<a class="link-dark" style="text-decoration:none;" href="../'.$cours->translit.'/'.$cours->chapters[0]->topics[0]->translit.'">';
        $content.='  <div class="row">';
        $content.='    <div class="col-5 m-2">';
        $content.='      <img src="'.$cours->picture.'" class="img-fluid rounded-start" alt="...">';
        $content.='    </div>';
        $content.='    <div class="col-6">';
        $content.='      <div class="card-body">';
        $content.='        <h2 style="font-weight:bold" class="card-title">'.$cours->name.'</h2>';
        $content.='        <p class="card-text">'.$cours->description.'</p>';
        $content.='      </div>';

        $content.='    </div>';

        $content.='  </div>';

        $content.='</a>';
        $content.='</div>';

        $content.=$this->list_for_description($cours);
        return $content;
    }

    public function list_for_description($cours)
    {
        $result='';
        $result.='<h2 style="font-weight:bold" class="m-4 d-block d-md-none">Основные темы</h2>';
        foreach ($cours->chapters as $chapter)
        {

            $result.='<ul class="list-group d-block d-md-none">';
            $result.= '<li style="font-weight:bold" class="list-group-item list-group-item-info">'.$chapter->name.'  </li>';
            foreach ($chapter->topics as $topic)
            {
                $result.= '<a class="list-group-item list-group-item-action"  href="../'.$cours->translit.'/'.$topic->translit.'">'.$topic->name.'</a>';

            }

            $result.=  "</ul>";

        }
        return $result;
    }
    public function hint($user, $cours)
    {
        if(!isset($_SESSION["id"]))
        {
            echo '<div class="alert alert-primary" role="alert">
                Чтобы пройти тест авторизируйтсь 
            </div>';
        }
        else
        {
            echo '<div class="alert alert-primary" role="alert">
                Изучите все пункты а затем пройдите тест на закрепление   
            </div>';
        }
    }

}
