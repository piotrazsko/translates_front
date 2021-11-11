import get from 'lodash/get';
import { createAction } from 'redux-actions';
import { all, put, select, call, takeLatest } from 'redux-saga/effects';
import { getCookiesSelector } from 'modules/cookies';
import history from 'store/history';
import { getUserRequest, Profile } from 'modules/user';
import { CREATE_SALON_SUCCESS, DELETE_SALON_SUCCESS } from './salon';
import { SET_USER_LOGOUT, GET_CODE_SUCCESS, checkUserAuth, GET_TOKEN_SUCCESS } from './auth';
import { INIT_DATA, clearForce } from './init';

const modules = 'curentUser';
export const SAVE_CURRENT_USER = `${modules}/SAVE_CURRENT_USER`;
export const CLEAR_USER = `${modules}/CLEAR_USER`;
export const GET_CURRENT_USER_DATA = `${modules}/GET_CURRENT_USER_DATA`;
export const saveCurrentUser = createAction(SAVE_CURRENT_USER);
export const clearUserAction = createAction(CLEAR_USER);
export const getCurrentUserDataAction = createAction(GET_CURRENT_USER_DATA);

const defaultState = {};
export const currentUserReducer = (state = defaultState, action = {}) => {
    const { payload, type } = action;
    switch (type) {
        case SAVE_CURRENT_USER: {
            return { ...payload, ...new Profile(payload) };
        }
        case CLEAR_USER: {
            return defaultState;
        }
        default:
            return state;
    }
};

export const getCurrentUserSaga = function*(dispatch, action) {
    const userIsAuth = yield select(checkUserAuth);

    // if (userIsAuth) {
    const id = yield select(getId);
    const userId = get(action, 'response.data.user_id') || id;
    const { save } = yield select(getCookiesSelector);
    if (userId) {
        yield put(
            getUserRequest(userId, {
                onSuccess: function(data) {
                    const curentUserData = get(data, 'data');
                    if (curentUserData) {
                        dispatch(
                            saveCurrentUser({
                                ...curentUserData,
                                saveToPersist: save,
                            })
                        );
                        switch (true) {
                            case !get(curentUserData, 'salon_id'):
                                // if (userIsAuth) {
                                //     history.push('/init-profile');
                                // }
                                break;

                            default:
                        }
                    }
                },
            })
        );
    }
    // }
};
const clearCurentUserSaga = function*() {
    yield put(clearUserAction());
    yield put(clearForce());
    history.push('/auth');
};

export const currentUserModuleSaga = function*(dispatch) {
    yield all([
        takeLatest(
            [
                GET_TOKEN_SUCCESS,
                CREATE_SALON_SUCCESS,
                INIT_DATA,
                GET_CODE_SUCCESS,
                GET_CURRENT_USER_DATA,
            ],
            getCurrentUserSaga,
            dispatch
        ),
        takeLatest([SET_USER_LOGOUT, DELETE_SALON_SUCCESS], clearCurentUserSaga, dispatch),
    ]);
};
//selectors
export const currentUserDataSelector = state => {
    return state.currentUser || false;
};

export const getCurrentUserCurrency = state => {
    return get(state, 'currentUser.currency');
};

export const checkUserMaster = state => {
    return get(state, 'currentUser.is_master', false) == true;
};
export const checkUserAdmin = state => {
    return get(state, 'currentUser.is_admin', false) == true;
};
export const checkIsOwnerPage = state => {
    return id => get(state, 'currentUser.id', null) == id;
};
export const getId = state => {
    return get(state, 'currentUser.id');
};
export const getSalonIdSelector = state => get(state, 'currentUser.salon_id');
