import { sockets } from "~/components/editor/rete/sockets/sockets";

interface PluginSocket {
    key: string;
    name: string;
    type: keyof typeof sockets;
}

interface PluginInput extends PluginSocket {

}

interface PluginOutput extends PluginSocket {

}

interface PluginControlAttribute {
    name: string,
    value: any,
    type: "string" | "bool"
}

interface PluginControl {
    key: string;
    name: string;
    type: string;
    attributes: Record<string, PluginControlAttribute>;
}

class PluginTextField implements PluginControl {
    constructor(key: string, name: string, label: string) {
        this.key = key;
        this.name = name;
        this.attributes["label"].value = label;
    }
    key: string;
    name: string;
    type: string = "text";
    attributes: Record<string, PluginControlAttribute> = {
        "label": {
            name: "Label",
            value: "",
            type: "string"
        },
        "prependIcon": {
            name: "Icon",
            value: "",
            type: "string"
        }
    }


}

type PluginControlType<T extends PluginControl> = T;

interface Plugin {
    name: string,
    description: string,
    inputs: PluginInput[]
    outputs: PluginOutput[]
    controls: PluginControlType<PluginControl>[]
}

const empty_plugin: Plugin = <Plugin>{
    name: "plugin_node",
    description: "",
    inputs: [

    ],
    outputs: [

    ],
    controls: []
}

export { Plugin, PluginSocket, PluginInput, PluginOutput, PluginControlAttribute, PluginControl, PluginTextField, empty_plugin }