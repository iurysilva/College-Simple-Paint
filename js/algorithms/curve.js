import {line} from "./line.js";
import {markedPoints, points} from "../main.js";

export function curve(){
    points.push(markedPoints[1]);

    const numLines = points.length / 2 + 2;
    for (let i = 1; i <= numLines; i++) {
        const t = (1.0 / numLines) * i;
        let a = bezierPoint(t);
        line(Math.floor(markedPoints[0].x), Math.floor(markedPoints[0].y), Math.floor(a.x), Math.floor(a.y));
        markedPoints[0] = a;
    }

}

function bezierPoint(t){
    const degree = points.length - 1;
    for (let r = 1; r <= degree; r++){
        for (let i = 0; i <= degree - r ; i++) {
            const multiplicationOne = math.multiply([points[i].x, points[i].y], (1.0 - t));
            const multiplicationTwo = math.multiply([points[i+1].x, points[i+1].y], t);

            let add = math.add(multiplicationOne, multiplicationTwo);
            points[i] = {x: add[0], y: add[1]}
        }
    }
    return points[0];
}
