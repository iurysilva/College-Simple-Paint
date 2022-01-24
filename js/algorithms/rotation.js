import {polygon} from "../main.js";

import {deletePolygon} from "./translation.js";

let count = 0;

export function generateCoordinates() {
    let degrees = 30;
    let arrayOfVisitedPoints = [];
    let coordinates = [];


    arrayOfVisitedPoints = polygon.points;

    let baseCoordinates = arrayOfVisitedPoints[0]

    let matrix = [
        [Math.cos(degrees), -Math.sin(degrees)],
        [Math.sin(degrees),  Math.cos(degrees)]
    ];

    for (let i = 0; i < arrayOfVisitedPoints.length; i++) {

        coordinates.push([arrayOfVisitedPoints[i].x - baseCoordinates.x, arrayOfVisitedPoints[i].y - baseCoordinates.y]);
    }


    coordinates = math.multiply(coordinates,matrix);
    coordinates = math.concat(
        math.add(math.column(coordinates, 0), arrayOfVisitedPoints[0].x),
        math.add(math.column(coordinates, 1), arrayOfVisitedPoints[0].y),
        1
    );

    coordinates = math.round(coordinates);

    let newPoints = [];
    for(let i = 0; i < polygon.points.length; i++){
        let point = {
            x: coordinates[i][0],
            y: coordinates[i][1],
        }
        newPoints.push(point);
    }
    deletePolygon();
    return newPoints
};



