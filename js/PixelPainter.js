console.log('Sanity');

function pixelPainterModule(width,height){
  var table = document.createElement('table');
  table.id = 'grid';
  pixelPainter.appendChild(table);

  for (var i = 0; i < height; i++) {
    var rows = document.createElement('tr');
    //canvasRow.class = 'canvasRowClass';
    grid.appendChild(rows);
    for (var j = 0; j < width; j++) {
      var columns = document.createElement('td');
      //canvasCol.class = 'canvasDataClass';
      rows.appendChild(columns);
    }
  }
  // var paletteBox = document.createElement('div');
  // paletteBox.id = 'pp-palette';
  // pixelPainter.appendChild(paletteBox);

  // colorArray = ['black', 'red', 'orange', 'yellow', 'green', 'blue', 'purple'];

  // function makePaletteButton(color) {
  //   for (var i = 0; i < colorArray.length; i++) {
  //     var paletteButton = document.createElement('button');
  //     paletteButton.class = 'paletteButtonClass';
  //     pixelPainter.appendChild(paletteButton);
  //   }
  // }
}

pixelPainterModule(30,30);


// }

