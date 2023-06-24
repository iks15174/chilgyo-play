class RotationAction {
  constructor(canvas, shape) {
    canvas.addEventListener("mousemove", (e) => this.mouseMoveHandler(e));
    canvas.addEventListener("click", (e) => this.clickHandler(e));

    this.curX = -1;
    this.curY = -1;
    this.shape = shape;
    this.canvas = canvas;
    this.rotationButtonLength = 10;
    this.angle = Math.PI / 2;
  }

  clickHandler(e) {
    const [x, y] = this.findCurrentPostion(e);
    if (this.isInsideRotationButton(x, y)) {
      this.rotateShape();
    }
  }

  mouseMoveHandler(e) {
    const [x, y] = this.findCurrentPostion(e);
    this.curX = x;
    this.curY = y;
  }

  rotateShape() {
    this.shape.coordinate = this.shape.coordinate.map(([x, y]) => {
      return this.rotateCoordinate(x, y);
    });
    console.log(this.shape.coordinate);
  }

  drawButton(context) {
    if (this.shape.include(this.curX, this.curY)) {
      const [xCenter, yCenter] = this.shape.getCenter();
      context.fillStyle = "red";
      context.fillRect(
        xCenter - this.rotationButtonLength / 2,
        yCenter - this.rotationButtonLength / 2,
        this.rotationButtonLength,
        this.rotationButtonLength
      );
    }
  }

  isInsideRotationButton(x, y) {
    const [xCenter, yCenter] = this.shape.getCenter();
    const [xEdge, yEdge] = [
      xCenter - this.rotationButtonLength / 2,
      yCenter - this.rotationButtonLength / 2,
    ];
    if (
      xEdge <= x &&
      x <= xEdge + this.rotationButtonLength &&
      yEdge <= y &&
      y <= yEdge + this.rotationButtonLength
    ) {
      return true;
    }
    return false;
  }

  rotateCoordinate(x, y) {
    const [centerX, centerY] = this.shape.getCenter()

    const rotatedX =
      centerX +
      (x - centerX) * Math.cos(this.angle) -
      (y - centerY) * Math.sin(this.angle);
    const rotatedY =
      centerY +
      (x - centerX) * Math.sin(this.angle) +
      (y - centerY) * Math.cos(this.angle);
    return [rotatedX, rotatedY];
  }

  findCurrentPostion(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return [x, y];
  }
}
