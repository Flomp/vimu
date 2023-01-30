# Node Panel

The Node Panel allows you to create, move and connect nodes that you need for your analysis. 

## Navigation

To move around the canvas, click and hold anywhere on the grid area and drag your mouse. This will move the canvas in the direction of your cursor movements. To adjust the zoom-level use your mouse wheel or press the <kbd class="keyboard-key nowrap">+</kbd> or <kbd class="keyboard-key nowrap">-</kbd> buttons on your keyboard.

## Minimap

On the bottom right you can find a minimap. It is a miniature representation of the nodes that are currently present in the Node Panel. You cannot interact with it directly. It is only there to aid orientation.

## Node palette

The Node Palette allows you to create new nodes and also contains the <nuxt-link to="/docs/editor/menu">menu</nuxt-link>. It is located at the top of the Node Panel. Above the Node Palette you can see the name of the file you are currently working on.

## Nodes

There are a lot of different kinds of nodes that all serve different purposes. Thus we have dedicated a <nuxt-link to="/docs/nodes">complete section</nuxt-link> of this documentation to explain each one in depth. Here we will simply explain how you can interact with nodes in general.

### Select
Click on the node with the left mouse button. 

### Move
Click and hold onto the node and then move your mouse. 

### (Dis)connect two nodes
First, click the output socket of one node, then click the input socket of another. To disconnect, simply click the socket of either one and click anywhere on the grid area.

### Delete
Select the node first then press the <kbd class="keyboard-key nowrap">← Backspace</kbd> key on your keyboard or select "Edit" -> "Delete" from the <nuxt-link to="/docs/editor/menu#delete">context menu</nuxt-link>. Note that the output node cannot be deleted.