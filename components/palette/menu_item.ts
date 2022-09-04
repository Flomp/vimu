interface MenuItem {

    name: string;
    icon?: string;
    key?: string;
    children?: MenuItem[];

}

const menuItems: MenuItem[] = [
    { name: "Source", children: [{ name: "Choral", key: "source_corpus" }] },
    {
        name: "Transform",
        children: [{ name: "Transpose", key: "transform_transpose" }, { name: "Select Measures", key: "transform_measures" }],
    },
    { name: "Analysis", children: [{ name: "Key", key: "analysis_key" }] },
];

export {MenuItem, menuItems}