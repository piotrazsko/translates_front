import * as api_helpers from 'api';
import { all, put, call, select, takeLatest } from 'redux-saga/effects';

const modules = 'feedbacks';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;
const apiRoutes = new ApiRoutes();

export const GET_FEEDBACKS_REQUEST = `${modules}/GET_FEEDBACKS_REQUEST`;
export const SET_FEEDBACK_REQUEST = `${modules}/SET_FEEDBACK_REQUEST`;
export const GET_FEEDBACKS_DETAILS_REQUEST = `${modules}/GET_FEEDBACKS_DETAILS_REQUEST`;
//actions
export const getFeedbacksRequest = actionCreator(GET_FEEDBACKS_REQUEST, {});
export const getFeedbacksDetailsRequest = actionCreator(GET_FEEDBACKS_DETAILS_REQUEST, {});
export const createFeedbackRequest = actionCreator(SET_FEEDBACK_REQUEST, {});

export const FeedbacksRoutes = {};

apiRoutes.add(GET_FEEDBACKS_REQUEST, ({ id, limit, offset }) => ({
    url: `/api/v2/salons/${id}/feedbacks`,
    method: 'get',
    params: {
        limit,
        offset,
    },
    // showLoaderFlag: false,
}));
apiRoutes.add(SET_FEEDBACK_REQUEST, ({ id, feedback, rating }) => ({
    url: `/api/v2/events/${id}/feedbacks`,
    method: 'post',
    params: {
        feedback,
        rating,
    },
    // showLoaderFlag: false,
}));
apiRoutes.add(GET_FEEDBACKS_DETAILS_REQUEST, ({ id, limit, offset }) => ({
    url: `/api/v2/salons/${id}/feedbacks/statistics`,
    method: 'get',
    params: {
        limit,
        offset,
    },
    // showLoaderFlag: false,
}));

//selectors
export const getFeedbacksSelector = apiSelector(GET_FEEDBACKS_REQUEST);
export const getFeedbacksDetailsSelector = apiSelector(GET_FEEDBACKS_DETAILS_REQUEST);
