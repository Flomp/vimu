# select_parts

This node lets the user select parts from the input. The input has to be a score with at least one part. To select a part the user enters either the instrument's name (case-sensitive) or the number of the part. Counting starts from the top of the score. For example, in a four part chorale, the tenor would be 3. Multiple parts can be selected. Press <kbd>Enter</kbd> to separate selections. Selection methods can be mixed. So <span  class="v-chip--select v-chip v-chip--no-color theme--light v-size--small"><span class="v-chip__content">3</span></span><span  class="v-chip--select v-chip v-chip--no-color theme--light v-size--small"><span class="v-chip__content">Soprano</span></span> would be a valid input.

## Input

| Name  | Description        |
| :---- | :----------------- |
| Input | An arbitrary score |

## Controls

| Name                 | Type       | Description                                                         |
| :------------------- | :--------- | :------------------------------------------------------------------ |
| Instrument or Part # | Text field | Either the instrument name or the part number starting from the top |

## Output

| Name   | Description                                            |
| :----- | :----------------------------------------------------- |
| Output | Parts from the input that match the selection |

