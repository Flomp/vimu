# plot_scatter

This node plots two user-chosen metrics - like pitch and octave - against each other and creates a scatter plot from it. For a list of all possible metrics, see the <nuxt-link to="/docs/nodes/plot_scatter#controls">Controls section</nuxt-link>.

## Input

| Name | Description |
|:---|:---|
| Input | An arbitrary score or part |

## Controls

| Name | Type | Description |
|:---|:---|:---|
| X Axis | Select | The x-axis metric |
| Y Axis | Select | The y-axis metric |

<br>

### Select options
| Name | Description |
|:---|:---|
| Dynamics | Dynamics (e.g. p, mp, f) |
| Offset | Time calculated in measures |
| PitchClass | Pitch without octave |
| PitchSpace | Pitch with octave |
| Octave | Octave (e.g. C1, C2, C3) |
| QuarterLength | Note duration. 1.0 represents a quarter note. 2.0 a half note. And so forth. |

## Output

| Name | Description |
|:---|:---|
| Plot Output | A scatter plot |

## Remarks

This node is a plot node. It does not affect the output displayed in the <nuxt-link to="/docs/editor/output-panel">Output Panel</nuxt-link>, but instead produces a separate output that will be displayed in the <nuxt-link to="/docs/editor/plot-panel">Plot Panel</nuxt-link>.

