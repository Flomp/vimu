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
                { name: "Parts", key: "select_parts" },
                { name: "Notes", key: "select_notes" },
            ]
    },
    {
        name: "Detect",
        children:
            [
                { name: "Modulation", key: "detect_modulation" },
                { name: "Parallels", key: "detect_parallels" },
                { name: "Voice crossings", key: "detect_voice_crossings" },
            ]
    },
    {
        name: "Source", children:
            [
                { name: "Score", key: "source_score" },
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
    {
        name: "Plot",
        children:
            [
                { name: "Bar Plot", key: "plot_bar" },
                { name: "Weighted Bar Plot", key: "plot_bar_weighted" },
                { name: "Histogram", key: "plot_histogram" },
                { name: "Scatter Plot", key: "plot_scatter" },
                { name: "Weighted Scatter Plot", key: "plot_scatter_weighted" },

            ],
    },

];

export { MenuItem, editorMenuItems }

export default {}