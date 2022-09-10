interface MenuItem {

    name: string;
    icon?: string;
    key?: string;
    children?: MenuItem[];

}

const menuItems: MenuItem[] = [
    { name: "Source", children: [{ name: "Corpus", key: "source_corpus" }] },
    {
        name: "Transform",
        children: [
            { name: "Chordify", key: "transform_chordify" },
            { name: "Flatten", key: "transform_flatten" },
            { name: "Select Measures", key: "transform_measures" },
            { name: "Transpose", key: "transform_transpose" },
        ],
    },
    {
        name: "Analysis", children: [
            { name: "Key", key: "analysis_key" },
            { name: "Roman numeral", key: "analysis_roman_numeral" }
        ]
    },
];

export { MenuItem, menuItems }

export default {}