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
                <input class="form-control" type="file" id="img" name="image" accept="image/*">
                <button class="btn w-100 btn-success mt-4" type="submit">ذخیره</button>
            </form>
        </div>
        <!----------------------------->
        <div class="col-8 box">
            <div class="box-preview">
                <img id="preview" src="" alt="">
                <canvas style="display: none" id="canvas"></canvas>

            </div>
        </div>
        <!----------------------------->


    </div>



    <div class="row">
        <div class="col-12 p-0">
            <div class="tools">
                <i class="bi bi-crop" title="crub"></i>
                <i class="bi bi-brightness-high-fill" title="brightness"></i>
                <i class="bi bi-pencil-square" title="char"></i>
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
