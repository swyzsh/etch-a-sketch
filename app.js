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

  /* Changing Grid Size and Pixel Count */

  /* grid dropdown selection */
  const gridSelectorDropdownBtn = document.getElementById('grid-selector-dropdown');
  const gridOption1 = document.getElementById('grid-option-1');
  const gridOption2 = document.getElementById('grid-option-2');
  const gridCustomForm = document.getElementById('grid-option-custom-form');
  const gridOptionCustomInput = document.getElementById('grid-option-custom');
  const submitGridOptionCustom = document.getElementById('submit-grid-option-custom');
  
  gridOption1.style.display = 'none';
  gridOption2.style.display = 'none';
  gridCustomForm.style.display = 'none';
  gridOptionCustomInput.style.display = 'block';
  submitGridOptionCustom.style.display = 'none';
  let gridDropdown = false;

  gridSelectorDropdownBtn.addEventListener('click', function() {
    gridDropdown = !gridDropdown;
    gridOption1.style.display = gridDropdown ? 'block' : 'none';
    gridOption2.style.display = gridDropdown ? 'block' : 'none';
    gridCustomForm.style.display = gridDropdown ? 'block' : 'none';
    submitGridOptionCustom.style.display = gridDropdown ? 'block' : 'none';
  });

  // prevent dropdown from closing when trying to enter input
  gridOptionCustomInput.addEventListener('click', function(event) {
    event.stopPropagation();
  });

  /* pixel count dropdown selection */
  const pixelSelectorDropdownBtn = document.getElementById('pixel-selector-dropdown');
  const pixelOption1 = document.getElementById('pixel-option-1');
  const pixelOption2 = document.getElementById('pixel-option-2');
  const pixelCustomForm = document.getElementById('pixel-option-custom-form');
  const pixelOptionCustomInput = document.getElementById('pixel-option-custom');
  const submitPixelOptionCustom = document.getElementById('submit-pixel-option-custom');
  
  pixelOption1.style.display = 'none';
  pixelOption2.style.display = 'none';
  pixelCustomForm.style.display = 'none';
  pixelOptionCustomInput.style.display = 'block';
  submitPixelOptionCustom.style.display = 'none';
  let pixelDropdown = false;

  pixelSelectorDropdownBtn.addEventListener('click', function() {
    pixelDropdown = !pixelDropdown;
    pixelOption1.style.display = pixelDropdown ? 'block' : 'none';
    pixelOption2.style.display = pixelDropdown ? 'block' : 'none';
    pixelCustomForm.style.display = pixelDropdown ? 'block' : 'none';
    submitPixelOptionCustom.style.display = pixelDropdown ? 'block' : 'none';
  });

  // prevent dropdown from closing when trying to enter input
  pixelOptionCustomInput.addEventListener('click', function(event) {
    event.stopPropagation();
  });


});



/* Pencil Functionality - draw on the boxes to give pixelated effect */

/* Pen Functionality - draw freeform based on size of pixels selected */

/* Erase any pen/pencil marks */