class DragEventHandler {

    constructor(canvas) {
        this.allShape = []
        this.selectedShape = []
        this.isMouseDown = false
        this.prevMouseX = -1
        this.prevMouseY = -1
        this.canvas = canvas
    }

    addShape(shape) {
        this.allShape.push(shape)
    }

    mouseDownHandler(e) {
        const [x, y] = this.findCurrentPostion(e)

        console.log("MouseDown : (" + x + ", " + y + ")");

        this.prevMouseX = x;
        this.prevMouseY = y;

        this.isMouseDown = true;

        this.allShape.forEach(shape => {
            if(shape.include(x, y)) {
                this.selectedShape.push(shape)
                console.log(shape)
            }
        })
    }

    mouseMoveHandler(e) {
        if(this.isMouseDown && this.selectedShape.length !== 0) {
            const [x, y] = this.findCurrentPostion(e)

            this.selectedShape.forEach(shape => {
                shape.moveTo(x, y)
            })

            this.prevMouseX = x;
            this.prevMouseY = y;
        }  
    }

    mouseUpHandler() {
        this.selectedShape = []
        this.isMouseDown = true
    }

    findCurrentPostion(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        return [x, y]
    }
}