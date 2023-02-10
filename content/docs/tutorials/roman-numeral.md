# Roman Numeral Analysis

In this tutorial, you will 
1. Learn how to realize a figured bass line
2. Perform an automated roman numeral analysis

## Create the nodes

<framed-gif path="/gifs/rn_analysis.gif"></framed-gif>

We will start again in a fresh file. First, we add two additional nodes: a tinynotation node and a node to realize our figure bass. Select "Source"->"Tinynotation" and "Figured bass"->"Realize" to add the two new nodes to our file. For this tutorial we won't need the default source_score node. So you can go ahead and delete it. Select the source_score node and press <kbd class="keyboard-key nowrap">⌫</kbd> on your keyboard. 

Now we connect the source_tinynotation output to the figured_bass_realize input and the figured_bass_realize output to the input of the output node. If you are interested in what the different buttons and checkboxes of the figured_bass_realize node do, please refer to the <nuxt-link to="/docs/nodes/figured-bass-realize">node's documentation</nuxt-link>.


## Tinynotation and figured bass
This section will build on the <nuxt-link to="/docs/tutorials/search-melody#add-a-tinynotation-node">previous tutorial</nuxt-link>. So in case you have not completed it, it might be a good idea to have a look at it first. 

Tinynotation can also be used to write figured bass lines. To do so, suffix any note with an underscore (\_) followed by the figured bass number(s). Sharps and flats are denoted by "#" and "b" respectively and must precede the figured bass number they affect. So the tinynotation "C F_6 G_b3 G_#7 C" will generate the following bass line:

<framed-gif path="/imgs/tinynotation_fb.png"></framed-gif>

For our case we are going to use the following sequence: "D A_75#3 B- F_6 G_6 AA_75#3 D". A nice d-minor cadence. Input it into your tinynotation node a notice that a realized figured bass line will appear in the Output Panel.

## Roman Numeral Analysis

<framed-gif path="/gifs/rn_analysis_create_rn.gif"></framed-gif>

We are building on the amazing <a href="https://github.com/napulen/AugmentedNet">AugmentedNet</a> created by Nápoles López et al. to perform automated roman numeral analyses. In short, we employ a machine learning model that predicts the key and the harmonic function of every chord in the score. To learn how AugmentedNet works in detail, please refer to their <a href="https://archives.ismir.net/ismir2021/paper/000050.pdf">paper</a>.

While this might sound complicated to use, **vimu** bundles this functionality into just another node that you can simply create by going to "Analysis"->"Roman numeral" in the Node Palette. Next, plug this new node between your figured_bass_realize node and your output node.

Notice in the Output Panel how AugmentedNet has correctly identified the key as d-minor and generated a roman numeral analysis of our short cadence. You can of course also create roman numeral analyses of whole scores simply by using a source_score node as the input to the node.

## Up next

By now you have already learned a lot about how you can analyze a score with **vimu**. But often a picture says more than a thousand words. Thus, in the next tutorial we will learn how to create plots with **vimu**.
