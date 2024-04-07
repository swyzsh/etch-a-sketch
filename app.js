document.addEventListener('DOMContentLoaded', ()=> {

  /* Grid Style Sketch Board */
  addGrid();
  function addGrid() {
    function createGridCell(color) {
      const div = document.createElement('div');
      div.style.backgroundColor = color;
      div.style.width = '4px';
      div.style.height = '4px';
      return div;
    }
    function gridWidth1() {
      const rowContainer1 = document.createElement('grid-row-1');
      rowContainer1.style.display = 'flex';
      rowContainer1.style.flexDirection = 'row';
      for (let i = 0; i < 32; i++) {
        rowContainer1.appendChild(createGridCell('var(--subtext0'));
        rowContainer1.appendChild(createGridCell('var(--surface2)'));
      }
      return rowContainer1;
    }
    function gridWidth2() {
      const rowContainer2 = document.createElement('grid-row-2');
      rowContainer2.style.display = 'flex';
      rowContainer2.style.flexDirection = 'row';
      for (let i = 0; i < 32; i++) {
        rowContainer2.appendChild(createGridCell('var(--surface2)'));
        rowContainer2.appendChild(createGridCell('var(--subtext0)'));
      }
      return rowContainer2;
    }
    function gridHeight() {
      const gridContainer = document.getElementById('grid-container');
      for (let i = 0; i < 32; i++) {
        gridContainer.appendChild(gridWidth1());
        gridContainer.appendChild(gridWidth2());
      }
    }
    gridHeight();    
  }


  const pencilBtn = document.getElementById('pencil');
  pencilBtn.addEventListener('click', ()=> {
    const drawingBoard = document.getElementById('grid-container');
    drawingBoard.classList.toggle("cursor-pencil");
  });

});



/* Pencil Functionality - draw on the boxes to give pixelated effect */

/* Pen Functionality - draw freeform based on size of pixels selected */

/* Erase any pen/pencil marks */