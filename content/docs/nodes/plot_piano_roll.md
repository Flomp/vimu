# plot_piano_roll

This node plots its input in a piano roll representation. More formally it plots time calculated in measures against pitch where a bar in the plot represents the onset and end of a note in the score. 

## Input

| Name | Description |
|:---|:---|
| Input | An arbitrary score or part |

## Controls

This node has no controls.


## Output

| Name | Description |
|:---|:---|
| Plot Output | A piano roll plot |

## Remarks

This node is a plot node. It does not affect the output displayed in the <nuxt-link to="/docs/editor/output-panel">Output Panel</nuxt-link>, but instead produces a separate output that will be displayed in the <nuxt-link to="/docs/editor/plot-panel">Plot Panel</nuxt-link>.

