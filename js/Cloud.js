class Cloud {
    constructor(width,height) {
        this.d = [];
        this.height = height;
        this.width = width;
        this.svg = document.createElementNS(d3.namespaces.svg, "svg");
        this.g = d3.select(this.svg)
            .attr("viewBox", "0 0 " + this.width + " " + this.height)
            .append("g");
        this.layout = d3.layout.cloud()
            .size([this.width, this.height])
            .words(this.d)
            .padding(5)
            .rotate(function() { return 0; })
            .font("Impact")
            .fontSize(function(d) { return d.size })
            .on("end", this.draw.bind(this));
        //this.layout.start();
    }

    draw() {
        this.g
            .attr("transform", "translate(" + this.layout.size()[0] / 2 + "," + this.layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(this.d)
            .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", "Impact")
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
    }
    set data(newData) {
        this.d = newData;
        this.layout
          .words(this.d)
          //.fontSize(function(d) { return this.size; });
        this.layout.start();
    }
    get data() {
        return this.d;
    }

}
