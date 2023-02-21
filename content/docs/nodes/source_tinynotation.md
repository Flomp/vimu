# source_tinynotation

This node lets you input a melody in tinynotation format (see below). It outputs this melody and serves as input to subsequent nodes.

## Input

This node takes no inputs.

## Controls

1. Text field to input tinynotation

## Output

The melody input in the control text field.

## Remarks

This node expects its input to be in a specific format called "tinynotation". It builds on the definition made by <a href="https://web.mit.edu/music21/doc/usersGuide/usersGuide_16_tinyNotation.html">music21</a> and extends it with some additional functionality.

### Pitch
Pitch is denoted with the letters A-G.

Example:<br>
`a b c d e f g`

<framed-gif path="/imgs/tinynotation/example_1.svg"></framed-gif>

### Octave

C1: CCC <br>
C2: CC <br>
C3: C <br>
C4: c <br>
C5: c' <br>
C6: c'' <br>
C7: c'''

Example:<br>
`CCC CC C c c' c'' c'''`

<framed-gif path="/imgs/tinynotation/example_2.svg"></framed-gif>

### Duration
Duration is represented by a number denoting the denominator of the note length (e.g. 4 for a quarter note) following the pitch. Omitting the number for subsequent notes will make them the same length.

Example:<br>
`c8 d e f16 g a4 b`

<framed-gif path="/imgs/tinynotation/example_3.svg"></framed-gif>

Adding a dot (".") after the number will create a dotted rhythm. 

Example:<br>
`c8. d16 e4`

<framed-gif path="/imgs/tinynotation/example_4.svg"></framed-gif>

Triplets are created by the "trip{}" prefix. Notes (and their durations) go in between the brackets.

Example:<br>
`trip{c8 d e}`

<framed-gif path="/imgs/tinynotation/example_5.svg"></framed-gif>

### Rests
Rests are denoted by "r". Rhythm works analogously to notes.

Example:<br>
`c r8. d16 r2`

<framed-gif path="/imgs/tinynotation/example_6.svg"></framed-gif>

### Accidentals

Accidentals are represented by "#" and "-". Double accidentals by "##" and "--". They do not affect subsequent notes within the same measure.

Example:<br>
`c# c## d- d--`

<framed-gif path="/imgs/tinynotation/example_7.svg"></framed-gif>

### Chords
Chords are created with the chord{} prefix. Notes (and their rhythms) go in between the brackets.

Example:<br>
`chord{c4. e g} chord{c8 f8 a8}`

<framed-gif path="/imgs/tinynotation/example_8.svg"></framed-gif>

### Lyrics

A lyric syllable is specified by appending it after the note with an underscore ("_"). This also works for general bass figures.

Example:<br>
`c_Hel- d_lo e_World`

<framed-gif path="/imgs/tinynotation/example_9.svg"></framed-gif>


### Time signature
Time signature is described in the form "numerator/denominator"

Example:<br>
`3/8 c8 d e f g a`

<framed-gif path="/imgs/tinynotation/example_10.svg"></framed-gif>


### Key signature

Key signature is denoted by "k", a pitch symbol and an optional accidental.

Example:<br>
`kE- c d e-`

<framed-gif path="/imgs/tinynotation/example_11.svg"></framed-gif>