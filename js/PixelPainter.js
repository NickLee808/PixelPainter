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
  var currentColor = '000000';
  var previousColor;
  var colorArray = ['000000', 'FF0000', 'FF2900', 'FF5200', 'FF7C00', 'FFA500', 'FFBC00', 'FFD200', 'FFE800', 'FFFF00', 'C0E000', '80C000', '40A000', '008000', '408040', '004080', '0020C0', '0000FF', '2000E0', '4000C0', '6000A0', '800080', 'A00060', 'C00040', 'E00020'];

  var colorDisplay = document.createElement('canvas');
  colorDisplay.id = 'color-display';
  pixelPainter.appendChild(colorDisplay);
  colorDisplay.style.backgroundColor = currentColor;

  for (let i = 0; i < colorArray.length; i++) {
    var paletteButton = document.createElement('canvas');
    paletteButton.id = colorArray[i];
    paletteButton.className = 'pp-palette';
    paletteButton.style.backgroundColor = colorArray[i];
    pixelPainter.appendChild(paletteButton);
    paletteButton.addEventListener('click', selectColor)
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
    eraseButton.addEventListener('click', eraseTool);

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

  // fill button
  var fillButton = document.createElement('button');
    fillButton.className = 'pp-button';
    fillButton.id = 'fill';
    pixelPainter.appendChild(fillButton);

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
  var drawing;
  var erasing;

  function drawTool(){
    initializeTool();
    for (let i = 0; i < cellList.length; i++) {
      cellList[i].addEventListener('mousedown', startDraw);
      cellList[i].addEventListener('mouseover', moreDraw);
      cellList[i].addEventListener('mouseup', endDraw);
    }
  }

  function rectTool(){
    initializeTool();
    var audio = document.getElementById("rectAudio");
    audio.play();
    for (let i = 0; i < cellList.length; i++) {
      cellList[i].addEventListener('mousedown', startRect);
      cellList[i].addEventListener('mouseup', endRect);
    }
  }

  function eraseTool(){
    drawTool();
    erasing = true;
    previousColor = currentColor;
    currentColor = 'initial';
    colorDisplay.style.backgroundColor = 'white';
  }

  function initializeTool(){
    clearListeners();
    erasing = false;
    if (currentColor === 'initial'){
      currentColor = previousColor;
      colorDisplay.style.backgroundColor = currentColor;
    }
  }

  function selectColor(){
    if (erasing === false){
      currentColor = this.id;
      colorDisplay.style.backgroundColor = currentColor;
    }
  }

  function clearListeners(){
    for (let i = 0; i < cellList.length; i++) {
      cellList[i].removeEventListener('mousedown', startDraw);
      cellList[i].removeEventListener('mouseover', moreDraw);
      cellList[i].removeEventListener('mouseup', endDraw);
      cellList[i].removeEventListener('mousedown', startRect);
      cellList[i].removeEventListener('mouseup', endRect);
    }
  }

  function startDraw(){
    drawing = true;
    this.style.backgroundColor = currentColor;
  }

  function moreDraw(){
    if (drawing === true){
      this.style.backgroundColor = currentColor;
    }
  }

  function endDraw(){
    drawing = false;
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
    clearCanvas();
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
          if (cellList[i].dataX >= startX && cellList[i].dataX <= endX){
            cellList[i].style.backgroundColor = currentColor;
          }
        }else{
          if (cellList[i].dataX <= startX && cellList[i].dataX >= endX){
            cellList[i].style.backgroundColor = currentColor;
          }
        }
      }

      if (cellList[i].dataX === startX || cellList[i].dataX === endX){
        if (startY < endY){
          if (cellList[i].dataY >= startY && cellList[i].dataY <= endY){
            cellList[i].style.backgroundColor = currentColor;
          }
        }else{
          if (cellList[i].dataY <= startY && cellList[i].dataY >= endY){
            cellList[i].style.backgroundColor = currentColor;
          }
        }
      }
    }
  }

  //initialize with draw tool active
  drawTool();

}

// canvas resolution
pixelPainterModule(100,150);