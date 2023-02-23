# analysis_roman_numeral

This node creates an automated roman numeral analysis of the input. By default, it uses <a href="https://github.com/napulen/AugmentedNet">AugmentedNet</a> to automatically detect the key and potential modulations of the input. This behavior can be disabled by toggling the "auto-detect key" control to off and providing a key in the "Key" control. The key has to be a single pitch and an optional accidental in <nuxt-link to="/docs/nodes/source_tinynotation#pitch">tinynotation format</nuxt-link>. The input will then be analyzed in the provided key. To see a more in-depth example visit the <nuxt-link to="/docs/tutorials/roman-numeral#tinynotation-and-figured-bass">tutorial</nuxt-link> on roman numeral analysis.

## Input

| Name | Description |
|:---|:---|
| Input | An arbitrary score or part |

## Controls

| Name | Type | Description |
|:---|:---|:---|
| auto-detect key | Toggle | Whether to use AugmentedNet  |
| Key | Text field (tinynotation) | Only active when "auto-detect key" is off. Analysis key |

## Output

| Name | Description |
|:---|:---|
| Output | The input with a roman numeral added to every bass note as a lyric |

