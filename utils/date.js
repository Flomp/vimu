const units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: 24 * 60 * 60 * 1000 * 365 / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
}

var rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

var getRelativeTime = (d1, d2 = new Date()) => {
    d1 = new Date(d1)
    var elapsed = d1 - d2

    for (const u in units)
        if (Math.abs(elapsed) > units[u] || u == 'second')
            return rtf.format(Math.round(elapsed / units[u]), u)
}


export default getRelativeTime;