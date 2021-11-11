/* global global, URL, process */
import qs from 'query-string';

export const getFitersDataFromUrl = url => {
    const search = qs.parse(url);
    return typeof search.filter !== 'undefined' ? JSON.parse(search.filter) : {};
};

export const addFiltersToUrl = (url, filter) => {
    return Object.keys(filter).length > 0 ? `${url}?filter=${JSON.stringify(filter)}` : url;
};

export function prepareSearchString(obj) {
    const res = { ...obj };
    const filter = new URLSearchParams();
    Object.keys(res).forEach(item => {
        if (res[item]) {
            filter.append(item, JSON.stringify(res[item]));
        }
    });
    return filter.toString();
}

export function getDataFromCurrentLocarion(str) {
    const res = {};
    if (process.browser) {
        const url = new URL(global.location);
        const filter = new URLSearchParams(url.search);
        filter.forEach((item, value) => {
            res[value] = JSON.parse(item);
        });
    }
    return res;
}
export function getDataFromUrl(str) {
    const res = {};
    const url = new URL('https://example.com' + str);
    const filter = new URLSearchParams(url.search);
    filter.forEach((item, value) => {
        // console.log(item);
        try {
            res[value] = item;
        } catch (e) {
            console.log(e);
        }
    });
    return res;
}
