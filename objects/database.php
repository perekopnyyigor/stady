<?php

class database
{

    var $conn;

    public function connect()
    {


        $servername = "127.0.0.1:3306";
        $username = "mysql";
        $password = "mysql";
        $dbname = "learn";

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
        $this->connect();

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
        $this->connect();


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
        $this->connect();

        $sql = "SELECT " . $colum . " FROM " . $tab . " " . $parametr;
        $result = $this->conn->query($sql);
        $i = 0;


        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $sel[$i] = $row[$colum];
                $i++;
            }

        }
        $this->conn->close();
        return $sel[0];

    }
}