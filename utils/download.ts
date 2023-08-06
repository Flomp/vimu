export const download = (blob: Blob, extension: string, filename?: string) => {
    var url = URL.createObjectURL(blob);
    var downloadLink = document.createElement("a");
    downloadLink.href = url;
    if (filename) {
        downloadLink.download = `${filename}.${extension}`
    } else {
        const timestamp = new Date().getTime();
        downloadLink.download = `vimu_export_${timestamp}.${extension}`;
    }
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
