---
title: Nodes - detect_parallels
description: This node detects parallels between parts in the given input score. There must be at least two parts present in the input. Parallels refer to both fifths and octaves.
---

# detect_parallels

This node detects parallels between parts in the given input score. There must be at least two parts present in the input. Parallels refer to both fifths and octaves. With the node controls you can select to detect just open or hidden parallels or both. Detected parallels will be marked with a user-defined color in the output score.

## Input

| Name | Description |
|:---|:---|
| Input | An arbitrary score or part |

## Controls

| Name | Type | Description |
|:---|:---|:---|
| Open Parallels | Checkbox | Whether to detect open parallels  |
| Color | Color | Color of the detected open parallels  |
| Hidden Parallels | Checkbox | Whether to detect hidden parallels  |
| Color | Color | Color of the detected hidden parallels  |

## Output

| Name | Description |
|:---|:---|
| Output | The input score with colored notes that are connected to a parallel |

