import vis from "vis-network"

export default class DotMermaidAdapter{
    constructor(dotSource){
        console.log(dotSource);
        this.graphContext = this.decorateDotAttrs(dotSource);
    }

    getGraphContext() {
        return this.graphContext;
    }

    decorateDotAttrs(dotSource) {

        let parsedData = vis.parseDOTNetwork(dotSource);

        let direction = 'TB';
        let subgraphs ='Null';
        let edges ='Null';           

        let graphContext = {
            name: 'test',
            direction,
            subgraphs,
            nodes:  parsedData.nodes,
            edges:  parsedData.edges,
          };
      
        return graphContext;        
    }
}
