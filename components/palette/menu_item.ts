interface MenuItem {

    name: string;
    icon?: string;
    key?: string;
    selected?: boolean;
    disabled?: boolean;
    divider?: boolean;
    children?: MenuItem[];
    keybinding?: string

}

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

export { MenuItem, editorMenuItems }

export default {}