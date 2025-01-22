<?php

namespace App\Controllers;

use App\Classes\View;


class HomeController
{

    public function __construct()
    {

    }
    public function index()
    {

        View::make('index');

    }

}