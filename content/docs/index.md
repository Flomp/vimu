# Introduction to vimu
<quickstart-hero></quickstart-hero>

Over the last decades, computers have significantly changed the way we process data. As a result, many new interdisciplinary fields have emerged that aim to apply these new analysis methods to established areas of scientific research. This trend can also be witnessed in musicology and music theory, as many new tools for computer-aided musical analysis have been developed over the last few years. However, these tools oftentimes require a high level of technical knowledge and extensive experience with programming languages.

This was the motivation to create **vimu**. It builds in large parts on the existing work of Cuthbert et al. and their python library <a href="http://web.mit.edu/music21/" target="_blank">music21</a>. However, **vimu** is an entirely visual editor. It provides an additional layer of abstraction, making a multitude of music21's functions intuitive to use with no need for any knowledge of computer science.

## Applications
At its core **vimu** is a tool that allows you to transform and analyse music scores. Here are three examples of what you can do with **vimu**:
* Transpose a score - This is a very basic functionality. Transpose every note in a score up or down an arbitrary number of half steps.
* Search for melody/rhythm - **vimu** is capable of finding any melodic or rhythmic patterns in a score across all voices. You can even search for complex chords.
* Detect modulation - **vimu** employs a statistical to detect key changes in a music score. Given the sequence of notes in the score, it predicts the most likely key to produce the observed sequence.

Of course, these examples only scratch the surface of what you can do with **vimu**. To get a complete overview you can visit the <a href="/docs/editor">Editor</a> section.
