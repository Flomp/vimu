---
title: Tutorials - Plugin nodes
description: Learn to use the plugin editor, Create your first plugin node, Use your plugin node in a file
---

# Tutorial: Plugin nodes

In this tutorial, you will 

1. Learn to use the plugin editor
2. Create your first plugin node
3. Use your plugin node in a file

## Introduction

We will recreate the <nuxt-link to="/docs/nodes/transform_transpose">transpose node</nuxt-link> that already exists in **vimu** using a plugin node. It will take in a score, transpose it up or down by a user-specified amount of semi-tones, and output the result.

## Create a plugin

<framed-gif path="/gifs/plugin_create.gif"></framed-gif>

To create a plugin navigate to the <nuxt-link to="/dashboard/plugins">plugin section</nuxt-link> in the dashboard and click the "New Plugin" button. You are now automatically redirected to the <nuxt-link to="/docs/plugins/editor">plugin editor</nuxt-link> to work on the plugin you just created. 

## Give your plugin a name

By default, vimu auto-generates a name for your plugin. To give it a more descriptive name, select your plugin in the sidebar panel on the left and give it a new name in the properties panel on the very right. Notice that the name of the node changes also in the editor panel.

## Add a control

<framed-gif path="/gifs/plugin_control.gif"></framed-gif>

We want the user to determine the amount of semi-tones that the piece is transposed. To accomplish that, we need to add a number control. Select it from the control palette at the top of the editor panel. You will see a new control appear on the node. Furthermore, you'll notice an additional line has been added to the code in the code panel. For your convenience, the code to access the control's data has been auto-generated. 

We can customize the control further by giving it a default value, a label, and a distinctive icon. To do so, select the control in the sidebar panel on the left. You will see the control's properties in the properties panel to the right. Set the default value to an integer of your choosing. We will go for 4. Type something in the "Label" text field and notice that the number control of the node adopts your label. The icon field accepts any string that is a valid <a href="https://pictogrammers.com/library/mdi/">Material Design Icon</a> string. You can omit the "mdi-" prefix. We will go for the "numeric" icon making it clear to the user that a number is expected here.

## Writing some code

<framed-gif path="/gifs/plugin_code.gif"></framed-gif>

So far our node simply looks good but does not do what we want it to do. For that, we need to write some python code in the code panel. Luckily the auto-generated code already provides most of the building blocks. Currently, we simply take the input data and set it as the output data as is without changing anything. Instead, we would like to transpose the input data before setting it as our output. To do so we need to change the code in line 5 to `new_output_data = in_0_data.transpose(control_0_data)`. We call music21's transpose method on the input stream and pass the data we receive from our number control as a parameter. Notice that we can safely call `transpose` because the input data type is set to "Stream". This means we are guaranteed to receive a music21.stream.base.Stream object as our input.

So our complete code example looks like this:

```python
from music21 import *
in_0_data = input_data.get('in_0')
control_0_data = node.data.get('control_0')
if in_0_data is not None:
    new_output_data = in_0_data.transpose(control_0_data)

    for key in node.outputs.keys():
        output_data[key] = new_output_data
```

## Test our code

We can test our code by pressing the green <i class="v-icon mdi mdi-play theme--light success--text"></i> button. This will execute our code on the server and provide us with logs and error tracebacks if any. Additionally, the server will validate that all outputs have the appropriate data type. In our case, all tests should pass and we should be good to go. You can close the plugin editor for now.

## Use your plugin

<framed-gif path="/gifs/plugin_use.gif"></framed-gif>

To use your newly created plugin open an existing file or <nuxt-link to="/docs/dashboard/files#create-a-file">create a new one</nuxt-link> from the dashboard. Then, click the plugin button <i class="v-icon mdi mdi-toy-brick-plus theme--light black--text"></i> in the palette. Select your plugin from the list in the opened dialog. You will notice your plugin node has been added to your file. Wire it up as usual and select an input score. In the output panel you should notice the input score transposed by the specified number of semi-tones.