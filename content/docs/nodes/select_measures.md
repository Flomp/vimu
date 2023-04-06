---
title: Nodes - select_measures
description: This node lets the user select measures from the input. An (inclusive) lower and upper measure bound can be specified.
---

# select_measures

This node lets the user select measures from the input. An (inclusive) lower and upper measure bound can be specified. The measures within the bounded range will be selected from the input. In scores with an upbeat, the lower bound for the first bar is 0. 

## Input

| Name  | Description                |
| :---- | :------------------------- |
| Input | An arbitrary score or part |

## Controls

| Name  | Type    | Description |
| :---- | :------ | :---------- |
| Start | Numeric | Lower bound |
| End   | Numeric | Upper bound |

## Output

| Name   | Description                                            |
| :----- | :----------------------------------------------------- |
| Output | Measures from the input within specified bounded range |

