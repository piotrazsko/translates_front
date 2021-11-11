// import * as api_helpers from 'api';

import { createAction } from 'redux-actions';
import { all, takeEvery, put, select, call } from 'redux-saga/effects';

const modules = 'popups';

export const SHOW_CONFIRM = `${modules}/SHOW_CONFIRM`;
export const HIDE_CONFIRM = `${modules}/HIDE_CONFIRM`;

//actions
//
export const showPopupAction = createAction(SHOW_CONFIRM);
export const hidePopupAction = createAction(HIDE_CONFIRM);

//-------------------reducer-----------------
const inititalData = { alerts: [], confirms: [] };
export const popupsReducer = function(state = inititalData, action) {
    switch (action.type) {
        case SHOW_CONFIRM: {
            const { payload } = action;
            const { confirms } = state;
            return {
                ...state,
                confirms: [...confirms, { id: confirms.length, ...payload }],
            };
        }
        case HIDE_CONFIRM: {
            const { payload } = action;
            const { confirms } = state;
            return {
                ...state,
                confirms: [
                    ...confirms
                        .filter(item => item.id != payload)
                        .map((item, index) => ({ ...item, id: index })),
                ],
            };
        }
        default:
            return state;
    }
};

//-----------------------------SAGA----------------
const showAlertSaga = function*() {};
export function* deeplinkSaga() {
    yield all([takeEvery(SHOW_CONFIRM, showAlertSaga), takeEvery(HIDE_CONFIRM, showAlertSaga)]);
}
//----------selectors------------
export const popupSelector = state => state.popups.confirms;
