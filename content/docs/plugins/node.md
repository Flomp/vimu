# Plugin Node

<framed-gif path="/imgs/plugin_node.png"></framed-gif>


Generally, a node in vimu consists of inputs, outputs, controls, and code that defines its computational logic. When designing a plugin node you can fully customize all of these aspects via the <nuxt-link to="/docs/plugins/editor#properties-panel-e">properties panel</nuxt-link> in the node editor.

## Inputs/Outputs
Inputs provide the data that is flowing into your node from other nodes connected to it. Outputs propagate the output data of your node to subsequent nodes in the node graph. All inputs and outputs have a name that is displayed next to their respective socket on the node. Furthermore, all inputs and outputs have an associated data type. The following data types are available:

* `int`
* `float`
* `string`
* `bool`
* `set`
* `dict`
* `list`
* `music21.stream.Part`
* `music21.stream.base.Stream` (default)
* `music21.stream.Score`
* `music21.base.Music21Object`

This ensures that only compatible nodes can be connected in the node graph. For example, an output with an `int` data type cannot be connected to an input with a `string` data type. However, the principle of inheritance applies. Meaning that an output with a `music21.stream.Score` data type can be connected to an input with a `music21.stream.base.Stream` data type as `music21.stream.Score` extends `music21.stream.base.Stream` (<a href="https://github.com/cuthbertLab/music21/blob/8baa27339109895cc4c55dd99cb0290e111fb02a/music21/stream/base.py#L13836" target="_blank">see here</a>).

## Controls
Controls are what make a node interactive. A user can provide data in the control that can subsequently be referenced in the node's code. You can give every control a name to make them more easily discernible in the editor. There are four different kinds of controls available. 

### Text Input
A basic text field that accepts any string. 

#### Attributes
| Name          | Description                                                                                                                            | Type   |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Default value | Value to be displayed when the node is created                                                                                         | string |
| Label         | Hint to be displayed in the text field                                                                                                 | string |
| Icon          | Icon shown in front of the text field. Must be valid <a href="https://pictogrammers.com/library/mdi/">Material Design Icon</a> string. | string |


### Number Input
A number input that accepts only float and int values.

#### Attributes
| Name          | Description                                                                                                                              | Type      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Default value | Value to be displayed when the node is created                                                                                           | int/float |
| Min           | Value must be greater or equal this value                                                                                                | int/float |
| Max           | Value must be less or equal this value                                                                                                   | int/float |
| Label         | Hint to be displayed in the text field                                                                                                   | string    |
| Icon          | Icon shown in front of the number input. Must be valid <a href="https://pictogrammers.com/library/mdi/">Material Design Icon</a> string. | string    |

### Checkbox
A checkbox that provides a bool value

#### Attributes
| Name          | Description                                                                                                                          | Type   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| Default value | Value to be displayed when the node is created                                                                                       | bool   |
| Label         | Hint to be displayed next to the checkbox                                                                                            | string |
| Icon          | Icon shown in front of the checkbox. Must be valid <a href="https://pictogrammers.com/library/mdi/">Material Design Icon</a> string. | string |

### Select
An input with predefined options.

#### Attributes
| Name          | Description                                                                                                                          | Type   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| Default value | Value selected when the node is created                                                                                              | string   |
| Items          | Options the user can choose from. Must be comma separated string | string |
| Label         | Hint to be displayed next to the select input                                                                                        | string |
| Icon          | Icon shown in front of the select input. Must be valid <a href="https://pictogrammers.com/library/mdi/">Material Design Icon</a> string. | string |


## Code
Please refer to the <nuxt-link to="/docs/plugins/code">next chapter</nuxt-link> to read how to access and manipulate the data provided by the node. 