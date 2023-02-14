<?php

require_once 'database.php';
require_once 'chapter.php';
class User
{
    public $id;
    public $name;


    static function add($user)
    {

        $database = new Database();

        $database->connect();


        if ($user->password1 != $user->password2)
        {
            $result = "Пароли не совпадают";
            echo '<script>alert("'.$result.'");';
            echo 'location.href = "../index.php?action=reg";</script>';
        }

        else if($user->login==null || $user->password1==null || $user->password2==null)
        {
            $result = "Не все поля заполнены";
            echo '<script>alert("'.$result.'");';
            echo 'location.href = "../index.php?action=reg";</script>';
        }

        else if ($database->select("id","user","WHERE name ='".$user->login."'")!=null)
        {
            $result = "Пользователь с таким именем уже зарегистрирован";
            echo '<script>alert("'.$result.'");';
            echo 'location.href = "../index.php?action=reg";</script>';
        }
        else
        {
            $password = md5($user->password1);
            $sql = "INSERT INTO user (name, password) VALUES ('".$user->login."','".$password."')";
            $result = $database->conn->query($sql);
            // Check
            if ($database->conn->error)
            {
                die("failed: " . $database->conn->error);
            }
            //$result = "Добро пожаловать";

            $id = database::select_one_stat("id","user","WHERE name ='".$user->login."'");
            $admin = database::select_one_stat("admin","user","WHERE name ='".$user->login."'");
            $rewiev = User::iSrewiev($id);
            echo '<script>
                localStorage.setItem("id",'.$id.');
                localStorage.setItem("admin",'.$admin.');
                localStorage.setItem("rewiev",'.$rewiev.');
                
            </script>';
            $_SESSION["id"]=$id;

            if(isset($_SESSION["back"]))
            {
                $user=new User($id);
                $user->subscrib($_SESSION["cours"]);
                echo '<script>location.href="'.$_SESSION["back"].'";</script>';
            }
            else
                echo '<script>location.href="../index.php";</script>';

        }
       ;
        return $result;
    }
    static function enter($user)
    {



        $password = database::select_one_stat("password","user","WHERE name ='".$user->login."'");

        if(md5($user->password)==$password)
        {
            $id = database::select_one_stat("id","user","WHERE name ='".$user->login."'");
            $admin = database::select_one_stat("admin","user","WHERE name ='".$user->login."'");
            $rewiev = User::iSrewiev($id);

            $result = "Добро пожаловать";

            echo '
              <script>
                localStorage.setItem("id",'.$id.');
                localStorage.setItem("admin",'.$admin.');
                localStorage.setItem("rewiev",'.$rewiev.');                             
            </script>';
            $_SESSION["id"]=$id;

            if(isset($_SESSION["back"]))
            {
                $user=new User($id);
                $user->subscrib($_SESSION["cours"]);
                echo '<script>location.href="'.$_SESSION["back"].'";</script>';
            }
            else
                echo '<script>location.href="../index.php";</script>';
        }
        else
        {
            $result = "Неправельный логин или пароль";
            echo '<script>alert("'.$result.'");';
            echo 'location.href = "../index.php?action=enter";</script>';
        }


    }

    function __construct($id)
    {
        /*$database = new Database();
        $this->id=$id;
        $this->name=$database->select_one("name","user","WHERE id ='".$id."'");
        $this->password=$database->select_one("password","user","WHERE id ='".$id."'");
        $this->admin=$database->select_one("admin","user","WHERE id ='".$id."'");*/
        $this->id=$id;
        $this->name=database::select_one_stat("name","user","WHERE id ='".$id."'");
        $this->password=database::select_one_stat("password","user","WHERE id ='".$id."'");
        $this->admin=database::select_one_stat("admin","user","WHERE id ='".$id."'");
        $this->iSrewiev = User::iSrewiev($id);
    }

    public function course()
    {

        $course_id = database::select_stat("id", "cours", "Where user=".$this->id);
        $cousers=[];

        for ($i=0;$i<count($course_id);$i++)
        {
            $cousers[] = new CoursObj($course_id[$i]);
        }
        return json_encode($cousers);
    }

    public function find_courses()
    {

        $chapters_id = database::select_stat("cours", "subscribtion", "Where user=".$this->id);
        $chapters=[];

        for ($i=0;$i<count($chapters_id);$i++)
        {
            $chapters[] = new CoursObj($chapters_id[$i]);
        }
        return json_encode($chapters);
    }
    public function find_lessons()
    {

        $lesson_id = database::select_stat("id", "lesson", "Where user=".$this->id);
        $lessons=[];

        for ($i=0;$i<count($lesson_id);$i++)
        {
            $lessons[] = new Lesson($lesson_id[$i]);
        }
        return json_encode($lessons);
    }
    public function subscrib($course_id)
    {

        $id = database::select_one_stat("id","subscribtion","WHERE cours ='".$course_id."' AND user ='".$this->id."'");
        $result="";
        if($id==null)
        {
            $database = new Database();

            $database->connect();
            $sql = "INSERT INTO subscribtion (user, cours) VALUES ('".$this->id."','".$course_id."')";
            $result = $database->conn->query($sql);
            // Check
            if ($database->conn->error)
            {
                die("failed: " . $database->conn->error);
            }
            $result="Вы подписались на курс";
        }
        else
        {
            $result="Вы уже подписаны на данный курс";
        }
        //echo '<script>alert("'.$result.'")</script>';
    }
    public function iSsubscrib($course_id)
    {
        //$database = new Database();

        //$database->connect();
        $id = database::select_one_stat("id","subscribtion","WHERE cours ='".$course_id."' AND user ='".$this->id."'");
        $result="";
        if($id==null)
        {
            return false;
        }
        else
        {
            return true;
        }

    }
    static function iSrewiev($id)
    {

        $id = database::select_one_stat("id","rewiev","WHERE user ='".$id."'");
        $result="";
        if($id==null)
        {
            return 0;
        }
        else
        {
            return 1;
        }

    }
    public function lesson($topic_id)
    {



        $id = database::select_one_stat("id","lesson","WHERE topic ='".$topic_id."' AND user ='".$this->id."'");
        $result="";
        if($id==null)
        {
            $database = new Database();
            $now = date('Y-m-d');
            $database->connect();
            $sql = "INSERT INTO lesson (user, topic,date ,date_next) VALUES ('".$this->id."','".$topic_id."','".$now."','".$now."')";
            $result = $database->conn->query($sql);
            // Check
            if ($database->conn->error)
            {
                die("failed: " . $database->conn->error);
            }
            $result="Вы подписались на курс";
        }
        else
        {
            $result="Вы уже подписаны на данный курс";
        }
    }
    public function add_rewiev($content)
    {
        $database = new Database();
        $database->connect();
        $sql = "INSERT INTO rewiev (content, user) VALUES ('".$content."','".$this->id."')";
        $result = $database->conn->query($sql);
        // Check
        if ($database->conn->error)
        {
            die("failed: " . $database->conn->error);
        }
    }





}
