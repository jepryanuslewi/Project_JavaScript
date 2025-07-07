const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// Set Canvas
canvas.width = 800;
canvas.height = 600;
const brushBtn = document.getElementById('brush');
const eraserBtn = document.getElementById('eraser');
const clearBtn = document.getElementById('clear');
const colorPicker = document.getElementById('colorPicker');
const lineWidth = document.getElementById('lineWidth')

// variabel to store state of the tools
let painting = false;
let erasing = false;
let currentColor = '#000000';
let line = lineWidth.value;

// Function to start position
function startPosition(e) {
    painting = true;
    draw(e);
}

// Function to end position
function endPosition(params) {
    painting = false;
    ctx.beginPath(); //start new path
}

// Function to draw on canvas
function draw(e) {
    if (!painting) return;
    ctx.lineWidth = line;
    ctx.lineCap = 'round';
    ctx.strokeStyle = erasing ? '#ffffff' : currentColor;

    ctx.lineTo(e.clientX - canvas.offsetLeft , e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft , e.clientY - canvas.offsetTop);
}

// Function to select brush
function selectBrush() {
    erasing = false;
    brushBtn.classList.add('active');
    eraserBtn.classList.remove('active');
}

// function to selecr eraser
function selectEraser() {
    erasing = true;
    eraserBtn.classList.add('active');
    brushBtn.classList.remove('active');
}

// Function to clearCanvas
function clearCanvas() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

function changeColor(e) {
    currentColor = e.target.value;
}

function cekLineWidth() {
    if (lineWidth.value > 20 || lineWidth.value < 0) {
        alert('Batas LineWidth 1-20');
        lineWidth.value = '';
        lineWidth.value = line;
    }
    line = lineWidth.value;
}

// addEventListener to lineWidth
lineWidth.addEventListener('input', cekLineWidth);
// addEventListener to each tool
brushBtn.addEventListener('click', selectBrush);
eraserBtn.addEventListener('click', selectEraser);
clearBtn.addEventListener('click', clearCanvas);
colorPicker.addEventListener('input', changeColor);
// addEventListener to pain on canvas
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mouseleave', endPosition)
canvas.addEventListener('mousemove', draw);
