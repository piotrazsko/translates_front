import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import moment from 'moment';
import style from './style.scss';
import { NumberFormat, EventStatusLabel } from 'components';

const EventLine = ({ data, currencyCurrent, onClick = () => {} }) => {
    const { date, duration, amount, skills, salon_services, status_id } = data;
    return (
        <div className={style.container} onClick={onClick}>
            <div className={style.lineContainer}>
                <span>{`${moment(date).format('HH:mm')} - ${moment(date)
                    .add(duration, 'm')
                    .format('HH:mm')}`}</span>
                <span className={style.endLine}>{moment(date).format('DD MMMM YYYY')}</span>
            </div>
            <div className={style.lineContainer}>
                <span className={style.startLine}>Мастер:</span>
                <span>{`${get(data, 'master.first_name', '')} ${get(
                    data,
                    'master.last_name',
                    ''
                )}`}</span>
                <span className={style.endLine}>
                    <NumberFormat
                        value={amount}
                        displayType={'text'}
                        thousandSeparator={' '}
                        suffix={` ${currencyCurrent.badge}`}
                    />
                </span>
            </div>
            <div className={style.lineContainer}>
                <span className={style.startLine}>Услуги:</span>
                <span className={style.serviceName}>
                    {[...skills, ...salon_services].map(i => i.title).join(', ')}
                </span>
                <div className={style.label}>
                    <EventStatusLabel
                        statusId={
                            moment(date).toDate() < new Date() && status_id === 3 ? 7 : status_id
                        }
                    />
                </div>
            </div>
        </div>
    );
};

EventLine.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func,
    currencyCurrent: PropTypes.object,
};

export default EventLine;
