<?php

class database
{

    public $conn;

    static $connect;
    static function connect_stat()
    {

       $servername = "srv-pleskdb45.ps.kz:3306";
        $username = "studycar_bd";
        $password = "Yaroslav150213!";
        $dbname = "studycar_bd";

        /*$servername = "127.0.0.1:3306";
        $username = "mysql";
        $password = "mysql";
        $dbname = "learn";*/
        // Create connection
        database::$connect = new mysqli($servername, $username, $password, $dbname);
        mysqli_set_charset(database::$connect, "utf8");
        // Check connection
        if (database::$connect->conn->connect_error) {
            die("Connection failed: " . database::$connect->conn->connect_error);
        }
        //$this->conn->close();
    }
    static function select_stat($colum, $tab, $parametr = "")
    {


        $sql = "SELECT " . $colum . " FROM " . $tab . " " . $parametr;
        $result = database::$connect->query($sql);
        $i = 0;


        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $sel[$i] = $row[$colum];
                $i++;
            }

        }

        return $sel;

    }
    static function select_one_stat($colum, $tab, $parametr = "")
    {
        //$this->connect();

        $sql = "SELECT " . $colum . " FROM " . $tab . " " . $parametr;
        $result = database::$connect->query($sql);
        $i = 0;


        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $sel[$i] = $row[$colum];
                $i++;
            }

        }
        //$this->conn->close();
        return $sel[0];

    }

  //------------------------------------------------------------------------------------








    public function connect()
    {

        $servername = "srv-pleskdb45.ps.kz:3306";
        $username = "studycar_bd";
        $password = "Yaroslav150213!";
        $dbname = "studycar_bd";
        /*
        $servername = "127.0.0.1:3306";
        $username = "mysql";
        $password = "mysql";
        $dbname = "learn";*/
        // Create connection
        $this->conn = new mysqli($servername, $username, $password, $dbname);
        mysqli_set_charset($this->conn, "utf8");
        // Check connection
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
        //$this->conn->close();
    }

    public function select($colum, $tab, $parametr = "")
    {


        $sql = "SELECT " . $colum . " FROM " . $tab . " " . $parametr;
        $result = $this->conn->query($sql);
        $i = 0;


        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $sel[$i] = $row[$colum];
                $i++;
            }

        }

        return $sel;

    }
    public function quer($sql)
    {
        //$this->connect();


        $result = $this->conn->query($sql);
        $i = 0;


        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $sel[$i] = $row[0];
                $i++;
            }

        }

        return $sel;

    }

    public function select_one($colum, $tab, $parametr = "")
    {
        //$this->connect();

        $sql = "SELECT " . $colum . " FROM " . $tab . " " . $parametr;
        $result = $this->conn->query($sql);
        $i = 0;


        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $sel[$i] = $row[$colum];
                $i++;
            }

        }
        //$this->conn->close();
        return $sel[0];

    }
}