function circlePoints(ctx, x, y, first_point){
    first_point.x = Math.round(first_point.x);
    first_point.y = Math.round(first_point.y);
    ctx.fillRect(x + first_point.x, y + first_point.y, 1, 1);
    ctx.fillRect(y + first_point.x, x + first_point.y, 1, 1);
    ctx.fillRect(y + + first_point.x, (-x) + first_point.y, 1, 1);
    ctx.fillRect(x + first_point.x, (-y) + first_point.y, 1, 1);
    ctx.fillRect((-x) + first_point.x, (-y) + + first_point.y, 1, 1);
    ctx.fillRect((-y) + first_point.x, (-x) + first_point.y, 1, 1);
    ctx.fillRect((-y) + first_point.x, x + first_point.y, 1, 1);
    ctx.fillRect((-x) + first_point.x, y + first_point.y, 1, 1);

}

export function circle(ctx, radius, first_point) {
    let x = 0;
    let y = radius;
    let d = 1 - radius;
    //circlePoints(ctx, x, y);
    while (y >= x){
        if (d < 0){
            d += 2 * x + 1;
        }else{
            y--;
            d += 2 * (x - y + 1);
        }
        circlePoints(ctx, Math.floor(x), Math.floor(y), first_point);
        x++;
    }
}

export function getDistance(point_1, point_2){
    let a = Math.abs(point_1.x - point_2.x);
    let b = Math.abs(point_1.y - point_2.y);
    let radius = Math.sqrt((a*a) + (b*b));
    radius = Math.round(radius);
    return radius;
}

