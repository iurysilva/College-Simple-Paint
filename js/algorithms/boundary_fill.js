function getPixelRGB(ctx, x, y){
    let data = ctx.getImageData(x, y, 1, 1).data
    return "rgb("+data[0]+","+data[1]+","+data[2]+")";
}

function validate(x, y){
    return (x <= 150 && y <= 150) && (x >= 0 && y >= 0);
}

export function boundary_fill(ctx, x, y, fill_color, border_color){
    let current_color = getPixelRGB(ctx, x, y);
    if (!validate(x, y)){
        return false;
    }
    if (current_color !== border_color && current_color !== fill_color){
        ctx.fillStyle = fill_color;
        ctx.fillRect(x, y, 1, 1);
        boundary_fill(ctx, x + 1, y, fill_color, border_color);
        boundary_fill(ctx, x -1, y, fill_color, border_color);
        boundary_fill(ctx, x, y + 1, fill_color, border_color);
        boundary_fill(ctx, x, y - 1, fill_color, border_color);
    }
}
