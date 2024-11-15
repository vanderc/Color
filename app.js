window.onload = function () {
    // Get references to canvas and controls
    var canvas = document.getElementById("drawingCanvas");
    var ctx = canvas.getContext("2d");
    var colorPicker = document.getElementById("colorPicker");
    var brushSizeInput = document.getElementById("brushSize");
    var clearButton = document.getElementById("clearButton");
    if (!ctx) {
        alert("Failed to get canvas context!");
        return;
    }
    var drawing = false;
    var brushSize = parseInt(brushSizeInput.value);
    var currentColor = colorPicker.value;
    // Set canvas dimensions
    canvas.width = 600;
    canvas.height = 400;
    // Starts drawinging
    function startPosition(e) {
        drawing = true;
        draw(e); // Ensure drawing starts immediately on click
    }
    // Ends the drawing
    function endPosition() {
        drawing = false;
        ctx.beginPath(); // Start a new path when drawing stops
    }
    // Function to draw on canvas
    function draw(e) {
        if (!drawing)
            return;
        // Sets the drawing size and color
        ctx.lineWidth = brushSize;
        ctx.lineCap = "round"; // Makes the line rounded
        ctx.strokeStyle = currentColor;
        // Draws the line
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }
    // Attach event listeners for mouse events
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);
    // Attach event listener for changing color
    colorPicker.addEventListener("input", function (e) {
        currentColor = e.target.value;
    });
    // Attach event listener for changing brush size
    brushSizeInput.addEventListener("input", function (e) {
        brushSize = parseInt(e.target.value);
    });
    // Clear the canvas
    clearButton.addEventListener("click", function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
};
