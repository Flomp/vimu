# Plugin Editor

<framed-gif path="/imgs/plugin_editor_labeled.png"></framed-gif>


The plugin editor allows you to edit both the appearance and the logic of a plugin node. Generally, a node consists of inputs, outputs, controls, and code that defines its computational logic. Please refer to the <nuxt-link to="/docs/plugins/node">plugin node</nuxt-link> chapter for more details. The plugin editor consists of five panels (labeled A-E in the image above) that we will discuss in detail in the following sections.

## Sidebar Panel (A)
The sidebar panel displays an overview of the components (inputs, outputs, and controls) that are currently present on your node. You can add inputs and outputs with the <i class="v-icon mdi mdi-plus theme--light"></i> icon next to the respective heading. Controls can be added from the <nuxt-link to="#editor-panel-b">editor panel</nuxt-link>. To select a component click on it in the sidebar panel. You will see the corresponding component light up on the node. Furthermore, the component's properties will subsequently appear in the <nuxt-link to="#properties-panel-e">properties panel</nuxt-link>. The grey text in front of a component (e.g. "out_0") denotes the component's key. You can use this key to reference the component in your code. To delete a component select it first in the sidebar panel and then press the <kbd class="keyboard-key nowrap">← Backspace</kbd> key on your keyboard.

## Editor Panel (B)
The editor panel displays the node you are currently working on. It displays the node exactly how it will appear in your file. At the top of the panel, you find the control palette. It contains four different controls you can add to your node. Controls make your node interactive. A user can provide data that will subsequently be available to you in your code. Click on one in the palette to add it to your node. You will also see it appear as a new entry in the <nuxt-link to="#sidebar-panel-a">sidebar panel</nuxt-link>. Each control has various attributes that can be set in the <nuxt-link to="#properties-panel-e">properties panel</nuxt-link>.

## Code Panel (C)
In the code panel, you can define the logic of your node. Python is used to compute the node's output on the server. While there are some limitations you will need to keep in mind almost any python code you write in the panel will work out of the box. We have dedicated an <nuxt-link to="/docs/plugins/code">entire chapter</nuxt-link> explaining how to write code to power the logic of your node.

Please note that while the code panel offers some convenient features like autocomplete, it is not meant to function as a full-fletched IDE. In case you require a more complete code editor, consider developing your code in an external editor and pasting it to vimu afterward.

### Running your code
You can test your code at any time by pressing the green "Run" button at the top of the panel. This will execute your code on the server and provide you with feedback if any errors are encountered in your code. The input data for your node will be simulated by generating a random sample. You can use print statements in your code. These will appear in the logs that will subsequently be displayed in the <nuxt-link to="#log-panel-d">log panel</nuxt-link>.

### Save your code
Save your code by pressing the "Save" button at the top of the panel. This will download the current content of the panel as a *.py file.

## Log Panel (D)
The log panel displays the logs that are sent back from the server after testing your code. You can clear the logs with the button in the top right corner.

## Properties panel (E)
The properties panel displays the properties of components you select in the <nuxt-link to="#sidebar-panel-a">sidebar panel</nuxt-link> and allows you to edit them.