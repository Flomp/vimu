interface EditorSettings {
    id: string;
    score: boolean;
    plot: boolean;
    minimap: boolean
    pixel_grid: boolean
    grid_columns: string;
    grid_rows: string;
    tutorial_completed: boolean
    user?: string;
}

interface EmailSettings {
    id: string;
    share: boolean;
    team: boolean;
    changelog: boolean;
    marketing: boolean;
    user?: string;
}

const default_settings: EditorSettings = {
    id: "default",
    score: true,
    plot: false,
    minimap: true,
    pixel_grid: true,
    grid_columns: "50% 2px calc(50% - 304px) 2px 300px",
    grid_rows: "80% 2px 20%",
    tutorial_completed: false
}

const default_email_settings: EmailSettings = {
    id: "default",
    share: true,
    team: true,
    changelog: true,
    marketing: true
}

export { EditorSettings, EmailSettings, default_settings, default_email_settings }