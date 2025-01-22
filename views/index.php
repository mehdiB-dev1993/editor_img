<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../Assets/style.css">

</head>
<body>

<div class="container mt-5">

    <form action="" method="POST" enctype="multipart/form-data">
        <div class="mb-3">
            <input class="form-control" type="file" id="img" name="image" accept="image/*">
        </div>


        <div class="box mb-3 position-relative">
            <div class="cover d-none">
                <div class="tools">
                    <i class="bi bi-crop"></i>
                </div>
            </div>
            <img id="preview" src="#"  class="img-fluid" style="display:none; max-width: 100%; height: auto;">
        </div>

        <button type="submit" class="btn btn-primary btn-block w-100">آپلود تصویر</button>
    </form>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>

<script>


    $('#img').on('change', function(event) {

        const $file = event.target.files[0];

        if ($file && $file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = function(e) {
                $('#preview').attr('src', e.target.result).show();
            };

            reader.readAsDataURL($file);
        } else {
            alert('خطا در انتخاب تصویر');
        }
    });


    $('.box').hover(
        function () {
            $(this).find('.cover').removeClass('d-none')
            $(this).find('.cover').addClass('d-block')
            $(this).find('.cover').addClass('mask')
        },
        function () {
            $(this).find('.cover').removeClass('d-block')
            $(this).find('.cover').addClass('d-none')
            $(this).find('.cover').removeClass('mask');
        }
    );


</script>

</body>
</html>
