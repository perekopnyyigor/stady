<?php
require_once 'database.php';
require_once 'chapter.php';
class Card
{
    public $id;
    public $name;
    public $content;
    public $content_mark;
    public $topic_id;
    public $picture;
    public $task;

    static function add($data_json)
    {

        $database = new Database();

        $database->connect();

        $data=json_decode($data_json);
        $data->card_mark=str_replace("\\","slash", $data->card_mark);
        $data->task=str_replace("\\","slash", $data->task);
        $content=str_replace("{m}","", $data->card_mark);
        $sql = "INSERT INTO card (name, content, topic,type,content_mark,hint,task) VALUES 
        ('".$data->card_name."','".$content."','".$data->topic_id."','".$data->type."','".$data->card_mark."','".$data->hint."','".$data->task."')";
            $result = $database->conn->query($sql);
            // Check
        if ($database->conn->error)
        {
            die("failed: " . $database->conn->error);
        }

    }


    function __construct($id,$on_content=false)
    {

        $database = new Database();
        $this->id=$id;
        $this->name=$database->select_one("name","card","WHERE id ='".$id."'");
        $this->type=$database->select_one("type","card","WHERE id ='".$id."'");
        $this->hint=$database->select_one("hint","card","WHERE id ='".$id."'");

        if($on_content)
        {
            $content = $database->select_one("content","card","WHERE id ='".$id."'");
            $this->content=str_replace("slash","\\", $content);

            $content_mark = $database->select_one("content_mark","card","WHERE id ='".$id."'");
            $this->content_mark=str_replace("slash","\\", $content_mark);

            $task=$database->select_one("task","card","WHERE id ='".$id."'");
            $this->task=str_replace("slash","\\", $task);
           // $this->content_mark=$database->select_one("content_mark","card","WHERE id ='".$id."'");
        }


        $this->topic_id=$database->select_one("topic","card","WHERE id ='".$id."'");
        $this->chapter_id=$database->select_one("chapter","topic","WHERE id ='".$this->topic_id."'");
        $this->cours_id=$database->select_one("cours","chapter","WHERE id ='".$this->chapter_id."'");
        $this->picture =$database->select("path","picture","WHERE card ='".$id."'");
    }
    function redact($data_json)
    {
        $database = new Database();

        $database->connect();

        $data=json_decode($data_json);

        $data->card_mark=str_replace("\\","slash", $data->card_mark);
        $data->task=str_replace("\\","slash", $data->task);
        $card_text=str_replace("{m}","", $data->card_mark);

        $sql = "UPDATE card SET 
        name = '$data->card_name', 
        content = '$card_text',
        content_mark = '$data->card_mark',
        hint = '$data->hint' ,
        task = '$data->task' 
        WHERE id = '$this->id'";

        $result = $database->conn->query($sql);

        // Check
        if ($database->conn->error)
        {
            die("failed: " . $database->conn->error);
        }

    }
    public function delete()
    {
        $database = new Database();

        $database->connect();

        $sql = "DELETE FROM card WHERE id = '$this->id'";

        $result = $database->conn->query($sql);

        // Check
        if ($database->conn->error)
        {
            die("failed: " . $database->conn->error);
        }
    }
    public function uploadImg()
    {
        if(isset($_FILES["file"]))
        {
            $tmp_name = $_FILES["file"]["tmp_name"][0];

            $name_img = basename($_FILES["file"]["name"][0]);
            $name =str_replace(" ", "_",$this->name);
            $name_img = $name."_".$name_img;
            $path=$_SERVER['DOCUMENT_ROOT']."/img/".$name_img;
            $src="../img/".$name_img;
            if(move_uploaded_file($tmp_name, $path))
            {
                //$source = imagecreatefrompng($path);
                //imagejpeg($source, $path, 100);


                $database = new Database();

                $database->connect();


                $sql = "INSERT INTO picture (card, path ) VALUES ('".$this->id."','".$src."')";
                //$sql = "UPDATE card SET  picture = '$src' WHERE id = '$this->id'";
                $result = $database->conn->query($sql);
                // Check
                if ($database->conn->error)
                {
                    die("failed: " . $database->conn->error);
                }
                echo "файл был загружен";
            }

            else {
                echo "загрузка не удалась";
            }


        }
        else
        {
            echo "загрузка не удалась1";
        }




    }
}