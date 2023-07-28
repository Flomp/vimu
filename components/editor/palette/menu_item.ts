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
        name: "Source",
        icon: "mdi-music-note",
        children:
            [
                { name: "Score", key: "source_score" },
                { name: "Tinynotation", key: "source_tinynotation" }
            ]
    },
    {
        name: "Analysis",
        icon: "mdi-google-analytics",
        children:
            [
                { name: "Ambitus", key: "analysis_ambitus" },
                { name: "Key", key: "analysis_key" },
                { name: "Roman numeral", key: "analysis_roman_numeral" }
            ]
    },
    {
        name: "Figured bass",
        icon: "mdi-music-clef-bass",
        children:
            [
                { name: "Realize", key: "figured_bass_realize" },
            ]
    },
    {
        name: "Detect",
        icon: "mdi-leak",
        children:
            [
                { name: "Modulation", key: "detect_modulation" },
                { name: "Parallels", key: "detect_parallels" },
                { name: "Voice crossings", key: "detect_voice_crossings" },
            ]
    },
    {
        name: "Plot",
        icon: "mdi-chart-line",
        children:
            [
                { name: "Dynamics Plot", key: "plot_dynamics" },
                { name: "Histogram", key: "plot_histogram" },
                { name: "Piano roll", key: "plot_piano_roll" },
                { name: "Scatter Plot", key: "plot_scatter" },
                { name: "Weighted Scatter Plot", key: "plot_scatter_weighted" },

            ],
    },
    {
        name: "Search",
        icon: "mdi-magnify",
        children:
            [
                { name: "Lyrics", key: "search_lyrics" },
                { name: "Part", key: "search_part" },
            ]
    },
    {
        name: "Select",
        icon: "mdi-arrow-expand-horizontal",
        children:
            [
                { name: "Measures", key: "select_measures" },
                { name: "Notes", key: "select_notes" },
                { name: "Parts", key: "select_parts" },
            ]
    },
    {
        name: "Transform",
        icon: "mdi-move-resize-variant",
        children:
            [
                { name: "Append", key: "transform_append" },
                { name: "Chordify", key: "transform_chordify" },
                { name: "Stack", key: "transform_stack" },
                { name: "Transpose", key: "transform_transpose" },
            ],
    },

];

export { MenuItem, editorMenuItems }

export default {}