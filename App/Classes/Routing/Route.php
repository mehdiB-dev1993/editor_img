<?php
namespace App\Classes\Routing;
class Route
{
    public static $routes;

    public static function get($uri, $action)
    {
        self::create('get',$uri,$action);
    }

    public static function post($uri, $action)
    {
        self::create('post',$uri,$action);
    }


    public static function put($uri, $action)
    {
        self::create('put',$uri,$action);
    }

    public static function delete($uri, $action)
    {
        self::create('delete',$uri,$action);
    }


    public static function patch($uri, $action)
    {
        self::create('patch',$uri,$action);
    }


    public static function create($method, $uri, $action)
    {
        self::$routes[] =
            [
            'method' => $method,
            'uri' => $uri,
            'action' => $action
            ];
    }

    public static function getRoutes()
    {
        return self::$routes;
    }

}