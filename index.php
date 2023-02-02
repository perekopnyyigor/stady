<?php
session_start();
require_once "view/main.php";
require_once "view/enter.php";
require_once "view/reg.php";
require_once "view/cabinet.php";
require_once "view/cours.php";

require_once "objects/user.php";
require_once "objects/chapter.php";
require_once "objects/topic.php";
require_once "objects/card.php";
require_once "objects/lesson.php";
require_once "objects/cours.php";

$main_page = new MainPage();
$enter_page = new Enter();
$reg_page = new Reg();
$cabinet = new Cabinet();
$cours_page = new Cours();

switch ($_GET["action"])
{
    case "all_chapters":
    case "":

        $courses = CoursObj::course();

        $main_page->main($courses);
        break;
    case "enter":
        $enter_page->main();
        break;
    case "reg":
        $reg_page->main();
        break;
    case "reg_action":
        $data = $reg_page->get_data();
        User::add($data);
        break;
    case "enter_action":
        $data=$enter_page->get_data();
        User::enter($data);
        break;
    case "cabinet":
        $user = new User($_SESSION["id"]);
        $cabinet->main($user);
        break;
    case "add_chapter":
        $json_data=$_POST["data_json"];
        Chapter::add($json_data);
        break;
    case "find_courses":
    case "find_chapters":
        $user = new User($_SESSION["id"]);
        echo $user->find_courses();
        break;
    case "add_topic":
        $json_data=$_POST["data_json"];
        Topic::add($json_data);
        break;
    case "add_card":
        $json_data=$_POST["data_json"];
        Card::add($json_data);
        break;
    case "get_card":
        $card_id = $_GET["card_id"];
        $card = new Card($card_id,true);
        echo json_encode($card);
        break;
    case "get_topic":
        $topic_id = $_GET["topic_id"];
        $topic = new Topic($topic_id,true);
        echo json_encode($topic);
        break;
    case "redact_card":
        $json_data=$_POST["data_json"];

        $id=json_decode($_POST["data_json"])->id;

        $card=new Card($id);
        $card->redact($json_data);
        break;
    case "open_cours":
        $id =  $_GET["cours_id"];
        $cours = new CoursObj($id);
        $cours_page->main($cours);
        break;
    case "open_topic":
        $cours_id =  $_GET["cours_id"];
        $topic_id =  $_GET["topic_id"];
        $cours = new CoursObj($cours_id);
        $topic = new Topic($topic_id,true);
        $cours_page->main($cours,$topic);
        break;
    case "subscrib":
        $id=$_SESSION["id"];
        $cours = $_POST["cours_id"];
        if ( $id != null )
        {
            $user = new User($id);
            $user->subscrib($cours);
        }
        else
        {
            echo '<script>alert("Чтобы подписаться авторизируйтесь на сайте");';
            echo 'window.location.href = "http://localhost/index.php?action=enter";   </script>';
        }



        break;
    case "add_lesson":

        $user_id=json_decode($_POST["data_json"])->user_id;

        $topic_id=json_decode($_POST["data_json"])->topic_id;


        $user = new User($user_id);
        $user->lesson($topic_id);

        break;
    case "add_try":

        Lesson::add_try($_POST["data_json"]);
        break;
    case "get_lessons":
        $user_id=json_decode($_POST["data_json"])->user_id;
        $user = new User($user_id);
        echo $user->find_lessons();
        break;
    case "add_img":
        $id= $_POST["card_id"];
        $card = new Card($id);
        $card->uploadImg();
        break;
    case "add_cours":
        CoursObj::add($_POST["data_json"]);
        break;
    case "get_cours":
        $user_id=json_decode($_POST["data_json"])->user_id;

        $user = new User($user_id);
        echo $user->course();
        break;
    case "get_one_cours":
    case "get_chapters":
        $cours_id=json_decode($_POST["data_json"])->cours_id;
        $cours = new CoursObj($cours_id);
        echo json_encode($cours) ;
        break;
    case "delete_card":
        $card_id=json_decode($_POST["data_json"])->card_id;
        $card = new Card($card_id);
        $card->delete();
        break;
    case "delete_topic":
        $topic_id=json_decode($_POST["data_json"])->topic_id;
        $topic = new Topic($topic_id);
        $topic->delete();
        break;
    case "delete_chapter":
        $chapter_id=json_decode($_POST["data_json"])->chapter_id;
        $chapter = new Chapter($chapter_id);
        $chapter->delete();
        break;
    case "redact_cours":
        $data=json_decode($_POST["data_json"]);
        $cours = new CoursObj($data->cours_id);
        $cours->redact($data);
        break;
    case "add_cours_img":
        $id= $_POST["cours_id"];
        $cours = new CoursObj($id);
        $cours->uploadImg();
        break;
    case "delete_cours":
        $cours_id=json_decode($_POST["data_json"])->cours_id;
        $cours= new CoursObj($cours_id);
        $cours->delete();
        break;
    case "add_rewiev":
        $data=json_decode($_POST["data_json"]);
        $user_id=$data->user_id;
        $content=$data->content;
        $user = new User($user_id);
        $user->add_rewiev($content);
        break;

}
