window.onload = () => {
    // Get references to canvas and controls
    const canvas = document.getElementById("drawingCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    const colorPicker = document.getElementById("colorPicker") as HTMLInputElement;
    const brushSizeInput = document.getElementById("brushSize") as HTMLInputElement;
    const clearButton = document.getElementById("clearButton") as HTMLButtonElement;
  
    if (!ctx) {
      alert("Failed to get canvas context!");
      return;
    }
  
    let drawing = false;
    let brushSize = parseInt(brushSizeInput.value); // Initial brush size
    let currentColor = colorPicker.value; // Initial color from the picker
  
    // Set canvas dimensions
    canvas.width = 600;
    canvas.height = 400;
  
    // Function to start drawing
    function startPosition(e: MouseEvent) {
      drawing = true;
      draw(e); // Drawing starts immediately on click
    }
  
    // Function to end drawing
    function endPosition() {
      drawing = false;
      ctx!.beginPath(); // Start a new path when drawing stops
    }
  
    // Function to draw on canvas
    function draw(e: MouseEvent) {
      if (!drawing) return;
  
      // Set the drawing color and size
      ctx!.lineWidth = brushSize;
      ctx!.lineCap = "round"; // Makes the line rounded
      ctx!.strokeStyle = currentColor;
  
      // Draw the line
      ctx!.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }
  
    // Attach event listeners for mouse events
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);
  
    // Attach event listener for changing color
    colorPicker.addEventListener("input", (e) => {
      currentColor = (e.target as HTMLInputElement).value;
    });
  
    // Attach event listener for changing brush size
    brushSizeInput.addEventListener("input", (e) => {
      brushSize = parseInt((e.target as HTMLInputElement).value);
    });
  
    // Clear the canvas
    clearButton.addEventListener("click", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  };
  