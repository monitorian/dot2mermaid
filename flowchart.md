```mermaid
flowchart TB
        a-->A   
        b-->B   

      subgraph cluster0
        a-->b   
      end
      subgraph cluster1
        A-->B   
      end
```