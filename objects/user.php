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
            $result = "Пароли не совпадают";
        else if($user->login==null || $user->password1==null || $user->password2==null)
            $result = "Не все поля заполнены";
        else if ($database->select("id","user","WHERE name ='".$user->login."'")!=null)
        {
            $result = "Пользователь с таким именем уже зарегистрирован";
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
            $result = "Пользователь зарегистрирован";
        }
        echo '<script>alert("'.$result.'")</script>';
        return $result;
    }
    static function enter($user)
    {
        $database = new Database();


        $password = $database->select_one("password","user","WHERE name ='".$user->login."'");

        if(md5($user->password)==$password)
        {
            $id = $database->select_one("id","user","WHERE name ='".$user->login."'");
            $admin = $database->select_one("admin","user","WHERE name ='".$user->login."'");
            $result = "Добро пожаловать";
            $_SESSION["id"]=$id;
            echo '<script>
                localStorage.setItem("id",'.$id.');
                localStorage.setItem("admin",'.$admin.');
                alert("'.$result.'");
                location.href = "/index.php?action=cabinet";
            </script>';
            //header("Location:../index.php?action=cabinet");
        }
        else
        {
            $result="Неправильный логин или пароль";
        }


    }

    function __construct($id)
    {
        $database = new Database();
        $this->id=$id;
        $this->name=$database->select_one("name","user","WHERE id ='".$id."'");
        $this->password=$database->select_one("password","user","WHERE id ='".$id."'");
        $this->admin=$database->select_one("admin","user","WHERE id ='".$id."'");
    }

    public function course()
    {
        $database = new Database();
        $course_id = $database->select("id", "cours", "Where user=".$this->id);
        $cousers=[];

        for ($i=0;$i<count($course_id);$i++)
        {
            $cousers[] = new CoursObj($course_id[$i]);
        }
        return json_encode($cousers);
    }

    public function find_courses()
    {
        $database = new Database();
        $chapters_id = $database->select("cours", "subscribtion", "Where user=".$this->id);
        $chapters=[];

        for ($i=0;$i<count($chapters_id);$i++)
        {
            $chapters[] = new CoursObj($chapters_id[$i]);
        }
        return json_encode($chapters);
    }
    public function find_lessons()
    {
        $database = new Database();
        $lesson_id = $database->select("id", "lesson", "Where user=".$this->id);
        $lessons=[];

        for ($i=0;$i<count($lesson_id);$i++)
        {
            $lessons[] = new Lesson($lesson_id[$i]);
        }
        return json_encode($lessons);
    }
    public function subscrib($course_id)
    {
        $database = new Database();

        $database->connect();
        $id = $database->select_one("id","subscribtion","WHERE cours ='".$course_id."' AND user ='".$this->id."'");
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
        echo '<script>alert("'.$result.'")</script>';
    }
    public function iSsubscrib($course_id)
    {
        $database = new Database();

        $database->connect();
        $id = $database->select_one("id","subscribtion","WHERE cours ='".$course_id."' AND user ='".$this->id."'");
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
    public function lesson($topic_id)
    {
        $database = new Database();

        $database->connect();
        $id = $database->select_one("id","lesson","WHERE topic ='".$topic_id."' AND user ='".$this->id."'");
        $result="";
        if($id==null)
        {
            $database = new Database();

            $database->connect();
            $sql = "INSERT INTO lesson (user, topic) VALUES ('".$this->id."','".$topic_id."')";
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
