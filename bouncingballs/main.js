// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const myH1 = document.querySelector('h1');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
var noCol = 0;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

class Shape {
  constructor(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
  }
}
class Ball extends Shape {
  constructor(x, y, velX, velY, exists, color, size) {
    super(x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  update() {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }
    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }
    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }
    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;

  }

  collisionDetect() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size) {
          noCol += 1;
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
          var tempX = balls[j].velX;
          var tempY = balls[j].velY;
          balls[j].velX = -this.velX;
          balls[j].velY = -this.velY;
          this.velX = -tempX;
          this.velY = -tempY;
          // myH1.textContent = noCol+'Bouncing Balls';
        }
      }
    }
  }
}

class evilCircle extends Shape {
  constructor(x, y, velX, velY, exists) {
    super(x, y, 20, 20, exists);
    this.color = 'white';
    this.size = 80;
  }
  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }
  checkBounds() {
    if (this.x + this.size >= width) {
      this.x -= this.size
    }
    if (this.x - this.size <= 0) {
      this.x += this.size;
    }
    if (this.y + this.size >= height) {
      this.y -= this.size;
    }
    if (this.y - this.size <= 0) {
      this.y += this.size;
    }
  }
  setControls() {
    let _this = this;
    window.onkeydown = function (e) {
      if (e.key === 'a') {
        _this.x -= _this.velX;
      } else if (e.key === 'd') {
        _this.x += _this.velX;
      } else if (e.key === 'w') {
        _this.y -= _this.velY;
      } else if (e.key === 's') {
        _this.y += _this.velY;
      }
    }
  }
  collisionDetect() {
    for (let j = 0; j < balls.length; j++) {

      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists= false;
      }

    }
  }
}

let testBall = new Ball(50, 100, 4, 4, true, 'blue', 10);

let balls = [];
canvas.onclick = function () {
  var count = 0;
  for (count; count < 1; count++) {
    var size = random(10, 20);
    const newBall = new Ball(random(size, width - size), random(size, height - size), random(-7, 7), random(-7, 7), true, 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
      size);
    balls.push(newBall);
  }
  // alert('hi');
}
window.onkeypress = function (e) {
  if (e.key == 'p') {
    balls.pop();

  }
  // alert(e.keycode);
}
const evil = new evilCircle(width/2,height/2,3,3,true);
evil.setControls();
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
  
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists == true) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }
  evil.draw();
  evil.checkBounds();
  evil.collisionDetect();
  // testBall.draw();
  // testBall.update();
  requestAnimationFrame(loop);
}

loop();