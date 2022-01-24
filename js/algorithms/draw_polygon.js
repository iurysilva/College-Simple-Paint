import {line} from "./line.js";
import {Polygon} from "../Polygon.js";
import {Edge} from "../Edge.js";

export function draw_polygon(points, border_color){
    let polygon = new Polygon(border_color, []);
    for (let step = 0; step < points.length; step++){
        if (step === points.length - 1){
            let point_1 = points[points.length - 1];
            let point_2 = points[0];
            line(Math.floor(point_1.x), Math.floor(point_1.y), Math.floor(point_2.x), Math.floor(point_2.y));
            polygon.edges.push(new Edge([point_1, point_2]));
        }else {
            let point_1 = points[step];
            let point_2 = points[step + 1];
            line(Math.floor(point_1.x), Math.floor(point_1.y), Math.floor(point_2.x), Math.floor(point_2.y));
            polygon.edges.push(new Edge([point_1, point_2]));
        }
    }
    polygon.y_max = calculate_polygon_y_max(polygon);
    polygon.y_min = calculate_polygon_y_min(polygon);
    polygon.x_max = calculate_polygon_x_max(polygon);
    polygon.x_min = calculate_polygon_x_min(polygon);
    polygon.points = points;
    return polygon;
}

function calculate_polygon_y_max(polygon){
    let y_max = polygon.edges[0].y_max;
    for (let edge=0;edge<polygon.edges.length;edge++){
        if (polygon.edges[edge].y_max > y_max){
            y_max = polygon.edges[edge].y_max;
        }
    }
    return y_max;
}

function calculate_polygon_y_min(polygon){
    let y_min = polygon.edges[0].y_min;
    for (let edge=0;edge<polygon.edges.length;edge++){
        if (polygon.edges[edge].y_min < y_min){
            y_min = polygon.edges[edge].y_min;
        }
    }
    return y_min;
}

function calculate_polygon_x_max(polygon){
    let x_max = polygon.edges[0].x_max;
    for (let edge=0;edge<polygon.edges.length;edge++){
        if (polygon.edges[edge].x_max > x_max){
            x_max = polygon.edges[edge].x_max;
        }
    }
    return x_max;
}

function calculate_polygon_x_min(polygon) {
    let x_min = polygon.edges[0].x_min;
    for (let edge = 0; edge < polygon.edges.length; edge++) {
        if (polygon.edges[edge].x_min < x_min) {
            x_min = polygon.edges[edge].x_min;
        }
    }
    return x_min;
}