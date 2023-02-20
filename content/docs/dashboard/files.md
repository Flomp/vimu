# Files

Each analysis of a score is stored in a **vimu** file. If you are logged in, all your files can be found in the "My files" section of the <nuxt-link to="/dashboard/files/my">dashboard</nuxt-link>.

## Create a file
### From scratch
To create a minimal file click the "New File" button in the dashboard view. This will create a file with a single <nuxt-link to="/docs/nodes/source-score">source_score</nuxt-link> node as an input and an <nuxt-link to="/docs/nodes/output">output</nuxt-link> node.

### From template
**vimu** comes with various pre-made templates you can choose from. Open the dropdown menu next to the "New File" button and select "From template". In the dialog, you can then choose a template that suits your needs. The new file will be created with all nodes and connections that are present in the template.

### From score
To create a new file from a score, navigate to the <nuxt-link to="/dashboard/scores">score section</nuxt-link> of the dashboard, select a score and click "Create file" in the side panel. This will also create a minimal file with the only difference being that the selected score is already preset as an input.

### From another file
You can also duplicate an existing file. Open the action menu of the file you wish to duplicate and select "Duplicate". A new file will be created that has the exact content as the original.

### Import file
**vimu** allows you to <nuxt-link to="/docs/editor/menu#export">export files</nuxt-link>. To import a previously exported file, open the dropdown menu next to the "New File" button, click "Import File" and select the file you wish to import from your hard drive.

## Rename a file

Upon its creation, a file will be given an auto-generated name. If you wish to change it select "Rename" from the file's action menu and give it a new name. Note that this also changes the file name for every user you shared this file with.

## Favorites

A file can be added to your favorites to allow for quicker access. You can either click the <i class="v-icon mdi mdi-star-outline theme--light"></i> icon in front of the file or open the file's action menu and select "Add to favorites". Your favorites are always accessible from within the sidebar of the dashboard.

To remove a file from your favorites click the <i class="v-icon mdi mdi-star theme--light"></i> icon in front of the file or open the file's action menu and select "Remove from favorites".

## Sharing  <span class="v-chip theme--light v-size--default primary"><span class="v-chip__content">PRO</span></span>

<framed-gif path="/gifs/share_file.gif"></framed-gif>

One of **vimu**'s core features is the ability to collaborate. You can share a file with an arbitrary number of other users. Additionally, you have the option to make the file public allowing everyone to view it. Even people that are not registered on **vimu**.

To share a file, open the action menu and select "Share". By flipping the switch "Anyone with the link can view" to on, you can make your file public. You can now copy the link at the top of the dialog and send it to whoever you want to be able to access the file. To share a file with a specific user, type their username in the text field, select the desired access privileges and click "Add". The file will now appear in the user's <nuxt-link to="/docs/dashboard/shared">Shared Files</nuxt-link> section in the dashboard.
Click the <i class="v-icon mdi mdi-close theme--light"></i> icon next to the user to unshare the file.

## Delete a file

Open the action menu and select "Delete". Confirm the deletion in the dialog. A deleted file can _not_ be restored.