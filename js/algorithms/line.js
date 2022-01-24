import {border_color, ctx} from "../main.js";

export function line(x1, y1, x2, y2) {
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1 );

    let sx = (x1 < x2) ? 1: -1;
    let sy = (y1 < y2) ? 1: -1;
    let err = dx - dy;

    while(true){
        ctx.fillStyle = border_color;
        ctx.fillRect(x1, y1, 1, 1);

        if((x1 === x2) && (y1 === y2)) break;
        let err2 = 2 * err;
        if(err2 > -dy) { err -= dy; x1 += sx;}
        if(err2 < dx) {err += dx; y1 += sy;}
    }

}

export function line_white(x1, y1, x2, y2) {
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1 );

    let sx = (x1 < x2) ? 1: -1;
    let sy = (y1 < y2) ? 1: -1;
    let err = dx - dy;

    while(true){

        ctx.clearRect(x1, y1, 1, 1);

        if((x1 === x2) && (y1 === y2)) break;
        let err2 = 2 * err;
        if(err2 > -dy) { err -= dy; x1 += sx;}
        if(err2 < dx) {err += dx; y1 += sy;}
    }

}


