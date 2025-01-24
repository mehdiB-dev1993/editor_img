<?php ?>


<canvas id="myCanvas" width="400" height="400" style="border:1px solid #000;"></canvas>

<script>
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // رسم یک مستطیل
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 50, 100);
    ctx.clearRect(0, 0, 40, 100);
</script>
