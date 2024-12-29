Card({
    // draw(openData) {
    //     // const textArea = {
    //     //     x: 0,
    //     //     y: 0,
    //     //     width: canvas.width,
    //     //     height: canvas.height * 0.3
    //     // }; 

    //     // ctx.clearRect(textArea.x, textArea.y, textArea.width, textArea.height);

    //     ctx.fillStyle = "rgba(255, 255, 255, 0)";
    //     // ctx.fillRect(textArea.x, textArea.y, textArea.width, textArea.height);

    //     ctx.font = '16px serif';

    //     // ctx.textAlign = 'left';  // 设置文本对齐方式为左对齐
    //     // ctx.fillText(openData, textArea.x, textArea.y + textArea.height / 1.5);
    // },

    created: function(options) {
        const canvas = this.getCanvas();

        console.log("canvas: ", canvas)
        const ctx = canvas.getContext('2d');

        const textArea = {
            x: 0,
            y: 0,
            width: canvas.width,
            height: canvas.height * 0.3
          };
      
      
          ctx.clearRect(textArea.x, textArea.y, textArea.width, textArea.height);
      
      
          ctx.fillStyle = "rgba(36, 255, 255, 0.5)";
          ctx.fillRect(textArea.x, textArea.y, textArea.width, textArea.height);
      
      
          ctx.font = '16px serif';
          ctx.fillStyle = 'black';


        // // 绘制白色大正方形（填充整个canvas区域作为背景大正方形）
        // ctx.fillStyle = "rgba(255, 99, 88, 1)";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 启动动画
        // update();

        // const img = new Image();
        // img.src = '/live-card/light2.png'; 
        // img.onload = function () {
        //   ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // };

        console.log("canvas: ", canvas.width, canvas.height)
        // 加载孔明灯图片
        const kongmingdengImage = new Image();
        kongmingdengImage.src = '/live-card/kmd.gif';

        // 定义孔明灯对象的构造函数
        function Kongmingdeng(x, y, speed, scale) {
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.scale = scale; // 新增属性，用于控制图片缩放比例
        }

        // 存储多个孔明灯实例的数组
        const kongmingdengs = [];

        // 根据移动端屏幕尺寸创建几个孔明灯实例并添加到数组中，可根据需要调整参数
        kongmingdengs.push(new Kongmingdeng(50, 100, 0.1, 0.4));
        kongmingdengs.push(new Kongmingdeng(100, 150, 0.2, 0.25));
        kongmingdengs.push(new Kongmingdeng(150, 80, 0.2, 0.3));
        kongmingdengs.push(new Kongmingdeng(200, 100, 0.2, 0.2));
        kongmingdengs.push(new Kongmingdeng(250, 80, 0.2, 0.2));
        kongmingdengs.push(new Kongmingdeng(300, 90, 0.2, 0.2));

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

            // 遍历每个孔明灯实例并绘制和更新位置
            for (const kongmingdeng of kongmingdengs) {
                // 绘制孔明灯图片，并根据缩放比例缩放
                ctx.drawImage(kongmingdengImage, kongmingdeng.x, kongmingdeng.y, kongmingdengImage.width * kongmingdeng.scale, kongmingdengImage.height * kongmingdeng.scale);

                // 更新孔明灯的纵坐标，实现上升效果（简单模拟）
                kongmingdeng.y -= kongmingdeng.speed;

                // 检查并调整位置避免碰撞和重叠
                adjustPosition(kongmingdeng, kongmingdengs);

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