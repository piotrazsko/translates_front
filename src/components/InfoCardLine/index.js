import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const InfoCardLine = ({ title, value }) => {
    return (
        <div className={style.container}>
            <div className={style.title}>{title}</div>
            <div className={style.value}>{value}</div>
        </div>
    );
};

InfoCardLine.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
};

export default InfoCardLine;
