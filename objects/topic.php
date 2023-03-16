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
        $translit = Topic::translit_sef($data->topic_name);
        $sql = "INSERT INTO topic (name, chapter, translit) VALUES ('".$data->topic_name."','".$data->chapter_id."','".$translit."')";
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
    static function translit_sef($value)
    {
        $converter = array(
            'а' => 'a',    'б' => 'b',    'в' => 'v',    'г' => 'g',    'д' => 'd',
            'е' => 'e',    'ё' => 'e',    'ж' => 'zh',   'з' => 'z',    'и' => 'i',
            'й' => 'y',    'к' => 'k',    'л' => 'l',    'м' => 'm',    'н' => 'n',
            'о' => 'o',    'п' => 'p',    'р' => 'r',    'с' => 's',    'т' => 't',
            'у' => 'u',    'ф' => 'f',    'х' => 'h',    'ц' => 'c',    'ч' => 'ch',
            'ш' => 'sh',   'щ' => 'sch',  'ь' => '',     'ы' => 'y',    'ъ' => '',
            'э' => 'e',    'ю' => 'yu',   'я' => 'ya',
        );

        $value = mb_strtolower($value);
        $value = strtr($value, $converter);
        $value = mb_ereg_replace('[^-0-9a-z]', '-', $value);
        $value = mb_ereg_replace('[-]+', '-', $value);
        $value = trim($value, '-');

        return $value;
    }
    function __construct($id,$cards=true)
    {

        $this->id=$id;

        $this->name=database::select_one_stat("name","topic","WHERE id ='".$id."'");
        $this->translit=database::select_one_stat("translit","topic","WHERE id ='".$id."'");
        $this->chapter=database::select_one_stat("chapter","topic","WHERE id ='".$id."'");
        $this->cours=database::select_one_stat("cours","chapter","WHERE id ='".$this->chapter."'");

        $this->chapter_name=database::select_one_stat("name","chapter","WHERE id ='".$this->chapter."'");
        //$this->chapter_translit=database::select_one_stat("translit","chapter","WHERE id ='".$this->chapter."'");

        $this->cours_name=database::select_one_stat("name","cours","WHERE id ='".$this->cours."'");
        $this->cours_translit=database::select_one_stat("translit","cours","WHERE id ='".$this->cours."'");
        if($cards)
            $this->cards=$this->find_cards();
    }
    public function find_cards()
    {

        $topics_id = database::select_stat("id", "card", "Where topic=".$this->id);
        $topics=[];
        for ($i=0;$i<count($topics_id);$i++)
        {
            $topics[$i] = new Card($topics_id[$i],true);
        }

        return $topics;
    }
    public function delete()
    {



        $cards_id = database::select_stat("id", "card", "Where topic=".$this->id);

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