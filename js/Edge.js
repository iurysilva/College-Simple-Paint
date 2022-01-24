export function Edge(points){
    this.y_equal = false;
    this.y_max = calculate_max(points[0].y, points[1].y);
    this.y_min = calculate_min(points[0].y, points[1].y)
    if (this.y_min === false){
        this.y_equal = true;
        this.y_min = points[0].y;
    }
    this.x_max = calculate_max(points[0].x, points[1].x);
    this.x_min = calculate_min(points[0].x, points[1].x);
    if (this.x_min === false){
        this.x_min = points[0].x;
    }
    this.x_of_y_min = calculate_x_of_y_min(points);
    this.x1 = points[0].x;
    this.y1 = points[0].y;
    this.x2 = points[1].x;
    this.y2 = points[1].y;
}

function calculate_max(a, b){
    if (a > b){
        return a
    }else{
        if (b > a) {
            return b;
        }else{
            return a
        }
    }
}

function calculate_min(a, b){
    if (a < b){
        return a
    }else{
        if (b < a) {
            return b;
        }else{
            return false
        }
    }
}

function calculate_x_of_y_min(points){
    let y1 = points[0].y;
    let y2 = points[1].y;
    if (y1 < y2){
        return points[0].x
    }else{
        if (y2 < y1) {
            return points[1].x
        }else{
            return 0
        }
    }
}
