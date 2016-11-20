var pixelPainter = window.pixelPainter || {};

//create a div pixel when invoked
//pixel will have background color property - default white
//will have a height and width property
//addEventListener property ('click', changeColor())
function pixelFactory() {
var pixelMake = document.createElement('td');
pixelMake.className = 'col1';
pixelMake.style.background = "#ffffff";
pixelMake.style.width = '5px';
pixelMake.style.height = '5px';
pixelMake.addEventListener('click',changeColor);
pixelMake.addEventListener('mouseover', dragColor);
return pixelMake;
}

//create a change color funtional method
function changeColor() {
  this.style.background = selectedColor;
  console.log(this.style.background);
}

//create a mouse over function method
function dragColor() {
  if(mouseDown) {
  this.style.background = selectedColor;
}
}


