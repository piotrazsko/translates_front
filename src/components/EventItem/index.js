import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import moment from 'moment';
import { NumberFormat, EventStatusLabel } from 'components';
import style from './style.scss';

const EventItem = ({ data, history, showMaster = false }) => {
    const { id, date, status_id, master, skills, salon_services = [], amount, user } = data;
    return (
        <div
            className={style.container}
            onClick={() => {
                history.push('/event/' + id);
            }}
        >
            <div className={style.headItem}>
                <span className={style.itemDate}>{moment(date).format('DD MMMM YYYY, HH:mm')}</span>
                <EventStatusLabel
                    statusId={moment(date).toDate() < new Date() && status_id === 3 ? 7 : status_id}
                />
            </div>
            <div className={style.item}>
                <span>
                    <span className={style.title}>Клиент:</span>
                    <span className={style.name}>{`${
                        showMaster
                            ? get(master, 'first_name', '')
                            : get(user, 'first_name', '') || ''
                    } ${
                        showMaster ? get(master, 'last_name', '') : get(user, 'last_name', '') || ''
                    }`}</span>
                </span>
            </div>
            <div className={style.item}>
                <span className={style.title}>Услуга:</span>
                <span className={style.itemText}>
                    {' '}
                    {[...skills, ...salon_services].map(i => i.title).join(', ')}
                </span>
            </div>
            <div className={style.item}>
                <span className={style.title}>Цена:</span>
                <span className={style.itemText}>
                    <NumberFormat value={amount} />
                </span>
            </div>
        </div>
    );
};

EventItem.propTypes = {
    data: PropTypes.object,
    history: PropTypes.object,
    showMaster: PropTypes.bool,
};

export default EventItem;
