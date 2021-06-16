export function sortAscending<T>(data: T[], key: keyof T): T[] {
    return data.sort((a, b) => {
        if (a[key] > b[key]) return 1;
        if (a[key] === b[key]) return 0;
        return -1;
    })
}

export function sortDescending<T>(data: T[], key: keyof T): T[] {
    return data.sort((a, b) => {
        if (a[key] > b[key]) return -1;
        if (a[key] === b[key]) return 0;
        return 1;
    })
}
