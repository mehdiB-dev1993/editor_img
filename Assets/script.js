
$(document).ready(function ()
{

    function getCanvas()
    {
        return  document.getElementById('canvas');
    }

    function loadPreview($file)
    {
        const $reader = new FileReader();
        $reader.onload = function (e) {

            $('#preview').attr('src', e.target.result).show();

            $img = new Image();

            $img.onload = function () {
                $canvas = getCanvas()
                const ctx = $canvas.getContext('2d');

                $canvas.width = $img.width;
                $canvas.height = $img.height;

                ctx.drawImage($img, 0, 0);
            };

            $img.src = e.target.result;
        };
        $reader.readAsDataURL($file);

    }
    /*************************************/
    $('#img').on('change', function (event) {
        const $file = event.target.files[0];
        loadPreview($file)

    });


    /*************************************/

    var cropper;
    var $brightness;
    var $contrast;
    var $img;

    /*************************************/
    $('.bi-crop').on('click',function (e)
    {
        var $this = $(this)
        if ($this.hasClass('show'))
        {
            $this.removeClass('show')
            if (cropper) {
                cropper.destroy()
                cropper = null
            }

        }
        else
        {
            $this.addClass('show')
            const $img = document.getElementById('preview')
            cropper = new Cropper($img, {
                aspectRatio: 1,
                viewMode: 1,
                autoCropArea: 1,
                responsive: true,
            })
        }

    })
    /*************************************/

    function generateImageData()
    {
        var $imageData;

        if (cropper) {
            const canvas = cropper.getCroppedCanvas({
                width: cropper.getImageData().naturalWidth,
                height: cropper.getImageData().naturalHeight
            });

            const context = canvas.getContext('2d');

            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            const tempContext = tempCanvas.getContext('2d');


            tempContext.drawImage(canvas, 0, 0);


            context.clearRect(0, 0, canvas.width, canvas.height);
            context.filter = `brightness(${parseFloat($brightness)}%) contrast(${parseFloat($contrast)}%)`;
            context.drawImage(tempCanvas, 0, 0);

            $imageData = canvas.toDataURL()

        }
        else {


            $imageData = $canvas.toDataURL('image/png');


        }

        return $imageData

    }



    $('body').on('submit','#store-image',function (e) {
        e.preventDefault()

        $.ajax({
            url: 'http://editor.local/store',
            type: 'POST',
            data: {image: generateImageData()},
            success: function (response) {
                console.log(response)
            },
            error: function (error) {
                console.log('خطا در ارسال تصویر:', error);
            }
        });



    })



    /*************************************/


    $('.bi-brightness-high-fill').on('click',function (e)
    {
        var $this = $(this)
        if ($this.hasClass('show'))
        {
            $this.removeClass('show')
            $('.box').find('.brightness-box').remove()
            $('.box').find('.contrast-box').remove()

        }
        else
        {
            $this.addClass('show')
            var $brightness_tag = '<div class="mb-3 brightness-box"><label for="brightness" class="form-label">روشنایی</label><input type="range" id="brightness" class="form-range slider" min="0" max="200" value="100"></div>'
            var $contrast_tag = '<div class="mb-3 contrast-box"><label for="contrast" class="form-label">کنتراست</label><input type="range" id="contrast" class="form-range slider" min="0" max="200" value="100"></div>'
            $('.box').append($brightness_tag)
            $('.box').append($contrast_tag)
        }

    }
    )

    $('body').on('change','#brightness, #contrast',function (e)
    {
        applyFilters()
    })


    function applyFilters() {
        $brightness = $('#brightness').val();
        $contrast = $('#contrast').val();
        if (cropper)
        {
            $('.cropper-container').css({
                filter: `brightness(${$brightness}%) contrast(${$contrast}%)`
            });
        }else
        {
            $('#preview').css({
            filter: `brightness(${$brightness}%) contrast(${$contrast}%)`
            });

            adjustBrightnessAndContrast($brightness - 100, $contrast - 100);

        }

    }



    const adjustBrightnessAndContrast = (brightness, contrast) => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;


        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

        for (let i = 0; i < data.length; i += 4) {

            data[i] = factor * (data[i] - 128) + 128 + brightness;

            data[i + 1] = factor * (data[i + 1] - 128) + 128 + brightness;

            data[i + 2] = factor * (data[i + 2] - 128) + 128 + brightness;

        }

        ctx.putImageData(imageData, 0, 0);
    };

    /*************************************/



    $('.bi-pencil-square').on('click',function (e){
        var $this = $(this)
        if ($this.hasClass('show'))
        {
            $this.removeClass('show')
            $('.box').find('.box-char-emoji').remove()
        }
        else
        {
            $this.addClass('show')
            var $element = ' <form id="box-char-emoji" class="box-char-emoji" style="display: flex;gap: 10px"><input type="text" name="emoji" id="sticker-text" placeholder="متن یا ایموجی را وارد کنید" required><div id="emoji-panel" style="display: none;"></div><button type="submit" id="emoji-button">اضافه کردن ایموجی</button></form>'
            $('.box').append($element)
            $(function () {
                $('input[name=emoji]').emoji({
                    fontSize: '20px'
                });
            })
        }




    })

    /*************************************/

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');


    $('body').on('submit', '#box-char-emoji', function (e) {
        e.preventDefault();

        const text = e.currentTarget[0].value;
        const char = `<span class="draggable">${text}</span>`;
        $('.box-preview').append(char);


        $('.box-preview').find('.draggable').draggable({
            containment: '.box-preview',
            drag: function (event, ui) {
                const x = ui.position.left;
                const y = ui.position.top;

                redrawCanvas();
            },
            stop: function () {
                redrawCanvas();
            }
        });

        redrawCanvas();
    });


    function redrawCanvas() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);


        ctx.drawImage($img, 0, 0, canvas.width, canvas.height);


        const scaleX = canvas.width / $('.box-preview').width();
        const scaleY = canvas.height / $('.box-preview').height();


        $('.box-preview .draggable').each(function () {
            const left = $(this).position().left * scaleX;
            const top = $(this).position().top * scaleY;
            const text = $(this).text();


            const fontSize = $(this).css('font-size');
            ctx.font = `${parseInt(fontSize) * scaleX}px Arial`;
            ctx.fillStyle = 'black';
            ctx.fillText(text, left, top + (parseInt(fontSize) * scaleY));
        });
    }
    /*************************************/
})




