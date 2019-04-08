class USMap {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.svg = document.createElementNS(d3.namespaces.svg, "svg");
    d3.select(this.svg)
      .attr("viewBox", "0 0 " + this.width + " " + this.height)
      .append("g");
    this.usa = d3.geoAlbersUsa()
      .translate([this.width / 2, this.height / 2])
      .scale([1000]);
    this.geoPath = d3.geoPath().projection(this.usa);
    this.paths;
    this.data = [];

  }

  draw() {
    if (!this.paths) {
      this.paths = d3.select(this.svg)
        .selectAll("path")
        .data(this.data)
        .enter()
        .append("path")
        .attr("d", this.geoPath)
        .style("stroke", "black")
        .style("fill", "red")
    }
  }

}
