function rgbToHex(color: { r: number, g: number, b: number }) {
    return "#" + ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1);
}

function isSameColor(color1: { r: number, g: number, b: number }, color2: { r: number, g: number, b: number }) {
    return color1.r == color2.r && color1.g == color2.g && color1.b == color2.b
}

export {
    rgbToHex,
    isSameColor
}
