var triangle1 = null
var dragHandler = null

function initialize(canvas) {
    const triangle1 = makeTriange1()

    registerDrag(canvas, [triangle1])
}

function registerDrag(canvas, shapes) {
    const dragHandler = makeDragHandler(canvas)
    shapes.forEach((shape) => {
        dragHandler.addShape(shape)
    })

    canvas.onmousedown = function(e) {
        dragHandler.mouseDownHandler(e)
    }

    canvas.onmousemove = function(e) {
        dragHandler.mouseMoveHandler(e)
    }

    canvas.onmouseup = function(e) {
        dragHandler.mouseUpHandler()
    }

    canvas.onmouseout = function(e) {
        dragHandler.mouseUpHandler()
    }
}

function makeDragHandler(canvas) {
    if(dragHandler === null) {
        dragHandler = new DragEventHandler(canvas)
    }
    return dragHandler
}

function makeTriange1() {
    if(triangle1 === null) {
        triangle1 = new Triangle(100, 100, 100, 100)
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