const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const carWidth = 30;
const carHeight = 50;
let carX = canvas.width / 2 - carWidth / 2;
const carSpeed = 15;

let obstacles = [];
let score = 0;

function drawCar() {
    ctx.fillStyle = '#0095DD';
    ctx.fillRect(carX, canvas.height - carHeight - 20, carWidth, carHeight);
}

function drawObstacles() {
    ctx.fillStyle = '#FF0000';

    for (let obstacle of obstacles) {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

function moveCar(direction) {
    carX += direction * carSpeed;

    // Ensure the car stays within the canvas boundaries
    if (carX < 0) {
        carX = 0;
    } else if (carX > canvas.width - carWidth) {
        carX = canvas.width - carWidth;
    }
}

function spawnObstacle() {
    const obstacleWidth = Math.floor(Math.random() * 100) + 50;
    const obstacleX = Math.floor(Math.random() * (canvas.width - obstacleWidth));
    const obstacleY = -20;
    const obstacleHeight = 20;

    obstacles.push({ x: obstacleX, y: obstacleY, width: obstacleWidth, height: obstacleHeight });
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].y += 5; // Adjust obstacle speed

        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1); // Remove obstacles that are out of the canvas
            score++;
        }

        // Check for collision with the car
        if (
            carX < obstacles[i].x + obstacles[i].width &&
            carX + carWidth > obstacles[i].x &&
            canvas.height - carHeight - 10 < obstacles[i].y + obstacles[i].height &&
            canvas.height - 10 > obstacles[i].y
        ) {
            gameOver();
        }
    }
}

function gameOver() {
    alert(`Game Over! Your score is: ${score}`);
    resetGame();
}

function resetGame() {
    carX = canvas.width / 2 - carWidth / 2;
    obstacles = [];
    score = 0;
}

function drawScore() {
    ctx.fillStyle = '#000';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCar();
    drawObstacles();
    drawScore();

    if (Math.random() < 0.1) {
        spawnObstacle();
    }

    updateObstacles();

    requestAnimationFrame(draw);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveCar(-2); // Move left
    } else if (event.key === 'ArrowRight') {
        moveCar(2); // Move right
    }
});

draw();
