document.getElementById('revealButton').addEventListener('click', function() {
    document.getElementById('hiddenMessage').style.display = 'block';
});

// Heart animation
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function Heart(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.opacity = 1;

    this.draw = function () {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "rgba(255, 20, 147, 1)";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 3, this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 3, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
        ctx.fill();
    };

    this.update = function () {
        this.y -= this.speed;
        this.opacity -= 0.005;
    };
}

function createHeart() {
    let x = Math.random() * canvas.width;
    let y = canvas.height;
    let size = Math.random() * 20 + 10;
    let speed = Math.random() * 1 + 0.5;
    hearts.push(new Heart(x, y, size, speed));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((heart, index) => {
        heart.update();
        heart.draw();
        if (heart.opacity <= 0) {
            hearts.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

setInterval(createHeart, 200);
animate();
