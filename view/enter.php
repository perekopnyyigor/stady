<?php
require_once "view.php";
class Enter extends View
{
    function main()
    {
        $this->includ();
        $this->navbar();
        $this->form();
        echo "enter";
    }
    private function form()
    {
        echo '


    
   <body class="text-center">
        <main class="form-signin w-100 m-auto">
          <form method="POST" enctype="multipart/form-data" action="../index.php?action=enter_action">
            
            <h1 class="h3 mb-3 fw-normal">Вход</h1>
        
            <div class="form-floating">
              <input  class="form-control" id="floatingInput" placeholder="name@example.com" name="login">
              <label for="floatingInput">Login</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password">
              <label for="floatingPassword">Password</label>
            </div>
        
            <div class="checkbox mb-3">
            
            </div>
            <button class="w-100 btn btn-lg btn-primary mt-2" type="submit">Войти</button>           
          </form>
          
          <form method="POST" enctype="multipart/form-data" action="../index.php?action=reg">
            
            
            <button class="w-100 btn btn-lg btn-primary mt-4" type="submit">Регистрация</button>           
          </form>
          <form method="POST" enctype="multipart/form-data" action="../index.php?action=google_auto">
            
            
            <button class="w-100 btn btn-lg btn-primary mt-4" type="submit">Войти через Google</button>           
          </form>
        </main>
        </body>
        
        
        ';
    }
    public function get_data()
    {
        $obj = new stdClass();
        $obj->login = $_POST["login"];
        $obj->password=$_POST["password"];

        return $obj;

    }
}
