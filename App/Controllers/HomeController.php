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


    public function store()
    {
        $base64String = $_POST['image'];
        try {
            preg_match('/^data:image\/(\w+);base64,/', $base64String, $type);
                $base64String = substr($base64String, strpos($base64String, ',') + 1);
                $fileExtension = strtolower($type[1]);

                $imageData = base64_decode($base64String);
                $fileName = 'Storage/' . uniqid() . '.' . $fileExtension;

                file_put_contents($fileName, $imageData);
                echo json_encode([
                    'success' => true,
                    'url' => $fileName,
                    'message' => 'Image uploaded successfully',
                ]);
        }
            catch (\Exception $e)
        {
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }


    }

}