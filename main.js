'use strict';

import { DIRECTIONS } from './config.js';
import { create as createGameField, addApple } from './gamefield.js';
import snake from './snake.js';

let cycleDurationMs = 500;
let appleCounter = 0;

function init() {
  // TODO: хвост
  // переделайте createGameField так, чтбы он возвращал
  // ссылку на DOM элемент #gamefield и нам не надо было
  // получать его тут
  createGameField().addEventListener('click', handleCellClick);;
  snake.drawInitialSnake();
  moveSnake();
}

/**
 *
 * @param {*} e
 */
function handleCellClick(e) {
  console.log(this);
  const clickX = Number(e.target.dataset.x);
  const clickY = Number(e.target.dataset.y);

  const head = snake.getHead();

  const { x, y } = head;

  const isVertical =
    snake.direction === DIRECTIONS.DOWN ||
    snake.direction === DIRECTIONS.UP;

  // TODO: HW11 Add mouse control
  if (isVertical) {
    if (x < clickX) {
      snake.direction = DIRECTIONS.RIGHT;
    }

    if (x > clickX) {
      snake.direction = DIRECTIONS.LEFT;
    }
  } else {
    // horizontal
    if (y < clickY) {
      snake.direction = DIRECTIONS.DOWN;
    }
    if (y > clickY) {
      snake.direction = DIRECTIONS.UP;
    }
  }

  console.log('x:', x, 'y:', y);
  console.log('clickX:', clickX, 'clickY:', clickY);
  //e.target.style.backgroundColor = 'yellow';
}

function moveSnake() {
  setTimeout(moveSnake, cycleDurationMs);
  const obstacle = snake.move();
  if (obstacle) {
    if (obstacle === 'apple') {
      snake.increaseLength();
      addApple();
      // TODO: хвост
      // сделайте, чтобы с каждым яблоком змея ползала быстрее
      cycleDurationMs = cycleDurationMs / 1.5;
      appleCounter = appleCounter + 1;
      return;
    }

    // TODO: хвост
    // в конце игры выведите счет пользователя - количество "собранных" яблок
    // сделайте так, чтобы игра пошла заново
    alert(`Съедено яблок: ${appleCounter} шт.`);
    location.reload();
  }  
}

/**
 * @param {KeyboardEvent} keyEvent
 */
function handleKeyDown(keyEvent) {

  const directionsMap = {
    ArrowUp: DIRECTIONS.UP,
    ArrowDown: DIRECTIONS.DOWN,
    ArrowLeft: DIRECTIONS.LEFT,
    ArrowRight: DIRECTIONS.RIGHT,
  };

  const newDirection = directionsMap[keyEvent.key];
  if (newDirection) {
    snake.direction = newDirection;
  }
}

window.addEventListener('load', init);
window.addEventListener('keydown', handleKeyDown);