interface MenuItem {

    name: string;
    icon?: string;
    key?: string;
    active?: boolean;
    divider?: boolean;
    children?: MenuItem[];

}

const fileMainMenuItems: MenuItem[] = [
    { name: "New File", divider: true },
    { name: "Open..." },
    { name: "Open Recent" },
    { name: "Open from URL", divider: true },
    {
        name: "Export",
        divider: true,
        children: [
            {
                name: "PNG",
                key: "file_export_png"
            },
            {
                name: "JSON",
                key: "file_export_json"
            },
        ]
    },
    { name: "Close" },
]


const editorMainMenuItems: MenuItem[] = [
    {
        name: "Center Layout",
        key: "editor_center_layout",
    },
    {
        name: "Zoom in",
        key: "editor_zoom_in",
    },
    {
        name: "Zoom out",
        key: "editor_zoom_out",
        divider: true
    },
    {
        name: "Pixel Grid",
        key: "editor_pixel_grid",
        active: true
    },
    {
        name: "Minimap",
        key: "editor_minimap",
        active: true
    },

]

const viewMainMenuItems: MenuItem[] = [

    {
        name: "Score",
        key: "view_score",
        active: true
    },
    {
        name: "Log",
        key: "view_log",
        active: true
    },

]

const editorMenuItems: MenuItem[] = [
    {
        name: "Analysis", children:
            [
                { name: "Key", key: "analysis_key" },
                { name: "Ambitus", key: "analysis_ambitus" },
                { name: "Roman numeral", key: "analysis_roman_numeral" }
            ]
    },
    {
        name: "Search", children:
            [
                { name: "Part", key: "search_part" },
                { name: "Lyrics", key: "search_lyrics" }
            ]
    },
    {
        name: "Select",
        children:
            [
                { name: "Measures", key: "select_measures" },
                { name: "Part", key: "select_part" },
                { name: "Notes", key: "select_notes" },
            ]
    },
    {
        name: "Source", children:
            [
                { name: "Corpus", key: "source_corpus" },
                { name: "Tinynotation", key: "source_tinynotation" }
            ]
    },
    {
        name: "Transform",
        children:
            [
                { name: "Chordify", key: "transform_chordify" },
                { name: "Flatten", key: "transform_flatten" },
                { name: "Transpose", key: "transform_transpose" },
            ],
    },

];

export { MenuItem, editorMenuItems, viewMainMenuItems, fileMainMenuItems, editorMainMenuItems }

export default {}