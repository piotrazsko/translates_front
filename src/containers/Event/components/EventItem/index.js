import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const EventItem = ({ data }) => {
    return (
        <div className={style.container}>
            <div className={style.item}>
                <span className={style.itemDate}>12 сентября 2020, 10:00</span>
            </div>
            <div className={style.item}>
                <span>
                    <span className={style.title}>Мастер:</span>
                    <span className={style.name}>Игорь Членов</span>
                </span>
            </div>
            <div className={style.item}>
                <span className={style.title}>Услуга:</span>
                <span className={style.itemText}>
                    Выпрямление рук, Стрижка, Вспышка, Миллирование, Пилатес, Выпрямление рук,
                    Стрижк...
                </span>
            </div>
            <div className={style.item}>
                <span className={style.title}>Цена:</span>
                <span className={style.itemText}>10 000 ₽</span>
            </div>
        </div>
    );
};

EventItem.propTypes = {
    data: PropTypes.object,
};

export default EventItem;
