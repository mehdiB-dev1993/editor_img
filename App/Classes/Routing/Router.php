<?php

namespace App\Classes\Routing;
use App\Classes\Routing\Route;


class Router extends Route
{

    public function __construct()
    {
        $this->redirect();
    }

    public function redirect()
    {
        $uri = $_SERVER['REQUEST_URI'];
        $method =strtolower( $_SERVER['REQUEST_METHOD'] );

        foreach (Route::getRoutes() as $route)
        {
            /********************************/

            if ($uri === $route['uri'] && $method === $route['method']) {

                $action = explode('@',$route['action']);
                $controller = $action[0];
                $fn = $action[1];

                $className = 'App\Controllers\\' . $controller;

                if (class_exists($className)) {
                    $obj = new $className();
                    if (method_exists($obj, $fn))
                    {
                        $obj->$fn();
                    }
                    else
                    {
                        echo 'method not found';
                    }

                } else {
                    echo 'Class does not exist: ' . $className;
                }

            }
         /*   var_dump('route not exists!');
            die();*/

            /********************************/

        }
    }


    public function dispatch()
    {

    }



}