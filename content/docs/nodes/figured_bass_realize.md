---
title: Nodes - figured_bass_realize
description: This node realizes a figured bass line that is passed to it as an input.
---

# figured_bass_realize

This node realizes a figured bass line that is passed to it as an input. As there are oftentimes multiple solutions for a given figured bass line it lets you generate a new solution by clicking the "New Solution" button. Furthermore, it provides multiple controls to alter the ruleset with which the figured bass line is realized. To see a more in-depth example visit the <nuxt-link to="/docs/tutorials/roman-numeral#tinynotation-and-figured-bass">tutorial</nuxt-link> on roman numeral analysis.

## Input

| Name | Description |
|:---|:---|
| Input | A figured bass part |

## Controls

| Name | Type | Description |
|:---|:---|:---|
| New Solution | Button | Generate a new solution with the given rules  |
| Keyboard Output | Checkbox | Whether to output the realized bass line in keyboard style (two voices) or choral style (four voices) |
| Incomplete chords| Checkbox | Whether to allow chords that are missing tonic, third or fifth |
| max. semitones between parts| Number | Maximum distance between notes in the realization in semitones |

## Output

| Name | Description |
|:---|:---|
| Output | A two- or four-part realization of the input |

