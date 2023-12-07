document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const gridSize = 20;
    const boardSize = 300;
    const snakeSpeed = 200; // milliseconds

    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let direction = 'right';

    function draw() {
        board.innerHTML = '';

        // Draw snake
        snake.forEach(segment => {
            const snakeElement = document.createElement('div');
            snakeElement.classList.add('snake');
            snakeElement.style.left = `${segment.x * gridSize}px`;
            snakeElement.style.top = `${segment.y * gridSize}px`;
            board.appendChild(snakeElement);
        });

        // Draw food
        const foodElement = document.createElement('div');
        foodElement.classList.add('food');
        foodElement.style.left = `${food.x * gridSize}px`;
        foodElement.style.top = `${food.y * gridSize}px`;
        board.appendChild(foodElement);
    }

    function move() {
        const head = Object.assign({}, snake[0]);

        switch (direction) {
            case 'up':
                head.y -= 1;
                break;
            case 'down':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
        }

        snake.unshift(head);

        // Check for collision with food
        if (head.x === food.x && head.y === food.y) {
            generateFood();
        } else {
            snake.pop();
        }

        // Check for collision with walls or self
        if (
            head.x < 0 || head.y < 0 ||
            head.x >= boardSize / gridSize || head.y >= boardSize / gridSize ||
            collisionWithSelf()
        ) {
            alert('Game Over!');
            resetGame();
        }

        draw();
    }

    function generateFood() {
        food = {
            x: Math.floor(Math.random() * (boardSize / gridSize)),
            y: Math.floor(Math.random() * (boardSize / gridSize))
        };

        // Make sure food does not overlap with the snake
        while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
            food = {
                x: Math.floor(Math.random() * (boardSize / gridSize)),
                y: Math.floor(Math.random() * (boardSize / gridSize))
            };
        }
    }

    function collisionWithSelf() {
        const [head, ...body] = snake;
        return body.some(segment => segment.x === head.x && segment.y === head.y);
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        direction = 'right';
        generateFood();
        draw();
    }

    document.addEventListener('keydown', event => {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    });

    setInterval(move, snakeSpeed);

    generateFood();
    draw();
});
