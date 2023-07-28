import { sockets } from "~/components/editor/rete/sockets/sockets";

type SocketKeys = keyof typeof sockets;
type SocketValues = typeof sockets[SocketKeys];

interface PluginSocket {
    key: string;
    name: string;
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
    atrributes: Record<string, PluginControlAttribute>;
}

class PluginTextField implements PluginControl {
    constructor(key: string, name: string, label: string) {
        this.key = key;
        this.name = name;
        this.atrributes["label"].value = label;
    }
    key: string;
    name: string;
    type: string = "text";
    atrributes: Record<string, PluginControlAttribute> = {
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
        {
            key: "in_0",
            name: "Stream",
        }
    ],
    outputs: [
        {
            key: "out_0",
            name: "Stream",
        }
    ],
    controls: []
}

export { Plugin, PluginSocket, PluginInput, PluginOutput, PluginControlAttribute, PluginControl, PluginTextField, empty_plugin }