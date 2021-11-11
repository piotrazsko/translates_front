import * as api_helpers from 'api';
import { createAction } from 'redux-actions';
import { all, put, select, takeLatest, takeEvery, delay } from 'redux-saga/effects';
import { INIT_DATA } from '../init';
import history from 'store/history';
import { checkUserAuth } from 'modules/auth';
import { getSalonSelector } from 'modules/salon';
import get from 'lodash/get';
import { setBadge } from 'modules/sidebar';
const modules = 'chat';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;
const apiRoutes = new ApiRoutes();

export const GET_LIST_CHATS_REQUEST = `${modules}/GET_LIST_CHATS_REQUEST`;
export const GET_LIST_CHATS_SUCCESS = `${modules}/GET_LIST_CHATS_SUCCESS`;
export const OPEN_CHAT_BY_USER = `${modules}/OPEN_CHAT_BY_USER`;
export const LISTEN_CHAT = `${modules}/LISTEN_CHAT`;
export const STOP_LISTEN_CHAT = `${modules}/STOP_LISTEN_CHAT`;
export const CREATE_CHAT_REQUEST = `${modules}/CREATE_CHAT_REQUEST`;
export const SEND_MESSAGE_REQUEST = `${modules}/SEND_MESSAGE_REQUEST`;
export const GET_CHAT_BY_ID_REQUEST = `${modules}/GET_CHAT_BY_ID_REQUEST`;
export const GET_CHAT_BY_MASTER_ID_REQUEST = `${modules}/GET_CHAT_BY_MASTER_ID_REQUEST`;

//actions
// WARNING: use it for  create chat and open chat
export const openChat = createAction(OPEN_CHAT_BY_USER);
export const startListenChat = createAction(LISTEN_CHAT);
export const stopListenChat = createAction(STOP_LISTEN_CHAT);
export const getChatsListRequest = actionCreator(GET_LIST_CHATS_REQUEST);
export const getChatByIdRequest = actionCreator(GET_CHAT_BY_ID_REQUEST, {
    responseDataPrepare: data => {
        return { ...data, data: data.data.result };
    },
});
export const getChatByMasterIdRequest = actionCreator(GET_CHAT_BY_MASTER_ID_REQUEST);
export const sendMessageRequest = actionCreator(SEND_MESSAGE_REQUEST);
export const createChatRequest = actionCreator(CREATE_CHAT_REQUEST);

// sagas
const getChatsListSaga = function*() {
    while (true) {
        const auth = yield select(checkUserAuth);
        const { id } = yield select(getSalonSelector);
        if (auth) {
            if (id) {
                yield put(getChatsListRequest({ id, limit: 1000 }));
            }
        }
        yield delay(45000);
    }
};
const getChatByIdSaga = function*(dispatch, action) {
    const { payload } = action;

    if (payload && payload.id) {
        yield put(getChatByIdRequest({ ...payload, showLoader: false }));
        yield delay(3000);
        yield put(startListenChat({ id: payload.id }));
    }
};

const openChatSaga = function*(dispatch, action) {
    const { payload } = action;

    if (payload) {
        yield put(
            getChatByMasterIdRequest(
                { id: payload },
                {
                    onSuccess: data => {
                        const id = get(data, 'data.result.id');
                        if (id) {
                            history.push(`/messages/${id}`);
                        }
                    },
                    onFailure: () => {
                        dispatch(
                            createChatRequest(
                                { id: payload },
                                {
                                    onSuccess: data => {
                                        const id = get(data, 'data.result.id');
                                        if (id) {
                                            history.push(`/messages/${id}`);
                                        }
                                    },
                                }
                            )
                        );
                    },
                }
            )
        );
    }
};
const setBadgeSaga = function*(dispatch, action) {
    const messages = get(action, 'response.data', []);
    const unreadedCount = messages.reduce((acc, item) => {
        const isNotRead =
            !get(item, 'last_message.is_read') &&
            get(item, 'companion.id') === get(item, 'last_message.sender_id');
        return isNotRead ? acc + 1 : acc;
    }, 0);
    yield put(setBadge({ value: unreadedCount, id: 3 }));
};
export const chatSaga = function*(dispatch) {
    yield all([
        takeEvery(INIT_DATA, getChatsListSaga, dispatch),
        takeEvery(GET_LIST_CHATS_SUCCESS, setBadgeSaga, dispatch),
        takeLatest([LISTEN_CHAT, STOP_LISTEN_CHAT], getChatByIdSaga, dispatch),
        takeLatest(OPEN_CHAT_BY_USER, openChatSaga, dispatch),
    ]);
};

//routes
export const listSkillsRoutes = {};
apiRoutes.add(GET_LIST_CHATS_REQUEST, ({ id, ...data }) => ({
    url: `/api/v2/salons/${id}/chats`,
    method: 'get',
    showLoaderFlag: false,
    params: data,
}));
apiRoutes.add(GET_CHAT_BY_ID_REQUEST, ({ id, showLoader = false }) => ({
    url: `/api/getChat/${id}`,
    method: 'get',
    showLoaderFlag: showLoader,
}));
apiRoutes.add(GET_CHAT_BY_MASTER_ID_REQUEST, ({ id }) => ({
    url: `/api/getChatByParams`,
    method: 'get',
    params: { companionId: id },
}));
apiRoutes.add(CREATE_CHAT_REQUEST, ({ id }) => ({
    url: `/api/createChat`,
    method: 'post',
    data: { companionId: id },
}));
apiRoutes.add(SEND_MESSAGE_REQUEST, ({ chatId, type, text, imageData, showLoader = false }) => ({
    url: `/api/sendMessage`,
    method: 'post',
    data: { chatId, type, text, imageData },
    showLoaderFlag: showLoader,
}));

//selectors

export const getChatsListSelector = apiSelector(GET_LIST_CHATS_REQUEST);

export const getChatByIdSelector = apiSelector(GET_CHAT_BY_ID_REQUEST);
export const getChatByMasterIdSelector = apiSelector(GET_CHAT_BY_MASTER_ID_REQUEST);
export const sendMessageSelector = apiSelector(SEND_MESSAGE_REQUEST);
export const createChatSelector = apiSelector(CREATE_CHAT_REQUEST);
