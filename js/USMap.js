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
        .style("fill", "white")
    }
  }

  getAreaArray() {
    let areas = []
    this.paths.each(function(d) {
      areas[areas.length] = turf.area(d) / 100000;
    });
    return areas;
  }

  normalizeHeatMap(heatData) {
    let areas = this.getAreaArray();
    let areaAverage = d3.mean(areas, function(d) { return d; });
    let areaDeviation = d3.deviation(areas, function(d) { return d; });

    let frequencies = []
    for (let state in heatData) {
      for (let county in heatData[state]) {
        frequencies[frequencies.length] = heatData[state][county];
      }
    }

    for (let i = 0; i < areas.length - frequencies.length; i++) {
      frequencies[frequencies.length] = 0;
    }

    let freqAverage = d3.mean(frequencies, function(d) { return d; });
    let freqDeviation = d3.deviation(frequencies, function(d) { return d; });

    this.paths.each(function(d) {
      let stateFips = parseInt(d.properties.STATE);
      let czFips = parseInt(d.properties.COUNTY);

      if (heatData[stateFips]) {
        let frequency = heatData[stateFips][czFips];
        if (frequency != undefined) {
          // COMPUTE NORMALIZED
        } else {
          heatData[stateFips][czFips] = 0;
        }
      } else {
        heatData[stateFips] = [];
        heatData[stateFips][czFips] = 0;
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

    var colorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain([0, maxFreq]);

    this.paths.style("fill", function(d) {
      var stateFips = parseInt(d.properties.STATE);
      var czFips = parseInt(d.properties.COUNTY);

      if (heatData[stateFips]) {
        var frequency = heatData[stateFips][czFips]
        if (frequency != undefined) {
          return colorScale(frequency);
        } else {
          return "white";
        }
      } else {
        return "white";
      }
    });
  }

}
