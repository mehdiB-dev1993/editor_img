<?php

namespace App\Controllers;

use App\Classes\View;
use App\Models\Home;


class HomeController
{
    public $model;

    public function __construct()
    {
        $this->model = new Home();
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

                $this->model->store(['title' => $fileName, 'source' => $fileName]);

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