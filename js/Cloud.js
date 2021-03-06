class Cloud {
    constructor(width,height) {
        this.d = [];
        this.height = height;
        this.width = width;
        this.scale = d3.scaleLinear().range([20, 50]);
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
            .fontSize(function(d) { return this.scale(d.size); }.bind(this))
            .on("end", this.draw.bind(this));
        //this.layout.start();
    }

    draw() {
        let text = this.g
            .attr("transform", "translate(" + this.layout.size()[0] / 2 + "," + this.layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(this.d, function(d) { return d.text; });

        text
            .enter().append("text")
            .on("click", function(e) {
                let selection = d3.select(this);
                useWord(selection.datum().text);
            })
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", "Impact")
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });

        text
            .transition()
            .duration(600)
            .style("font-size", function(d) { return d.size + "px"; })
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("fill-opacity", 1)
            .text(function(d) { return d.text });

        text.exit()
            .transition()
            .duration(200)
            .style("fill-opacity", 0)
            .attr("font-size", 1)
            .remove();
    }
    set data(newData) {
        this.d = newData;
        this.scale.domain(d3.extent(newData, function(d) {
            return d.size;
        }));
        this.layout
          .words(this.d)
          .fontSize(function(d) { return this.scale(d.size); }.bind(this));
        this.layout.start();
    }
    get data() {
        return this.d;
    }

}
