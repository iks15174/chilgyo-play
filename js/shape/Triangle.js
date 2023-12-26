class Triangle {
  constructor(canvas, height, width, x, y, color) {
    this.canvas = canvas;
    this.height = height;
    this.width = width;
    this.coordinate = [
      [x, y],
      [x, y + height],
      [x + width, y + height],
    ];
    this.color = color;
    this.rotationAction = new RotationAction(canvas, this);
    this.lastModified = new Date();
    new DragAction(canvas, this);
  }

  getBoard() {
    if (this.canvas.getContext) {
      return this.canvas.getContext("2d");
    }
    return null;
  }

  draw() {
    const board = this.getBoard();
    if (board !== null) {
      board.fillStyle = this.color;
      board.beginPath();
      board.moveTo(this.coordinate[0][0], this.coordinate[0][1]);
      board.lineTo(this.coordinate[1][0], this.coordinate[1][1]);
      board.lineTo(this.coordinate[2][0], this.coordinate[2][1]);
      board.fill();
      this.rotationAction.drawButton(board);
    }
  }

  getCenter() {
    const xCenter =
      (this.coordinate[0][0] + this.coordinate[1][0] + this.coordinate[2][0]) /
      3;
    const yCenter =
      (this.coordinate[0][1] + this.coordinate[1][1] + this.coordinate[2][1]) /
      3;
    return [xCenter, yCenter];
  }

  include(x, y) {
    return this.isPointInsidePolygon([x, y]);
  }

  moveTo(x, y) {
    this.coordinate = this.coordinate.map(([curX, curY]) => [
      curX + x,
      curY + y,
    ]);
    this.lastModified = new Date();
  }

  isPointInsidePolygon(point) {
    const [x, y] = point;
    let isInside = false;

    for (
      let i = 0, j = this.coordinate.length - 1;
      i < this.coordinate.length;
      j = i++
    ) {
      const [viX, viY] = this.coordinate[i];
      const [vjX, vjY] = this.coordinate[j];

      const isCrossing =
        viY > y !== vjY > y &&
        x < ((vjX - viX) * (y - viY)) / (vjY - viY) + viX;

      if (isCrossing) {
        isInside = !isInside;
      }
    }

    return isInside;
  }
}
