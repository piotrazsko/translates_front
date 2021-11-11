export const createLikeString = str => `%${str}%`;

export function getFirstPartBeforePointFromString(str) {
    let lastIndex = str.lastIndexOf('.');
    return lastIndex >= 0 ? str.slice(0, lastIndex) : str;
}
export function checkIsLikeFilter(str) {
    return typeof str === 'string' && str[0] === '%' && str[str.length - 1] === '%';
}
