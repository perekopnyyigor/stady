<?php
require_once 'database.php';
require_once 'chapter.php';
require_once 'card.php';
class Topic
{
    public $id;
    public $name;
    public $chapter;
    public $cards;
    public $cours;

    static function add($data_json)
    {

        $database = new Database();

        $database->connect();

        $data=json_decode($data_json);

        $sql = "INSERT INTO topic (name, chapter) VALUES ('".$data->topic_name."','".$data->chapter_id."')";
            $result = $database->conn->query($sql);
            // Check
        if ($database->conn->error)
        {
            die("failed: " . $database->conn->error);
        }

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
    function __construct($id,$on_content=false)
    {
        $database = new Database();
        $this->id=$id;
        $this->name=$database->select_one("name","topic","WHERE id ='".$id."'");
        $this->chapter=$database->select_one("chapter","topic","WHERE id ='".$id."'");
        $this->cours=$database->select_one("cours","chapter","WHERE id ='".$this->chapter."'");
        $this->cards=$this->find_cards($on_content);
    }
    public function find_cards($on_content=false)
    {
        $database = new Database();
        $topics_id = $database->select("id", "card", "Where topic=".$this->id);
        $topics=[];
        for ($i=0;$i<count($topics_id);$i++)
        {
            $topics[$i] = new Card($topics_id[$i],$on_content);
        }

        return $topics;
    }
    public function delete()
    {

        $database = new Database();
        $cards_id = $database->select("id", "card", "Where topic=".$this->id);

        for ($i=0;$i<count($cards_id);$i++)
        {
            $cards = new Card($cards_id[$i]);
            $cards->delete();
        }

        $database = new Database();
        $database->connect();

        $sql = "DELETE FROM topic WHERE id = '$this->id'";

        $result = $database->conn->query($sql);

        // Check
        if ($database->conn->error)
        {
            die("failed: " . $database->conn->error);
        }
    }
}