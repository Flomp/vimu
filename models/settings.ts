import { User } from "./user";

interface Settings {
    view: {
        score: boolean;
        log: boolean;
        plot: boolean;
        minimap: boolean
        pixelGrid: boolean
    }
}

interface EmailSettings {
    id: string;
    share: boolean;
    team: boolean;
    changelog: boolean;
    marketing: boolean;
    user?: string;
}

const default_settings: Settings  = {
    view: {
        score: true,
        log: false,
        plot: false,
        minimap: true,
        pixelGrid: true
    }
}

const default_email_settings: EmailSettings = {
    id: "default",
    share: true,
    team: true,
    changelog: true,
    marketing: true
}

export { Settings, EmailSettings, default_settings, default_email_settings }