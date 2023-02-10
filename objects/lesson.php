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

        $id = database::select_one_stat("id","lesson","WHERE topic ='".$data->topic_id."' AND user ='".$data->user_id."'");

        $database = new Database();
        $database->connect();
        $sql = "INSERT INTO try (lesson, greed) VALUES ('".$id."','".$data->greed."')";
        $result = $database->conn->query($sql);
        // Check
        if ($database->conn->error)
        {
            die("failed: " . $database->conn->error);
        }


        $date = database::select_one_stat("date","lesson","WHERE id ='".$id."'");
        $next_date = database::select_one_stat("date_next","lesson","WHERE id ='".$id."'");
        $period = database::select_one_stat("period","lesson","WHERE id ='".$id."'");

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
                    echo "Тест пройден среднe, период повторения остался";
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

        $this->id = $id;
        $this->topic = database::select_one_stat("topic", "lesson", "Where id=".$id);
        $this->user = database::select_one_stat("user", "lesson", "Where id=".$id);
        $this->date_next = database::select_one_stat("date_next", "lesson", "Where id=".$id);
        $this->date = database::select_one_stat("date", "lesson", "Where id=".$id);
        $this->period = database::select_one_stat("period", "lesson", "Where id=".$id);
        $this->topic_name = database::select_one_stat("name", "topic", "Where id=".$this->topic);
        $this->chapter = database::select_one_stat("chapter", "topic", "Where id=".$this->topic);
        $this->cours = database::select_one_stat("cours", "chapter", "Where id=".$this->chapter);
    }
}
