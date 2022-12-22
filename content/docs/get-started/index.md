# Get started with vimu
In this quickstart guide, we will 
1. Create our first file
2. Get a first glance at the editor
3. Transpose a score up a semi-tone
4. Save our results as an image file

## Signup
First things first: to start using **vimu** you will need to sign up and make an account. Go to <nuxt-link to="/signup">https://vimu.app/signup</nuxt-link>. You can choose to authenticate either with your Google account or by using an email address.

## Create a file
Once you have successfully <nuxt-link to="/signup">signed up for **vimu**</nuxt-link> you can start by creating a new file in the dashboard. There are <nuxt-link to="/docs/">multiple ways</nuxt-link> to do this. In this guide, we will simply create a blank file for a start. To do so click the "New File +" button in the <nuxt-link to="/dashboard/files/my">dashboard</nuxt-link>. You are now automatically redirected to the editor to work on the file you just created.

## The editor
**vimu** is a visual node editor. This means that functionality (like transposing a score or selecting measures) is bundled into nodes. These nodes usually take one or more inputs and produce an output that is handed to the next node it is connected to. You can imagine it like an assembly line where every worker has a specialised task and hands his work down to the next worker after he has done his task.

The editor is split into three view panels by default.
### Node panel
On the very left you find the node panel. It will be your main workspace. Here you can add nodes and connect them to analyse the score in the way you want. Currently, you should see two connected nodes. A score node and an output node. We will explain what they do and how to interact with them in a bit.
### Output panel
In the middle is the output panel. The output of the output node will be displayed here. It can either be a score or a plot. 
### Details panel
On the right, you see the details panel. In there you can get detailed information about a node you have selected.