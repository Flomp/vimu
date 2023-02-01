# Tutorial: Plot Histogram

In this tutorial, you will 
1. Select a part from the full score
2. Learn about the Plot Panel
3. Plot a pitch histogram

## Prologue

For this tutorial, we will turn to a more realistic question: how often does the bass sing a B natural in Bach's chorale "O Lamm Gottes unschuldig"? Let's break down the problem: we need to select the chorale as an input, isolate the bass voice and then count the occurrences of B naturals.


## Select the score
To get started, as always, we first create a new file. Then we select "Browse" in the source_score node, switch to the "Library" tab and find the chorale "O Lamm Gottes unschuldig" using the search. 

## Select a part

<framed-gif path="/gifs/select_part.gif"></framed-gif>

On to the task of isolating the bass voice. **vimu** comes with various tools to select specific parts of the score. You can isolate different measures, parts (voices/instruments), or even single notes. In our case, we want to select a part. Choose "Select"->"Parts" from the <nuxt-link to="/docs/editor/node-panel#node-palette">Node Palette</nuxt-link>. And plug the newly created select_parts node between the source_score node and the output node.

