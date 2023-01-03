# Output Panel

The Output Panel displays the final output of your analysis. Depending on the nodes you connect to the output node, this can either be a score or a plot.

## Score
In case the output is a score, we use <a href="https://opensheetmusicdisplay.org/">OpenSheetMusicDisplay</a> to present the sheet music in the panel. 

### Playback
To listen to the score click the <i class="v-icon mdi mdi-play theme--light"></i> button in the top right corner of the output panel. You can use the slider right below the play button to jump forwards or backward in the score. Click the <i class="v-icon mdi mdi-pause theme--light"></i> button to pause the playback.


### Download
You can download your results at any point by clicking the <i class="v-icon mdi mdi-download theme--light"></i> button on the top right. You can then choose between two different formats.

#### 1. SVG
SVG or Scalable Vector Graphic is an image file format. As opposed to other image file formats like PNG or JPG, SVG files can be scaled without loss of image quality. If you are not able to use SVG files for your further work, there are many converters available online that can convert SVG into all usual image file formats.

#### 2. MusicXML
MusicXML is a standardized format to make music scores machine-readable. It can be imported into any music notation software like musescore, Sibelius, or Forte. 

## Hide/Show

You can hide the Output Panel at any time if you don't need it at that moment. Click the <i class="v-icon mdi mdi-minus theme--light"></i> button in the top right corner to close it. To restore the panel select "View" -> "Output" from the <nuxt-link to="/docs/editor/menu">menu</nuxt-link>.