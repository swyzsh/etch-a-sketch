let gridSize = 64;
let pixelSize = '4px'

// Change selected Grid/Pixel status span
function updateGridPixelStatus() {
  document.querySelector('#grid-selector-dropdown span').innerHTML = `[Selected: ${gridSize}x${gridSize}]<br>Grid Size ↓`;
  document.querySelector('#pixel-selector-dropdown span').innerHTML = `[Selected: ${pixelSize}]<br>Pixel Size ↓`;
}

// executes after DOM loads...
document.addEventListener('DOMContentLoaded', ()=> {

  /* Grid Style Sketch Board */
  addGrid();
  updateGridPixelStatus(); 

  // take user input on grid selection
  document.getElementById('grid-option-1').addEventListener('click', function() {
    gridSize = 32;
    addGrid();
    updateGridPixelStatus(); 
  });
  document.getElementById('grid-option-2').addEventListener('click', function() {
    gridSize = 64;
    addGrid();
    updateGridPixelStatus(); 
  });
  document.getElementById('submit-grid-option-custom').addEventListener('click', function() {
    const customSize = parseInt(document.getElementById('grid-option-custom').value, 10);
    if (!isNaN(customSize)) {
      gridSize = customSize;
      addGrid();
      updateGridPixelStatus(); 
    }
  });

  // take user input on pixel selection
  document.getElementById('pixel-option-1').addEventListener('click', function() {
    pixelSize = '1px';
    addGrid();
    updateGridPixelStatus(); 
  });
  document.getElementById('pixel-option-2').addEventListener('click', function() {
    pixelSize = '4px';
    addGrid();
    updateGridPixelStatus(); 
  });
  document.getElementById('submit-pixel-option-custom').addEventListener('click', function() {
    const customPixelSize = parseInt(document.getElementById('pixel-option-custom').value, 10);
    if (!isNaN(customPixelSize)) {
        pixelSize = `${customPixelSize}px`;
        addGrid();
        updateGridPixelStatus(); 
    }
  });

  function createGridCell(color) {
    const div = document.createElement('div');
    div.style.backgroundColor = color;
    div.style.width = pixelSize;
    div.style.height = pixelSize;

    // add event listeners for mouse movements - pencil tool
    div.addEventListener('mousedown', pencilDraw);
    div.addEventListener('mouseenter', continuePencilDraw);
    div.addEventListener('mouseup', stopPencilDraw);

    return div;
  }


  function addGrid() {
    document.getElementById('grid-container').innerHTML = ''; // Clear existing grid first
    for (let i = 0; i < gridSize; i++) { // Use dynamic grid size
        const rowContainer = document.createElement('div');
        rowContainer.style.display = 'flex';
        rowContainer.style.flexDirection = 'row';
        for (let j = 0; j < gridSize; j++) { // Grid size determines both width and height
            rowContainer.appendChild(createGridCell(i % 2 === j % 2 ? 'var(--subtext0)' : 'var(--surface2)'));
        }
        document.getElementById('grid-container').appendChild(rowContainer);
    }
  }

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

  /* Toggle Cursor Icons */

  const eraserBtn = document.getElementById('eraser');
  const pencilBtn = document.getElementById('pencil');
  const penBtn = document.getElementById('pen');
  const buttons = [eraserBtn, pencilBtn, penBtn];
  const drawingBoard = document.getElementById('grid-container');

  let currentTool = ''; // track tool for use later
  let toolIsActive = false; // track if tool is active

  function toggleCursor(requestedCursor, pressedButton) {
    const cursorClasses = ["cursor-eraser", "cursor-pencil", "cursor-pen"];
    const isTogglingOff = drawingBoard.classList.contains(requestedCursor);
    toolIsActive = !isTogglingOff;

    // Remove existing cursor classes from the drawing board
    drawingBoard.classList.remove(...cursorClasses, "cursor-normal");

    // Add the correct cursor class back if we're not toggling off
    if (!isTogglingOff) {
      drawingBoard.classList.add(requestedCursor);
      currentTool = requestedCursor;
    } else {
      drawingBoard.classList.add("cursor-normal");
      currentTool = '';
    }

    // Manage the toolbar-pressed class for buttons
    buttons.forEach(button => {
      if (button === pressedButton && !isTogglingOff) {
        button.classList.add("toolbar-pressed"); // Add to the clicked button if not toggling off
      } else {
        button.classList.remove("toolbar-pressed"); // Remove from all others
      }
    });
    console.log(`Changing cursor to ${requestedCursor}, toggling off: ${isTogglingOff}`);
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

  // user selected colors for tools
  selectedColor = '#000000' 

  let isDrawing = false;

  /* Pencil Draw Logic - pencil simply colors each single grid */
  function pencilDraw(event) {
    if (currentTool === "cursor-pencil" && toolIsActive) {
      isDrawing = true;
      event.target.style.backgroundColor = selectedColor; 
    }
  }
  function continuePencilDraw(event) {
    if(isDrawing && currentTool === "cursor-pencil" && toolIsActive) {
      event.target.style.backgroundColor = selectedColor;
    }
  }
  function stopPencilDraw() {
    if (currentTool === "cursor-pencil" && toolIsActive) {
      isDrawing = false;
    }
  }

  /* Brush Draw Logic - pen should colors multiple grids around the cursor to form a pen stroke */

});

/* 

two standard options for grid size:
1. 32x32 (frontend) = 8px, 16x16 (backend)
2. 64x64 (frontend) = 4px, 32x32 (backend)


*/


/* Pencil Functionality - draw on the boxes to give pixelated effect */

/* Pen Functionality - draw freeform based on size of pixels selected */

/* Erase any pen/pencil marks */