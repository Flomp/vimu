
// import { initialisePyodide } from "~/utils/store-accessor";


// export default async ({ app }, inject) => {

//     const pyodide = await loadPyodide({
//         indexURL: "https://cdn.jsdelivr.net/pyodide/v0.21.2/full/",
//     });



//     await pyodide.loadPackage("micropip");
//     const micropip = pyodide.pyimport("micropip");
//     await micropip.install("/music21-8.0.0a12-py3-none-any.whl");


//     initialisePyodide(pyodide);

//     inject('pyodide', pyodide)

    
// }