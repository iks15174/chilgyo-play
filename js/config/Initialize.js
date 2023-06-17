var triangle1 = null
var dragHandler = null

function initialize(canvas) {
    makeTriange1(canvas)

}

function makeTriange1(canvas) {
    if(triangle1 === null) {
        triangle1 = new Triangle(canvas, 100, 100, 100, 100)
    }
    return triangle1
}

function drawCanvasBackground(canvas) {
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function animate(canvas) {
    drawCanvasBackground(canvas);
    triangle1.draw();

    requestAnimationFrame(function() {
        animate(canvas);
    });
}