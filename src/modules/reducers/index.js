// import { routerReducer } from "react-router-redux";
// import { combineReducers } from "redux";
// import viewport from "modules/viewport";
// import webpReducer from "modules/webp";
// export default combineReducers({
//   router: routerReducer,
//   webp: webpReducer,
//   viewport,
// });

import { routerReducer } from 'react-router-redux';
import { persistCombineReducers } from 'redux-persist';
import { popupsReducer } from 'modules/popups';
import { createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as apiHelpers from 'react_redux_api';
import viewport from 'modules/viewport';
import { i18nextReducer } from 'modules/i18next';
import { authReducer } from 'modules/auth';
import notificationsReducer from 'modules/notification';
import { sidebarReducer, sideBarSelector } from 'modules/sidebar';

const SetTransform = createTransform((inboundState) => {
    const { saveToPersist = true, ...state } = inboundState;
    return saveToPersist && { ...state };
});

const {
    modules: { apiDefaultReducer },
} = apiHelpers;

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    whitelist: ['auth', 'sidebar'],
    // transforms: [SetTransform],
};

export default persistCombineReducers(persistConfig, {
    api: apiDefaultReducer,
    viewport,
    router: routerReducer,
    popups: popupsReducer,
    locale: i18nextReducer,
    auth: authReducer,
    notification: notificationsReducer,
    sidebar: sidebarReducer,
});
