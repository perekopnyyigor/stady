<?php
require_once "view.php";
class Reg extends View
{
    function main()
    {
        $this->includ();
        $this->navbar();
        $this->form();
        echo "reg";
    }
    private function form()
    {
        echo '


    
       <body class="text-center">
            <main class="form-signin w-100 m-auto">
              <form method="POST" enctype="multipart/form-data" action="../index.php?action=reg_action">
               
                <h1 class="h3 mb-3 fw-normal">Регистрация</h1>
            
                <div class="form-floating">
                  <input class="form-control" id="floatingInput" placeholder="name@example.com" name="login">
                  <label for="floatingInput">Login</label>
                </div>
                
                <div class="form-floating">
                  <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password1">
                  
                </div>
                
                <div class="form-floating">
                  <input type="password" class="form-control" id="floatingPassword1" placeholder="Password" name="password2">
                 
                </div>
            
                <div class="checkbox mb-3">
                
                </div>
                <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
              </form>
            </main>
        </body>
        
       
        ';
    }
    public function get_data()
    {
        $obj = new stdClass();
        $obj->login = $_POST["login"];
        $obj->password1=$_POST["password1"];
        $obj->password2=$_POST["password2"];
        return $obj;

    }
}