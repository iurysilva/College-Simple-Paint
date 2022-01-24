import {Point} from "../Point.js";
import {line} from "./line.js";

export function clip_line(screen, point_1, point_2){
    let bits_1 = generate_codes(screen, point_1);
    let bits_2 = generate_codes(screen, point_2);
    let checker = arr => arr.every(v => v === false);
    let or = operation_or(bits_1, bits_2);
    let and = operation_and(bits_1, bits_2);
    if (checker(or) === true){
        return [point_1, point_2];
    }else{
        if (checker(and) === false){
            return false;
        }else{
            let dif_bit = find_dif_bit(bits_1, bits_2);
            let window_line = get_window_line(dif_bit, screen);
            let pi = new Point(0,0);
            let intersection = 0;
            if (window_line[0] === 'x'){
                intersection = (((window_line[1] - point_1.x)*(point_2.y - point_1.y)) / (point_2.x - point_1.x)) +
                    point_1.y;
                pi.x = window_line[1];
                pi.y = intersection;
            }else{
                intersection = (((window_line[1] - point_1.y)*(point_2.x - point_1.x)) / (point_2.y - point_1.y)) +
                    point_1.x;
                pi.x = intersection;
                pi.y = window_line[1];
            }
            if (bits_1[dif_bit] === false){
                return clip_line(screen, point_1, pi);
            }else{
                return clip_line(screen, pi, point_2);
            }
        }
    }
}

export function clip_polygon(screen, points){
    let result = []
    for (let step = 0; step < points.length; step++) {
        if (step === points.length - 1){
            let edge = clip_line(screen, points[points.length-1], points[0]);
            if (edge !== false) {
                line(Math.floor(edge[0].x), Math.floor(edge[0].y), Math.floor(edge[1].x), Math.floor(edge[1].y));
            }
        }else {
            let edge = clip_line(screen, points[step], points[step+1]);
            if (edge !== false) {
                line(Math.floor(edge[0].x), Math.floor(edge[0].y), Math.floor(edge[1].x), Math.floor(edge[1].y));
            }
        }
    }
    return result;
}

function generate_codes(screen, point){
    let code = [];
    code.push(sign(point.x - screen.x_min));
    code.push(sign(screen.x_max - point.x));
    code.push(sign(point.y - screen.y_min));
    code.push(sign(screen.y_max - point.y));
    return code;
}

function sign(n){
    return n < 0;
}

function find_dif_bit(bits_1, bits_2){
    for (let i=0;i<4;i++){
        if (bits_1[i] !== bits_2[i]){
            return i;
        }
    }
}

function get_window_line(dif_bit, screen){
    if (dif_bit === 0){
        return ['x', screen.x_min];
    }
    if (dif_bit === 1){
        return ['x', screen.x_max];
    }
    if (dif_bit === 2){
        return ['y', screen.y_min];
    }
    if (dif_bit === 3){
        return ['y', screen.y_max];
    }
}

function operation_and(arr1, arr2){
    let result = new Array(arr1.length).fill(0);
    for (let i=0;i<arr1.length;i++){
        result[i] = arr1[i] === true && arr2[i] === true;
    }
    return result;
}

function operation_or(arr1, arr2){
    let result = new Array(arr1.length).fill(0);
    for (let i=0;i<arr1.length;i++){
        result[i] = arr1[i] === true || arr2[i] === true;
    }
    return result;
}