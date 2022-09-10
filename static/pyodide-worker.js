
importScripts("https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.js");


async function loadPyodideAndPackages() {
    self.postMessage({ id: -1, result: 0.1 });
    self.pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.21.2/full/" });
    self.postMessage({ id: -1, result: 0.4 });
    await self.pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");
    self.postMessage({ id: -1, result: 0.6 });
    await micropip.install("/music21-8.0.0a12-py3-none-any.whl");
    self.postMessage({ id: -1, result: 1.0 });

}

let pyodideReadyPromise = loadPyodideAndPackages();

let nodeData = {

}

self.onmessage = async (event) => {

    await pyodideReadyPromise;

    const { id, python, writeNodeData } = event.data

    try {
        await self.pyodide.loadPackagesFromImports(python);
        const namespace = self.pyodide.toPy(nodeData)
        let result = await self.pyodide.runPythonAsync(python, { globals: namespace });

        if (writeNodeData) {
            nodeData[`n${id}`] = result;
            console.log(nodeData);
        }
        self.postMessage({ id: id, result: result.toString() });

    } catch (error) {
        console.log(error);

        self.postMessage({ id: id, error: error.message });
    }

};
