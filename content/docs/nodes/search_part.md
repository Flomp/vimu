---
title: Nodes - search_part
description: This node searches for a melody in a part or score. Melodies are typically represented with a source_tinynotation node.
---

# search_part

This node searches for a melody in a part or score. Melodies are typically represented with a <nuxt-link to="/docs/nodes/source_tinynotation">source_tinynotation</nuxt-link> node. For a search, the node can take pitch, rhythm, or both into account. Matches will be colored in the color defined by the user. To see a more in-depth example visit the <nuxt-link to="/docs/tutorials/search-melody">tutorial</nuxt-link> on searching in a score.

## Input

| Name     | Description                             |
| :------- | :-------------------------------------- |
| Needle   | A melody to search for                  |
| Haystack | An arbitrary score or part to search in |

## Controls

| Name   | Type     | Description                         |
| :----- | :------- | :---------------------------------- |
| Color  | Color    | Match color                         |
| Pitch  | Checkbox | Whether to take pitch into account  |
| Rhythm | Checkbox | Whether to take rhythm into account |

## Output

| Name   | Description                                                  |
| :----- | :----------------------------------------------------------- |
| Output | The "Haystack" input with colored notes that match the query |

