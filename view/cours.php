<?php
require_once "view.php";
class Cours extends View
{
    function main($cours,$topic="")
    {
        $this->includ();
        $this->navbar();
        $this->list_chapters($cours,$topic);
    }
    function list_chapters($cours,$top="")
    {
        echo '<div class="row">';
        //echo "<div class='mx-auto  col-xxl-6 col-xl-8 col-lg-10 col-md-12'>";
        echo '<div class="mx-auto  col-xl-8 col-lg-8 col-md-10 ">';
        echo '<div class="row">';
        echo "<div class=' col-lg-3 col-md-4 col-12 '>";
        echo '<h2 style="font-weight:bold" class="m-lg-3">'.$cours->name.'</h2>';
        $user = new User($_SESSION["id"]);





        foreach ($cours->chapters as $chapter)
        {

            echo '<div class="list-group d-none d-md-block">';
            echo '<div class="list-group-item list-group-item-action active" aria-current="true">';
            echo '<h5 style="font-weight:bold" class="m-lg-3 p-0">'.$chapter->name.'</h5></div>';
            foreach ($chapter->topics as $topic)
            {
                echo '<a class="list-group-item list-group-item-action" href="../index.php?action=open_topic&topic_id='.$topic->id.'&cours_id='.$cours->id.'">';
                echo '<h5 style="font-weight:bold" class="m-lg-3">'.$topic->name.'</h5></a>';

            }
            echo "</div>";

        }


            echo '
            <div class="dropdown d-block d-md-none">
              <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Разделы
              </button>
              <div class="dropdown-menu">';


                foreach ($cours->chapters as $chapter)
                {

                    echo '<div class="list-group">';
                    echo '<div class="list-group-item list-group-item-action active" aria-current="true">'.$chapter->name.'</div>';
                    foreach ($chapter->topics as $topic)
                    {
                        echo '<a class="list-group-item list-group-item-action" href="../index.php?action=open_topic&topic_id='.$topic->id.'&cours_id='.$cours->id.'">'.$topic->name.'</a>';

                    }
                    echo "</div>";

                }

            echo '</div>';
            echo '</div>';


        
        echo "</div>";


        echo "<div id ='test' class='col-lg-9 col-md-8 col-12'>";
        if ($top!="" && $top!=null )
        {
            echo '<h2 style="font-weight:bold" class="m-lg-3">'.$top->name.'</h2><br>';

            for($i=0;$i<count($top->cards);$i++)
            {




                if($top->cards[$i]->type == 2)
                {

                    echo ' <div class="card shadow mb-3">';
                    echo '  <div class="card-header"><h4 style="font-weight:bold" class="m-lg-3">'.$top->cards[$i]->name.'</h4></div>';
                    echo '  <div class="card-body ">';
                    echo ' <div class="card-text">'.$top->cards[$i]->task.'</div>';
                     //echo '   <h4 class="card-title">'.$top->cards[$i]->name.'</h4>';
                     echo '   <formula class="card-text">'.$top->cards[$i]->content.'</formula>';
                     echo ' </div>';
                    echo '</div>';
                }
                else if($top->cards[$i]->type == 3)
                {


                    echo ' <div class="card shadow mb-3">';
                    echo '  <div class="card-header"><h4 style="font-weight:bold" class="m-lg-3">'.$top->cards[$i]->name.'</h4></div>';
                    echo '  <div class="card-body ">';
                    //echo '   <h4 class="card-title">'.$top->cards[$i]->name.'</h4>';
                    echo ' <div class="card-text">'.$top->cards[$i]->task.'</div>';
                    echo "<pre><code id='view' class='language-javascript'>".$top->cards[$i]->content."</code></pre>";
                    echo ' </div>';
                    echo '</div>';
                }
                else if($top->cards[$i]->type == 1)
                {
                    echo '<div class="card shadow mb-3" >';
                    echo '  <div class="card-header"><h4 style="font-weight:bold" class="m-lg-3">'.$top->cards[$i]->name.'</h4></div>';
                      echo '<div class="card-body ">';
                       //echo ' <h4 class="card-title">'.$top->cards[$i]->name.'</h4>';
                        if($top->cards[$i]->picture!=null)
                        {
                            //echo '<img width="200px" src="'.$top->cards[$i]->picture.'">';/*
                            for($j=0;$j<count($top->cards[$i]->picture);$j++)
                            {
                                echo '<img width="200px" src="'.$top->cards[$i]->picture[$j].'">';
                            }
                        }
                       echo ' <p class="card-text">'.$top->cards[$i]->task.'<br>';
                        echo $top->cards[$i]->content.'</p>';
                      echo '</div>';
                    echo ' </div>';



                }


            }
            if(!$user->iSsubscrib($cours->id))
            {
                echo '<form method="POST" enctype="multipart/form-data" action="../index.php?action=subscrib">
                <input type="hidden" name="cours_id" value="'.$cours->id.'">
                <button class="w-50 btn btn-sm btn-primary m-md-2" type="submit">Подписаться</button>                
                </form>';
            }
            if($user->iSsubscrib($cours->id))
                echo '<button id="'.$top->id.'" class="w-50 btn btn-sm btn-primary" onclick="TestController.onload(this)">Пройти тест</button>';

            echo "</div>";
        }
        else
        {
            echo '<h2 style="font-weight:bold" class="m-lg-3">Описание курса</h2>';
            echo $this->description($cours);
        }



        echo "</div></div></div>";
        echo "<script >";
        echo '
                    let formula = document.getElementsByTagName("formula");
                      
                      
                        for (let i = 0; i < formula.length; i++)
                        {
                            let text = formula[i].innerHTML;
                            text = text.replace("slash","\\\\");
                            katex.render(text, formula[i]);
                        }
                       hljs.highlightAll();     
                        hljs.highlightAll(); 
                    ';
        echo "</script>";

    }
    public function description($cours)
    {
        $content='';
        $content.='<div class="card mb-3" style="max-width: 540px;">';
        $content.='  <div class="row g-0">';
        $content.='    <div class="col-md-4">';
        $content.='      <img src="'.$cours->picture.'" class="img-fluid rounded-start" alt="...">';
        $content.='    </div>';
        $content.='    <div class="col-md-8">';
        $content.='      <div class="card-body">';
        $content.='        <h4 style="font-weight:bold" class="card-title">'.$cours->name.'</h4>';
        $content.='        <p class="card-text">'.$cours->description.'</p>';
       // $content.='        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>';
        $content.='      </div>';
        $content.='    </div>';
        $content.='  </div>';
        $content.='</div>';
        return $content;
    }

}