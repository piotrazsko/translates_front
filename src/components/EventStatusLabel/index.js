import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const EventStatusLabel = ({ statusId }) => {
    // let status = ;
    const status = (() => {
        switch (statusId) {
            case 3:
                return { style: style.default, title: 'Предстоящая' };
            case 4:
                return { style: style.finished, title: 'Завершенная' };
            case 5:
                return { style: style.cancelled, title: 'Отмененная' };
            case 6:
                return { style: style.cancelled, title: 'Отмененная' };
            case 7:
                return { style: style.pendingFinish, title: 'Ожидает завершения' };
            default:
                return { style: style.default, title: 'Предстоящая' };
        }
    })();

    return (
        <div className={style.container}>
            <div className={status.style}>{status.title}</div>
        </div>
    );
};

EventStatusLabel.propTypes = {
    statusId: PropTypes.number,
};

export default EventStatusLabel;
