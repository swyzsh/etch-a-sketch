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

  /* Toggle Cursor Icons */
  const eraserBtn = document.getElementById('eraser');
  const pencilBtn = document.getElementById('pencil');
  const penBtn = document.getElementById('pen');
  const buttons = [eraserBtn, pencilBtn, penBtn];
  const drawingBoard = document.getElementById('grid-container');

  function toggleCursor(requestedCursor, pressedButton) {
    const cursorClasses = ["cursor-eraser", "cursor-pencil", "cursor-pen"];
    const isTogglingOff = drawingBoard.classList.contains(requestedCursor);

    // Remove existing cursor classes from the drawing board
    drawingBoard.classList.remove(...cursorClasses, "cursor-normal");

    // Add the correct cursor class back if we're not toggling off
    if (!isTogglingOff) {
      drawingBoard.classList.add(requestedCursor);
    } else {
      drawingBoard.classList.add("cursor-normal");
    }

    // Manage the toolbar-pressed class for buttons
    buttons.forEach(button => {
      if (button === pressedButton && !isTogglingOff) {
        button.classList.add("toolbar-pressed"); // Add to the clicked button if not toggling off
      } else {
        button.classList.remove("toolbar-pressed"); // Remove from all others
      }
    });
    console.log(`changing cursor to ${requestedCursor}`);
  }
  
  eraserBtn.addEventListener('click', function() {
    toggleCursor("cursor-eraser", this); // pass "this" as the pressed button
  });
  pencilBtn.addEventListener('click', function() {
    toggleCursor("cursor-pencil", this);
  });
  penBtn.addEventListener('click', function() {
    toggleCursor("cursor-pen", this);
  });

});



/* Pencil Functionality - draw on the boxes to give pixelated effect */

/* Pen Functionality - draw freeform based on size of pixels selected */

/* Erase any pen/pencil marks */