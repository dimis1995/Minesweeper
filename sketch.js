let grid = []
let size = 15;
let gridSize = 40;
let bombImg;
let loose = false;

class Block {

    constructor(x,y) {
        this.pos = createVector(x,y);
        if (Math.random() < 0.2) {
            this.bomb = true;
        } else {
            this.bomb = false;
        }
        this.revealed = false;
        this.number = 0;
    }

    draw = function() {
        fill(255);
        stroke(0);
        rect(this.pos.x*gridSize, this.pos.y*gridSize, gridSize, gridSize);
        if (this.revealed) {
            if (this.bomb) {
                fill(0);
                image(bombImg, this.pos.x*gridSize, this.pos.y * gridSize, gridSize-5, gridSize-5)
            } else {
                fill(0);
                textSize(12);
                text(this.number.toString(), this.pos.x*gridSize+gridSize/2, this.pos.y * gridSize+gridSize/2);
            }
        }
    }
}

function setup() {
    createCanvas(gridSize*size, gridSize*size);
    bombImg = loadImage('bomb.png');
    for(var i = 0; i < size; i++) {
        let row = []
        for (var j = 0; j < size; j++) {
            row.push(new Block(i,j));
        }
        grid.push(row);
    }
    for(var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (grid[i][j].bomb) {
                continue;
            } 
            if (i > 0 && grid[i-1][j].bomb) {
                grid[i][j].number += 1;
            }
            if (i < size-1 && grid[i+1][j].bomb) {
                grid[i][j].number += 1;
            }
            if (j > 0 && grid[i][j-1].bomb) {
                grid[i][j].number += 1;
            }
            if (j < size-1 && grid[i][j+1].bomb) {
                grid[i][j].number += 1;
            }
            if (i > 0 && j > 0 && grid[i-1][j-1].bomb) {
                grid[i][j].number += 1;
            }
            if (i < size-1 && j > 0 && grid[i+1][j-1].bomb) {
                grid[i][j].number += 1;
            }
            if (i > 0 && j < size-1 && grid[i-1][j+1].bomb) {
                grid[i][j].number += 1;
            }
            if (i < size-1 && j < size-1 && grid[i+1][j+1].bomb) {
                grid[i][j].number += 1;
            }
        }
    }
}

function draw() {
    background(0);
    for(var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            grid[i][j].draw();
        }
    }
    if (loose) {
        fill(255,0,0);
        stroke(255,0,0);
        textSize(48);
        text("YOU LOOSE", width/2-100, height/2);
    }

}

function mouseClicked() {
    //console.log(mouseX, mouseY);
    for(var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if ((mouseX > grid[i][j].pos.x*gridSize && mouseX < grid[i][j].pos.x*gridSize + gridSize) && (mouseY > grid[i][j].pos.y*gridSize && mouseY < grid[i][j].pos.y*gridSize + gridSize)) {
                grid[i][j].revealed = true;
                if (grid[i][j].bomb) {
                    loose = true;
                }
            }
        }
    }
}