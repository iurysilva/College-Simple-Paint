let canvas;
let ctx;
let savedImageData;
let dragging = false;
let strokeColor = 'black';
let fillColor = 'black';
let line_Width = 2;
let polygonSides = 6;
let currentTool = 'brush';
let canvasWidth = 100;
let canvasHeight = 100;
let firstClick = true;

class ShapeBoundingBox{
    constructor(left, top, width, height){
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height
    }
}

class MouseDownPos{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Location{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class PolygonPoint{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let shapeBoundingBox = new ShapeBoundingBox(0,0,0,0);
let mousedown = new MouseDownPos(0,0);
let loc = new Location(0,0);

document.addEventListener('DOMContentLoaded', setupCanvas);

function setupCanvas(){
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = line_Width;

    canvas.addEventListener("mousedown", reactToMouseDown);
    //canvas.addEventListener("mousemove", reactToMouseMove);
    //canvas.addEventListener("mouseup", reactToMouseUp);
}

function clearCanvas(){
    ctx.clearRect(0,0,canvasWidth, canvasHeight);
}

function changeTools(toolClicked){
    document.getElementById('point').className = "";
    document.getElementById('line').className = "";
    document.getElementById('rectangle').className = "";
    document.getElementById('circle').className = "";
    document.getElementById('ellipse').className = "";
    document.getElementById('polygon').className = "";
    document.getElementById(toolClicked).className = 'selected';
    currentTool = toolClicked;
}

// Get mouse position
function getMousePosition(x,y){
    let canvasSizeData = canvas.getBoundingClientRect();
    return { x: (x - canvasSizeData.left) * (canvas.width / canvasSizeData.width),
    y: (y - canvasSizeData.top) * (canvas.height / canvasSizeData.height)};
}

// Save Canvas Image
function saveCanvasImage(){
    savedImageData = ctx.getImageData(0,0,canvas.width, canvas.height);
}

// Redraw Canvas Image
function redrawCanvasImage(){
    ctx.putImageData(savedImageData,0,0);
}

// Update rubberband size data
function updateRubberbandSizeData(loc){
    shapeBoundingBox.width = Math.abs(loc.x - mousedown.x);
    shapeBoundingBox.height = Math.abs(loc.y - mousedown.y);

    if(loc.x > mousedown.x){
        shapeBoundingBox.left = mousedown.x;
    }else{
        shapeBoundingBox.left = loc.x;
    }

    if(loc.y > mousedown.y){
        shapeBoundingBox.top = mousedown.y;
    }else{
        shapeBoundingBox.top = loc.y;
    }
}

// Get angle using X & Y
function getAngleUsingXAndY(mouselocX, mouselocY){
    let adjacent = mousedown.x - mouselocX;
    let opposite = mousedown.y - mouselocY;
    return radiansToDegrees(Math.atan2(opposite, adjacent));
}

// Radians to degree
function radiansToDegrees(rad){
    return (rad * (180 / Math.PI)).toFixed(2);
}

// Degree to radians
function degreesToRadians(degrees){
    return degrees * (Math.PI / 180);
}

// Update Rubberband OnMove
function updateRubberbandOnMove(loc){
    updateRubberbandSizeData(loc);
    drawRubberbandShape(loc);
}

// Drawn Rubberband shape
function drawRubberbandShape(loc) {
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;
    if (currentTool === "rectangle") {
        ctx.strokeRect(shapeBoundingBox.left, shapeBoundingBox.top,
            shapeBoundingBox.width, shapeBoundingBox.height);
    }
}

// ReactToMouseDown
function reactToMouseDown(e){

    canvas.style.cursor = "crosshair";
    loc = getMousePosition(e.clientX, e.clientY);
    saveCanvasImage();
    if(!firstClick && currentTool === 'line'){
        console.log("clicou");
        drawLine(loc);
        firstClick = true;
        return;
    }else if(firstClick && currentTool === 'line'){
        drawPoint(loc.x, loc.y);
        firstClick = false;
    }

    if(currentTool === 'point'){
        drawPoint(loc.x, loc.y);
        return;
    }

    mousedown.x = loc.x;
    mousedown.y = loc.y;
    dragging = true;
}

// ReactToMouseMove
function reactToMouseMove(e){
    canvas.style.cursor = "crosshair";
    loc = getMousePosition(e.clientX, e.clientY);
    if(dragging){
        redrawCanvasImage();
        updateRubberbandOnMove(loc);
    }
}

// ReactToMouseUp
function reactToMouseUp(e){
    canvas.style.cursor = "default";
    loc = getMousePosition(e.clientX, e.clientY);

    redrawCanvasImage();
    updateRubberbandOnMove(loc);
    dragging = false;
    //usingBrush = false;
}


function reflect(p1, p2){
    let x = mousedown.x;
    let y = mousedown.y;

    let x2 = loc.x;
    let y2 = loc.y;

    let deltaX = x2 - x;
    let deltaY = y2 - y;

    let m = deltaY/deltaX;
    let e = m-(1/2);
    let newX1 = p1.y;
    let newY1 = p1.x;

    let newX2 = p2.y;
    let newY2 = p2.x;

    if(m > 1 || m < -1){


    }
}

function drawLine(loc){
    let variaveis = reflect(mousedown, loc);
    drawPoint(x, y);

    while(x < x2){
        if(e >= 0){
            y++;
            e--;
        }
        x++;
        e += m;
        console.log("while do draw line");
        drawPoint(x,y);
    }

/*
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(mousedown.x, mousedown.y);
    ctx.lineTo(loc.x, loc.y);
    ctx.stroke();
*/
}

function drawPoint(x, y){
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(x,y,1,1);
}
