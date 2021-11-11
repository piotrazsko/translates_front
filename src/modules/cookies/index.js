import { all, put, select, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { createAction } from 'redux-actions';
const modules = 'cookies';

export const SAVE_CURRENT_COOKIES = `${modules}/SAVE_CURRENT_COOKIES`;
export const saveCookiesAction = createAction(SAVE_CURRENT_COOKIES);

const defaultState = {};
export const cookiesReducer = (state = defaultState, action = {}) => {
    const { payload, type } = action;
    switch (type) {
        case SAVE_CURRENT_COOKIES: {
            return {
                ...state,
                save: payload,
            };
        }

        default:
            return state;
    }
};

export const getCookiesSelector = state => {
    return get(state, 'cookies');
};
