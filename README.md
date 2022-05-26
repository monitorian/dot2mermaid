# dot2mermaid
Convert Graphviz/Dot syntax to mermaid flowchart.

## How to run
```
npm install
npm run inspect
```
The [inspect.js](./bin/inspect.js) has the following DOT sample.

```
digraph D {
  subgraph cluster0 {
    a [label=small_a] -> b
 }
 subgraph cluster1 {
    A -> B[label=large_B]
 }
 a -> A
 b -> B
}
```
After running the script, you can get the following result.
- [result](./flowchart.md)

# Note

- Mermaid does not indicate [label](https://mermaid-js.github.io/mermaid/#/flowchart) of parent graph if subgraph does not have [label](https://graphviz.org/docs/attrs/label/) .

# License
"dot2mermaid" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).