class Triangle {
    
    constructor(canvas, height, width, x, y) {
        this.canvas = canvas
        this.height = height
        this.width = width
        this.x = x
        this.y = y
        new DragAction(canvas, this)
    }

    getBoard() {
        if(this.canvas.getContext) {
            return this.canvas.getContext('2d');
        }
        return null
    }

    draw() {
        const board = this.getBoard()
        if(board !== null) {
            board.beginPath();
            board.moveTo(this.x, this.y);
            board.lineTo(this.x, this.y + this.height);
            board.lineTo(this.x + this.width, this.y + this.height);
            board.fill();
        }
    }

    include(x, y) {
        const a = [this.x, this.y]
        const b = [this.x, this.y + this.height]
        const c = [this.x + this.width, this.y + this.height]
        const p = [x, y]

        const nn = this.calcTriangle(a, b, c)
        const aa = this.calcTriangle(p, b, c)
        const bb = this.calcTriangle(a, p, c)
        const cc = this.calcTriangle(a, b, p)

        return (nn === aa + bb + cc)
    }

    calcTriangle(a, b, c) {
        return Math.abs((a[0] * (b[1] - c[1])) + (b[0] * (c[1] - a[1])) + (c[0] * (a[1] - b[1])))
    }

    moveTo(x, y) {
        this.x = x
        this.y = y
    }
}