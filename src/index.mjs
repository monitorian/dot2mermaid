import DotMermaidAdapter from './dot2mermaid.mjs';

export function convert(dotSource, options = {}) {
  const context = new DotMermaidAdapter(dotSource, options).getGraphContext();
  const direction = options.direction ?? context.direction ?? 'TB';

  const edgeLines = context.edges
    .map((e) => `  ${e.from}["${e.fromLabel}"]-->${e.to}["${e.toLabel}"]`)
    .join('\n');

  const subgraphLines = (context.subgraphs || [])
    .map((s) => {
      const lines = (s.edges || [])
        .map((e) => `    ${e.from}["${e.fromLabel}"]-->${e.to}["${e.toLabel}"]`)
        .join('\n');
      return `  subgraph ${s.label}\n${lines}\n  end`;
    })
    .join('\n');

  const body = [edgeLines, subgraphLines].filter(Boolean).join('\n\n');
  return `flowchart ${direction}\n${body}`;
}

export default DotMermaidAdapter;
