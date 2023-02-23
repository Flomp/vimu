# detect_voice_crossings

This node detects voice crossings between parts in the given input score.  There must be at least two parts present in the input. Voice crossings occur when melodic lines intersect across parts. Detected voice crossings will be marked with a user-defined color in the output score.

## Input

| Name | Description |
|:---|:---|
| Input | An arbitrary score or part |

## Controls

| Name | Type | Description |
|:---|:---|:---|
| Color | Color | Color of the detected voice crossings  |

## Output

| Name | Description |
|:---|:---|
| Output | The input score with colored notes that are connected to a voice crossing |

