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
    a [label=small_a] -> b
 }
 subgraph cluster1 {
    A -> B[label=large_B]
    B[label=large_B] -> C
 }
 a -> A
 b -> B
}
`;

let graphContext = new Dot2MermaidAdapter(demo).getGraphContext();

let mermaidFlowchartTemplate = Handlebars.compile(`
flowchart {{direction}}
  {{#each edges as |e|}}
        {{e.from}}["{{e.fromLabel}}"]-->{{e.to}}["{{e.toLabel}}"]   
  {{/each}}

  {{#if subgraphs}}
    {{#each subgraphs as |s|}}
      subgraph {{s.label}}
      {{#each s.edges as |e|}}
        {{e.from}}["{{e.fromLabel}}"]-->{{e.to}}["{{e.toLabel}}"]   
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
