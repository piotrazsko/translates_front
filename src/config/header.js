import React, { Component } from 'react';

import Notifications from 'containers/Notifications';

export const HEADER_ALL = 'all';

export default [
    {
        text: 'Календарь',
        path: '/calendar',
        iconText: 'calendar_today',
        classNames: 'headerItem headerCalendar',
        isMaster: true,
        isAuth: true,
    },
    {
        text: 'Уведомления',
        path: '/notifications',
        iconText: 'notifications',
        classNames: 'headerItem headerNotice',
        isMaster: HEADER_ALL,
        isAuth: true,
        component: Notifications,
    },
    {
        text: 'Журнал',
        path: '/journal',
        iconText: 'dashboard',
        classNames: 'headerItem headerLog',
        isMaster: false,
        isAuth: true,
    },
    {
        text: 'LogIn',
        path: '/auth',
        iconText: 'input',
        classNames: 'headerItem',
        isMaster: false,
        isAuth: false,
    },
];
