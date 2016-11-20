console.log('Sanity');

// START BLANK CANVAS SETUP


function pixelPainterModule(width,height){
  var table = document.createElement('table');
  table.id = 'grid';
  pixelPainter.appendChild(table);

  for (var i = 0; i < height; i++) {
    var rows = document.createElement('tr');
    grid.appendChild(rows);
    for (var j = 0; j < width; j++) {
      var columns = document.createElement('td');
      rows.appendChild(columns);
    }
  }
  // var paletteBox = document.createElement('div');
  // paletteBox.id = 'pp-palette';
  // pixelPainter.appendChild(paletteBox);

  colorArray = ['#000000', '#C00040', '#E00020', '#FF0000', '#FF2900', '#FF5200', '#FF7C00', '#FFA500', '#FFBC00', '#FFD200', '#FFE800', '#FFFF00', '#C0E000', '#80C000', '#40A000', '#008000', '#408040', '#004080', '#0020C0', '#0000FF', '#2000E0', '#4000C0', '#6000A0', '#800080', '#A00060'];

  function cellSelector(){
    
  }

  // function makePaletteButton(color) {
  //   for (var i = 0; i < colorArray.length; i++) {
  //     var paletteButton = document.createElement('button');
  //     paletteButton.class = 'paletteButtonClass';
  //     pixelPainter.appendChild(paletteButton);
  //   }
  // }
}

// CANVAS RESOLUTION (W X H)

pixelPainterModule(20,36);

// }

