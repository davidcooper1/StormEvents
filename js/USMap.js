class USMap {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.svg = document.createElementNS(d3.namespaces.svg, "svg");
    this.content = d3.select(this.svg)
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
      this.paths = this.content
        .selectAll("path")
        .data(this.data)
        .enter()
        .append("path")
        .attr("d", this.geoPath)
        .style("stroke", "black")
        .style("fill", "white")
    }
  }

  getAreaArray() {
    let areas = []
    this.paths.each(function(d) {
      areas[areas.length] = Math.sqrt(turf.area(d) / 1000000);
    });
    return areas;
  }

  normalizeHeatMap(heatData) {
    this.paths.each(function(d) {
      let stateFips = parseInt(d.properties.STATE);
      let czFips = parseInt(d.properties.COUNTY);
      d3.select(this).attr("id", d.properties.STATE + "-" + d.properties.COUNTY);

      if (heatData[stateFips]) {
        let frequency = heatData[stateFips][czFips];
        if (frequency != undefined) {
          let area = Math.sqrt(turf.area(d) / 1000000);
          heatData[stateFips][czFips] = frequency / area;
        }
      }
    });
  }

  applyHeatMap(heatData) {

    this.normalizeHeatMap(heatData);

    var maxFreq = d3.max(heatData, function(d) {
      if (d)
        return d3.max(d, function(d) {
          if (d != undefined)
            return d;
          return 0;
        })
      return 0;
    });

    var minFreq = d3.min(heatData, function(d) {
      if (d)
        return d3.min(d, function(d) {
          if (d != undefined)
            return d;
          return 0;
        });
        return 0;
    });

    var colorScale = d3.scaleSequential(d3.interpolateInferno).domain([minFreq, maxFreq]);

    console.log(maxFreq);
    console.log(heatData);

    this.paths.style("fill", function(d) {
      var stateFips = parseInt(d.properties.STATE);
      var czFips = parseInt(d.properties.COUNTY);

      if (heatData[stateFips]) {
        var frequency = heatData[stateFips][czFips]
        if (frequency != undefined) {
          return colorScale(frequency);
        } else {
          return colorScale(0);
        }
      } else {
        return colorScale(0);
      }
    });
  }

}
