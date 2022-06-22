```mermaid
flowchart TB
        a["a"]-->A["A"]   
        b["b"]-->B["B"]   

      subgraph cluster0
        a["small_a"]-->b["b"]   
      end
      subgraph cluster1
        A["A"]-->B["large_B"]   
        B["large_B"]-->C["C"]   
      end
```