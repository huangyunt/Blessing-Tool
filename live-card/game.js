Card({

    created: function(options) {
        const canvas = this.getCanvas();
        const ctx = canvas.getContext('2d');

        canvas.width = 440;
        canvas.height = 661

        const speedX = 2;
        console.log("canvas: ", canvas.width, canvas.height)
        // 加载孔明灯图片
        const kongmingdengImage = new Image();
        kongmingdengImage.src = '/live-card/kmd.gif';

        // 为canvas添加鼠标按下事件
        canvas.addEventListener("click", (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const clickCoordinate = {
                x,
                y
            }
            // // 获取元素按下时的坐标
            // clickCoordinate.x = e.pageX - canvas.offsetLeft;
            // clickCoordinate.y = e.pageY - canvas.offsetTop - 100;

            console.log("clickCoordinate: ", clickCoordinate)
            // 判断选中的元素是哪一个
            kongmingdengs.forEach((kongmingdeng, index) => {
                const isPointInImage = () => {
                    debugger;
                    return (clickCoordinate.x >= kongmingdeng.x &&
                            clickCoordinate.x <= kongmingdeng.x + kongmingdeng.width) &&
                        clickCoordinate.y >= kongmingdeng.y &&
                        clickCoordinate.y <= kongmingdeng.y + kongmingdeng.height
                }

                if (isPointInImage()) {
                    kongmingdeng.isClicked = !kongmingdeng.isClicked
                    console.log("点击的元素是：", kongmingdeng)
                }
            })

            // 未选中元素则return
            // if (target !== undefined) return;
            // 为canvas添加鼠标移动和鼠标抬起事件
        }, false)


        // 定义孔明灯对象的构造函数
        function Kongmingdeng(x, y, speed, scale, zIndex, text, isClicked) {
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.scale = scale; // 新增属性，用于控制图片缩放比例
            this.zIndex = zIndex;
            this.text = 'Hello world';
            this.isClicked = isClicked;
            this.width = 100 * scale
            this.height = 163 * scale
        }

        // 存储多个孔明灯实例的数组
        const kongmingdengs = [];

        // 根据移动端屏幕尺寸创建几个孔明灯实例并添加到数组中，可根据需要调整参数
        // kongmingdengs.push(new Kongmingdeng(50, 100, 0.1 * speedX, 0.4, 1, undefined, true));
        kongmingdengs.push(new Kongmingdeng(20, 500, 0.2 * speedX, 0.25, 2));
        kongmingdengs.push(new Kongmingdeng(50, 440, 0.2 * speedX, 0.25, 2));
        kongmingdengs.push(new Kongmingdeng(100, 430, 0.2 * speedX, 0.25, 2));
        kongmingdengs.push(new Kongmingdeng(150, 440, 0.2 * speedX, 0.3, 3));
        kongmingdengs.push(new Kongmingdeng(200, 580, 0.2 * speedX, 0.2, 4));
        kongmingdengs.push(new Kongmingdeng(250, 480, 0.2 * speedX, 0.2, 5));
        kongmingdengs.push(new Kongmingdeng(300, 490, 0.2 * speedX, 0.2, 6));

        // kongmingdengs.push(new Kongmingdeng(250, 380, 0.2 * speedX, 0.4, 5));
        // kongmingdengs.push(new Kongmingdeng(300, 390, 0.2 * speedX, 0.35, 6));
        // kongmingdengs.push(new Kongmingdeng(200, 390, 0.2 * speedX, 0.3, 6));

        // kongmingdengs.push(new Kongmingdeng(100, 230, 0.2 * speedX, 0.25, 2));
        // kongmingdengs.push(new Kongmingdeng(150, 240, 0.2 * speedX, 0.3, 3));
        // kongmingdengs.push(new Kongmingdeng(200, 280, 0.2 * speedX, 0.2, 4));
        // kongmingdengs.push(new Kongmingdeng(250, 280, 0.2 * speedX, 0.2, 5));
        // kongmingdengs.push(new Kongmingdeng(300, 290, 0.2 * speedX, 0.2, 6));
        // kongmingdengs.push(new Kongmingdeng(300, 290, 0.2 * speedX, 0.3, 6));

        // kongmingdengs.push(new Kongmingdeng(40, 100, 0.2 * speedX, 0.25, 2));
        // kongmingdengs.push(new Kongmingdeng(50, 140, 0.2 * speedX, 0.3, 3));
        // kongmingdengs.push(new Kongmingdeng(100, 180, 0.2 * speedX, 0.2, 4));
        // kongmingdengs.push(new Kongmingdeng(150, 180, 0.2 * speedX, 0.2, 5));
        // kongmingdengs.push(new Kongmingdeng(190, 190, 0.2 * speedX, 0.2, 6));
        // kongmingdengs.push(new Kongmingdeng(200, 120, 0.2 * speedX, 0.3, 6));

        // 定义一个最小安全距离（根据孔明灯图片大小等因素合理调整）
        const minDistance = 30;

        const checkCollision = (kongmingdeng1, kongmingdeng2) => {
            const dx = kongmingdeng1.x - kongmingdeng2.x;
            const dy = kongmingdeng1.y - kongmingdeng2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < minDistance;
        }

        const adjustPosition = (kongmingdeng, otherKongmingdengs) => {
            for (const otherKongmingdeng of otherKongmingdengs) {
                if (otherKongmingdeng !== kongmingdeng && checkCollision(kongmingdeng, otherKongmingdeng)) {
                    // 简单的调整策略：水平方向上往远离对方的方向移动一点
                    if (kongmingdeng.x < otherKongmingdeng.x) {
                        kongmingdeng.x -= 5;
                    } else {
                        kongmingdeng.x += 5;
                    }
                    // 垂直方向同理
                    if (kongmingdeng.y < otherKongmingdeng.y) {
                        kongmingdeng.y -= 5;
                    } else {
                        kongmingdeng.y += 5;
                    }
                }
            }
        }

        function draw() {
            // 清空画布
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'rgba(255, 255, 255, 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // ctx.fillStyle = 'rgba(0, 0, 0, 1)';

            // 遍历每个孔明灯实例并绘制和更新位置
            for (const kongmingdeng of kongmingdengs) {
                if (kongmingdeng.isClicked) {
                    // ctx.font = "48px serif";
                    // ctx.fillText("Hello world", kongmingdeng.x, kongmingdeng.y);
                    ctx.fillStyle = 'blue';
                    ctx.fillRect(kongmingdeng.x, kongmingdeng.y, 50, 50);
                } else {
                    // 绘制孔明灯图片，并根据缩放比例缩放
                    ctx.drawImage(kongmingdengImage, kongmingdeng.x, kongmingdeng.y, kongmingdengImage.width * kongmingdeng.scale, kongmingdengImage.height * kongmingdeng.scale);
                }

                // 更新孔明灯的纵坐标，实现上升效果（简单模拟）
                kongmingdeng.y -= kongmingdeng.speed;

                // 检查并调整位置避免碰撞和重叠
                // adjustPosition(kongmingdeng, kongmingdengs);

                // 如果孔明灯超出画布顶部，重置到画布底部附近（可更灵活处理）
                if (kongmingdeng.y < -50) {
                    kongmingdeng.y = canvas.height + Math.random() * 100;
                }
            }

            requestAnimationFrame(draw);
        }

        // 等待图片加载完成后开始绘制动画
        kongmingdengImage.onload = function() {
            draw();
        };
    }
})

let canvas, ctx;