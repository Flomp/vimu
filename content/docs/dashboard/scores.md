---
title: Dashboard - Scores
description: Next to files, scores are the other integral part that makes vimu work. A score is a piece of sheet music that has been enriched with additional meta information to make searching for it easier. Scores normally are the initial input for your analysis in a file.
---


# Scores

Next to <nuxt-link to="/docs/dashboard/files">files</nuxt-link>, scores are the other integral part that makes **vimu** work. A score is a piece of sheet music that has been enriched with additional meta information to make searching for it easier. Scores normally are the initial input for your analysis in a file.

## Preview

<framed-gif path="/gifs/open_score.gif"></framed-gif>

Clicking on a score will open the preview panel. Here you can see the title of the score as well as its meta information. Additionally, you can review the sheet music. By clicking the "Create file" button, you can instantly create a new <nuxt-link to="/docs/dashboard/files#from-score">file</nuxt-link> that uses this score as its input.

## Ownership
**vimu** differentiates between two types of scores: public scores from the library and personal ones that you own. To navigate between the two, use the tab navigation near the top of the page ("My scores" <-> "Library").

### Personal scores
These are the scores that you have uploaded. In general, they are only accessible to you. There is one special case though: if you <nuxt-link to="/docs/dashboard/files#sharing">share a file</nuxt-link> that uses a personal score, this score will be available to every collaborator even if the score is not public.

### Public scores
Scores in the library are either provided by **vimu** out of the box or have been published by another user. You are free to use or modify them in any way.

## Upload a score

<framed-gif path="/gifs/upload_score.gif"></framed-gif>

You can click the "Upload" button on the <nuxt-link to="/dashboard/scores">score page</nuxt-link>. This will open the score upload dialog.
First, you need to give your score a name. Next, select a compatible file from your hard drive. **vimu** will then automatically attach any meta information it can find in the file to the score. If you wish to review this information or add your own, click "Additional information". 

Lastly, you can decide if you want to publish your score to the library by switching the "Public" switch to on. Please note that publishing a score automatically enters it into the public domain. Other users are free to use or copy it.

Click "Upload" to finish the process.

Alternatively, you can drag and drop the file from your computer directly to the <nuxt-link to="/dashboard/scores">score page</nuxt-link>. After the score has been uploaded you can change its name and meta information by <nuxt-link to="#edit-a-score">editing the score</nuxt-link>.

### Supported file formats
**vimu** currently supports (compressed) MusicXML (.musicxml, .mxl), MIDI (.midi), ABC (.abc) and Humdrum (.krn) files.

### Where do I find MusicXML files?

#### Online sources

The official MusicXML documentation provides a <a href="https://www.musicxml.com/music-in-musicxml">large list</a> of online sources that offer scores in MusicXML format from all kinds of different genres.

#### Export from notation software

Every music notation software (like musescore, Forte, Sibelius etc.) offers an option to export a score in MusicXML format. Please refer to the respective handbook to learn how to do so.

#### PDF to MusicXML
Over the last years score scanners have gotten to a reasonably good level. With them, you can scan a physical score and export it to many formats including MusicXML. There are various apps available for Windows, Mac, iOS and Android.

## Edit a score

Select "Edit" from the action menu of the score. This opens the edit dialog. You can change the name and the meta information of the score. You can also choose to make the score public or private.

## Delete a score

Select "Delete" from the action menu of the score and confirm in the dialog. This action can _not_ be undone. Keep in mind that this will also break any files that have been using this score for their analysis.