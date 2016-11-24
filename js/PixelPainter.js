console.log('Sanity');

function pixelPainterModule(width,height){

  //canvas
  var ppCanvas = document.createElement('table');
  ppCanvas.id = 'pp-canvas';
  pixelPainter.appendChild(ppCanvas);

  for (let i = 0; i < height; i++)                                                                                  {
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
  var colorArray = ['000000', 'FF0000', 'FF2900', 'FF5200', 'FF7C00', 'FFA500', 'FFBC00', 'FFD200', 'FFE800', 'FFFF00', 'C0E000', '80C000', '40A000', '008000', '408040', '004080', '0020C0', '0000FF', '2000E0', '4000C0', '6000A0', '800080', 'A00060', 'C00040', 'E00020'];

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
    clearButton.id = 'clear';
    pixelPainter.appendChild(clearButton);
    clearButton.addEventListener('click', clearCanvas);

  //erase button
  var eraseButton = document.createElement('button');
    eraseButton.className = 'pp-button';
    eraseButton.id = 'erase';
    pixelPainter.appendChild(eraseButton);
    eraseButton.addEventListener('click', function(){
    currentColor = 'initial';
  });

  //fill button
  var fillButton = document.createElement('button');
    fillButton.className = 'pp-button';
    fillButton.id = 'fill';
    pixelPainter.appendChild(fillButton);

  //functions
  var paint;

  var clearAudio = document.createElement('audio');
    clearAudio.id = 'clearAudio';
    clearAudio.src = '/imgs/We%20dont%20make%20mistakes%20here....mp3';
    pixelPainter.appendChild(clearAudio);

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
    var audio = document.getElementById("clearAudio");
      audio.play();
    for (i = 0; i < cellList.length; i++) {
      cellList[i].style.backgroundColor = 'initial';
    }
  }

}

// canvas resolution
pixelPainterModule(100,150);

