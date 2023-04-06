---
title: Nodes - plot_histogram
description: This node plots a user-chosen metric - like pitch - against its absolute frequency in the input.
---

# plot_histogram

This node plots a user-chosen metric - like pitch - against its absolute frequency in the input. For a list of all possible metrics, see the <nuxt-link to="/docs/nodes/plot_histogram#controls">Controls section</nuxt-link>.

## Input

| Name | Description |
|:---|:---|
| Input | An arbitrary score or part |

## Controls

| Name | Type | Description |
|:---|:---|:---|
| X Axis | Select | The x-axis aggregation metric |

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
| Plot Output | A histogram plot |

## Remarks

This node is a plot node. It does not affect the output displayed in the <nuxt-link to="/docs/editor/output-panel">Output Panel</nuxt-link>, but instead produces a separate output that will be displayed in the <nuxt-link to="/docs/editor/plot-panel">Plot Panel</nuxt-link>.

