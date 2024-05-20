export function cacheToLocalStorage({ label, value }: { label: string; value: any }) {
    localStorage.setItem(label, JSON.stringify(value));
}

export function getCachedData({ label }: { label: string }) {
    if (localStorage.getItem(label)) {
        return JSON.parse(localStorage.getItem(label) || '');
    }

    return null;
}
