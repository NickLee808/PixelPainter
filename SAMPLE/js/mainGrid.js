var pixelPainter = window.pixelPainter || {};

//setup blank canvas with changeable pixels
function pixelPainter(width, height) {
  var rows = height;
  var cols = width;
  var row;
  var pix;
  var grid = document.createElement('table');
  grid.id = 'grid';

  //takes in properties of width and height to make matrix grid
  for(var i = 0; i < rows; i++) {
    row = document.createElement('tr');
    row.className = 'row1';
    for(var j = 0; j < cols; j++) {
      pix = pixelFactory();
      row.appendChild(pix);
    }
    grid.appendChild(row);
  }

//appends our matrix to the body of HTML
  document.body.appendChild(grid);
// debugger;
// console.log("test", document.body.appendChild(grid));
}
pixelPainter(100,100);

//create a global variable for our mouse
var mouseDown = false;

//if our mouse is clicked down - it is true
document.body.onmousedown = function () {
  mouseDown = true;
};

//if our mouse is not clicked down = set false
document.body.onmouseup = function() {
  mouseDown = false;
};