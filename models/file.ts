import { Data } from "rete/types/core/data";
import { User } from "./user";

interface File {
    id: string;
    name: string;
    favorite: boolean;
    public: boolean;
    owner: string,
    collaborators: string[]
    updated: string;
    created: string;
    expand: {
        collaborators?: FileShare[]
        data: FileData,
        owner: User
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
    file: string
}

const example_files: Record<string, File> = {
    "example-modulation": {
        id: "example-modulation",
        name: "Example Modulation",
        favorite: false,
        public: true,
        expand: {
            data: {
                id: "0",
                file: "example-modulation",
                json: { "id": "vimu@0.1.0", "nodes": { "1": { "id": 1, "data": {}, "inputs": { "in_0": { "connections": [{ "node": 29, "output": "out_0", "data": {} }] } }, "outputs": {}, "position": [370.2233009708738, -27.618585298196958], "name": "output" }, "24": { "id": 24, "data": { "data": { "id": "nqqhqfvpgwm5kvh", "name": "O Haupt voll Blut und Wunden", "data": "data_K157MdfuSm.xml" } }, "inputs": {}, "outputs": { "out_0": { "connections": [{ "node": 29, "input": "in_0", "data": {} }] } }, "position": [-189.129674875744, -80.22195074553605], "name": "source_score" }, "29": { "id": 29, "data": {}, "inputs": { "in_0": { "connections": [{ "node": 24, "output": "out_0", "data": {} }] } }, "outputs": { "out_0": { "connections": [{ "node": 1, "input": "in_0", "data": {} }] } }, "position": [109.88575117030376, -62.707264230054044], "name": "detect_modulation" } } },
            },
            owner: <User>{},
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
        expand: {
            data: {
                id: "0",
                file: "example-search",
                json: { "id": "vimu@0.1.0", "nodes": { "1": { "id": 1, "data": {}, "inputs": { "in_0": { "connections": [{ "node": 48, "output": "out_0", "data": {} }] } }, "outputs": {}, "position": [376.38054235018416, -60.457205987852134], "name": "output" }, "24": { "id": 24, "data": { "data": { "id": "9ksglexqzn5vub1", "name": "Ach Gott, erhör’ mein Seufzen", "data": "data_8VoA5byYrB.xml" } }, "inputs": {}, "outputs": { "out_0": { "connections": [{ "node": 48, "input": "in_1", "data": {} }] } }, "position": [-180.91990736559598, 18.29525937624028], "name": "source_score" }, "48": { "id": 48, "data": { "color": "#ff0000" }, "inputs": { "in_0": { "connections": [{ "node": 49, "output": "out_0", "data": {} }] }, "in_1": { "connections": [{ "node": 24, "output": "out_0", "data": {} }] } }, "outputs": { "out_0": { "connections": [{ "node": 1, "input": "in_0", "data": {} }] } }, "position": [146.0842115479518, -142.19874384010322], "name": "search_part" }, "49": { "id": 49, "data": { "data": "d8 c b- a g f e4" }, "inputs": {}, "outputs": { "out_0": { "connections": [{ "node": 48, "input": "in_0", "data": {} }] } }, "position": [-183.3377148432167, -178.1197156418582], "name": "source_tinynotation" } } },
            },
            owner: <User>{},
        },
        owner: "",
        collaborators: [],
        updated: "",
        created: ""
    },
    "example-plots": {
        id: "example-plots",
        name: "Example Plots",
        favorite: false,
        public: true,
        expand: {
            data: {
                id: "0",
                file: "example-plots",
                json: { "id": "vimu@0.1.0", "nodes": { "1": { "id": 1, "data": {}, "inputs": { "in_0": { "connections": [{ "node": 24, "output": "out_0", "data": {} }] } }, "outputs": {}, "position": [287.5040036216246, -73.64425032619941], "name": "output" }, "24": { "id": 24, "data": { "data": { "id": "uec73y8ndj50nvj", "name": "Den Vater dort oben", "data": "data_N6uuvr78dx.xml" } }, "inputs": {}, "outputs": { "out_0": { "connections": [{ "node": 49, "input": "in_0", "data": {} }, { "node": 126, "input": "in_0", "data": {} }, { "node": 1, "input": "in_0", "data": {} }] } }, "position": [-249.11169575631004, -138.61175410781897], "name": "source_score" }, "49": { "id": 49, "data": { "xAxis": "pitchSpace" }, "inputs": { "in_0": { "connections": [{ "node": 24, "output": "out_0", "data": {} }] } }, "outputs": {}, "position": [113.33357216318934, -386.0244741165651], "name": "plot_histogram" }, "126": { "id": 126, "data": { "xAxis": "quarterLength", "yAxis": "pitchClass" }, "inputs": { "in_0": { "connections": [{ "node": 24, "output": "out_0", "data": {} }] } }, "outputs": {}, "position": [106.74352060511704, 121.26784149770914], "name": "plot_scatter_weighted" } } },
            },
            owner: <User>{},
        },
        owner: "",
        collaborators: [],
        updated: "",
        created: ""
    }
}

export { File, FileShare, FilePermission, FileData, example_files }