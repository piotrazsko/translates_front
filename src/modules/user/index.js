import * as api_helpers from 'api';
import { call, put, takeEvery, select } from 'redux-saga/effects';
import get from 'lodash/get';
import Profile from './controller';
export { default as Profile } from './controller';
const modules = 'user';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;
const apiRoutes = new ApiRoutes();

export const GET_USER_REQUEST = `${modules}/GET_USER_REQUEST`;
export const GET_USER_SUCCESS = `${modules}/GET_USER_SUCCESS`;
export const UPDATE_USER_REQUEST = `${modules}/UPDATE_USER_REQUEST`;
export const UPDATE_USER_SUCCESS = `${modules}/UPDATE_USER_SUCCESS`;
export const UPDATE_USER_PROFILE_REQUEST = `${modules}/UPDATE_USER_PROFILE_REQUEST`;
export const UPDATE_USER_PROFILE_SUCCESS = `${modules}/UPDATE_USER_PROFILE_SUCCESS`;
export const SET_AVATAR_USER_REQUEST = `${modules}/SET_AVATAR_USER_REQUEST`;
export const SET_AVATAR_USER_SUCCESS = `${modules}/SET_AVATAR_USER_SUCCESS`;
export const DELETE_PROFILE_REQUEST = `${modules}/DELETE_PROFILE_REQUEST`;
export const DELETE_PROFILE_SUCCESS = `${modules}/DELETE_PROFILE_SUCCESS`;

export const getUserRequest = actionCreator(GET_USER_REQUEST, {
    responseDataPrepare: data => {
        data.data = new Profile(data.data);
        return data;
    },
});
export const updateUserRequest = actionCreator(UPDATE_USER_REQUEST);
export const updateUserProfileRequest = actionCreator(UPDATE_USER_PROFILE_REQUEST);
export const setAvatarRequest = actionCreator(SET_AVATAR_USER_REQUEST);
export const deleteProfileRequest = actionCreator(DELETE_PROFILE_REQUEST);

export const usersRoutes = {};
const userSaga = function*() {};

export function* initUserData() {
    yield takeEvery(
        [
            UPDATE_USER_SUCCESS,
            UPDATE_USER_PROFILE_SUCCESS,
            SET_AVATAR_USER_SUCCESS,
            DELETE_PROFILE_SUCCESS,
        ],
        userSaga
    );
}

apiRoutes.add(GET_USER_REQUEST, idObj => {
    // HACK:  used for  another type of obj
    const { showLoader = true, id } =
        typeof idObj == 'object' ? idObj : { id: idObj, showLoader: true };
    return {
        url: `/api/getUser/${id}`,
        method: 'get',
        showLoaderFlag: showLoader,
        headers: { Authorization: true },
    };
});
apiRoutes.add(UPDATE_USER_REQUEST, data => ({
    url: `/api/updateUser`,
    method: 'put',
    data,
}));
apiRoutes.add(UPDATE_USER_PROFILE_REQUEST, data => ({
    url: `/api/updateClientProfile`,
    method: 'put',
    data: data,
}));
apiRoutes.add(SET_AVATAR_USER_REQUEST, data => ({
    url: `/api/setAvatar`,
    method: 'post',
    data,
}));

apiRoutes.add(DELETE_PROFILE_REQUEST, () => ({
    url: `/api/deleteProfile`,
    method: 'get',
}));

export const getUserSelector = apiSelector(GET_USER_REQUEST);
export const getUserId = state => get(state, 'auth.user.id');
