function rename(json: Object, oldName: string, newName: string) {
    return JSON.parse(JSON.stringify(json), function (k, v) {
        if (k === oldName) {
            this[newName] = v;
            return;
        }
        return v;
    })
}

export { rename }