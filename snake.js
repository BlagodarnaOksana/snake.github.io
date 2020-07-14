import { DIRECTIONS, INITIAL_LENGTH } from './config.js';
import { getCell, setCell } from './gamefield.js';

const snake = {
  direction: DIRECTIONS.LEFT,
  maxLength: INITIAL_LENGTH,
  body: [
    { x: 14, y: 5 },
    { x: 15, y: 5 },
    { x: 16, y: 5 },
    { x: 17, y: 5 },
    { x: 18, y: 5 },
  ],

  getHead() {
    return this.body[0];
  },

  move: function() {
    const head = this.getHead();
    const nextHead = {
      x: head.x,
      y: head.y,
    };

    switch (this.direction) {
      case DIRECTIONS.LEFT:
        nextHead.x = nextHead.x - 1;
        break;
      case DIRECTIONS.DOWN:
        nextHead.y = nextHead.y + 1;
        break;
      case DIRECTIONS.UP:
        nextHead.y = nextHead.y - 1;
        break;
      case DIRECTIONS.RIGHT:
        nextHead.x = nextHead.x + 1;
        break;
      default:
        console.log('ERROR: uknown direction:', this.direction);
    }

    const obstacle = getCell(nextHead.x, nextHead.y);

    this.body.unshift(nextHead);
    setCell(nextHead.x, nextHead.y, 'snake');
    this.trimmingTail();
    return obstacle;
  },

  trimmingTail: function() {
    if (this.maxLength < this.body.length) {
      const tail = this.body.pop();
      setCell(tail.x, tail.y, '');
    }
  },

  drawInitialSnake: function() {
    this.body.forEach(bodyPart => setCell(bodyPart.x, bodyPart.y, 'snake'));
  },

  increaseLength: function() {
    this.maxLength = this.maxLength + 1;
  },
}

export default snake;