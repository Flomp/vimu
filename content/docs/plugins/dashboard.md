# Dashboard

<framed-gif path="/imgs/plugin_dashboard.png"></framed-gif>

The plugin dashboard comes with the standard design that you should be familiar with by now. You can use the respective controls to search for plugins and change the display style or the sorting.

## Create a plugin
To create a new plugin press the "New Plugin" button in the dashboard. This will bring you to the <nuxt-link to="/docs/plugins/editor">plugin editor</nuxt-link>.

## Rename a plugin
Upon its creation, a plugin will be given an auto-generated name. If you wish to change it select "Rename" from the plugin's action menu and give it a new name. Note that this also changes the plugin name for every user you shared this plugin with.

## Ownership
Plugins are private by default. However, you can publish a plugin by choosing "Publish" from the action menu. This action can be undone by repeating the action. A published plugin is available to every user on the platform.

To explore public plugins, use the tab navigation near the top of the page ("My plugins" <-> "Browse").

<div role="alert" class="v-alert v-sheet v-alert--prominent v-alert--text error--text"><div class="v-alert__wrapper"><i class="v-icon v-alert__icon mdi mdi-alert error--text"></i><div class="v-alert__content"> Plugins contain third party code. While we do our best to monitor the library for malicious plugins, always make sure you understand what a plugin does before you include it in your file.  </div></div></div>

## Delete a plugin
Open the action menu and select "Delete". Confirm the deletion in the dialog. A deleted plugin can not be restored.