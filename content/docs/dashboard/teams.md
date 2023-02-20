# Teams

Teams in **vimu** provide the possibility to access files across multiple users without having to explicitly share each file. All members of a team will automatically gain access to all files assigned to this team. Depending on a member's permission they will be able to edit or view these files.

## Create a team <span class="v-chip theme--light v-size--default primary"><span class="v-chip__content">PRO</span></span>

From anywhere in the <nuxt-link to="/dashboard/files/my">dashboard</nuxt-link> select the <i class="v-icon mdi mdi-plus theme--light"></i> icon next to the "Teams" heading in the left navigation.

First, give your team a name. In the next step, you can invite new members to your team. Make sure to give your members the correct <nuxt-link to="#access-rights">access rights</nuxt-link>. An invited user will receive an invitation email. Until they accept your invitation they will appear greyed out and their membership status will be "pending". Members can of course also be added after the team setup is complete. By clicking "Continue" you will get to the last step. Here you can change the team icon if you like. By clicking "Finish" you will be redirected to your new team's dashboard page. Notice that a new team has appeared in the left navigation.

## Access rights
Team members can have three levels of access rights:

### Owner
Only the creator of the team will have this role. The owner has all the rights of the editor but can also manage the team (members, name etc.).

### Editor
The editor can view, create, edit, and delete any file in the team. However, they cannot manage the team itself.

### Viewer
The viewer can only view files in the team. Any changes they make in a file will not be saved.

## Manage your team

To manage your team, select it from the left navigation in the dashboard. The dashboard has two main tabs:

### Files

This view should be familiar from the <nuxt-link to="docs/dashboard/files">files</nuxt-link> section. Team members that are at least editors can create, edit and delete files here. It works analogously to your private files. However, every file you create here will automatically be available to every team member. 

Please note that the files that you create here also count towards your file limit if you are not a **vimu Pro** subscriber.

### Members

If you are the owner of the team you can manage the team's members from here. You can adjust a member's access rights via the dropdown menu and remove a member by clicking the <i class="v-icon mdi mdi-close theme--light"></i> icon. By removing a team member from the team they will lose access to all files in the team. To invite new members click the "Invite" button on the top right.