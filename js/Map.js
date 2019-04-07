function USMap(width, height) {
    this.width = width;
    this.height = height;
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

USMap.prototype.draw = function() {
    if (!this.paths) {
        this.paths = d3.select(this.svg)
            .selectAll("path")
            .data(this.data)
            .enter()
            .append("path")
            .attr("d", this.geoPath)
            .style("stroke", "black")
            .style("fill", "white")
            .attr("class", "col-12 align-self-center h-100")
    }
};

USMap.prototype.checkIfSelected = function(graph) {
    this.paths.style("fill", function(d) {
        for (var i = 0; i < graph.pathIdArray.length; i++) {
            if (graph.pathIdArray[i] === d.properties.name) {
                return "blue"
            }
        }
        return "white";
    }).on("click", function(d) {
        var stateSelector = $("#stateSelection a:contains('" + d.properties.name + "')");
        if (stateSelector.hasClass("active")) {
            $(".alert").alert("close");
            stateSelector.removeClass("active");
        } else if (oldSelection.length >= 4) {
            generateUserWarning("Only 4 options can be selected at a time.");
        } else {
            $(".alert").alert("close");
            stateSelector.addClass("active");
        }
        update();
    });
}

USMap.prototype.getNode = function() {
    return d3.select(this.svg).node();
};