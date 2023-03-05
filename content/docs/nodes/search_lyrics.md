# search_lyrics

This node searches for lyrics in a score or part. The search encompasses all parts and stanzas of a score. Notes whose lyrics are part of a match with the query will be colored in the color defined by the user.

## Input

| Name  | Description                |
| :---- | :------------------------- |
| Input | An arbitrary score or part |

## Controls

| Name  | Type       | Description              |
| :---- | :--------- | :----------------------- |
| Color | Color      | Match color              |
| Text  | Text field | The lyrics to search for |

## Output

| Name   | Description                                               |
| :----- | :-------------------------------------------------------- |
| Output | The input with colored notes whose lyrics match the query |

