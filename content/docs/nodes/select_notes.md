# select_notes

This node lets the user select note ranges from the input. An (inclusive) lower and upper bound can be specified. The notes within the specified range will be selected for every part in the score.

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

| Name   | Description                                   |
| :----- | :-------------------------------------------- |
| Output | Parts from the input that match the selection |

