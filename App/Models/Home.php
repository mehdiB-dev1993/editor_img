<?php

namespace App\Models;
use App\Classes\Database\DB;
class Home
{
    public $db;
    public function __construct()
    {
        $this->db = new DB;
    }

    public function store($params)
    {
        $this->db->insert("INSERT INTO `images` (`title`, `source`) VALUES (:title, :source)", $params);


    }

}