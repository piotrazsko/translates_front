import * as apiHelpers from 'api';
// import { createAction } from 'redux-actions';
// import { all, call, takeLatest, take, put, select, delay } from 'redux-saga/effects';
const modules = 'users';

const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = apiHelpers;

const apiRoutes = new ApiRoutes();

export const GET_MYPERMISSIONS_REQUEST = `${modules}/GET_MYPERMISSIONS_REQUEST`;
export const GET_ROLES_LIST_REQUEST = `${modules}/GET_ROLES_LIST_REQUEST`;
export const CREATE_ROLE_REQUEST = `${modules}/CREATE_ROLE_REQUEST`;
export const UPDATE_ROLE_REQUEST = `${modules}/UPDATE_ROLE_REQUEST`;
export const DELETE_ROLES_REQUEST = `${modules}/DELETE_ROLES_REQUEST`;

export const getRolesListRequest = actionCreator(GET_ROLES_LIST_REQUEST);
export const addRoleRequest = actionCreator(CREATE_ROLE_REQUEST);
export const updateRoleRequest = actionCreator(UPDATE_ROLE_REQUEST);
export const deleteRolesRequest = actionCreator(DELETE_ROLES_REQUEST);

export const getmyPermissionsRequest = actionCreator(GET_MYPERMISSIONS_REQUEST);

apiRoutes.add(GET_MYPERMISSIONS_REQUEST, data => ({
    url: `/roles/mypermissions`,
    method: 'get',
    params: data,
    headers: { Authorization: true, 'x-mock-match-request-body': true },
}));

apiRoutes.add(GET_ROLES_LIST_REQUEST, data => ({
    url: `/roles`,
    method: 'get',
    params: data,
    headers: { Authorization: true, 'x-mock-match-request-body': true },
}));

apiRoutes.add(CREATE_ROLE_REQUEST, data => ({
    url: `/roles`,
    method: 'post',
    data: data,
    headers: { Authorization: true, 'x-mock-match-request-body': true },
}));

apiRoutes.add(UPDATE_ROLE_REQUEST, data => ({
    url: `/roles/${data.id}`,
    method: 'patch',
    data: data,
    headers: { Authorization: true, 'x-mock-match-request-body': true },
}));

apiRoutes.add(DELETE_ROLES_REQUEST, data => {
    return {
        url: `/roles/${data}`,
        method: 'delete',
        headers: { Authorization: true, 'x-mock-match-request-body': true },
    };
});

export const rolesSelector = apiSelector(GET_ROLES_LIST_REQUEST, {
    initialData: { items: [], size: 0 },
});
export const myPermissionsSelector = apiSelector(GET_MYPERMISSIONS_REQUEST, {
    initialData: {
        adverts: 'RUD',
        customers: 'RUD',
        users: 'RUD',
        roles: 'CRUD',
        skills: 'CRUD',
        orders: 'RUD',
        events: 'RD',
        feedbacks: 'RD',
        statistics: 'R',
        pushes: 'CRUD',
        chats: 'R',
        faq: 'CRUD',
    },
});
