<?php
namespace App\Classes;

class View
{
    public static $path = __DIR__ . '/../../views/';


    public static function make($view, $data = [])
    {
        $viewPath = self::$path . $view . '.php';

        if (file_exists($viewPath)) {

            extract($data);
            include($viewPath);
        } else {
            die("View file does not exist: " . $view);
        }
    }
}