import * as api_helpers from 'api';
import { all, put, fork, call, select, takeLatest, delay } from 'redux-saga/effects';
import { getSalonIdSelector } from 'modules/currentUser';
import { INIT_DATA } from '../init.js';
import { createAction } from 'redux-actions';
import get from 'lodash/get';
import { showSuccess } from 'modules/notifications';
const modules = 'salon';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;
const apiRoutes = new ApiRoutes();

export const FIND_MASTERS_BY_PHONE_REQUEST = `${modules}/FIND_MASTERS_BY_PHONE_REQUEST`;
export const FIND_MASTERS_BY_PHONE_CLEAR = `${modules}/FIND_MASTERS_BY_PHONE_CLEAR`;
export const GET_MASTERS_REQUEST = `${modules}/GET_MASTERS_REQUEST`;
export const GET_FREE_MASTERS_REQUEST = `${modules}/GET_FREE_MASTERS_REQUEST`;
export const GET_MASTER_DETAIL_REQUEST = `${modules}/GET_MASTER_DETAIL_REQUEST`;
export const GET_MASTERS_SKILLS_REQUEST = `${modules}/GET_MASTERS_SKILLS_REQUEST`;
export const GET_MASTERS_CUSTOM_SKILLS_REQUEST = `${modules}/GET_MASTERS_CUSTOM_SKILLS_REQUEST`;
export const SET_MASTERS_CUSTOM_SKILLS_REQUEST = `${modules}/SET_MASTERS_CUSTOM_SKILLS_REQUEST`;
export const SET_MASTER_SKILLS_REQUEST = `${modules}/SET_MASTER_SKILLS_REQUEST`;

export const SET_MASTER_WORKING_TIME_REQUEST = `${modules}/SET_MASTER_WORKING_TIME_REQUEST`;
export const SET_MASTER_WORKING_TIME_SUCCESS = `${modules}/SET_MASTER_WORKING_TIME_SUCCESS`;

export const UPDATE_MASTER_REQUEST = `${modules}/UPDATE_MASTER_REQUEST`;
export const UPDATE_MASTER_SUCCESS = `${modules}/UPDATE_MASTER_SUCCESS`;

export const CREATE_MASTERS_REQUEST = `${modules}/CREATE_MASTERS_REQUEST`;
export const CREATE_MASTERS_SUCCESS = `${modules}/CREATE_MASTERS_SUCCESS`;

export const INVITE_MASTERS_REQUEST = `${modules}/INVITE_MASTERS_REQUEST`;
export const INVITE_MASTERS_SUCCESS = `${modules}/INVITE_MASTERS_SUCCESS`;

export const DELETE_MASTER_REQUEST = `${modules}/DELETE_MASTER_REQUEST`;
export const DELETE_MASTER_SUCCESS = `${modules}/DELETE_MASTER_SUCCESS`;

export const ADD_AVATAR_REQUEST = `${modules}/ADD_AVATAR_REQUEST`;

export const getMasterByPhoneRequest = actionCreator(FIND_MASTERS_BY_PHONE_REQUEST);
export const clearMasterByPhoneAction = createAction(FIND_MASTERS_BY_PHONE_CLEAR);
export const getMastersRequest = actionCreator(GET_MASTERS_REQUEST);
export const getFreeMastersRequest = actionCreator(GET_FREE_MASTERS_REQUEST);
export const getMastersSkillsRequest = actionCreator(GET_MASTERS_SKILLS_REQUEST);
export const getMastersCustomSkillsRequest = actionCreator(GET_MASTERS_CUSTOM_SKILLS_REQUEST);
export const setMastersCustomSkillsRequest = actionCreator(SET_MASTERS_CUSTOM_SKILLS_REQUEST);
export const deleteMasterRequest = actionCreator(DELETE_MASTER_REQUEST);
export const createMasterRequest = actionCreator(CREATE_MASTERS_REQUEST);
export const inviteMasterRequest = actionCreator(INVITE_MASTERS_REQUEST);
export const setMasterSkillsRequest = actionCreator(SET_MASTER_SKILLS_REQUEST);
export const updateMasterRequest = actionCreator(UPDATE_MASTER_REQUEST);
export const getMasterDetailsRequest = actionCreator(GET_MASTER_DETAIL_REQUEST);
export const setMasterWorkingTimeRequest = actionCreator(SET_MASTER_WORKING_TIME_REQUEST);
export const addAvatarRequest = actionCreator(ADD_AVATAR_REQUEST);

//routes

apiRoutes.add(FIND_MASTERS_BY_PHONE_REQUEST, ({ id, phone }) => ({
    url: `/api/v2/salons/${id}/applicants`,
    method: 'get',
    params: { phone },
}));

apiRoutes.add(ADD_AVATAR_REQUEST, ({ id, master_id, image }) => ({
    url: `/api/v2/salons/${id}/masters/${master_id}/avatar`,
    method: 'post',
    data: { image },
}));

apiRoutes.add(GET_MASTERS_REQUEST, ({ id, skills, sevices }) => ({
    url: `/api/v2/salons/${id}/masters`,
    method: 'get',
    params: { skills, sevices },
}));
apiRoutes.add(SET_MASTER_WORKING_TIME_REQUEST, ({ id, master_id, workingTime }) => ({
    url: `/api/v2/salons/${id}/masters/${master_id}/working_time/temporary`,
    method: 'patch',
    data: workingTime,
}));

apiRoutes.add(GET_FREE_MASTERS_REQUEST, ({ id, skills, services, date }) => ({
    url: `/api/v2/salons/${id}/free-masters`,
    method: 'get',
    params: { skills, services, date },
}));

apiRoutes.add(GET_MASTER_DETAIL_REQUEST, ({ id, master_id }) => ({
    url: `/api/v2/salons/${id}/masters/${master_id}`,
    method: 'get',
}));
apiRoutes.add(GET_MASTERS_SKILLS_REQUEST, ({ id }) => ({
    url: `/api/v2/users/${id}/skills`,
    method: 'get',
}));
apiRoutes.add(GET_MASTERS_CUSTOM_SKILLS_REQUEST, ({ id }) => ({
    url: `/api/v2/users/${id}/services`,
    method: 'get',
}));

apiRoutes.add(SET_MASTERS_CUSTOM_SKILLS_REQUEST, ({ id, user_id, ...data }) => ({
    url: `/api/v2/salons/${id}/masters/${user_id}/services`,
    method: 'put',
    data,
}));

apiRoutes.add(SET_MASTER_SKILLS_REQUEST, ({ id, user_id, ...data }) => ({
    url: `/api/v2/salons/${id}/masters/${user_id}/skills`,
    method: 'put',
    data,
}));
apiRoutes.add(UPDATE_MASTER_REQUEST, ({ id, user_id, ...data }) => ({
    url: `/api/v2/salons/${id}/masters/${user_id}`,
    method: 'put',
    data,
}));
apiRoutes.add(INVITE_MASTERS_REQUEST, ({ id, user_id, ...data }) => ({
    url: `/api/v2/salons/${id}/masters/${user_id}`,
    method: 'post',
    data,
}));
apiRoutes.add(CREATE_MASTERS_REQUEST, ({ id, ...data }) => ({
    url: `/api/v2/salons/${id}/masters`,
    method: 'post',
    data,
}));
apiRoutes.add(DELETE_MASTER_REQUEST, ({ id, user_id }) => ({
    url: `/api/v2/salons/${id}/masters/${user_id}`,
    method: 'delete',
}));

//saga
const reloadMastersSaga = function*(dispatch, action) {
    const { type, payload } = action;
    console.log(payload);
    yield delay(200);
    switch (type) {
        case INVITE_MASTERS_SUCCESS:
            yield put(
                showSuccess({ message: 'Мастер будет добавлен в салон после принятия приглашения' })
            );
            break;
        case CREATE_MASTERS_SUCCESS:
            yield put(
                showSuccess({
                    message: `Мастер добавлен, вы можете управлять его
рабочим временем \nи навыками через раздел "Сотрудники"`,
                })
            );
            break;
        case UPDATE_MASTER_SUCCESS:
            yield put(showSuccess({ message: 'Изменения сохранены успешно' }));
            break;
        case DELETE_MASTER_SUCCESS:
            yield put(showSuccess({ message: 'Мастер удален из салона' }));
            break;
        case SET_MASTER_WORKING_TIME_SUCCESS: {
            const masters = yield select(getSalonMastersSelector);
            const master = masters.find(i => i.id == get(payload, 'master_id'));
            yield put(
                showSuccess({
                    message: `Время сотруднику ${get(master, 'first_name') || ''} ${get(
                        master,
                        'last_name'
                    ) || ''} применено`,
                })
            );
            break;
        }
        default:
            break;
    }
    const id = yield select(getSalonIdSelector);
    yield put(getMastersRequest({ id }));
};

export const masterSaga = function*(dispatch) {
    yield all([
        takeLatest(
            [
                DELETE_MASTER_SUCCESS,
                CREATE_MASTERS_SUCCESS,
                UPDATE_MASTER_SUCCESS,
                INVITE_MASTERS_SUCCESS,
                SET_MASTER_WORKING_TIME_SUCCESS,
            ],
            reloadMastersSaga,
            dispatch
        ),
    ]);
};

//selectors
export const getMastersByPhoneSelector = apiSelector(FIND_MASTERS_BY_PHONE_REQUEST);
export const getFreeMastersSelector = apiSelector(GET_FREE_MASTERS_REQUEST);
export const getMastersSkillsSelector = apiSelector(GET_MASTERS_SKILLS_REQUEST);
export const getMasterDetailSelector = apiSelector(GET_MASTER_DETAIL_REQUEST);
export const getSalonMastersSelector = apiSelector(GET_MASTERS_REQUEST);
export const getMastersCustomSkillSelector = apiSelector(GET_MASTERS_CUSTOM_SKILLS_REQUEST);
