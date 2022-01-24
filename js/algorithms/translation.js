import {line_white} from "./line.js";
import {polygon} from "../main.js";

export function deletePolygon(){
    for(let i = 0; i < polygon.edges.length; i++){
        line_white(Math.floor(polygon.edges[i].x1), Math.floor(polygon.edges[i].y1), Math.floor(polygon.edges[i].x2), Math.floor(polygon.edges[i].y2));
    }
}

export function translation(points, newCoordinates){
    deletePolygon();
    let diferenceX = points[0].x - newCoordinates.x;
    let diferenceY = points[0].y - newCoordinates.y;

    let newPoints = points;
    for(let i = 0; i < newPoints.length; i++){
        newPoints[i].x -= diferenceX;
        newPoints[i].y -= diferenceY;

    }
    return newPoints

}


