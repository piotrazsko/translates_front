import * as api_helpers from 'api';
import { all, put, fork, call, select, takeLatest } from 'redux-saga/effects';
import { getSalonIdSelector } from 'modules/currentUser';
import { INIT_DATA } from '../init.js';
import { createAction } from 'redux-actions';
import get from 'lodash/get';
const modules = 'salon';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;
const apiRoutes = new ApiRoutes();

export const GET_PORTFOLIO_REQUEST = `${modules}/GET_PORTFOLIO_REQUEST`;
export const UPDATE_PORTFOLIO_REQUEST = `${modules}/UPDATE_PORTFOLIO_REQUEST`;
export const UPDATE_PORTFOLIO_SUCCESS = `${modules}/UPDATE_PORTFOLIO_SUCCESS`;
export const CREATE_PORTFOLIO_REQUEST = `${modules}/CREATE_PORTFOLIO_REQUEST`;
export const DELETE_PORTFOLIO_REQUEST = `${modules}/DELETE_PORTFOLIO_REQUEST`;
export const DELETE_PORTFOLIO_SUCCESS = `${modules}/DELETE_PORTFOLIO_SUCCESS`;

export const getSalonPortfolioRequest = actionCreator(GET_PORTFOLIO_REQUEST);
export const createSalonPortfolioRequest = actionCreator(CREATE_PORTFOLIO_REQUEST);
export const updateSalonPortfolioRequest = actionCreator(UPDATE_PORTFOLIO_REQUEST);
export const deletePortfolioRequest = actionCreator(DELETE_PORTFOLIO_REQUEST);

//routes
export const salonRoutes = {};
apiRoutes.add(GET_PORTFOLIO_REQUEST, ({ id }) => ({
    url: `/api/v2/salons/${id}/portfolio`,
    method: 'get',
}));
apiRoutes.add(UPDATE_PORTFOLIO_REQUEST, ({ id, portfolio_id, ...data }) => ({
    url: `/api/v2/salons/${id}/portfolio/${portfolio_id}`,
    method: 'put',
    data: { ...data },
}));
apiRoutes.add(CREATE_PORTFOLIO_REQUEST, ({ id, ...data }) => ({
    url: `/api/v2/salons/${id}/portfolio`,
    method: 'post',
    data: { ...data },
}));

apiRoutes.add(DELETE_PORTFOLIO_REQUEST, ({ id, portfolio_id }) => ({
    url: `/api/v2/salons/${id}/portfolio/${portfolio_id}`,
    method: 'delete',
}));

export const getPortfolioSelector = apiSelector(GET_PORTFOLIO_REQUEST);
