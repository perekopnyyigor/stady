<?php
abstract class View
{
    function count()
    {
        echo '<!-- Yandex.Metrika counter -->
        <script type="text/javascript" >
           (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
           m[i].l=1*new Date();
           for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
           k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
           (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        
           ym(92455698, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true
           });
        </script>
        <noscript><div><img src="https://mc.yandex.ru/watch/92455698" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->';
    }
    function includ()
    {
        echo '
        <!DOCTYPE HTML>
        <html lang="">
        
        <head>
        <meta name="google-site-verification" content="BH4EEAs4PRSW5c0Wbr3tiUtY_KxAF-c" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <script src="../js/bootstrap.min.js"></script>
        <script src="../js/bootstrap.bundle.min.js"></script>
         <script src="../controller_js/cabinet_controller.js"></script>
          <script src="../pages_js/cabinet.js"></script>
          <script src="../pages_js/create_card.js"></script>
          <script src="../model_js/model.js"></script>
          <script src="../controller_js/create_card_controller.js"></script>
          <script src="../controller_js/test_controller.js"></script>
          <script src="../pages_js/my_cours.js"></script>
          <script src="../pages_js/test.js"></script>
          <script src="../pages_js/cours.js"></script>
          <script src="../pages_js/boxes.js"></script>
          <script src="../pages_js/chapter.js"></script>
          <script src="../pages_js/calendar.js"></script>
          <script src="../pages_js/instrument.js"></script>
           <script src="../pages_js/card_formula.js"></script>
           <script src="../pages_js/progress.js"></script>
           <script src="../controller_js/card_formuls_controller.js"></script>
           <script src="../controller_js/progress_controller.js"></script>
          <script src="../controller_js/calendar_controller.js"></script>
          <script src="../controller_js/cours_controller.js"></script>
          <script src="../controller_js/chapter_controller.js"></script>
          <script src="../controller_js/instrument_controller.js"></script>
        <link rel="stylesheet" href="../css/bootstrap.min.css" type="text/css"/>
        <link rel="stylesheet" href="../Katex/katex.min.css">
    <script src="../Katex/katex.min.js"></script>   
    <script src="../pages_js/card_code.js"></script>';
        $this->count();
           echo'<script src="../controller_js/card_code_controller.js"></script>
           
     <link rel="stylesheet" href="../Code/styles/color-brewer.min.css">
    <script src="../Code/highlight.min.js"></script>

        <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1">
            
                <title>Studycard</title>
            
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
                <link href="https://fonts.googleapis.com/css?family=Droid+Sans:400,700" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.8.1/baguetteBox.min.css">
                  <!--  <link rel="stylesheet" href="../css/thumbnail-gallery.css">-->
                
                <link rel="stylesheet" href="../css/list.css">
                <link rel="stylesheet" href="../css/style.css">
       </head>
       <body>
       
        <style>
        body {
             
              align-items: center;
             
              padding-bottom: 40px;
            
            }
            
            .form-signin {
              max-width: 330px;
              padding: 15px;
            }
            
            .form-signin .form-floating:focus-within {
              z-index: 2;
            }
            
              .form-signin input {
              margin-bottom: -1px;
              margin-top: 10px;
              border-bottom-right-radius: 0;
              border-bottom-left-radius: 0;
            }
        </style>
        ';
    }

    /*function navbar()
    {
        echo '
        <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <div class="container-fluid">
            <a class="navbar-brand" href="../index.php?action=all_chapters">Главная</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">';
            if (!isset($_SESSION["id"]))
            {
                echo '
              <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                  <a href = "../" class="nav-link active" aria-current="page" href="#">Вход</a>
                </li>
                <li class="nav-item">
                  <a href = "../index.php?action=reg" class="nav-link active" aria-current="page" href="#">Регистрация</a>
                </li>
              </ul>  ';}
            if (isset($_SESSION["id"]))
            {echo '
              <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                  <a href = "../index.php?action=cabinet" class="nav-link active" aria-current="page" href="#">Кабинет</a>
                </li>
              </ul>  ';
            }
        echo '
            </div>
          </div>
        </nav>
        ';
    }*/
    function navbar()
    {
        echo '
        <nav class="navbar navbar-dark bg-dark " style="display: block">
         
            <a class="navbar-brand "  href="../">Главная</a>';
        if (!isset($_SESSION["id"]))
            echo '<a href = "../index.php?action=enter" class="navbar-brand">Вход</a>';
        if (isset($_SESSION["id"]))
            echo '<a href = "../index.php?action=cabinet" class="navbar-brand">Кабинет</a>';


        echo '
            
          </div>
        </nav>
        ';


    }
}
