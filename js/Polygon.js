export function Polygon(border_color, edges){
    this.border_color = border_color;
    this.edges = edges;
    this.y_max = false;
    this.y_min = false;
    this.x_max = false;
    this.x_min = false;
    this.points = [];
}
