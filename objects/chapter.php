<?php
require_once 'database.php';
require_once 'chapter.php';
require_once 'topic.php';
class Chapter
{
    public $id;
    public $name;
    public $user;
    public $topics;

    static function add($data_json)
    {

        $database = new Database();

        $database->connect();

        $data=json_decode($data_json);

        $sql = "INSERT INTO chapter (name, cours) VALUES ('".$data->chapter_name."','".$data->cours_id."')";
            $result = $database->conn->query($sql);
            // Check
        if ($database->conn->error)
        {
            die("failed: " . $database->conn->error);
        }

    }
    static function find_all()
    {
        $database = new Database();
        $cours_id = $database->select("id", "chapter");
        $cours=[];
        for ($i=0;$i<count($cours_id);$i++)
        {
            $cours[$i] = new Chapter($cours_id[$i]);
        }

        return $cours;
    }

    static function enter($user)
    {
        $database = new Database();


        $password = $database->select_one("password","user","WHERE name ='".$user->login."'");

        if(md5($user->password)==$password)
        {
            $id = $database->select_one("id","user","WHERE name ='".$user->login."'");

            $result = "Добро пожаловать";
            $_SESSION["id"]=$id;
            header("Location:../index.php?action=cabinet");
        }
        else
        {
            $result="Неправильный логин или пароль";
        }
        echo '<script>alert("'.$result.'")</script>';

    }
    function __construct($id)
    {
        $database = new Database();
        $this->id=$id;
        $this->name=$database->select_one("name","chapter","WHERE id ='".$id."'");
        $this->user=$database->select_one("user","chapter","WHERE id ='".$id."'");
        $this->topics=$this->find_topics();
    }
    public function find_topics()
    {
        $database = new Database();
        $topics_id = $database->select("id", "topic", "Where chapter=".$this->id);
        $topics=[];
        for ($i=0;$i<count($topics_id);$i++)
        {
            $topics[$i] = new Topic($topics_id[$i]);
        }

        return $topics;
    }
    public function delete()
    {

        $database = new Database();
        $topics_id = $database->select("id", "topic", "Where chapter=".$this->id);

        for ($i=0;$i<count($topics_id);$i++)
        {
            $topic = new Topic($topics_id[$i]);
            $topic->delete();
        }

        $database = new Database();
        $database->connect();

        $sql = "DELETE FROM chapter WHERE id = '$this->id'";

        $result = $database->conn->query($sql);

        // Check
        if ($database->conn->error)
        {
            die("failed: " . $database->conn->error);
        }
    }

}