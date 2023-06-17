class Triangle {
  constructor(canvas, height, width, x, y, angle) {
    this.canvas = canvas;
    this.height = height;
    this.width = width;
    this.coordinate = [
      [x, y],
      [x, y + height],
      [x + width, y + height],
    ];
    this.angle = angle;
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
      board.beginPath();
      board.moveTo(this.coordinate[0][0], this.coordinate[0][1]);
      board.lineTo(this.coordinate[1][0], this.coordinate[1][1]);
      board.lineTo(this.coordinate[2][0], this.coordinate[2][1]);
      board.fill();
    }
  }

  include(x, y) {
    const a = this.coordinate[0];
    const b = this.coordinate[1];
    const c = this.coordinate[2];
    const p = [x, y];

    const nn = this.calcTriangle(a, b, c);
    const aa = this.calcTriangle(p, b, c);
    const bb = this.calcTriangle(a, p, c);
    const cc = this.calcTriangle(a, b, p);

    return nn === aa + bb + cc;
  }

  calcTriangle(a, b, c) {
    return Math.abs(
      a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1])
    );
  }

  moveTo(x, y) {
    this.coordinate = this.coordinate.map(([curX, curY]) => [curX + x, curY + y]);
  }
}
