import React from 'react';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import PeopleAltOutlinedIcon from '../assets/img/svg/prepared/UilUsersAlt.js';
import ForumOutlinedIcon from '../assets/img/svg/prepared/UilCommentAltLines.js';
import AttachMoneyOutlinedIcon from '../assets/img/svg/prepared/UilCalculator.js';
import TimelineOutlinedIcon from '../assets/img/svg/prepared/UilChartPie.js';
import FavoriteBorderOutlinedIcon from '../assets/img/svg/prepared/UilHeart.js';
import BusinessCenterOutlinedIcon from '../assets/img/svg/prepared/UilSuitcase.js';
import HomeOutlinedIcon from '../assets/img/svg/prepared/UilEstate.js';
import Feedback from '../assets/img/svg/prepared/UilCommentAltEdit.js';
import Profile from '../assets/img/svg/prepared/UilProfile.js';
import Payments from '../assets/img/svg/prepared/Payments.js';
export default [
    { to: '/', title: 'Главная', icon: HomeOutlinedIcon, id: 0 },
    { to: '/calendar', title: 'Календарь', icon: CalendarTodayOutlinedIcon, id: 1 },
    { to: '/clients', title: 'Клиенты', icon: PeopleAltOutlinedIcon, id: 2 },
    { to: '/messages', title: 'Сообщения', icon: ForumOutlinedIcon, id: 3 },
    { to: '/finance', title: 'Финансы', icon: AttachMoneyOutlinedIcon, id: 4 },
    { to: '/analitics', title: 'Аналитика', icon: TimelineOutlinedIcon, id: 5 },
    { to: '/feedbacks', title: 'Отзывы', icon: Feedback, id: 6 },
    { to: '/masters', title: 'Сотрудники', icon: FavoriteBorderOutlinedIcon, id: 7 },
    { to: '/services', title: 'Услуги', icon: BusinessCenterOutlinedIcon, id: 8 },
    { to: '/profile', title: 'Профиль', icon: Profile, id: 9 },
    {
        to: '/payments',
        title: 'Платежи',
        icon: Payments,
        id: 10,
    },
];
