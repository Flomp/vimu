function rgbToHex(color: { r: number, g: number, b: number }) {
    return "#" + ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1);
}

function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function isSameColor(color1: { r: number, g: number, b: number }, color2: { r: number, g: number, b: number }) {
    return color1.r == color2.r && color1.g == color2.g && color1.b == color2.b
}

export {
    rgbToHex,
    hexToRgb,
    isSameColor
}
