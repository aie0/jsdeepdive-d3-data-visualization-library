(function() {
  'strict mode';
  var width = 960,
      height = 500,
      svg = d3.select("body")
              .append("svg")
              .attr("width", width)
              .attr("height", height),
      graph = miserables;

  force = d3.layout.force()
            .charge(-120)
            .linkDistance(30)
            .size([width, height]);

  force.nodes(graph.nodes)
      .links(graph.links)
      .start();  

  var color = d3.scale.category20(),
    node = svg.selectAll(".node")
              .data(graph.nodes)
              .enter().append("circle")
              .attr("title", "node")
              .attr("r", 5)
              .style("fill", function(d) { return color(d.group); })
              .call(force.drag);

  node.append("title").text(function(d) { return d.name; });

  var link = svg.selectAll(".link")
      .data(graph.links)
      .enter()
      .append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) {
        return Math.sqrt(d.value);
      });

  force.on("tick", function() {
    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
  });
})();