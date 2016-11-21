console.log('Sanity');

function pixelPainterModule(width,height){

  //canvas
  var ppCanvas = document.createElement('table');
  ppCanvas.id = 'pp-canvas';
  pixelPainter.appendChild(ppCanvas);

  for (let i = 0; i < height; i++) {
    var canvasRows = document.createElement('tr');
    ppCanvas.appendChild(canvasRows);
    for (let j = 0; j < width; j++) {
      var canvasCells = document.createElement('td');
      canvasRows.appendChild(canvasCells);
    }
  }

  var cellList = ppCanvas.getElementsByTagName('td');

  for (i = 0; i < cellList.length; i++) {
    cellList[i].addEventListener('mousedown', startDraw);
    cellList[i].addEventListener('mouseenter', moreDraw);
    cellList[i].addEventListener('mouseup', endDraw);
  }

//color palette
  var currentColor;
  var colorArray = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'brown', 'black'];

  for (let i = 0; i < colorArray.length; i++) {
    var paletteButton = document.createElement('canvas');
    paletteButton.id = colorArray[i];
    paletteButton.className = 'pp-palette';
    paletteButton.style.backgroundColor = colorArray[i];
    pixelPainter.appendChild(paletteButton);
    paletteButton.addEventListener('click', function(){
      currentColor = this.id;
    });
  }

//clear button
  var clearButton = document.createElement('button');
  clearButton.className = 'pp-button';
  clearButton.innerHTML = 'Clear';
  pixelPainter.appendChild(clearButton);
  clearButton.addEventListener('click', clearCanvas);

//erase button
  var eraseButton = document.createElement('button');
  eraseButton.className = 'pp-button';
  eraseButton.innerHTML = 'Erase';
  pixelPainter.appendChild(eraseButton);
  eraseButton.addEventListener('click', function(){
    currentColor = 'initial';
  });

  //functions
  var paint;

  function startDraw(){
    paint = true;
    this.style.backgroundColor = currentColor;
  }

  function moreDraw(){
    if (paint === true){
      this.style.backgroundColor = currentColor;
    }
  }

  function endDraw(){
    paint = false;
  }

  function clearCanvas(){
    for (i = 0; i < cellList.length; i++) {
      cellList[i].style.backgroundColor = 'initial';
    }
  }

}

pixelPainterModule(60,60);
