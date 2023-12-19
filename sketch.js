let mr = 5;
let size = 18;
let cells;
let phrase = "FREE\nPALESTINE";
white = [100, 100, 101];

function setup() {
  createCanvas(window.innerWidth,
              window.innerHeight);
  cells = new Grid(size);
  rectMode(CENTER);
}

function draw() {
  background(100);
  textSize(250);
  fill(100, 100, 101);
  text(phrase, 100, height/2 + 100);
  textSize(size);
  cells.display();

}

function areEqual(li1, li2, n) {
  for (let i = 0; i < n; i++) {
    if (li1[i] != li2[i]) {
      return false;
    }
  }
  return true;
}

function isIn(x, y, m, clr) {
  for (let i = -m; i < m; i++) {
    for (let j = -m; j < m; j++) {
      if (areEqual(get(x + i, y + j), clr, 3)) {
        return true;
        
      }
    }
  }
  return false;
}

function Cell(x, y) {
  this.x = x;
  this.y = y;
  this.value = round(random(0, 1));
  this.stabl = false;
  
  this.show = function() {
    if (this.value == 1) {
      fill(255);
      text(this.value, this.x - 7, this.y + 9);
    }
    else {
      fill(0);
      text(this.value, this.x - 7, this.y + 9);
    }


    //updating
    if (round(random(0, 10)) == 5) {
      this.updateValue();
    }
    
    //stabilazing
    if (!this.stabl && round(random(0, 500)) == 30) {
      this.stabilize();
    }
    
  };
  
  this.updateValue = function() {
    if (!this.stabl) {
      this.value = round(random(0, 1));
    }
  };
  
  this.stabilize = function() {
    if (isIn(this.x, this.y, mr, white)) {
      this.value = 1;
      this.stabl = true;
    }
    else {
      this.value = 0;
      this.stabl = true;
    }
  }
  
  
  /*this.stabilize = function() {
    if (areEqual(get(x, y), white, 3)) {
      this.value = 1;
      this.stabl = true;
    }
    else {
      this.value = 0;
      this.stabl = true;
    }
  }*/

}

function Grid(cellSize) {
  this.columns = width/cellSize;
  this.rows = height/cellSize;
  this.matrix = [];
  for (let i = 0; i < this.rows; i++) {
    let row = [];
    for (let j = 0; j < this.columns; j++) {
      let x = j*cellSize + (cellSize/2);
      let y = i*cellSize + (cellSize/2);
      row.push(new Cell(x, y));
    }
    this.matrix.push(row);
  }
  
  this.display = function() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.matrix[i][j].show();
      }
    }
  };
}
