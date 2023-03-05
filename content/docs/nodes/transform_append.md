# transform_append

This node appends two inputs horizontally. For multi-part scores, the node will by default match the first part of the first score to the first part of the second score. This behavior can be altered by toggling the "Match instruments" checkbox. In this case, the node will match the parts based on the instrument's name. The names need to match exactly. If the two inputs have different amounts of parts, for the input with more parts the surplus parts will be discarded.

## Input

| Name  | Description                |
| :---- | :------------------------- |
| Input | An arbitrary score or part |
| Input | An arbitrary score or part |

## Controls

| Name              | Type     | Description                               |
| :---------------- | :------- | :---------------------------------------- |
| Match instruments | Checkbox | Match instrument names in the input parts |

## Output

| Name   | Description                                  |
| :----- | :------------------------------------------- |
| Output | A horizontally joined score from both inputs |

