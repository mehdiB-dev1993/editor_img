const $imageInput = document.getElementById("imageInput");
const $canvas = document.getElementById("canvas");
const $ctx = $canvas.getContext("2d");
let $originalImageData;



$imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {

                $canvas.width = img.width;
                $canvas.height = img.height;

                $ctx.drawImage(img, 0, 0, img.width, img.height);


                $originalImageData = $ctx.getImageData(0, 0, $canvas.width, $canvas.height);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

/*************************************/
let cropper = null;
let $brightness;
let $contrast
/*************************************/
$('.bi-crop').on('click',function (e) {
    var $this = $(this)

    if ($this.hasClass('show'))
    {
        $this.removeClass('show')
        $('.tools').find('button').attr('disabled',false)


        if (cropper) {
            cropper.destroy()
            cropper = null
        }

    }
    else
    {
        $this.addClass('show')
        $('.tools').find('button').attr('disabled',true)
        $this.attr('disabled',false)

        cropper = new Cropper($canvas, {
            aspectRatio: 1,
            viewMode: 1,
            autoCropArea: 1,
            responsive: true,
        })
    }

})
/*************************************/
function appendCharToCanvas(canvasToDraw)
{
    const ctx = canvasToDraw.getContext('2d');


    const canvasWidth = canvasToDraw.width;
    const canvasHeight = canvasToDraw.height;
    const previewWidth = $('.box-preview').width();
    const previewHeight = $('.box-preview').height();


    const scaleX = canvasWidth / previewWidth;
    const scaleY = canvasHeight / previewHeight;


    $('.draggable-text').each(function () {
        const $this = $(this);
        const text = $this.text();


        const fontSize = parseFloat($this.css('font-size'));
        const fontFamily = $this.css('font-family');
        const color = $this.css('color');
        const fontWeight = $this.css('font-weight');
        const fontStyle = $this.css('font-style');
        const lineHeight = parseFloat($this.css('line-height')) || fontSize;

        // مختصات دقیق متن در پیش‌نمایش
        const offset = $this.offset();
        const containerOffset = $('.box-preview').offset();


        const previewX = offset.left - containerOffset.left + parseFloat($this.css('padding-left'));
        const previewY = offset.top - containerOffset.top + parseFloat($this.css('padding-top'));


        const x = previewX * scaleX;
        const y = previewY * scaleY;


        const scaledFontSize = fontSize * Math.min(scaleX, scaleY);


        ctx.font = `${fontStyle} ${fontWeight} ${scaledFontSize}px ${fontFamily}`;
        ctx.fillStyle = color;
        ctx.textBaseline = 'alphabetic';


        ctx.fillText(text, x, y + scaledFontSize / 4);
    });
}
$('body').on('submit', '#store-image', function (e) {
    e.preventDefault();


    let canvasToDraw = cropper ? cropper.getCroppedCanvas() : $canvas;
    appendCharToCanvas(canvasToDraw)


    const imageData = canvasToDraw.toDataURL("image/png");


    $.ajax({
        url: 'http://editor.local/store',
        type: 'POST',
        data: { image: imageData },
        success: function (response) {
            var $response = JSON.parse(response)

        if ($response.success === true)
        {
            $('.box-preview').find('.draggable-text').remove()
            window.location = $response.url
        }else
        {
            alert($response.message)
        }

        },
        error: function (error) {
            console.log('خطا در ارسال تصویر:', error);
        }
    });
});


/*************************************/
$('.bi-brightness-high-fill').on('click',function (e)
    {
        var $this = $(this)
        if ($this.hasClass('show'))
        {
            $this.removeClass('show')
            $('.tool-bag').find('.brightness-box').remove()
            $('.tool-bag').find('.contrast-box').remove()

        }
        else
        { $('.tools button').removeClass('show')
            $this.addClass('show')
            var $brightness_tag = '<div class="mb-3 brightness-box"><label for="brightness" class="form-label">روشنایی</label><input type="range" id="brightness" class="form-range slider" min="0" max="200" value="100"></div>'
            var $contrast_tag = '<div class="mb-3 contrast-box"><label for="contrast" class="form-label">کنتراست</label><input type="range" id="contrast" class="form-range slider" min="0" max="200" value="100"></div>'
            $('.tool-bag').append($brightness_tag)
            $('.tool-bag').append($contrast_tag)
        }

    }
)
/*************************************/


$(document).on("input", "#brightness, #contrast", function () {
    const brightness = parseInt($("#brightness").val()) || 100;
    const contrast = parseInt($("#contrast").val()) || 100;

    $brightness = brightness;
    $contrast = contrast;

    if (cropper) {
        // اگر Cropper فعال است
        const croppedCanvas = cropper.getCroppedCanvas(); // گرفتن canvas برش‌خورده
        const croppedCtx = croppedCanvas.getContext("2d"); // گرفتن context برش‌خورده
        const croppedImageData = croppedCtx.getImageData(0, 0, croppedCanvas.width, croppedCanvas.height);

        // اعمال روشنایی و کنتراست به تصویر برش‌خورده
        const updatedImageData = applyBrightnessAndContrast(croppedImageData, brightness, contrast);

        // بازنویسی تصویر روی canvas برش‌خورده
        croppedCtx.putImageData(updatedImageData, 0, 0);

        // بازنویسی تصویر برش‌خورده روی canvas اصلی
        $ctx.clearRect(0, 0, $canvas.width, $canvas.height); // پاک‌کردن canvas
        $canvas.width = croppedCanvas.width;
        $canvas.height = croppedCanvas.height;
        $ctx.drawImage(croppedCanvas, 0, 0); // رسم تصویر نهایی برش‌خورده روی canvas اصلی
    } else {

        if (!$originalImageData) {
            console.error("داده اصلی تصویر در دسترس نیست!");
            return;
        }


        const imageDataCopy = new ImageData(
            new Uint8ClampedArray($originalImageData.data),
            $originalImageData.width,
            $originalImageData.height
        );


        const updatedImageData = applyBrightnessAndContrast(imageDataCopy, brightness, contrast);


        $ctx.putImageData(updatedImageData, 0, 0);
    }
});

function applyBrightnessAndContrast(imageData, brightness, contrast) {
    const data = imageData.data;

    const brightnessOffset = (brightness - 100) * 2.55;
    const contrastFactor = (contrast - 100) / 100 + 1;

    for (let i = 0; i < data.length; i += 4) {

        data[i] = Math.min(255, Math.max(0, contrastFactor * (data[i] - 128) + 128 + brightnessOffset));
        data[i + 1] = Math.min(255, Math.max(0, contrastFactor * (data[i + 1] - 128) + 128 + brightnessOffset));
        data[i + 2] = Math.min(255, Math.max(0, contrastFactor * (data[i + 2] - 128) + 128 + brightnessOffset));
    }

    return imageData;
}

/*************************************/
$('.bi-pencil-square').on('click', function (e) {


    var $this = $(this);
    if ($this.hasClass('show')) {
        $this.removeClass('show');
        $('.tool-bag').find('.box-char-emoji').addClass('d-none')
    } else {
        $('.tools button').removeClass('show')
        $this.addClass('show');

        $('.tool-bag').find('.box-char-emoji').removeClass('d-none')
    }
});
/*************************************/
$(document).on('submit', '#box-char-emoji', function (e) {

        e.preventDefault();
        const inputText = $('#sticker-text').val()

        const draggableText = $(`<div class="draggable-text">${inputText}</div>`);
        $('.box-preview').append(draggableText);

        draggableText.draggable({
            containment: '.box-preview',
        });




}
)

/*************************************/
$('.bi-scissors').on('click', function (e)
{
    var $this = $(this);
    if ($this.hasClass('show')) {
        $this.removeClass('show');
        $('.tool-bag').find('.box-color').addClass('d-none')
    } else {
        $('.tools button').removeClass('show')
        $this.addClass('show');

        $('.tool-bag').find('.box-color').removeClass('d-none')
    }
}
)
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;

    const selectionBox = document.createElement("div");
    selectionBox.classList.add("selection-box");
    document.body.appendChild(selectionBox);

    const colorPicker = document.getElementById("colorPicker");



    function getMousePosition(event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: (event.clientX - rect.left) * scaleX,
            y: (event.clientY - rect.top) * scaleY,
        };
    }


    canvas.addEventListener("mousedown", (e) => {
        isDragging = true;

        const { x, y } = getMousePosition(e);
        startX = x;
        startY = y;

        selectionBox.style.left = `${e.clientX}px`;
        selectionBox.style.top = `${e.clientY}px`;
        selectionBox.style.width = "0px";
        selectionBox.style.height = "0px";
        selectionBox.style.display = "block";
    });


    canvas.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const { x, y } = getMousePosition(e);
        currentX = x;
        currentY = y;

        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);

        const rect = canvas.getBoundingClientRect();
        selectionBox.style.left = `${Math.min(e.clientX, startX * (rect.width / canvas.width) + rect.left)}px`;
        selectionBox.style.top = `${Math.min(e.clientY, startY * (rect.height / canvas.height) + rect.top)}px`;
        selectionBox.style.width = `${width * (rect.width / canvas.width)}px`;
        selectionBox.style.height = `${height * (rect.height / canvas.height)}px`;
    });


    canvas.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;

        const x = Math.min(startX, currentX);
        const y = Math.min(startY, currentY);
        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);


        const selectedColor = colorPicker.value;
        ctx.fillStyle = selectedColor;
        ctx.fillRect(x, y, width, height);

        console.log("Selected Area:", { x, y, width, height });

        selectionBox.style.display = "none";
    });
});

function getMousePosition(event) {
    const rect = $canvas.getBoundingClientRect();
    const scaleX = $canvas.width / rect.width;
    const scaleY = $canvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY,
    };
}

/*************************************/











