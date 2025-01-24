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
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    public function getConnection()
    {
        return $this->connector;
    }


    public function insert($query, $params = [])
    {
        try {
            $stmt = $this->connector->prepare($query);
            $this->bindParams($stmt, $params);
            $stmt->execute();
            return $this->connector->lastInsertId();
        } catch (PDOException $e) {
            echo $e->getMessage();
            return false;
        }
    }


    public function execute($query, $params = [], $fetchAll = true)
    {
        try {
            $stmt = $this->connector->prepare($query);
            $this->bindParams($stmt, $params);
            $stmt->execute();

            if (stripos($query, 'SELECT') === 0) {
                return $fetchAll ? $stmt->fetchAll(PDO::FETCH_ASSOC) : $stmt->fetch(PDO::FETCH_ASSOC);
            }


            return $stmt->rowCount();
        } catch (PDOException $e) {
            echo  $e->getMessage();
            return false;
        }
    }


    private function bindParams($stmt, $params)
    {
        foreach ($params as $key => $value) {
            $type = is_int($value) ? PDO::PARAM_INT : PDO::PARAM_STR;
            $stmt->bindValue(is_int($key) ? $key + 1 : ':' . $key, $value, $type);
        }
    }
}
