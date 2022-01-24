import {deletePolygon} from "./translation.js";
import {polygon} from "../main.js";
import {line} from "./line.js";


export function scale(fixedPoint){
    deletePolygon();
    let x0 = fixedPoint.x;
    let y0 = fixedPoint.y;
    let newLastPolygon = [];
    let scaleX = document.getElementById('xScale').value;
    let scaleY = document.getElementById('yScale').value;
    let matrix = [[scaleX, 0], [0, scaleY]];
    for(let i = 0; i < polygon.points.length; i++){
        let newPoint = [0,0]
        newPoint[0] = polygon.points[i].x;
        newPoint[1] = polygon.points[i].y;
        newPoint[0] -= x0;
        newPoint[1] -= y0;
        newLastPolygon.push(newPoint)
    }

    let scaledCoordinates = math.multiply(newLastPolygon, matrix);



    scaledCoordinates = math.concat(
        math.add(math.column(scaledCoordinates, 0), x0),
        math.add(math.column(scaledCoordinates, 1), y0),
        1
    );

    for (let i = 0; i < scaledCoordinates.length; i++) {
        let previousPoint = scaledCoordinates[i];
        let nextPoint = scaledCoordinates[(i + 1) % scaledCoordinates.length];
        line(Math.floor(previousPoint[0]), Math.floor(previousPoint[1]), Math.floor(nextPoint[0]), Math.floor(nextPoint[1]));
    }

}
