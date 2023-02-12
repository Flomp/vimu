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

    player_volume: number,
    player_tempo: number,
    display_show_title: boolean,
    display_show_composer: boolean,
    display_show_lyrics: boolean,
    display_show_measure_numbers: boolean,
    display_follow_cursor: boolean,
    display_show_part_names: boolean,
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
    grid_rows: "60% 2px 40%",
    tutorial_completed: false,

    player_volume: 75,
    player_tempo: 100,
    display_show_title: true,
    display_show_composer: true,
    display_show_lyrics: true,
    display_show_measure_numbers: true,
    display_follow_cursor: true,
    display_show_part_names: true,

}

const default_email_settings: EmailSettings = {
    id: "default",
    share: true,
    team: true,
    changelog: true,
    marketing: true
}

export { EditorSettings, EmailSettings, default_settings, default_email_settings }