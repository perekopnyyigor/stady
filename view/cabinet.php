<?php
require_once 'view.php';
class Cabinet extends View
{
    public function main($user)
    {

        $this->includ();
        $this->count();
        $this->navbar();
        $this->dashboard($user);
    }
    private function dashboard($user)
    {
        echo '<div id="first" class="row">';
        //echo "<div class='mx-auto  col-xxl-6 col-xl-8 col-lg-10 col-md-12'>";
        echo '<div class="mx-auto  col-xl-8 col-lg-8 col-md-10 ">';

        echo '<div class="row">';

        echo "<div class=' col-lg-3 col-md-4 col-12 '>";
        echo '<h1 style="font-weight:bold" class="m-lg-3">Кабинет</h1>';
        echo "<div id='menu' ></div>";
        echo '</div>';

        echo "<div  class='col-lg-9 col-md-8 col-12'>";
        echo '<h2 id="name" style="font-weight:bold" class="m-lg-3"></h2>';
        echo "<div id='main' ></div>";
        echo '</div>';
        echo'                     
               <script >
               let cabinetController = new CabinetController();
               cabinetController.onload();
                </script>
      ';
    }
}