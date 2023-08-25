---
title: Plugins - Writing code
description: Writing code for a plugin node is quite straightforward. The code is written in python.
---

# Writing code

Writing code for a plugin node is quite straightforward. The code is written in python. In it, you have access to the `input_data`, `output_data`, and the `node` object which provide all data associated with your node. For a detailed look into all object properties please check the <nuxt-link to="/docs/plugins/api">API Reference</nuxt-link>. Below we list some typical actions you might want to perform.

## Retrieve data from an input

Input data is stored in the `input_data` dictionary. You can retrieve the data with the key associated with your input (e.g. "in_0"). Check the <nuxt-link to="/docs/plugins/editor#sidebar-panel-a">sidebar panel</nuxt-link> for the correct key.

```python
in_0_data = input_data.get('in_0')
```

## Retrieve data from a control

Control data is stored in the `node.data` dictionary. You can retrieve the data with the key associated with your control (e.g. "control_0"). Check the <nuxt-link to="/docs/plugins/editor#sidebar-panel-a">sidebar panel</nuxt-link> for the correct key. Be aware that this data is provided by the user of your node. It might not be in the format you expect. Make sure to implement proper exception handling.

```python
control_0_data = node.data.get('control_0')
```

## Set output data

Outputs must not be empty. Every output of your node must contain data that matches its <nuxt-link to="/docs/plugins/node#inputsoutputs">data type</nuxt-link>. To do so you must set the value of the `output_data` dictionary at the respective output's key (e.g. "out_0"). Make sure the data matches the data type of your output. Otherwise, the server will throw an assertion error.

```python
# assuming 'out_0' is a string output
output_data['out_0'] = "vimu"
```

## Libraries
The following core libraries are available and can be imported:
* music21
* numpy
* scipy
* pandas

## Limitations
For security reasons, there are some limitations you will need to keep in mind when working with vimu's plugin system. Your code will be executed with minimal privileges. This means that you are, for example, not allowed to read or write anything from disk. Additionally, you cannot make any requests to third-party servers. The memory is limited to 128MB and the CPU is limited to 1 core and 25% usage. A timeout error will occur if your function has not finished after 10 seconds.