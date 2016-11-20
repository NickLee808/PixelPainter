var pixelPainter = window.pixelPainter || {};

// Global variable
var selectedColor = '#000000';

// Array of our color options
var colorArry = ['#CD4A4A','#CC6666','#BC5D58','#FD5E53','#FF7538','#9F8170','#FAA76C','#FF8D88','#FFCF48','#FCE883','#BAB86C','#FDFC74','#87A96B','#1DF914','#76FF7A','#6DAE81','#1CAC78','#178086', '#ADFF2F', '#32CD32', '#20B2AA', '#00FFFF', '#E0FFFF', '#00CED1', '#48D1CC', '#AFEEEE', '#4682B4', '#000080', '#00008B', '#4169E1', '#8A2BE2', '#4B0082', '#9400D3', '#DDA0DD', '#DA70D6', '#FF69B4', '#FFB6C1', '#FAEBD7', '#F5F5DC', '#FFEBCD', '#FAFAD2', '#8B4513', '#A0522D', '#D2691E', '#FFE4E1', '#FFF0F5', '#FAF0E6', '#FFEFD5', '#E6E6FA', '#F8F8FF', '#F0FFF0', '#FFFFF0','#FFFFFF','#CFCFCF','#ABABAB','#838485','#494A4A','#000000','#CB4154','#FF9BAA','#EF98AA','#EE204D','#EE204D','#FC89AC','#FF1DCE','#C364C5','#9D81BA','#7366BD','#5D76CB','#1F75FE'];

// will create a static grid of static divs
// hard code all colors into grid
// addeventListener to each pixal color selector
function paletteGrid() {
var rows = 12;
var cols = 5;
var counter = 0;
var row;
var palettePx;
var paletteDiv = document.createElement('table');
paletteDiv.id = 'paletteDiv';


for(var i = 0; i < rows; i++) {
  row = document.createElement('tr');
  row.className = 'row';
  for(var j = 0; j < cols; j++) {
    palettePx = palettePixelFactory(colorArry[counter]);
    row.appendChild(palettePx);
    counter ++;
  }
  paletteDiv.appendChild(row);
}
// debugger;
document.body.appendChild(paletteDiv);
}

// return clicked pixels color store global
function palettePixelFactory(color) {
  var pixelColor = document.createElement('td');
  pixelColor.style.background = color;
  pixelColor.style.width = '20px';
  pixelColor.style.height = '20px';
  pixelColor.addEventListener('click', colorSelector);
return pixelColor;
}

//selects a color and uses that color to iterate over objects
function colorSelector() {
  selectedColor = this.style.background;
  console.log(selectedColor);
}

paletteGrid();

//created IIFI for an eraser button that when clicked erases color objects
(function eraseButton() {
  var eraser = document.createElement('button');
  eraser.id = 'eraser';
  eraser.innerHTML = "Erase";
  eraser.style.background = "white";
  eraser.style.width = '50px';
  eraser.style.height = '25px';
  eraser.addEventListener('click', eraseColor);
  document.body.appendChild(eraser);
}());

//function set to white color
function eraseColor() {
  selectedColor = "#ffffff";
  console.log('testing',selectedColor);
}

//created an IIFI for a clear button that when clicked reinvoked our table matrix function
(function clearButton() {
  var clearUm = document.createElement('button');
  clearUm.id = 'clear';
  clearUm.innerHTML = 'Clear';
  clearUm.style.background = 'white';
  clearUm.style.width = '50px';
  clearUm.style.height = '25px';
  clearUm.addEventListener('click', clearAll);
  document.body.appendChild(clearUm);
}());

//invokes pixelPainter function
function clearAll() {
  document.body.removeChild(document.querySelector('#grid'));
  pixelPainter(100,100);
}

