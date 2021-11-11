/* global Map */
import { createAction } from 'redux-actions';
import * as api_helpers from 'api';
import moment from 'moment';
import { all, put, fork, call, select, takeLatest, delay } from 'redux-saga/effects';
import { getSalonIdSelector, SAVE_CURRENT_USER } from 'modules/currentUser';
import { SET_USER_LOGOUT } from 'modules/auth';
import { INIT_DATA } from '../init.js';
import history from 'store/history';
import get from 'lodash/get';
import { showSuccess } from 'modules/notifications';
import { showPopupAction } from 'modules/popups';
const modules = 'salon';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;
const apiRoutes = new ApiRoutes();

export const GET_SALON_REQUEST = `${modules}/GET_SALON_REQUEST`;
export const GET_SALON_SUCCESS = `${modules}/GET_SALON_SUCCESS`;
export const GET_SALON_CLEAR = `${modules}/GET_SALON_CLEAR`;

export const GET_SALON_LOCATION_REQUEST = `${modules}/GET_SALON_LOCATION_REQUEST`;
export const GET_SALON_LOCATION_CLEAR = `${modules}/GET_SALON_LOCATION_CLEAR`;
export const GET_DEEPLINK_REQUEST = `${modules}/GET_DEEPLINK_REQUEST`;

export const GET_SALON_INFO_REQUEST = `${modules}/GET_SALON_INFO_REQUEST`;
export const GET_SALON_INFO_CLEAR = `${modules}/GET_SALON_INFO_CLEAR`;

export const CREATE_SALON_REQUEST = `${modules}/CREATE_SALON_REQUEST`;
export const UPDATE_SALON_REQUEST = `${modules}/UPDATE_SALON_REQUEST`;
export const UPDATE_SALON_SUCCESS = `${modules}/UPDATE_SALON_SUCCESS`;
export const ADD_SALON_INFO_REQUEST = `${modules}/ADD_SALON_INFO_REQUEST`;
export const ADD_SALON_ADDRESS_REQUEST = `${modules}/ADD_SALON_ADDRESS_REQUEST`;
export const CREATE_SALON_SUCCESS = `${modules}/CREATE_SALON_SUCCESS`;
export const ADD_SALON_INFO_SUCCESS = `${modules}/ADD_SALON_INFO_SUCCESS`;
export const ADD_SALON_ADDRESS_SUCCESS = `${modules}/ADD_SALON_ADDRESS_SUCCESS`;
export const SET_SALON_DATA_ACTION = `${modules}/SET_SALON_DATA_ACTION`;
export const UPDATE_SALON_INFO_REQUEST = `${modules}/UPDATE_SALON_INFO_REQUEST`;
export const SET_SALON_AVATAR_REQUEST = `${modules}/SET_SALON_AVATAR_REQUEST`;
export const SET_SALON_AVATAR_SUCCESS = `${modules}/SET_SALON_AVATAR_SUCCESS`;

export const DELETE_SALON_REQUEST = `${modules}/DELETE_SALON_REQUEST`;
export const DELETE_SALON_SUCCESS = `${modules}/DELETE_SALON_SUCCESS`;
export const DELETE_SALON_ACTION = `${modules}/DELETE_SALON_ACTION`;

export const GET_SALON_FREE_TIME_REQUEST = `${modules}/GET_SALON_FREE_TIME_REQUEST`;

//actions
export const getSalonRequest = actionCreator(GET_SALON_REQUEST);
export const getDeeplinkRequest = actionCreator(GET_DEEPLINK_REQUEST);

export const getSalonLocationRequest = actionCreator(GET_SALON_LOCATION_REQUEST);
export const getSalonInfoRequest = actionCreator(GET_SALON_INFO_REQUEST);
export const createSalonRequest = actionCreator(CREATE_SALON_REQUEST);
export const setSalonData = createAction(SET_SALON_DATA_ACTION);
export const addSalonInfoRequest = actionCreator(ADD_SALON_INFO_REQUEST);
export const addSalonAddressRequest = actionCreator(ADD_SALON_ADDRESS_REQUEST);
export const updateSalonRequest = actionCreator(UPDATE_SALON_REQUEST);
export const updateSalonInfoRequest = actionCreator(UPDATE_SALON_INFO_REQUEST);
export const setSalonAvatarRequest = actionCreator(SET_SALON_AVATAR_REQUEST);
export const deleteSalonRequest = actionCreator(DELETE_SALON_REQUEST);
export const getSalonFreeTimesSalonRequest = actionCreator(GET_SALON_FREE_TIME_REQUEST, {
    responseDataPrepare: data => {
        const preparedData = new Map();
        data.data.forEach(i => {
            preparedData.set(
                i.date,
                i.free_time.map(j => moment(`${i.date} ${j}`))
            );
        });
        return { ...data, data: preparedData };
    },
});

export const deleteSalonAction = createAction(DELETE_SALON_ACTION);

// sagas

export const getSalonDataSaga = function*() {
    const id = yield select(getSalonIdSelector);
    if (id) {
        yield put(getSalonRequest({ id }));
        yield put(getSalonLocationRequest({ id }));
        yield put(getSalonInfoRequest({ id }));
    }
    // yield put(getSalonRequest());
};
const setSalonDataSaga = function*(dispatch, action) {
    const {
        payload: {
            instagram,
            site,
            description,
            is_work_at_client,
            country,
            city,
            address,
            lat,
            lng,
            metro_station_id,
            phone,
            title,
            onSuccess,
            place,
        },
    } = action;

    const id = yield select(getSalonIdSelector);
    if (!id) {
        yield put(
            createSalonRequest(
                { title, phone },
                {
                    postSaveToStoreCallback: data => {
                        const id = get(data, 'data.id');
                        if (id) {
                            dispatch(updateSalonRequest({ id, title, phone }));
                            dispatch(
                                addSalonInfoRequest({
                                    id,
                                    instagram,
                                    site,
                                    description,
                                    is_work_at_client,
                                })
                            );
                            dispatch(
                                addSalonAddressRequest({
                                    id,
                                    country,
                                    city,
                                    address,
                                    lat,
                                    lng,
                                    metro_station_id,
                                    place,
                                })
                            );
                        }
                        // console.log(data.);
                        onSuccess();
                    },
                }
            )
        );
    } else {
        yield put(updateSalonRequest({ id, title, phone }));
        yield put(addSalonInfoRequest({ id, instagram, site, description, is_work_at_client }));
        yield put(
            addSalonAddressRequest({
                id,
                place,
                country,
                city,
                address,
                lat,
                lng,
                metro_station_id,
            })
        );
        yield call(onSuccess);
    }
};

const deleteSalonSaga = function*(dispatch) {
    const id = yield select(getSalonIdSelector);
    if (id) {
        yield put(
            showPopupAction({
                message: `Вы действительно хотите приостановить \nработу салона на платформе Feelqueen?`,
                onClick: () => {
                    dispatch(deleteSalonRequest({ id }));
                    history.push('/auth');
                    return true;
                },
                onCancel: () => true,
                showCancel: true,
                submitButtonText: 'Ok',
            })
        );
    }
};
const clearCurentSalonSaga = function*(dispatch) {
    yield call([location, 'reload']);
    // yield put({ type: GET_SALON_CLEAR });
    // yield put({ type: GET_SALON_LOCATION_CLEAR });
    // yield put({ type: GET_SALON_INFO_CLEAR });
};

export const salonSaga = function*(dispatch) {
    yield all([
        takeLatest(
            [
                INIT_DATA,
                ADD_SALON_ADDRESS_SUCCESS,
                ADD_SALON_INFO_SUCCESS,
                UPDATE_SALON_SUCCESS,
                SET_SALON_AVATAR_SUCCESS,
                SAVE_CURRENT_USER,
            ],
            getSalonDataSaga,
            dispatch
        ),
        takeLatest([SET_SALON_DATA_ACTION], setSalonDataSaga, dispatch),
        takeLatest([DELETE_SALON_ACTION], deleteSalonSaga, dispatch),
        takeLatest([SET_USER_LOGOUT], clearCurentSalonSaga, dispatch),
    ]);
};
//routes
export const salonRoutes = {};

apiRoutes.add(GET_SALON_REQUEST, ({ id }) => ({
    url: `/api/v2/salons/${id}`,
    method: 'get',
}));

apiRoutes.add(DELETE_SALON_REQUEST, ({ id }) => ({
    url: `/api/v2/salons/${id}`,
    method: 'delete',
}));

apiRoutes.add(GET_DEEPLINK_REQUEST, ({ id }) => ({
    url: `/api/v2/salons/${id}/deeplink`,
    method: 'get',
}));

apiRoutes.add(SET_SALON_AVATAR_REQUEST, ({ id, image }) => ({
    url: `/api/v2/salons/${id}/avatar`,
    method: 'post',
    data: { image },
}));

apiRoutes.add(GET_SALON_INFO_REQUEST, ({ id }) => ({
    url: `/api/v2/salons/${id}/info`,
    method: 'get',
}));
apiRoutes.add(GET_SALON_LOCATION_REQUEST, ({ id }) => ({
    url: `/api/v2/salons/${id}/location`,
    method: 'get',
}));

apiRoutes.add(CREATE_SALON_REQUEST, ({ ...data }) => ({
    url: `/api/v2/salons`,
    method: 'post',
    data,
}));
apiRoutes.add(UPDATE_SALON_REQUEST, ({ id, ...data }) => ({
    url: `/api/v2/salons/${id}`,
    method: 'put',
    data,
}));
apiRoutes.add(ADD_SALON_INFO_REQUEST, ({ id, ...data }) => ({
    url: `/api/v2/salons/${id}/info`,
    method: 'put',
    data,
}));
apiRoutes.add(UPDATE_SALON_INFO_REQUEST, ({ id, ...data }) => ({
    url: `/api/v2/salons/${id}/info`,
    method: 'patch',
    data,
}));
apiRoutes.add(ADD_SALON_ADDRESS_REQUEST, ({ id, ...data }) => ({
    url: `/api/v2/salons/${id}/location`,
    method: 'put',
    data,
}));
apiRoutes.add(GET_SALON_FREE_TIME_REQUEST, ({ id, ...data }) => ({
    url: `/api/v2/salons/${id}/booking`,
    method: 'GET',
    params: data,
    showLoaderFlag: false,
}));

//selectors
export const getSalonSelector = apiSelector(GET_SALON_REQUEST);
export const getSalonDeeplinkSelector = apiSelector(GET_DEEPLINK_REQUEST);
export const getSalonInfoSelector = apiSelector(GET_SALON_INFO_REQUEST);
export const getSalonLocationSelector = apiSelector(GET_SALON_LOCATION_REQUEST);
export const getSalonsFreeTime = apiSelector(GET_SALON_FREE_TIME_REQUEST);
