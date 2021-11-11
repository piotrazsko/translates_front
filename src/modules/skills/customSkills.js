import * as api_helpers from 'api';
import { all, put, fork, call, select, takeLatest } from 'redux-saga/effects';
import { getSalonIdSelector } from 'modules/currentUser';
import { INIT_DATA } from '../init.js';
import { createAction } from 'redux-actions';
import { getSalonDataSaga } from '../salon';
// import get from 'lodash/get';
const modules = 'salon';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;
const apiRoutes = new ApiRoutes();

export const CREATE_CUSTOM_SKILL_REQUEST = `${modules}/CREATE_CUSTOM_SKILL_REQUEST`;
export const CREATE_CUSTOM_SKILL_SUCCESS = `${modules}/CREATE_CUSTOM_SKILL_SUCCESS`;
export const UPDATE_CUSTOM_SKILL_REQUEST = `${modules}/UPDATE_CUSTOM_SKILL_REQUEST`;
export const UPDATE_CUSTOM_SKILL_SUCCESS = `${modules}/UPDATE_CUSTOM_SKILL_SUCCESS`;
export const DELETE_CUSTOM_SKILL_REQUEST = `${modules}/DELETE_CUSTOM_SKILL_REQUEST`;
export const DELETE_CUSTOM_SKILL_SUCCESS = `${modules}/DELETE_CUSTOM_SKILL_SUCCESS`;
export const ADD_CUSTOM_SUBSKILLS_REQUEST = `${modules}/ADD_CUSTOM_SUBSKILLS_REQUEST`;
export const ADD_CUSTOM_SUBSKILLS_SUCCESS = `${modules}/ADD_CUSTOM_SUBSKILLS_SUCCESS`;
export const GET_CUSTOM_SKILLS_REQUEST = `${modules}/GET_CUSTOM_SKILLS_REQUEST`;

export const createSalonCustomSkillRequest = actionCreator(CREATE_CUSTOM_SKILL_REQUEST);
export const updateSalonCustomSkillRequest = actionCreator(UPDATE_CUSTOM_SKILL_REQUEST);
export const addCustomSkillSubSkillsRequest = actionCreator(ADD_CUSTOM_SUBSKILLS_REQUEST);
export const deleteCustomSkillSubSkillsRequest = actionCreator(DELETE_CUSTOM_SKILL_REQUEST);
export const getCustomSkillsRequest = actionCreator(GET_CUSTOM_SKILLS_REQUEST);

//routes
export const salonRoutes = {};

apiRoutes.add(GET_CUSTOM_SKILLS_REQUEST, ({ id }) => ({
    url: `/api/v2/salons/${id}/services`,
    method: 'get',
}));

apiRoutes.add(CREATE_CUSTOM_SKILL_REQUEST, ({ id, ...data }) => ({
    url: `/api/v2/salons/${id}/services`,
    method: 'post',
    data,
}));
apiRoutes.add(UPDATE_CUSTOM_SKILL_REQUEST, ({ id, service_id, ...data }) => ({
    url: `/api/v2/salons/${id}/services/${service_id}`,
    method: 'put',
    data,
}));

apiRoutes.add(ADD_CUSTOM_SUBSKILLS_REQUEST, ({ id, service_id, ...data }) => ({
    url: `/api/v2/salons/${id}/services/${service_id}/skills`,
    method: 'put',
    data,
}));
apiRoutes.add(DELETE_CUSTOM_SKILL_REQUEST, ({ id, service_id }) => ({
    url: `/api/v2/salons/${id}/services/${service_id}`,
    method: 'delete',
}));
const getSalonsCustomSkillsSaga = function*() {
    const id = yield select(getSalonIdSelector);
    if (id) {
        yield put(getCustomSkillsRequest({ id }));
        yield getSalonDataSaga();
    }
};

export const customSkillsSaga = function*(dispatch) {
    yield all([
        takeLatest(
            [
                INIT_DATA,
                CREATE_CUSTOM_SKILL_SUCCESS,
                UPDATE_CUSTOM_SKILL_SUCCESS,
                DELETE_CUSTOM_SKILL_SUCCESS,
                ADD_CUSTOM_SUBSKILLS_SUCCESS,
            ],
            getSalonsCustomSkillsSaga,
            dispatch
        ),
    ]);
};

export const getSalonCustomSkillsSelector = apiSelector(GET_CUSTOM_SKILLS_REQUEST);
//
//selectors
// export const getCustomSkillSelector = apiSelector(CREATE_CUSTOM_SKILL_REQUEST);
