<?php
class CoursObj
{
    public $id;
    public $name;
    public $discription;
    public $picture;
    public $user;
    public $date;
    public $chapters=[];



    static function add($data_json)
    {

        $database = new Database();

        $database->connect();

        $data=json_decode($data_json);

        $sql = "INSERT INTO cours (name, description, user) VALUES ('".$data->cours_name."','".$data->description."','".$data->user_id."')";
        $result = $database->conn->query($sql);
        // Check
        if ($database->conn->error)
        {
            die("failed: " . $database->conn->error);
        }

    }
    static function course()
    {
        $database = new Database();
        $course_id = $database->select("id", "cours");
        $cousers=[];

        for ($i=0;$i<count($course_id);$i++)
        {
            $cousers[] = new CoursObj($course_id[$i]);
        }
        return $cousers;
    }
    public function __construct($id)
    {
        $database = new Database();
        $this->id=$id;
        $this->name=$database->select_one("name","cours","WHERE id ='".$id."'");
        $this->description=$database->select_one("description","cours","WHERE id ='".$id."'");
        $this->user=$database->select_one("user","cours","WHERE id ='".$id."'");
        $this->picture=$database->select_one("picture","cours","WHERE id ='".$id."'");
        $this->chapters = $this->chapters();
    }
    public function chapters()
    {
        $database = new Database();
        $chapters_id = $database->select("id", "chapter", "Where cours=".$this->id);
        $chapters=[];

        for ($i=0;$i<count($chapters_id);$i++)
        {
            $chapters[] = new Chapter($chapters_id[$i]);
        }
        return $chapters;
    }
    function redact($data)
    {
        $database = new Database();

        $database->connect();




        $sql = "UPDATE cours SET 
        name = '$data->cours_name', 
        description = '$data->description'
       
        WHERE id = '$this->id'";

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
            $path=$_SERVER['DOCUMENT_ROOT']."/img_cours/".$name_img;
            $src="../img_cours/".$name_img;
            if(move_uploaded_file($tmp_name, $path))
            {
                //$source = imagecreatefrompng($path);
                //imagejpeg($source, $path, 100);


                $database = new Database();

                $database->connect();


                $sql = "UPDATE cours SET  picture = '$src' WHERE id = '$this->id'";
                $result = $database->conn->query($sql);
                // Check
                if ($database->conn->error)
                {
                    die("failed: " . $database->conn->error);
                }
                echo "файл был загружен /".$sql;
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
    public function delete()
    {

        $database = new Database();
        $chapters_id = $database->select("id", "chapters", "Where cours=".$this->id);

        for ($i=0;$i<count($chapters_id);$i++)
        {
            $chapter = new Chapter($chapters_id[$i]);
            $chapter->delete();
        }

        $database = new Database();
        $database->connect();

        $sql = "DELETE FROM cours WHERE id = '$this->id'";

        $result = $database->conn->query($sql);

        // Check
        if ($database->conn->error)
        {
            die("failed: " . $database->conn->error);
        }
    }
}