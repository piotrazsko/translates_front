import { routerReducer } from 'react-router-redux';
import { persistCombineReducers } from 'redux-persist';
import { createTransform } from 'redux-persist';
import localForage from 'localforage';
import * as apiHelpers from 'api';
import notoficationReducer from '../notifications';
import { authReducer } from '../auth';
import { loaderReducer } from '../loader';
import { currentUserReducer } from '../currentUser';
import { cookiesReducer } from '../cookies';
import viewport from 'modules/viewport';
import { popupsReducer } from 'modules/popups';
import { localizationReducer } from 'modules/localization';
import { sidebarReducer } from 'modules/sidebar';
import { skillsReducer } from 'modules/skills';
import { tutorialsReducer } from '../tutorials';
const SetTransform = createTransform(inboundState => {
    const { saveToPersist = true, ...state } = inboundState;
    return saveToPersist && { ...state };
});
const {
    modules: { apiDefaultReducer },
} = apiHelpers;

const persistConfig = {
    key: 'root',
    storage: localForage,
    version: 0,
    whitelist: ['auth', 'currentUser', 'cookies'],
    transforms: [SetTransform],
};

export default persistCombineReducers(persistConfig, {
    api: apiDefaultReducer,
    router: routerReducer,
    notification: notoficationReducer,
    auth: authReducer,
    loader: loaderReducer,
    currentUser: currentUserReducer,
    cookies: cookiesReducer,
    viewport,
    popups: popupsReducer,
    sidebar: sidebarReducer,
    localization: localizationReducer,
    skills: skillsReducer,
    tutorial: tutorialsReducer,
});
