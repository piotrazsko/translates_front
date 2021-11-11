import { all, put, select, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { INIT_DATA } from '../init';
import { getCurrentUserCurrency, SAVE_CURRENT_USER } from '../currentUser';
import { createAction } from 'redux-actions';
import { PRICE_RANGES } from '../../config/countries';
import * as api_helpers from 'api';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;
const apiRoutes = new ApiRoutes();
const modules = 'localization';

export const SAVE_CURRENT_LOCALIZATION = `${modules}/SAVE_CURRENT_LOCALIZATION`;
export const GET_CURRENCY_REQUEST = `${modules}/GET_CURRENCY_REQUEST`;
const saveLocalization = createAction(SAVE_CURRENT_LOCALIZATION);
const getCurrencyRequest = actionCreator(GET_CURRENCY_REQUEST);

apiRoutes.add(GET_CURRENCY_REQUEST, () => ({
    url: `api/v2/currency`,
    method: 'get',
}));

const getExt = window => {
    return window.location.host
        .split('.')
        .pop()
        .trim();
};
export const getLocalizationByPhone = phone => {
    const phoneString = phone && phone.toString();
    return phoneString ? (phoneString.slice(0, 1) === '7' ? 'ru' : 'by') : undefined;
};
const getCurrentCurrency = (ext, currency) => {
    switch (true) {
        case currency && currency.char_code == 'BYN':
            return {
                range: PRICE_RANGES['BYN'],
                currency: 'BYN',
                country: 'Беларусь',
                countryCode: 'by',
            };
        case currency && currency.char_code == 'RUB':
            return {
                range: PRICE_RANGES['RUB'],
                currency: 'RUB',
                country: 'Россия',
                countryCode: 'ru',
                scaleSlider: x => {
                    let res = x;
                    switch (true) {
                        case x <= 2000:
                            res = 50 * x;
                            break;
                        case x <= 5000:
                            res = 200 * x;
                            break;
                        case x <= 20000:
                            res = 500 * x;
                            break;
                        default:
                            break;
                    }
                    return res;
                },
                stepSlider: 50,
            };
        case ext === 'by':
            return {
                range: PRICE_RANGES['BYN'],
                currency: 'BYN',
                country: 'Беларусь',
                countryCode: 'by',
            };
        case ext === 'ru':
            return {
                range: PRICE_RANGES['RUB'],
                currency: 'RUB',
                country: 'Россия',
                countryCode: 'ru',
                scaleSlider: x => {
                    switch (true) {
                        case x <= 2000:
                            return x;
                        case x <= 5000:
                            return x * 4;
                        case x <= 20000:
                            return x * 10;
                        default:
                            return x;
                    }
                },
                stepSlider: 50,
            };
        default:
            return {
                range: PRICE_RANGES['RUB'],
                currency: 'RUB',
                country: 'Россия',
                countryCode: 'ru',
            };
    }
};

const defaultState = { ...getCurrentCurrency(getExt(window)) };
export const localizationReducer = (state = defaultState, action = {}) => {
    const { payload, type } = action;
    switch (type) {
        case SAVE_CURRENT_LOCALIZATION: {
            return {
                ...state,
                ...getCurrentCurrency(getExt(window), payload),
            };
        }

        default:
            return state;
    }
};
const saveLocalizationSaga = function*() {
    const country = yield select(getCurrentUserCurrency);
    yield put(saveLocalization(country));
};
const getCurrencySaga = function*() {
    yield put(getCurrencyRequest());
};

export const localizationModuleSaga = function*(dispatch) {
    yield all([
        takeLatest([INIT_DATA, SAVE_CURRENT_USER], saveLocalizationSaga, dispatch),
        takeLatest([INIT_DATA], getCurrencySaga, dispatch),
    ]);
};
export const getLocalizationSelector = state => {
    return get(state, 'localization');
};
export const getLocalizationCountryCodeSelector = state => {
    return get(state, 'localization.countryCode', 'ru');
};

export const getCurrencySelector = apiSelector(GET_CURRENCY_REQUEST);
