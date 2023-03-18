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

                echo '<script>location.href="'.$_SESSION["back"].'";</script>';
            }
            else
                echo '<script>location.href="../";</script>';

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
                echo '<script>location.href="'.$_SESSION["back"].'";</script>';
            }
            else
                echo '<script>location.href="../";</script>';
        }
        else
        {
            $result = "Неверный логин или пароль";
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
    public function find_lessons_cours($cours_id)
    {
        $lesson_id = database::select_stat("id", "lesson", "Where user=".$this->id);
        $lessons=[];
        $count=0;
        for ($i=0;$i<count($lesson_id);$i++)
        {
            $lessons[$i] = new Lesson($lesson_id[$i]);
            if($lessons[$i]->cours==$cours_id)
                $count++;
        }
        return $count;
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
            $sql = "INSERT INTO lesson (user, topic,date ,date_next, period ) VALUES ('".$this->id."','".$topic_id."','".$now."','".$now."',0)";
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
    static function top()
    {
        //database::connect_stat();
        $objs = database::count("user","lesson");

        $users=[];
        for($i=0;$i<10;$i++)
        {
            $users[$i]->user_name=database::select_one_stat("name","user","WHERE id ='".$objs[$i]->id."'");
            $users[$i]->counter=$objs[$i]->count;
        }
        return $users;
    }
    public function distribut()
    {
        $lesson_id = database::select_stat("id", "lesson", "Where user=".$this->id);
        $lessons=[];

        $date= date('Y-m-d');
        $date_next=new DateTime($date);


        for ($i=0;$i<count($lesson_id);$i++)
        {
            $lessons[$i] = new Lesson($lesson_id[$i]);
        }


        for ($j = 0; $j < count($lessons) - 1; $j++){
            for ($i = 0; $i < count($lessons) - $j - 1; $i++){
                // если текущий элемент больше следующего
                if ($lessons[$i]->raiting > $lessons[$i + 1]->raiting){
                    // меняем местами элементы
                    $tmp_var = $lessons[$i + 1];
                    $lessons[$i + 1] = $lessons[$i];
                    $lessons[$i] = $tmp_var;
                }
            }
        }

        $count=0;
        $day=0;
        while ($count<count($lessons))
        {

            echo $date_next->format('Y-m-d')."<br>";
            for ($j=0;$j<3;$j++)
            {
                if($this->calculate($lessons[$count],$date_next))
                {
                    $lessons[$count]->change_data($date_next);


                }



                $count++;
            }
            $date_next->add(new DateInterval('P1D'));
        }


    }
    public function calculate($lesson,$date)
    {
        $result=false;

        $period = pow(2,$lesson->period)-1;
        $date_allow=0;

        if($period == 31)
            $date_allow=7;
        if($period == 15)
            $date_allow=3;
        if($period == 7)
            $date_allow=1;

        $diff = date_diff($date,new DateTime($lesson->date_next))->days;

        if($lesson->days>0)
        {
            echo $diff."/".$date_allow."/".$lesson->topic_name."<br>";
            if($date_allow>$diff)
                $result=true;
        }
        if($lesson->days<0)
        {

                $result=true;
        }
        return $result;
    }
    public function distribut_data()
    {
        $lesson_id = database::select_stat("id", "lesson", "Where user=".$this->id);
        $lessons=[];


        for ($i=0;$i<count($lesson_id);$i++)
        {
            $lessons[$i] = new Lesson($lesson_id[$i]);
            $date =new DateTime($lessons[$i]->date);
            $days = pow(2,$lessons[$i]->period)-1;
            $date->add(new DateInterval('P'.$days.'D'));
            $lessons[$i]->change_data($date);
        }

    }






}
