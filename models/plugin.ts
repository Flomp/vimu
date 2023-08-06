import { sockets } from "~/components/editor/rete/sockets/sockets";
import { User } from "./user";

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
    type: "text" | "bool";
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
    type: "text" | "bool" = "text";
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

class PluginCheckbox implements PluginControl {
    constructor(key: string, name: string, label: string) {
        this.key = key;
        this.name = name;
        this.attributes["label"].value = label;
    }
    key: string;
    name: string;
    type: "text" | "bool" = "bool";
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

interface PluginConfig {
    inputs: PluginInput[]
    outputs: PluginOutput[]
    controls: PluginControlType<PluginControl>[]
}

interface Plugin {
    id: string;
    name: string
    description: string
    config: PluginConfig;
    code: string;
    public: boolean;
    owner: string;
    expand: {
        owner: User
    };
    updated: string;
    created: string;
}

const empty_plugin_config: PluginConfig = (() => <PluginConfig>{
    inputs: [
        {
            key: "in_0",
            name: "Stream",
            type: "stream"
        }
    ],
    outputs: [
        {
            key: "out_0",
            name: "Stream",
            type: "stream"
        }
    ],
    controls: []
})()


export { Plugin, PluginConfig, PluginControl, PluginControlAttribute, PluginInput, PluginOutput, PluginSocket, PluginTextField, PluginCheckbox, empty_plugin_config };
