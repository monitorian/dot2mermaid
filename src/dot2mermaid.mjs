import vis from "vis-network";
import _ from "lodash";

export default class DotMermaidAdapter {
  constructor(dotSource) {
    this.graphContext = this.decorateDotAttrs(dotSource);
  }

  getGraphContext() {
    return this.graphContext;
  }

  updateLabel(graphContext) {
    graphContext.edges.forEach((edge) => {
      graphContext.nodes.forEach((node) => {
        // If DOT data does not have label, node.label is the same node.id, so it does not need to check the condition.
        if (edge.from === node.id) {
          edge.fromLabel = node.label;
        }
        if (edge.to === node.id) {
          edge.toLabel = node.label;
          // node.label of vis-network does not have a label of edge.to, so it could not input the right label now.
          // edge.label has right label of edge.to, so the following condition is checked.
          if (edge.label) {
            edge.toLabel = edge.label;
          }
        }
      });
    });
  }

  decorateDotAttrs(dotSource) {
    let parentContents ="";
    let subgraphs = new Array(0);
    let subgraphContents = "";
    let subgraphFlag = false;
    let subGraphContext = { label: null, nodes: null, edges: null };

    // Parse sub graph    
    let dotSources = dotSource.split(/\n/);    
    dotSources.forEach((element) => {
      switch (true) {
        case /subgraph/.test(element):
          subgraphFlag = true;
          subgraphContents = "";
          let words = element.split(/\s+/);
          words = words.filter(function (s) {
            return s !== "";
          });
          subGraphContext.label = words[1].replace(/[\""]/g, "");
          break;
        case /}/.test(element):
          if (/{/.test(element)) {
//            let labelStr = element.replace(/\\{1}\"/g, "");
            let labelStr = element.replace(/[\\\"]/g, ""); 
            labelStr = labelStr.replace(/(label=)/g, '$1\"');
            labelStr = labelStr.replace(/(})/g, '$1\"');            
            console.log(labelStr);           
            subgraphContents += labelStr;
          } else {
            if (subgraphFlag) {
              subgraphFlag = false;

              const subgraphHeader = "digraph " + subGraphContext.label + " {";
              const subgraphFooter = "}";
              const subgraphDotSource =
                subgraphHeader + subgraphContents + subgraphFooter;
              const parseData = vis.parseDOTNetwork(subgraphDotSource);
              subGraphContext.nodes = parseData.nodes;
              subGraphContext.edges = parseData.edges;

              this.updateLabel(subGraphContext);
              const copied = _.cloneDeep(subGraphContext);
              subgraphs.push(copied);
            }else{
              parentContents += element;              
            }
          }
          break;
        default:
          if (subgraphFlag) {
            subgraphContents += element;
            console.log(subgraphContents);
          }else{
            parentContents += element;
          }
      }
    });
    console.log(parentContents);
    // Parse parent graph
    let parsedData = vis.parseDOTNetwork(parentContents);
    this.updateLabel(parsedData);

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
