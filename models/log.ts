interface Log {
    date: Date;
    level: LogLevel
    text: string
}

enum LogLevel {
    info,
    success,
    warning,
    error
}

const strToLevel = (input: string): LogLevel => {
    switch (input) {
        case "info":
            return LogLevel.info
        case "success":
            return LogLevel.success
        case "warning":
            return LogLevel.warning
        case "error":
            return LogLevel.error

        default:
            return LogLevel.info

    }
}

export { Log, LogLevel, strToLevel }