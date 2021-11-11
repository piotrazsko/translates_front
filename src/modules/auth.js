import get from 'lodash/get';
import { createAction } from 'redux-actions';
import * as api_helpers from 'api';
import { all, put, call, select, takeLatest } from 'redux-saga/effects';
import history from 'store/history';
import { getCookiesSelector } from 'modules/cookies';
import { sha256 } from 'js-sha256';
import moment from 'moment';

const modules = 'auth';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

export const SET_USER_LOGOUT = `${modules}/SET_USER_LOGOUT`;
export const GET_TOKEN_FROM_REFRESH_REQUEST = `${modules}/GET_TOKEN_FROM_REFRESH_REQUEST`;
export const GET_CODE_REQUEST = `${modules}/GET_CODE_REQUEST`;
export const GET_CODE_SUCCESS = `${modules}/GET_CODE_SUCCESS`;
export const GET_TOKEN_REQUEST = `${modules}/GET_TOKEN_REQUEST`;
export const GET_TOKEN_SUCCESS = `${modules}/GET_TOKEN_SUCCESS`;
export const SAVE_CREDENTIALS = `${modules}/SAVE_CREDENTIALS`;
export const SAVE_CURRENT_USER_DATA = `${modules}/SAVE_CURRENT_USER_DATA`;
export const GET_TOKEN_FROM_REFRESH_FAILED = `${modules}/GET_TOKEN_FROM_REFRESH_FAILED`;
export const GET_TOKEN_FROM_REFRESH_SUCCESS = `${modules}/GET_TOKEN_FROM_REFRESH_SUCCESS`;
export const getTokenRequest = actionCreator(GET_TOKEN_REQUEST);
export const getCodeRequest = actionCreator(GET_CODE_REQUEST);
export const saveCredentials = createAction(SAVE_CREDENTIALS);
export const saveCurrentUserData = createAction(SAVE_CURRENT_USER_DATA);
export const updateToken = actionCreator(GET_TOKEN_FROM_REFRESH_REQUEST);
export const setUserLogout = createAction(SET_USER_LOGOUT);
export const getTokenSuccess = createAction(GET_TOKEN_SUCCESS);

apiRoutes.add(GET_TOKEN_FROM_REFRESH_REQUEST, refresh_token => ({
    url: `/api/refreshToken`,
    method: 'POST',
    data: { refresh_token },
}));
const salt = 'Miprovasvseznaem4erti';
apiRoutes.add(GET_CODE_REQUEST, phone => ({
    url: `/api/getCode`,
    method: 'GET',
    params: { phone, date: moment.utc().format('YYYY-MM-DD HH:mm') },
    headers: {
        'api-key': sha256(`${phone.trim()}${moment.utc().format('YYYY-MM-DD HH:mm')}${salt}`),
    },
}));
apiRoutes.add(GET_TOKEN_REQUEST, ({ phone, code }) => ({
    url: `/api/getToken`,
    method: 'GET',
    params: { phone, code },
}));

const defaultState = {};
export const authReducer = (state = defaultState, action = {}) => {
    const { payload, type } = action;
    switch (type) {
        case SAVE_CREDENTIALS: {
            return {
                ...state,
                ...get(payload, 'response.data'),
            };
        }
        case SET_USER_LOGOUT: {
            return defaultState;
        }

        default:
            return state;
    }
};

let stopRequest = false;
export const needStopRequests = () => {
    return stopRequest;
};

export const authErrorSaga = function*(data) {
    if (data.status == 401 && data.type != GET_TOKEN_FROM_REFRESH_FAILED) {
        const refreshToken = yield select(refreshTokenSelector);
        yield put(
            updateToken(refreshToken, {
                beforeRequestCallback: () => {
                    stopRequest = true;
                },
                onSuccess: () => {
                    setTimeout(() => {
                        stopRequest = false;
                    }, 100);
                },
                onFailure: () => {
                    setTimeout(() => {
                        stopRequest = false;
                    }, 100);
                },
            })
        );
        // getUserSuccess;
    } else if (data.status == 401) {
        yield put(setUserLogout());
        history.push('/auth');
    }
};

const saveToken = function*(action) {
    const {
        response: { data },
    } = action;
    const { save } = yield select(getCookiesSelector);
    yield put(
        saveCredentials({
            response: { data: { ...data, saveToPersist: save } },
        })
    );
};

export const authSaga = function*(dispatch) {
    yield all([
        takeLatest(GET_TOKEN_FROM_REFRESH_SUCCESS, saveToken),
        takeLatest(GET_TOKEN_SUCCESS, saveToken),
        // takeLatest(GET_TOKEN_FROM_REFRESH_FAILED, error),
    ]);
};

export const refreshTokenSelector = state =>
    get(state, 'auth.refreshToken') || get(state, 'auth.refresh_token');

export const getAccessTocken = state => {
    return get(state, 'auth.access_token');
};

export const checkUserAuth = state => {
    return Boolean(get(state, 'auth.access_token', null));
};
export const currentUserDataSelector = state => {
    return get(state, 'auth.user', false);
};

export const getCodeSelector = apiSelector(GET_CODE_REQUEST, {
    initialData: {},
});

export const getUserCredentials = state => get(state, 'auth');

export const getTokenSelector = apiSelector(GET_TOKEN_REQUEST, {
    initialData: {},
});
