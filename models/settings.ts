interface Settings {
    view: {
        score: boolean;
        log: boolean;
        plot: boolean;
        minimap: boolean
        pixelGrid: boolean
    }
}

const default_settings: Settings  = {
    view: {
        score: true,
        log: false,
        plot: true,
        minimap: true,
        pixelGrid: true
    }
}

export { Settings, default_settings }