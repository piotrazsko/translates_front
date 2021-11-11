export const ACTIVE_COUNTRIES_CODES = ['RU', 'BY'];
// export const COUNTRY_DATA = { Россия: 'RU', Беларусь: 'BY' };

export const getCodesByCountryName = (country) => {
    switch (country) {
        case 'Россия':
            return ['RU'];
        case 'Беларусь':
            return ['BY'];
        default:
            return ACTIVE_COUNTRIES_CODES;
    }
};
export const PRICE_RANGES = Object.freeze({
    BYN: [0, 500],
    RUB: [0, 20000],
    EUR: [0, 200],
});
export const DEFAULT_CITIES_BELARUS = [
    {
        value: 'Минск',
        label: 'Минск',
    },
    {
        value: 'Брест',
        label: 'Брест',
    },
    {
        value: 'Гомель',
        label: 'Гомель',
    },
    {
        value: 'Гродно',
        label: 'Гродно',
    },
    {
        value: 'Витебск',
        label: 'Витебск',
    },
    {
        value: 'Могилев',
        label: 'Могилев',
    },
];
export const DEFAULT_CITIES_RUSSIA = [
    {
        value: 'Москва',
        label: 'Москва',
    },
    {
        value: 'Санкт-Петербург',
        label: 'Санкт-Петербург',
    },
    {
        value: 'Новосибирск',
        label: 'Новосибирск',
    },
    {
        value: 'Екатеринбург',
        label: 'Екатеринбург',
    },
    {
        value: 'Нижний Новгород',
        label: 'Нижний Новгород',
    },
    {
        value: 'Казань',
        label: 'Казань',
    },
];
export const getCitiesByCountry = (country) => {
    switch (country) {
        case 'Беларусь':
            return DEFAULT_CITIES_BELARUS;
        case 'Россия':
            return DEFAULT_CITIES_RUSSIA;
        default:
            return DEFAULT_CITIES_BELARUS;
    }
};
