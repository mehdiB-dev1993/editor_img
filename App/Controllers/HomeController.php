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

        if (preg_match('/^data:image\/(\w+);base64,/', $base64String, $type))
        {
            $base64String = substr($base64String, strpos($base64String, ',') + 1);
            $fileExtension = strtolower($type[1]);


            if (!in_array($fileExtension, ['jpg', 'jpeg', 'png', 'gif']))
            {
                        die('فرمت فایل معتبر نیست.');
            }
        }
        else
        {
            die('داده Base64 معتبر نیست.');
        }


        $imageData = base64_decode($base64String);

        if ($imageData === false) {
            die('خطا در رمزگشایی داده Base64.');
        }


        $fileName = 'Storage/' . uniqid() . '.' . $fileExtension;

        if (file_put_contents($fileName, $imageData)) {
            echo "تصویر با موفقیت ذخیره شد: $fileName";
        } else {
            echo "خطا در ذخیره تصویر.";
        }
    }

}