# Get started with vimu
In this quickstart guide, you will 
1. Create your first file
2. Get a first glance at the editor
3. Transpose a score up a semi-tone
4. Save your results

## Signup
First things first: to start using **vimu** you will need to sign up and create an account. Go to <nuxt-link to="/signup">https://vimu.app/signup</nuxt-link>. You can choose to authenticate either with your Google account or by using an email address. In the latter case, you will receive an email asking you to verify your email address.

## Create a file
Once you have successfully <nuxt-link to="/signup">signed up for **vimu**</nuxt-link> you can start by creating a new file in the dashboard. There are <nuxt-link to="/docs/">multiple ways</nuxt-link> to do this. In this guide, we will simply create a blank file for a start. To do so click the "New File +" button in the <nuxt-link to="/dashboard/files/my">dashboard</nuxt-link>. You are now automatically redirected to the editor to work on the file you just created.

## The editor
**vimu** is a visual node editor. This means that functionality (like transposing a score or selecting measures) is bundled into nodes. These nodes usually take one or more inputs and produce an output that is handed to the next node it is connected to. You can imagine it like an assembly line where every worker has a specialised task and hands his work down to the next worker after he has done his task.

The editor is split into three view panels by default.
### Node panel
On the very left, you find the node panel. It will be your main workspace. Here you can add nodes and connect them to analyse the score in the way you want. Currently, you should see two connected nodes: a score node and an output node.

You can adjust the zoom-level of the node panel with your mouse wheel. Click and drag outside a node to move the editor area. Do the same on a node and you can move the node around.

### Output panel
In the middle, the output panel is located. The final result of the output node will be displayed here. It can either be a score or a plot.
### Details panel
On the right, you see the details panel. In there you can get detailed information about a node you have selected.


## Select a score

<framed-gif path="/gifs/select_score.gif"></framed-gif>

The output is currently empty as we have not selected a score yet. Let's change that. 
Click the "Browse" button in the "source_score" node. This opens the score selection dialog. The "My scores" tab is likely empty at the moment since you have not uploaded any <nuxt-link to="/docs/dashboard/scores">scores</nuxt-link> yet. However, **vimu** comes with a lot of scores already included. Switch to the library tab and use the search bar to find a score you would like to analyse. After selecting it, the editor will now load the score and display it in the output panel.

You can give it a listen by clicking <i class="v-icon mdi mdi-play theme--light"></i> the icon in the output panel.

## Add a node

To transpose the score we have just selected we will need a new node. Open the context menu by right-clicking in the editor panel or pressing the space bar. The transpose node is grouped under the "Transform" utils. Select "Transform" -> "Transpose".

The newly added <nuxt-link to="/docs/nodes/transform-transpose">transform_transpose</nuxt-link> node requires a score as an input and produces the transposed score as an output. It has a dial that takes in any positive or negative integer denoting the number of semi-tones you want to transpose the score up or down.

## Connect the node

<framed-gif path="/gifs/connect_node.gif"></framed-gif>

At the moment, the output is unchanged, as it is still connected to the original <nuxt-link to="/docs/nodes/source-score">source_score</nuxt-link> node. To rewire our connections we first disconnect the existing connection by clicking the socket of the output node. You should see the score disappear from the output panel. Don't worry, we'll fix this in a second. Plug the connection back into the left socket of the <nuxt-link to="/docs/nodes/transform-transpose">transform_transpose</nuxt-link> node. Lastly, create a new connection to the output node by clicking the right socket of the <nuxt-link to="/docs/nodes/transform-transpose">transform_transpose</nuxt-link> node and then the output node's socket.

You will see the score reappear, but it will be transposed by the number of semi-tones you specified. Give it another listen to verify your result.

## Save the results
You can download the results of your analysis at any time by clicking the download button <i class="v-icon mdi mdi-download theme--light"></i> in the output panel. For the format, you can choose between MusicXML and SVG. MusicXML can be imported into any music notation program like musescore or Sibelius. SVG files are images. Perfect if you want to use it in a Word or PDF document.

## Up next

**vimu** is built to be as intuitive as possible. Feel free to simply play around in the editor to get more familiar with it. Should you get stuck at any point you can return here to find <nuxt-link to="/docs/nodes">detailed information</nuxt-link> for every node and their functionality. 

If you wish to continue reading, you can do so in the <nuxt-link to="/docs/dashboard">dashboard section</nuxt-link> of the documentation.