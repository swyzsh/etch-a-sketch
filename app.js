let gridSize = 100;
let pixelSize = '6px'

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

  function originalColor(i, j) {
    return i % 2 === j % 2 ? 'var(--subtext0)' : 'var(--surface2)';
  }

  function createGridCell(i, j) {
    const div = document.createElement('div');
    const color = originalColor(i, j);
    div.style.backgroundColor = color;
    div.style.width = pixelSize;
    div.style.height = pixelSize;

    // add event listeners for mouse movements of tools
    div.addEventListener('mousedown', handleMouseDown);
    div.addEventListener('mouseenter', handleMouseEnter);
    div.addEventListener('mouseup', handleMouseUp);
    
    // attach original color as a property of the div for the eraser to use
    div.dataset.originalColor = color;

    return div;
  }
  function handleMouseDown(event) {
    if (currentTool === "cursor-pencil" && toolIsActive) {
      pencilDraw(event);
    } else if (currentTool === "cursor-brush" && toolIsActive) {
      brushDraw(event);
    } else if (currentTool === "cursor-eraser" && toolIsActive) {
      eraseDraw(event);
    }
  }
  function handleMouseEnter(event) {
    if (isDrawing) {
      if (currentTool === "cursor-pencil") {
        continuePencilDraw(event);
      } else if (currentTool === "cursor-brush") {
        continueBrushDraw(event);
      } else if (currentTool === "cursor-eraser") {
        continueErase(event);
      }
    }
  }
  function handleMouseUp(event) {
    isDrawing = false;
  } 

  function addGrid() {
    document.getElementById('grid-container').innerHTML = ''; // Clear existing grid first
    for (let i = 0; i < gridSize; i++) { // Use dynamic grid size
        const rowContainer = document.createElement('div');
        rowContainer.style.display = 'flex';
        rowContainer.style.flexDirection = 'row';
        for (let j = 0; j < gridSize; j++) { // Grid size determines both width and height
          rowContainer.appendChild(createGridCell(i, j));
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
  const brushBtn = document.getElementById('brush');
  const buttons = [eraserBtn, pencilBtn, brushBtn];
  const drawingBoard = document.getElementById('grid-container');

  let currentTool = ''; // track tool for use later
  let toolIsActive = false; // track if tool is active

  function toggleCursor(requestedCursor, pressedButton) {
    const cursorClasses = ["cursor-eraser", "cursor-pencil", "cursor-brush"];
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
  brushBtn.addEventListener('click', function() {
    toggleCursor("cursor-brush", this);
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

  /* Brush Draw Logic - pen should colors multiple grids around the cursor to form a pen stroke */
  function brushDraw(event) {
    if (currentTool === "cursor-brush" && toolIsActive) {
      isDrawing = true;
      brushCells(event.target);
    }
  }
  function continueBrushDraw(event) {
    if (isDrawing && currentTool === "cursor-brush" && toolIsActive) {
      brushCells(event.target);
    }
  }
  function brushCells(target) {
    // color the target cell
    target.style.backgroundColor = selectedColor;

    // retrieve the parent row and the index of the target cell within this row
    let row = target.parentNode;
    let index = Array.prototype.indexOf.call(row.children, target);

    // color the next cell in the row if it exists
    if (index + 1 < row.children.length) {
      row.children[index + 1].style.backgroundColor = selectedColor;
    }

    // try to color the corresponding cells in the next row if it exists
    let nextRow = row.nextElementSibling;
    if (nextRow && nextRow.children.length > index) {
      nextRow.children[index].style.backgroundColor = selectedColor;
      if (index + 1 < nextRow.children.length) {
        nextRow.children[index + 1].style.backgroundColor = selectedColor;
      }
    }
  }

  /* Eraser Logic - eraser should revert the select div's color back to original color of said div */
  function eraseCells(target) {
    // Calculate the row and column index of the target cell
    let row = target.parentNode;
    let rowIndex = Array.prototype.indexOf.call(row.parentNode.children, row);
    let colIndex = Array.prototype.indexOf.call(row.children, target);

    // Determine the range of cells to erase
    let startRow = Math.max(rowIndex - 1, 0);
    let endRow = Math.min(rowIndex + 1, gridSize - 1);
    let startCol = Math.max(colIndex - 1, 0);
    let endCol = Math.min(colIndex + 1, gridSize - 1);

    // Loop over the cells in the 3x3 square around the target cell
    for (let i = startRow; i <= endRow; i++) {
      let currentRow = row.parentNode.children[i];
      for (let j = startCol; j <= endCol; j++) {
        let cell = currentRow.children[j];
        cell.style.backgroundColor = cell.dataset.originalColor;
      }
    }
  }
  function eraseDraw(event) {
    if (currentTool === "cursor-eraser" && toolIsActive) {
      isDrawing = true;
      eraseCells(event.target);
    }
  }
  function continueErase(event) {
    if(isDrawing && currentTool === "cursor-eraser" && toolIsActive) {
      eraseCells(event.target);
    }
  }

});
