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
    public $counter;
    public $topic_name;
    public $days;

    static function top()
    {
        //database::connect_stat();
        $objs = database::count("topic","lesson");

        $lessons=[];
        for($i=0;$i<6;$i++)
        {
            $lessons[$i]=new Topic($objs[$i]->id,false);
            $lessons[$i]->counter=$objs[$i]->count;
        }
        return $lessons;
    }

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

        {
            if(($next_date===$now) || ($now>$next_date) )
            {
                if($data->greed > 75)
                {
                    $period++;
                    echo "Вы прошли тест, повторение пересено на более дальний период. Результат: ".$data->greed;
                }
                elseif ($data->greed < 50)
                {
                    if($period!=0)
                        $period--;

                    echo "Вы не прошли тест, период повторения уменьшился. Результат: ".$data->greed;
                }
                else
                {
                    echo "Тест пройден среднe, период повторения остался. Результат ".$data->greed;
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
                    echo "Вы прошли тест, но не по расписанию, результат не идет в зачет. Результат ".$data->greed;
                else
                    echo "Вы не прошли тест. Результат ".$data->greed;;
            }
        }

    }
    public function change_data($date_next)
    {


        $database = new Database();
        $database->connect();
        $sql = "UPDATE lesson SET               
                date_next = '".$date_next->format('Y-m-d')."'
                WHERE id = '$this->id'";

        $result = $database->conn->query($sql);
        if ($database->conn->error)
        {
            die("failed: " . $database->conn->error);
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
        $this->topic_translit = database::select_one_stat("translit", "topic", "Where id=".$this->topic);
        $this->chapter = database::select_one_stat("chapter", "topic", "Where id=".$this->topic);

        $this->chapter_name= database::select_one_stat("name", "chapter", "Where id=".$this->chapter);
        $this->cours = database::select_one_stat("cours", "chapter", "Where id=".$this->chapter);

        $this->cours_name = database::select_one_stat("name", "cours", "Where id=".$this->cours);
        $this->cours_translit = database::select_one_stat("translit", "cours", "Where id=".$this->cours);

        $days = pow(2,$this->period)-1;
        $date_next=new DateTime($this->date);
        $date_next->add(new DateInterval('P'.$days.'D'));
        $this->days = date_diff(new DateTime(),$date_next)->days;
        if(new DateTime()>$date_next)
            $this->days = - $this->days;

        $this->raiting = $this->days + $days;
    }
    public function find_try()
    {
        $this->try = database::select_stat("id", "try", "Where lesson=".$this->id);
        $tryes = [];
        for($i=0;$i<count($this->try);$i++)
        {
            $tryes[]=new Try_($this->try[$i]);
        }
        return $tryes;
    }
}
