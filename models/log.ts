interface Log {
    date: Date;
    level: LogLevel
    text: string
}

enum LogLevel {
    info,
    warning,
    error
}

export {Log, LogLevel}