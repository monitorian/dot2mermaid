import Dot2MermaidAdapter from "../src/dot2mermaid.mjs";

import fs from "fs";

import Handlebars from "handlebars";

Handlebars.registerHelper("labeled", function (value) {
  return value !== null;
});

Handlebars.registerHelper("node_check", function (value1, value2) {
  return value1 === value2;
});

let demo = `digraph D {
  subgraph cluster0 {
    a  -> b
 }
 subgraph cluster1 {
    A -> B
 }
 a -> A
 b -> B
}
`;

let graphContext = new Dot2MermaidAdapter(demo).getGraphContext();

let mermaidFlowchartTemplate = Handlebars.compile(`
flowchart {{direction}}
  {{#each edges as |e|}}
        {{e.from}}-->{{e.to}}   
  {{/each}}

  {{#if subgraphs}}
    {{#each subgraphs as |s|}}
      subgraph {{s.label}}
      {{#each s.edges as |e|}}
        {{e.from}}-->{{e.to}}   
      {{/each}}      
      end
    {{/each}}      
  {{/if}}
`);

let renderedMermaiFlowchart = mermaidFlowchartTemplate(graphContext);

console.log(renderedMermaiFlowchart);
const mermaidHeader = "```mermaid";
const mermaidFooter = "```";
renderedMermaiFlowchart =
  mermaidHeader + renderedMermaiFlowchart + mermaidFooter;

try {
  fs.writeFileSync("./flowchart.md", renderedMermaiFlowchart, "utf-8");
} catch (err) {
  console.log(err);
}
