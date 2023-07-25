import { Data } from "rete/types/core/data";
import { User } from "./user";

interface File {
    id: string;
    name: string;
    favorite: boolean;
    public: boolean;
    owner: string,
    collaborators: string[]
    team?: string,
    updated: string;
    created: string;
    expand: {
        collaborators?: FileShare[]
        permission?: { value: FilePermission }
        data: FileData,
        owner: User
        "file_favorites(file)"?: {id: string, file: string, user: string }[]
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
    editors: string[]
}

const example_files: Record<string, File> = {
    "example-roman-numeral-analysis": {
        id: "example-roman-numeral-analysis",
        name: "Example Roman Numeral Analysis",
        favorite: false,
        public: true,
        expand: {
            data: {
                id: "0",
                file: "example-roman-numeral-analysis",
                json: { "id": "vimu@0.1.0", "nodes": { "1": { "id": 1, "data": {}, "inputs": { "in_0": { "connections": [{ "node": 25, "output": "out_0", "data": {} }] } }, "outputs": {}, "position": [977.5, 377], "name": "output" }, "24": { "id": 24, "data": { "data": { "id": "4rucputkejy2wpp", "name": "Als Jesus Christus in der Nacht", "data": "data_1x6GWg0dBp.xml" } }, "inputs": {}, "outputs": { "out_0": { "connections": [{ "node": 25, "input": "in_1", "data": {} }] } }, "position": [372.5, 300.5], "name": "source_score" }, "25": { "id": 25, "data": {}, "inputs": { "in_1": { "connections": [{ "node": 24, "output": "out_0", "data": {} }] } }, "outputs": { "out_0": { "connections": [{ "node": 1, "input": "in_0", "data": {} }] } }, "position": [664.5, 283], "name": "analysis_roman_numeral" } } },
                editors: []
            },
            permission: { value: FilePermission.view },
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
                json: { "id": "vimu@0.1.0", "nodes": { "1": { "id": 1, "data": {}, "inputs": { "in_0": { "connections": [{ "node": 48, "output": "out_0", "data": {} }] } }, "outputs": {}, "position": [376.38054235018416, -60.457205987852134], "name": "output" }, "24": { "id": 24, "data": { "data": { "id": "u24zkzn1thyjgyj", "name": "Ach Gott, erhör’ mein Seufzen", "data": "data_eixrr9NX5N.xml" } }, "inputs": {}, "outputs": { "out_0": { "connections": [{ "node": 48, "input": "in_1", "data": {} }] } }, "position": [-180.91990736559598, 18.29525937624028], "name": "source_score" }, "48": { "id": 48, "data": { "color": "#ff0000" }, "inputs": { "in_0": { "connections": [{ "node": 49, "output": "out_0", "data": {} }] }, "in_1": { "connections": [{ "node": 24, "output": "out_0", "data": {} }] } }, "outputs": { "out_0": { "connections": [{ "node": 1, "input": "in_0", "data": {} }] } }, "position": [146.0842115479518, -142.19874384010322], "name": "search_part" }, "49": { "id": 49, "data": { "data": "d8 c b- a g f e4" }, "inputs": {}, "outputs": { "out_0": { "connections": [{ "node": 48, "input": "in_0", "data": {} }] } }, "position": [-183.3377148432167, -178.1197156418582], "name": "source_tinynotation" } } },
                editors: []
            },
            permission: { value: FilePermission.view },
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
                json: { "id": "vimu@0.1.0", "nodes": { "1": { "id": 1, "data": {}, "inputs": { "in_0": { "connections": [{ "node": 24, "output": "out_0", "data": {} }] } }, "outputs": {}, "position": [287.5040036216246, -73.64425032619941], "name": "output" }, "24": { "id": 24, "data": { "data": { "id": "9uqnkd2fbggcb3z", "name": "Den Vater dort oben", "data": "data_Z5I87fLtX9.xml" } }, "inputs": {}, "outputs": { "out_0": { "connections": [{ "node": 49, "input": "in_0", "data": {} }, { "node": 126, "input": "in_0", "data": {} }, { "node": 1, "input": "in_0", "data": {} }] } }, "position": [-249.11169575631004, -138.61175410781897], "name": "source_score" }, "49": { "id": 49, "data": { "xAxis": "pitchSpace" }, "inputs": { "in_0": { "connections": [{ "node": 24, "output": "out_0", "data": {} }] } }, "outputs": {}, "position": [113.33357216318934, -386.0244741165651], "name": "plot_histogram" }, "126": { "id": 126, "data": { "xAxis": "quarterLength", "yAxis": "pitchClass" }, "inputs": { "in_0": { "connections": [{ "node": 24, "output": "out_0", "data": {} }] } }, "outputs": {}, "position": [106.74352060511704, 121.26784149770914], "name": "plot_scatter_weighted" } } },
                editors: []
            },
            permission: { value: FilePermission.view },
            owner: <User>{},
        },
        owner: "",
        collaborators: [],
        updated: "",
        created: ""
    }
}

export { File, FileShare, FilePermission, FileData, example_files }