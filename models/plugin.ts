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
    type: "string" | "bool" | "number"
}

type PluginControlType = "text" | "number" | "bool" | "select"

abstract class PluginControl {
    constructor(key: string, name: string, type: PluginControlType) {
        this.key = key;
        this.name = name;
        this.type = type;
    }
    key: string;
    name: string;
    type: PluginControlType;
    abstract attributes: Record<string, PluginControlAttribute>;
    static create: Function

    private static pluginMap: Map<PluginControlType, typeof PluginControl> = new Map();

    static registerControl(key: PluginControlType, constructor: typeof PluginControl) {
        this.pluginMap.set(key, constructor);
    }

    static createControlInstance(map_key: PluginControlType, control_key: string): PluginControl | null {
        const PluginConstructor = this.pluginMap.get(map_key);
        if (PluginConstructor) {
            return PluginConstructor.create(control_key);
        }
        return null;
    }

}


class PluginTextField extends PluginControl {
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

    static create: Function = (key: string) => {
        return new PluginTextField(key, "TextField", "text");
    }
}

class PluginNumberInput extends PluginControl {
    attributes: Record<string, PluginControlAttribute> = {
        "min": {
            name: "Min",
            value: "",
            type: "number"
        },
        "max": {
            name: "Max",
            value: "",
            type: "number"
        },
        "label": {
            name: "Label",
            value: "",
            type: "string"
        },
        "prependIcon": {
            name: "Icon",
            value: "",
            type: "string"
        },
    }

    static create: Function = (key: string) => {
        return new PluginNumberInput(key, "NumberInput", "number");
    }
}

class PluginCheckbox extends PluginControl {
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

    static create: Function = (key: string) => {
        return new PluginCheckbox(key, "Checkbox", "bool");
    }
}

class PluginSelect extends PluginControl {
    attributes: Record<string, PluginControlAttribute> = {
        "label": {
            name: "Label",
            value: "",
            type: "string"
        },
        "items": {
            name: "Items",
            value: "Option1,Option2",
            type: "string"
        },
        "prependIcon": {
            name: "Icon",
            value: "",
            type: "string"
        }
    }

    static create: Function = (key: string) => {
        return new PluginSelect(key, "Select", "select");
    }
}

PluginControl.registerControl("number", PluginNumberInput);
PluginControl.registerControl("text", PluginTextField);
PluginControl.registerControl("bool", PluginCheckbox);
PluginControl.registerControl("select", PluginSelect);


interface PluginConfig {
    inputs: PluginInput[]
    outputs: PluginOutput[]
    controls: PluginControl[]
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


export { Plugin, PluginCheckbox, PluginConfig, PluginControl, PluginControlAttribute, PluginInput, PluginOutput, PluginSocket, PluginTextField, empty_plugin_config };

