Card({
    draw(openData) {
        // const textArea = {
        //     x: 0,
        //     y: 0,
        //     width: canvas.width,
        //     height: canvas.height * 0.3
        // }; 

        // ctx.clearRect(textArea.x, textArea.y, textArea.width, textArea.height);

        ctx.fillStyle = "rgba(255, 255, 255, 0)";
        // ctx.fillRect(textArea.x, textArea.y, textArea.width, textArea.height);

        ctx.font = '16px serif';

        // ctx.textAlign = 'left';  // 设置文本对齐方式为左对齐
        // ctx.fillText(openData, textArea.x, textArea.y + textArea.height / 1.5);
    },

    created: function(options) {
        const canvas = this.getCanvas();

        console.log("canvas: ", canvas)
        const ctx = canvas.getContext('2d');

        // const img = new Image();
        // img.src = '/live-card/placeholder.png'; 
        // img.onload = function () {
        //   ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // };


        // // 绘制白色大正方形（填充整个canvas区域作为背景大正方形）
        // ctx.fillStyle = "rgba(255, 255, 255, 0)";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        // console.log('cccc: ', canvas.width, canvas.height)

        // 孔明灯主体颜色
        const lanternColor = '#FFE4B5';
        // 孔明灯框架颜色
        const frameColor = '#8B4513';
        // 火焰颜色数组，增加更多颜色变化
        const flameColors = ['#FFA500', '#FFD700', '#FF4500', '#FF6347', '#FF7F50'];
        // 孔明灯初始位置
        let lanternX = canvas.width / 2;
        let lanternY = canvas.height / 2;
        // 上升速度
        const riseSpeed = 1;
        // 火焰飘动幅度
        const flameSwayAmplitude = 3;
        const flameSwaySpeed = 0.08;
        // 火焰闪烁频率和幅度
        const flameFlickerFrequency = 0.05;
        const flameFlickerAmplitude = 8;

        // 绘制孔明灯主体
        function drawLantern() {
            // 绘制灯罩（椭圆）
            ctx.beginPath();
            ctx.ellipse(lanternX, lanternY - 30, 40, 20, 0, 0, 2 * Math.PI);
            ctx.fillStyle = lanternColor;
            ctx.fill();
            ctx.strokeStyle = frameColor;
            ctx.lineWidth = 1;
            ctx.stroke();

            // 绘制灯体（更细致的梯形）
            ctx.beginPath();
            ctx.moveTo(lanternX - 20, lanternY - 30);
            ctx.lineTo(lanternX - 15, lanternY + 40);
            ctx.lineTo(lanternX + 15, lanternY + 40);
            ctx.lineTo(lanternX + 20, lanternY - 30);
            ctx.closePath();
            ctx.fillStyle = lanternColor;
            ctx.fill();
            ctx.strokeStyle = frameColor;
            ctx.lineWidth = 1;
            ctx.stroke();

            // 绘制孔明灯顶部装饰（多条线条）
            ctx.beginPath();
            ctx.moveTo(lanternX - 8, lanternY - 50);
            ctx.lineTo(lanternX + 8, lanternY - 50);
            ctx.strokeStyle = frameColor;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(lanternX - 6, lanternY - 48);
            ctx.lineTo(lanternX + 6, lanternY - 48);
            ctx.strokeStyle = frameColor;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(lanternX - 4, lanternY - 46);
            ctx.lineTo(lanternX + 4, lanternY - 46);
            ctx.strokeStyle = frameColor;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // 绘制火焰
        function drawFlame() {
            const numTriangles = 6;
            const baseWidth = 10;
            const baseHeight = 15;
            const flameBaseX = lanternX;
            const flameBaseY = lanternY - 15;
            const swayOffset = Math.sin(Date.now() * flameSwaySpeed) * flameSwayAmplitude;
            for (let i = 0; i < numTriangles; i++) {
                ctx.beginPath();
                ctx.moveTo(flameBaseX + swayOffset, flameBaseY);
                ctx.lineTo(flameBaseX + baseWidth * (i % 2 === 0 ? 1 : -1) + swayOffset, flameBaseY + baseHeight * (i + 1));
                ctx.lineTo(flameBaseX - baseWidth * (i % 2 === 0 ? 1 : -1) + swayOffset, flameBaseY + baseHeight * (i + 1));
                ctx.closePath();
                const flickerFactor = 1 + Math.sin(Date.now() * flameFlickerFrequency) * flameFlickerAmplitude;
                ctx.fillStyle = flameColors[Math.floor(Math.random() * flameColors.length)];
                ctx.fill();
            }
        }

        // 动画更新函数，用于模拟上升和火焰飘动效果
        function update() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            lanternY -= riseSpeed;
            drawLantern();
            drawFlame();
            if (lanternY < -50) {
                // 当孔明灯上升超出画布一定范围，重置位置
                lanternY = canvas.height + 50;
            }
            requestAnimationFrame(update);
        }

        // 启动动画
        update();
    }

})

let canvas, ctx;