import Dot2MermaidAdapter from "../src/dot2mermaid.mjs"

import fs from 'fs';

import Handlebars from 'handlebars';

let demo = `digraph D {

  A -> B -> C

}
`;

let graphContext = new Dot2MermaidAdapter(demo).getGraphContext();

let mermaidFlowchartTemplate = Handlebars.compile(`
flowchart {{direction}}
  {{#each edges as |e|}}
    {{e.from}}-->{{e.to}}
  {{/each}}
`);

let renderedMermaiFlowchart = mermaidFlowchartTemplate(graphContext);

console.log(renderedMermaiFlowchart);
let mermaid_header='```mermaid';
let mermaid_footer='```';
renderedMermaiFlowchart = mermaid_header + renderedMermaiFlowchart + mermaid_footer;

try {
  fs.writeFileSync('./flowchart.md', renderedMermaiFlowchart, 'utf-8');
} catch (err) {
  console.log(err);
}
