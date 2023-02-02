<?php
class Lesson
{
    public $id;
    public $topic;
    public $user;
    public $date_next;
    public $date;
    public $period;
    public $cours;
    public $topic_name;

    static function add_try($data_js)
    {
        $data = json_decode($data_js);
        $database = new Database();

        $database->connect();
        $id = $database->select_one("id","lesson","WHERE topic ='".$data->topic_id."' AND user ='".$data->user_id."'");

        $database = new Database();
        $database->connect();
        $sql = "INSERT INTO try (lesson, greed) VALUES ('".$id."','".$data->greed."')";
        $result = $database->conn->query($sql);
        // Check
        if ($database->conn->error)
        {
            die("failed: " . $database->conn->error);
        }

        $database = new Database();
        $database->connect();
        $date = $database->select_one("date","lesson","WHERE id ='".$id."'");
        $next_date = $database->select_one("date_next","lesson","WHERE id ='".$id."'");
        $period = $database->select_one("period","lesson","WHERE id ='".$id."'");

        $now = date('Y-m-d');

        if($date == "" || $date==null)
        {

           if($data->greed > 75)
           {
               $date_next = new DateTime($now);
               $date_next->add(new DateInterval('P1D'));

               $database = new Database();
               $database->connect();
                $sql = "UPDATE lesson SET 
                date = '".$now."',  
                period = 1,
                date_next = '".$date_next->format('Y-m-d')."'
                WHERE id = '$id'";

               $result = $database->conn->query($sql);
               if ($database->conn->error)
               {
                   die("failed: " . $database->conn->error);
               }
                echo "Вы прошли тест ";
           }
           else
           {
               echo "Вы не прошли тест";
           }

        }
        else
        {
            if(($next_date===$now) || ($now>$next_date) )
            {
                if($data->greed > 75)
                {
                    $period++;
                    echo "Вы прошли тест, повторение пересено на более дальний период";
                }
                elseif ($data->greed < 50)
                {
                    $period--;
                    echo "Вы не прошли тест, повторение пересено на более ближний период";
                }
                else
                {
                    echo "Тест пройден средни, период повторения остался";
                }
                $days = pow(2,$period)-1;
                $now = date('Y-m-d');
                $date_next = new DateTime($now);
                $date_next->add(new DateInterval('P'.$days.'D'));

                $database = new Database();
                $database->connect();
                $sql = "UPDATE lesson SET 
                date = '".$now."',  
                period = '".$period."',
                date_next = '".$date_next->format('Y-m-d')."'
                WHERE id = '$id'";

                $result = $database->conn->query($sql);
                if ($database->conn->error)
                {
                    die("failed: " . $database->conn->error);
                }
            }
            else
            {
                if($data->greed > 75)
                    echo "Вы прошли тест, но не по расписанию, результат не идет в зачет";
                else
                    echo "Вы не прошли тест";
            }
        }

    }
    public function __construct($id)
    {
        $database = new Database();
        $this->id = $id;
        $this->topic = $database->select_one("topic", "lesson", "Where id=".$id);
        $this->user = $database->select_one("user", "lesson", "Where id=".$id);
        $this->date_next = $database->select_one("date_next", "lesson", "Where id=".$id);
        $this->date = $database->select_one("date", "lesson", "Where id=".$id);
        $this->period = $database->select_one("period", "lesson", "Where id=".$id);
        $this->topic_name = $database->select_one("name", "topic", "Where id=".$this->topic);
        $this->chapter = $database->select_one("chapter", "topic", "Where id=".$this->topic);
        $this->cours = $database->select_one("cours", "chapter", "Where id=".$this->chapter);
    }
}
