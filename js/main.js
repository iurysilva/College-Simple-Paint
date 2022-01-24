import {line} from "./algorithms/line.js";
import {curve} from './algorithms/curve.js';
import {circle, getDistance} from "./algorithms/circle.js"
import {boundary_fill} from "./algorithms/boundary_fill.js";
import {draw_polygon} from "./algorithms/draw_polygon.js";
import {scan_line_fill} from "./algorithms/scan_line_fill.js";
import {translation} from "./algorithms/translation.js";
import {scale} from "./algorithms/scale.js";
import {generateCoordinates} from "./algorithms/rotation.js";
import {clip_line, clip_polygon} from "./algorithms/clip.js";
import {Point} from "./Point.js";

const canvas = document.querySelector("#my-canvas");

//Botões das ferramentas
const pixelBtn = document.getElementById("pixel-btn");
const lineBtn = document.getElementById("line-btn");
const curveBtn = document.getElementById("curve-btn");
const circleBtn = document.getElementById("circle-btn");
const polygonBtn = document.getElementById("polygon-btn");
const boundaryFillBtn = document.getElementById("boundary-fill-btn");
const scanlineFillBtn = document.getElementById("scanline-fill-btn");
const clip = document.getElementById("clip-btn");
const translationBtn = document.getElementById("translation-btn");
const scaleBtn = document.getElementById('scale-btn');
const rotationBtn = document.getElementById('rotation-btn');

const drawBtn = document.getElementById("draw-btn");
const clearBtn = document.getElementById("clear-btn");

export const ctx = canvas.getContext("2d");
const size = 10;

// Variáveis gerais
export let border_color = "rgb(255,0,0)"; // A cor que será utilizada para desenhar tudo
export let points = [];
export let markedPoints = [];

// O objeto poligono, a cor deve ser a mesma em border_color, só que no formato RGB
export var polygon = false;
// A cor que preencherá os poligonos, também em RGB
export let fill_color = "rgb(0,0,255)";
// Tela para recorte
export var screen = false;

window.addEventListener('load', () => { //Função principal, todas as funções de draw vem aqui dentro
    canvas.addEventListener('click', functionManager);

    ctx.canvas.width = 15*size;
    ctx.canvas.height = 15*size;

    let actualTool = 'pixel'; //Ferramenta atual

    //Funções pra escutar os botões
    pixelBtn.addEventListener('click', function(){
        setTool('pixel');
    });
    lineBtn.addEventListener('click', function(){
        setTool('line');
    });
    curveBtn.addEventListener('click', function (){
        setTool('curve');
    });
    circleBtn.addEventListener('click', function (){
        setTool('circle');
    });
    polygonBtn.addEventListener('click', function (){
        setTool('polygon');
    });
    boundaryFillBtn.addEventListener('click', function (){
        setTool('boundaryFill');
    });
    scanlineFillBtn.addEventListener('click', function (){
        setTool('scanlineFill');
    });
    clip.addEventListener('click', function (){
        setTool('clip');
    });
    translationBtn.addEventListener('click', function (){
        setTool('translation');
    });
    scaleBtn.addEventListener('click', function (){
        start_scale();
    });
    rotationBtn.addEventListener('click', function (){
        start_rotation();
    });

    drawBtn.addEventListener('click', confirmDraw);
    clearBtn.addEventListener('click', clearCanvas);

    function getMousePos(canvas, evt){ //Pega posição do mouse
        const rect = canvas.getBoundingClientRect(),
            scaleX = canvas.width / rect.width,
            scaleY = canvas.height / rect.height;
        return {
            x: (evt.clientX - rect.left) * scaleX,
            y: (evt.clientY - rect.top) * scaleY
        }
    }

    function createPoint(e){
        let point = getMousePos(canvas, e);
        drawInitialPixel(point.x, point.y);
        points.push(point);

    }

    function drawPixel(e){ //Chama a função pixel pra criar um ponto
        let mousePos = getMousePos(canvas, e);

        pixel(mousePos.x, mousePos.y);
    }

    function drawInitialPixel(x, y){
        pixel(x, y); //Desenha o pixel inicial no caso da linha
    }

    function pixel(x, y, color= border_color){
        ctx.fillStyle = color;
        ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
        console.log(x, y);
    }

    function startLine(e){
        if(points.length < 1){
            points.push(getMousePos(canvas, e)); //Adiciona um ponto no array
            drawInitialPixel(points[0].x , points[0].y);
        }
        else{
            points.push(getMousePos(canvas, e));
            let x = points[0].x;
            let y = points[0].y;
            if (screen !== false){
                points = clip_line(screen, points[0], points[1]);
            }
            if (points !== false) {
                line(Math.floor(points[0].x), Math.floor(points[0].y), Math.floor(points[1].x), Math.floor(points[1].y));
            }
            deletePoint(x, y);
            points = []; // Depois de desenhar a linha, esvaziar o array ponin
        }
    }

    function startCurve(e){
        if(markedPoints.length < 2) {
            let point = getMousePos(canvas, e);
            markedPoints.push(point);
            drawInitialPixel(point.x, point.y);
        }
        else {
            createPoint(e);
        }
    }

    function start_circle(e){
        let point = getMousePos(canvas, e);
        if(points.length === 0) {
            points.push(point);
            drawInitialPixel(point.x, point.y);
        }else{
            points.push(point);
            let radius = getDistance(points[0], points[1]);
            deletePoint(points[0].x, points[0].y);
            circle(ctx, radius, points[0]);
            points = [];
        }
    }

    function start_polygon(e){
        let point = getMousePos(canvas, e);
        points.push(point);
        drawInitialPixel(point.x, point.y);
    }

    function start_boundary_fill(e){
        let point = getMousePos(canvas, e);
        boundary_fill(ctx, Math.floor(point.x), Math.floor(point.y), fill_color, border_color);
    }

    function start_scanline(e){
        scan_line_fill(ctx, polygon, fill_color);
    }

    function start_clip(e){
        let point = getMousePos(canvas, e);
        if(points.length === 0){
            points.push(point);
            drawInitialPixel(point.x, point.y);
        }else{
            points.push(new Point(point.x, points[0].y));
            points.push(point);
            points.push(new Point(points[0].x, point.y));
            screen = draw_polygon(points, border_color);
            console.log(screen);
            points = [];
        }
    }

    function start_translation(e) {
        let point = getMousePos(canvas, e);
        let newPoints = translation(polygon.points, point);
        polygon = draw_polygon(newPoints, border_color);
        points = [];
    }

    function start_scale(){
        scale(polygon.points[0]);
    }

    function start_rotation(){
        let points = generateCoordinates();
        polygon = draw_polygon(points, border_color);
        points = [];
    }

    function deletePoint(x, y) {
        ctx.clearRect(Math.floor(x), Math.floor(y), 2, 2);
    }

    function functionManager(e){
        switch (actualTool) {
            case "pixel":
                canvas.addEventListener("click", drawPixel(e));
                break
            case "line":
                canvas.addEventListener("click", startLine(e));
                break
            case "curve":
                canvas.addEventListener("click", startCurve(e));
                break
            case "circle":
                canvas.addEventListener("click", start_circle(e));
                break
            case "boundaryFill":
                canvas.addEventListener("click", start_boundary_fill(e));
                break
            case "polygon":
                canvas.addEventListener("click", start_polygon(e));
                break
            case "scanlineFill":
                canvas.addEventListener("click", start_scanline(e));
                break
            case "clip":
                canvas.addEventListener("click", start_clip(e));
                break
            case "translation":
                canvas.addEventListener("click", start_translation(e));
                break
        }
    }

    function setTool(tool="pixel"){ //Troca de ferramenta
        console.log("troca de tool " + tool);
        actualTool = tool;
    }

    function confirmDraw(e){
        switch (actualTool){
            case "curve":
                for(const point in points) {
                    deletePoint(points[point].x, points[point].y);
                }
                curve();
                markedPoints = [];
                points = [];
                break
            case "polygon":
                for (let i=0;i<points.length;i++){
                    deletePoint(points[i].x, points[i].y);
                }
                if (screen !== false){
                    points = clip_polygon(screen, points);
                }
                if (points.length !== 0) {
                    polygon = draw_polygon(points, border_color);
                }
                points = [];
                break
        }
    }

    function clearCanvas(){
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
        points = [];
        markedPoints = [];
        screen = false;
        polygon = false;
    }
})


