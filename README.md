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
    a  -> b
 }
 subgraph cluster1 {
    A -> B
 }
 a -> A
 b -> B
}
```
After running the script, you can get the following result.
- [result](./flowchart.md)
