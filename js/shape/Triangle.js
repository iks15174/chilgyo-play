class Triangle {
    
    constructor(height, width, x, y) {
        this.height = height
        this.width = width
        this.x = x
        this.y = y
    }

    getBoard() {
        const canvas = document.getElementById('canvas');
        if(canvas.getContext) {
            return canvas.getContext('2d');
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
}

function draw() {
    const tri = new Triangle(100, 100, 100, 100)
    tri.draw()
}