import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import { StoresBox } from 'feelqueen_components';
import Typography from '@material-ui/core/Typography';

import { ReactComponent as Crown } from '../../assets/img/svg/Crown.svg';
const MobileScreen = ({ isMobile }) => {
    return (
        <div className={style.container}>
            <Crown width="160" height="160" />
            <div className={style.textContainer}>
                <Typography variant="h5">Скачивайте приложение FeelQueen</Typography>{' '}
                <span className={style.text}>
                    Для регистрации салона воспользуйтесь мобильным приложении либо десктоп версией
                    сайта
                </span>
            </div>
            <div className={style.storesBoxContainer}>
                <StoresBox
                    appStoreLink={'https://clc.am/ayX0_w'}
                    googlePlayLink={'https://clc.am/DzP2yA'}
                />
            </div>
        </div>
    );
};

MobileScreen.propTypes = {
    isMobile: PropTypes.bool,
};

export default MobileScreen;
