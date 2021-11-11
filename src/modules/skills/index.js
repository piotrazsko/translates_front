import * as api_helpers from 'api';
import { all, put, fork, call, select, takeLatest } from 'redux-saga/effects';
import { getSalonIdSelector } from 'modules/currentUser';
import { INIT_DATA } from '../init.js';
import { getSalonInfoRequest, getSalonDataSaga } from '../salon';
import { createAction } from 'redux-actions';
const modules = 'salon';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;
const apiRoutes = new ApiRoutes();

export const GET_SKILLS_REQUEST = `${modules}/GET_SKILLS_REQUEST`;

export const SET_SKILLS_REQUEST = `${modules}/SET_SKILLS_REQUEST`;
export const SET_SKILLS_SUCCESS = `${modules}/SET_SKILLS_SUCCESS`;
export const DELETE_SKILL_REQUEST = `${modules}/DELETE_SKILL_REQUEST`;
export const DELETE_SKILL_SUCCESS = `${modules}/DELETE_SKILL_SUCCESS`;
export const GET_LIST_SKILLS_REQUEST = `${modules}/GET_LIST_SKILLS_REQUEST`;
export const ADD_SKILL_ACTION = `${modules}/ADD_SKILL_ACTION`;

export const addSkillAction = createAction(ADD_SKILL_ACTION);
export const getSkillsRequest = actionCreator(GET_SKILLS_REQUEST);

export const setSkillsRequest = actionCreator(SET_SKILLS_REQUEST);
export const deleteSkillRequest = actionCreator(DELETE_SKILL_REQUEST);
export const getListSkillsRequest = actionCreator(GET_LIST_SKILLS_REQUEST, {
    responseDataPrepare: data => {
        let updatedData = [...data.data];
        updatedData = updatedData.map(item => {
            const newitem = { ...item };
            newitem.sub_skills = newitem.sub_skills.map(subskill => ({
                ...subskill,
                parent_uid: item.uid,
            }));
            return newitem;
        });
        const res = { ...data, data: updatedData };
        return res;
    },
});
//routes
export const salonRoutes = {};
apiRoutes.add(GET_SKILLS_REQUEST, ({ id }) => ({
    url: `/api/v2/salons/${id}/skills`,
    method: 'get',
}));

apiRoutes.add(SET_SKILLS_REQUEST, ({ id, data }) => ({
    url: `/api/v2/salons/${id}/skills`,
    method: 'put',
    data,
}));
apiRoutes.add(DELETE_SKILL_REQUEST, ({ id, skill_id }) => ({
    url: `/api/v2/salons/${id}/skills/${skill_id}`,
    method: 'delete',
}));

apiRoutes.add(GET_LIST_SKILLS_REQUEST, () => ({
    url: `/api/getSkills`,
    method: 'get',
    // showLoaderFlag: false,
}));
//reducers

const initialState = {
    skills: [],
};

export function skillsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_SKILL_ACTION: {
            const { payload } = action;
            return {
                ...state,
                skills: [...payload],
            };
        }
        default:
            return state;
    }
}

//actions

// sagas
const getSkillsSaga = function*() {
    yield put(getListSkillsRequest());
};

const reloadSkillsSaga = function*() {
    const id = yield select(getSalonIdSelector);
    yield put(getSkillsRequest({ id }));
    yield put(getSalonInfoRequest({ id }));
    yield getSalonDataSaga();
};

export const skillsSaga = function*(dispatch) {
    yield all([
        takeLatest([INIT_DATA], getSkillsSaga, dispatch),
        takeLatest([SET_SKILLS_SUCCESS, DELETE_SKILL_SUCCESS], reloadSkillsSaga, dispatch),
    ]);
};
//sagas

//selectors
export const getSelectedSkillsSelector = state => {
    return state.skills.skills;
};
export const getListSkillsSelector = apiSelector(GET_LIST_SKILLS_REQUEST);
export const getSalonSkillsSelector = apiSelector(GET_SKILLS_REQUEST);
