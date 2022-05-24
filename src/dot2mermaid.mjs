import vis from "vis-network";
import _ from "lodash";

export default class DotMermaidAdapter {
  constructor(dotSource) {
    this.graphContext = this.decorateDotAttrs(dotSource);
  }

  getGraphContext() {
    return this.graphContext;
  }

  decorateDotAttrs(dotSource) {
    let subgraphs = new Array(0);
    let subgraphFlag = false;
    let subGraphContext = { label: null, nodes: null, edges: null };

    let dotSources = dotSource.split(/\n/);
    dotSources.forEach((element) => {
      switch (true) {
        case /subgraph/.test(element):
          subgraphFlag = true;
          let words = element.split(/\s+/);
          words = words.filter(function (s) {
            return s !== "";
          });
          subGraphContext.label = words[1];
          break;
        case /}/.test(element):
          if (subgraphFlag) {
            subgraphFlag = false;
            const copied = _.cloneDeep(subGraphContext);
            subgraphs.push(copied);
          }
          break;
        default:
          if (subgraphFlag) {
            const subgraphHeader = "digraph " + subGraphContext.label + " {";
            const subgraphFooter = "}";
            const subgraphDotSource = subgraphHeader + element + subgraphFooter;
            const parseData = vis.parseDOTNetwork(subgraphDotSource);
            subGraphContext.nodes = parseData.nodes;
            subGraphContext.edges = parseData.edges;
          }
      }
    });

    // Parse parent graph
    let parsedData = vis.parseDOTNetwork(dotSource);

    let direction = "TB";

    let graphContext = {
      name: "test",
      direction,
      subgraphs,
      nodes: parsedData.nodes,
      edges: parsedData.edges,
    };

    return graphContext;
  }
}
