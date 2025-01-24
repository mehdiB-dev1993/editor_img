<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>editor_img</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css">
    <link rel="stylesheet" href="../Assets/style.css">
    <link rel="stylesheet" href="https://unpkg.com/emoji-mart/css/emoji-mart.css">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.14.1/themes/base/jquery-ui.css">


</head>
<body>

<!----------------------------->
<div class="container">

    <div class="row h-100">
        <!----------------------------->
        <div class="col-4 box-form">
            <form id="store-image" action="">
                <input class="form-control" type="file" id="imageInput" name="image" accept="image/*">
                <button class="btn w-100 btn-success mt-4" type="submit">ذخیره</button>
            </form>
        </div>
        <!----------------------------->
        <div class="col-8 box">
            <div class="box-preview">

                <canvas  id="canvas"></canvas>

            </div>

            <div class="tool-bag">
                <div class="box-color d-none">
                    <input type="color" id="colorPicker" style="margin-top: 10px;" />
                    <button id="applyColor">اعمال رنگ</button>
                </div>

                <form id="box-char-emoji" class="box-char-emoji d-none" style="display: flex; gap: 10px; margin-top: 10px;">
                    <input type="text" name="emoji" id="sticker-text" placeholder="متن یا ایموجی را وارد کنید" required>
                    <button type="submit" id="emoji-button">اضافه کردن</button>
                </form>


            </div>


        </div>
        <!----------------------------->


    </div>



    <div class="row">
        <div class="col-12 p-0">
            <div class="tools">
                <button class="btn bi bi-crop" title="crub"></button>
                <button class="btn bi bi-brightness-high-fill" title="brightness"></button>
                <button class="btn bi bi-pencil-square" title="char"></button>
                <button class="btn bi bi-scissors"></button>

            </div>
        </div>
    </div>




</div>
<!----------------------------->









<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://code.jquery.com/ui/1.14.1/jquery-ui.js" integrity="sha256-9zljDKpE/mQxmaR4V2cGVaQ7arF3CcXxarvgr7Sj8Uc=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"></script>
<script src="../Assets/inputEmoji.js"></script>
<script src="../Assets/script.js"></script>

</body>
</html>
