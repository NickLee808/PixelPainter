console.log('Sanity');

function pixelPainterModule(width,height){

  //canvas
  var ppCanvas = document.createElement('table');
  ppCanvas.id = 'pp-canvas';
  pixelPainter.appendChild(ppCanvas);


  for (var y = 0; y < height; y++) {
    var canvasRows = document.createElement('tr');
    ppCanvas.appendChild(canvasRows);
    for (var x = 0; x < width; x++) {
      var canvasCells = document.createElement('td');
      canvasCells.dataX = x;
      canvasCells.dataY = y;
      canvasRows.appendChild(canvasCells);
    }
  }

  //blank divs
  var leftDiv = document.createElement('div');
  leftDiv.id = 'left';
  leftDiv.className = 'pp-empty';
  pixelPainter.appendChild(leftDiv);
  leftDiv.addEventListener('mouseover', endDraw);

  var topDiv = document.createElement('div');
  topDiv.id = 'top';
  topDiv.className = 'pp-empty';
  pixelPainter.appendChild(topDiv);
  topDiv.addEventListener('mouseover', endDraw);


  var bottomDiv = document.createElement('div');
  bottomDiv.id = 'bottom';
  bottomDiv.className = 'pp-empty';
  pixelPainter.appendChild(bottomDiv);
  bottomDiv.addEventListener('mouseover', endDraw);

  var rightDiv = document.createElement('div');
  rightDiv.id = 'right';
  rightDiv.className = 'pp-empty';
  pixelPainter.appendChild(rightDiv);
  rightDiv.addEventListener('mouseover', endDraw);


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

  //draw button
  var drawButton = document.createElement('button');
    drawButton.className = 'pp-button';
    drawButton.id = 'draw';
    pixelPainter.appendChild(drawButton);
    drawButton.addEventListener('click', drawTool);

  //rectangle button
  var rectButton = document.createElement('button');
    rectButton.className = 'pp-button';
    rectButton.id = 'rectangle';
    pixelPainter.appendChild(rectButton);
    rectButton.addEventListener('click', rectTool);

  //clear button
  var clearButton = document.createElement('button');
    clearButton.className = 'pp-button';
    clearButton.id = 'clear';
    pixelPainter.appendChild(clearButton);
    clearButton.addEventListener('click', clearCanvas);

  //erase button
  var eraseButton = document.createElement('button');
    eraseButton.id = 'erase';
    eraseButton.className = 'pp-button';
    pixelPainter.appendChild(eraseButton);
    eraseButton.addEventListener('click', function(){
      drawTool();
      currentColor = 'initial';
    });

  // save button
  var saveButton = document.createElement('button');
    saveButton.className = 'pp-button';
    saveButton.id = 'save';
    pixelPainter.appendChild(saveButton);
    saveButton.addEventListener('click',saveCanvas);

  // load button
  var loadButton = document.createElement('button');
    loadButton.className = 'pp-button';
    loadButton.id = 'load';
    pixelPainter.appendChild(loadButton);
    loadButton.addEventListener('click',loadCanvas);

  //fill button
  // var fillButton = document.createElement('button');
  //   fillButton.className = 'pp-button';
  //   fillButton.id = 'fill';
  //   pixelPainter.appendChild(fillButton);

  var clearAudio = document.createElement('audio');
    clearAudio.id = 'clearAudio';
    clearAudio.src = '/imgs/We%20dont%20make%20mistakes%20here....mp3';
    pixelPainter.appendChild(clearAudio);

   var rectAudio = document.createElement('audio');
    rectAudio.id = 'rectAudio';
    rectAudio.src = '/imgs/Shoot%20lets%20get%20crazy.mp3';
    pixelPainter.appendChild(rectAudio);

  //functions
  var cellList = ppCanvas.getElementsByTagName('td');
  var paint;

  function drawTool(){
    clearListeners();
    for (let i = 0; i < cellList.length; i++) {
      cellList[i].addEventListener('mousedown', startDraw);
      cellList[i].addEventListener('mouseenter', moreDraw);
      cellList[i].addEventListener('mouseup', endDraw);
    }
  }

  function rectTool(){
    clearListeners();
    var audio = document.getElementById("rectAudio");
    audio.play();
    for (let i = 0; i < cellList.length; i++) {
      cellList[i].addEventListener('mousedown', startRect);
      cellList[i].addEventListener('mouseup', endRect);
    }
  }

  function clearListeners(){
    for (let i = 0; i < cellList.length; i++) {
      cellList[i].removeEventListener('mousedown', startDraw);
      cellList[i].removeEventListener('mouseenter', moreDraw);
      cellList[i].removeEventListener('mouseup', endDraw);
      cellList[i].removeEventListener('mousedown', startRect);
      cellList[i].removeEventListener('mouseup', endRect);
    }
  }

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
    for (let i = 0; i < cellList.length; i++) {
      cellList[i].style.backgroundColor = 'initial';
    }
  }

  var cellColor = 'initial';
  var cellDataX = 0;
  var cellDataY = 0;
  var cellColorArray = [];
  var cellDataXArray = [];
  var cellDataYArray = [];

  function saveCanvas(){
    cellColorArray = [];
    cellDataXArray = [];
    cellDataYArray = [];
    for (let i = 0; i < cellList.length; i++) {
      if (cellList[i].style.backgroundColor !== 'initial' && cellList[i].style.backgroundColor !== ''){
        cellColor = cellList[i].style.backgroundColor;
        cellDataX = cellList[i].dataX;
        cellDataY = cellList[i].dataY;
        cellColorArray.push(cellColor);
        cellDataXArray.push(cellDataX);
        cellDataYArray.push(cellDataY);
      }
    }
  }

  function loadCanvas(){
    for (let i = 0; i < cellList.length; i++) {
      for (let x = 0; x < cellDataXArray.length; x++) {
        if (cellList[i].dataX === cellDataXArray[x] && cellList[i].dataY === cellDataYArray[x]){
          cellList[i].style.backgroundColor = cellColorArray[x];
        }
      }
    }
  }

  var startX;
  var startY;
  var endX;
  var endY;

  function startRect(){
    startX = this.dataX;
    startY = this.dataY;
  }

  function endRect(){
    endX = this.dataX;
    endY = this.dataY;

    for (let i = 0; i < cellList.length; i++) {
      if (cellList[i].dataY === startY || cellList[i].dataY === endY){
        if (startX < endX){
          for (let j = startX; j <= endX; j++) {
            if (cellList[i].dataX >= startX && cellList[i].dataX <= endX){
              cellList[i].style.backgroundColor = currentColor;
            }
          }
        }else{
          for (let j = startX; j >= endX; j--) {
            if (cellList[i].dataX <= startX && cellList[i].dataX >= endX){
              cellList[i].style.backgroundColor = currentColor;
            }
          }
        }
      }

      if (cellList[i].dataX === startX || cellList[i].dataX === endX){
        if (startY < endY){
          for (let k = startY; k <= endY; k++) {
            if (cellList[i].dataY >= startY && cellList[i].dataY <= endY){
              cellList[i].style.backgroundColor = currentColor;
            }
          }
        }else{
          for (let k = startY; k >= endY; k--) {
            if (cellList[i].dataY <= startY && cellList[i].dataY >= endY){
              cellList[i].style.backgroundColor = currentColor;
            }
          }
        }
      }
    }
  }

}

// canvas resolution
pixelPainterModule(100,150);