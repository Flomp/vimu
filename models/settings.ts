interface Settings {
    view: {
        score: boolean;
        log: boolean;
    }
}

const default_settings: Settings  = {
    view: {
        score: true,
        log: true
    }
}

export { Settings, default_settings }