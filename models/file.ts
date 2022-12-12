import { Data } from "rete/types/core/data";
import { User } from "./user";

interface File {
    id: string;
    name: string;
    favorite: boolean;
    public: boolean;
    data: string;
    owner: string,
    collaborators: string[]
    updated: string;
    created: string;
    expand: {
        collaborators?: FileShare[]
        data: FileData
    }
}

enum FilePermission {
    view = "view",
    edit = "edit"
}

interface FileShare {
    id: string;
    permission: FilePermission,
    user: string
    expand?: { user: User }

}

interface FileData {
    id: string;
    json: Data;
}

const example_files: Record<string, File> = {
    "example-modulation": {
        id: "example-modulation",
        name: "Example Modulation",
        favorite: false,
        public: true,
        data: "",
        expand: {
            data: {
                id: "0",
                json: { "id": "vimu@0.1.0", "nodes": { "1": { "id": 1, "data": {}, "inputs": { "in_0": { "connections": [{ "node": 29, "output": "out_0", "data": {} }] } }, "outputs": {}, "position": [370.2233009708738, -27.618585298196958], "name": "output" }, "24": { "id": 24, "data": { "data": { "id": "ijtdkv5r1me1cyq", "name": "Laß, o Herr, dein Ohr sich neigen", "data": "data_F4WXZO89Do.xml" } }, "inputs": {}, "outputs": { "out_0": { "connections": [{ "node": 29, "input": "in_0", "data": {} }] } }, "position": [-189.129674875744, -80.22195074553605], "name": "source_score" }, "29": { "id": 29, "data": {}, "inputs": { "in_0": { "connections": [{ "node": 24, "output": "out_0", "data": {} }] } }, "outputs": { "out_0": { "connections": [{ "node": 1, "input": "in_0", "data": {} }] } }, "position": [109.88575117030376, -62.707264230054044], "name": "detect_modulation" } } },
            }
        },
        owner: "",
        collaborators: [],
        updated: "",
        created: "",
    },
    "example-search": {
        id: "example-search",
        name: "Example Search",
        favorite: false,
        public: true,
        data: "",
        expand: {
            data: {
                id: "0",
                json: { "id": "vimu@0.1.0", "nodes": { "1": { "id": 1, "data": {}, "inputs": { "in_0": { "connections": [{ "node": 48, "output": "out_0", "data": {} }] } }, "outputs": {}, "position": [376.38054235018416, -60.457205987852134], "name": "output" }, "24": { "id": 24, "data": { "data": { "id": "6efeo9mqtqwurfz", "name": "Ach Gott, erhör’ mein Seufzen", "data": "data_yEWHgsqvK6.xml" } }, "inputs": {}, "outputs": { "out_0": { "connections": [{ "node": 48, "input": "in_1", "data": {} }] } }, "position": [-180.91990736559598, 18.29525937624028], "name": "source_score" }, "48": { "id": 48, "data": { "color": "#ff0000" }, "inputs": { "in_0": { "connections": [{ "node": 49, "output": "out_0", "data": {} }] }, "in_1": { "connections": [{ "node": 24, "output": "out_0", "data": {} }] } }, "outputs": { "out_0": { "connections": [{ "node": 1, "input": "in_0", "data": {} }] } }, "position": [146.0842115479518, -142.19874384010322], "name": "search_part" }, "49": { "id": 49, "data": { "data": "d8 c b- a g f e4" }, "inputs": {}, "outputs": { "out_0": { "connections": [{ "node": 48, "input": "in_0", "data": {} }] } }, "position": [-183.3377148432167, -178.1197156418582], "name": "source_tinynotation" } } },
            }
        },
        owner: "",
        collaborators: [],
        updated: "",
        created: ""
    }
}

export { File, FileShare, FilePermission, FileData, example_files }