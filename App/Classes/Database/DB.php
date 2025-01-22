<?php

namespace App\Classes\Database;

use PDO;
use PDOException;

class DB
{
    protected $servername = "localhost";
    protected $username = "root";
    protected $password = "";
    protected $dbname = "db";
    public $connector;


    public function __construct()
    {
        try {
            $this->connector = new PDO("mysql:host=$this->servername;dbname=$this->dbname", $this->username, $this->password);
            $this->connector->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }


    public function getConnection()
    {
        return $this->connector;
    }

}