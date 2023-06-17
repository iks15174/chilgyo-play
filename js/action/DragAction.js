class DragAction {

    constructor(canvas, shape) {
        canvas.onmousedown = (e) => this.mouseDownHandler(e)
        canvas.onmousemove = (e) => this.mouseMoveHandler(e)
        canvas.onmouseup = () => this.mouseUpHandler()

        this.shape = shape
        this.canvas = canvas
        this.isMouseDown = false
        this.prevMouseX = -1
        this.prevMouseY = -1
    }

    mouseDownHandler(e) {
        const [x, y] = this.findCurrentPostion(e)

        this.prevMouseX = x;
        this.prevMouseY = y;

        this.isMouseDown = true;
    }

    mouseMoveHandler(e) {
        if(this.isMouseDown && this.shape.include(this.prevMouseX, this.prevMouseY)) {
            const [x, y] = this.findCurrentPostion(e)
            this.shape.moveTo(x - this.prevMouseX, y - this.prevMouseY)
            this.prevMouseX = x;
            this.prevMouseY = y;
        }  
    }

    mouseUpHandler() {
        this.isMouseDown = false
    }

    findCurrentPostion(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        return [x, y]
    }
}