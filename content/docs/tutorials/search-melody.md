# Tutorial: Search for melody
In this tutorial, you will 
1. Learn how to use the search_part node
2. Get a short introduction into tinynotation
3. Search for a melody in a Bach chorale

## Create a new file

As always we will need a file to work in. From the <nuxt-link to="/dashboard/files/my">dashboard</nuxt-link> select "New File". 

## Select a score
Select "Browse" in the source_score node. We will use the Bach chorale "Ach Gott, erhör' mein Seufzen". However, you are of course free to choose any score from the **vimu** library. Alternatively, you can <nuxt-link to="/docs/dashboard/scores#upload-a-score">upload</nuxt-link> your own score and use it here.

## Add a search node

<framed-gif path="/gifs/add_search_node.gif"></framed-gif>

Select "Search"->"Part" from the <nuxt-link to="/docs/editor/node-panel#node-palette">Node Palette</nuxt-link>. The search_part node requires two inputs. A piece of music you want to search in and a melody that you are looking for. One part of the puzzle we already have: unplug the source_score node from the output node and plug into the "Stream" socket of the search_part node. Next, connect the output socket of the search_part node with the output node. However, the output is still empty. This is because we have not told **vimu** what our query is.

You may have also noticed that the search_part node has three settings: color, pitch and rhythm. We will not be concerned with them for now. We will get back to it later in this tutorial.

## Add a tinynotation node

It would be perfectly fine if you at this point opened the music notation program of your choice, input a short melody, exported and uploaded it to **vimu** as a score and used it as input for our search_part node. However, you may notice that this sounds rather cumbersome. This is why **vimu** provides a convenient method to input short melodies and chord sequences called tinynotation.

To add a source_tinynotation node select "Source"->"Tinynotation" from the <nuxt-link to="/docs/editor/node-panel#node-palette">Node Palette</nuxt-link>.

## Write some tinynotation

<framed-gif path="/gifs/add_tinynotation_node.gif"></framed-gif>

This will just be a quick introduction to tinynotation. For a full writeup of all the functions please check the source_tinynotation <nuxt-link to="/docs/nodes/source#tinynotation">node documentation</nuxt-link>. 

In general, tinynotation represents music notes as characters corresponding to the note's pitch. 
So the tinynotation string "c d e f g" corresponds to this melody:

<framed-gif path="/imgs/tinynotation.png"></framed-gif>

For this tutorial, we are looking for a specific sequence that occurs multiple times in the soprano voice throughout the chorale. The tinynotation for this sequence looks like this: "f f g g a a". If you are not using the same chorale as we do in this tutorial you of course have to adapt your query accordingly.
After entering the sequence in the source_tinynotation node, don't forget to connect it to the "Part" input socket of the search_part node.

If you want to check your tinynotation query you can simply connect it to the output node directly. This will render the corresponding melody in the output panel.

## Observe the results

The output will now become visible again. Notice that every note that matched with your query is now colored red. 

## Modify your search

As promised we will now come back to the three settings parameters of the search_part node. 

### Color
This is probably the most straightforward one. It simply determines the color of the notes that match your query. Try changing it to something different than red. You will see all matching notes change color in the output panel.

### Pitch
Unticking this box makes your search agnostic to the actual pitch of your query. So by unticking the box our query "f f g g a a" would simply find all occurrences of six quarter notes ignoring their pitch

### Rhythm
Similarly unticking this box results in the search node ignoring the rhythm of the query. Our query will now find every occurrence of the notes "f f g g a a" no matter their rhythm. 

## Up next

You now know how to search for melodies in a score. In the next tutorial, we will take a look at plotting histograms, scatter plots and more.