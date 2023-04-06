---
title: Nodes - plot_dynamics
description: This node plots time calculated in measures against parts present in the score.
---

# plot_dynamics

This node plots time calculated in measures against parts present in the score. A bar in the plot represents activity in the respective part of the score. Bar height correlates with dynamics where a greater height constitutes a louder dynamic.

## Input

| Name | Description |
|:---|:---|
| Input | An arbitrary score or part |

## Controls

This node has no controls.


## Output

| Name | Description |
|:---|:---|
| Plot Output | A dynamics plot |

## Remarks

This node is a plot node. It does not affect the output displayed in the <nuxt-link to="/docs/editor/output-panel">Output Panel</nuxt-link>, but instead produces a separate output that will be displayed in the <nuxt-link to="/docs/editor/plot-panel">Plot Panel</nuxt-link>.

