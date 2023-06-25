var dragHandler = null;
var allShapes = [];

function initialize(canvas) {
  var triangle1 = new Triangle(canvas, 100, 100, 100, 100, "black");
  var triangle2 = new Triangle(canvas, 50, 50, 100, 100, "red");
  allShapes = allShapes.concat([triangle1, triangle2]);
}

function drawCanvasBackground(canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.stroke();
}

function animate(canvas) {
  drawCanvasBackground(canvas);
  allShapes.sort((a, b) => a.lastModified - b.lastModified);
  allShapes.forEach((a) => a.draw());

  requestAnimationFrame(function () {
    animate(canvas);
  });
}
