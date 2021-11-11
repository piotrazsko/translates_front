import React from 'react';
import gets from 'lodash/get';
import PropTypes from 'prop-types';
import style from './style.scss';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Rating from '../Rating';
const color = '#fa835f';

const UserInfo = ({ data, onClick, isMaster = false }) => {
    const {
        first_name,
        phone,
        last_name,
        rating,
        master_feedbacks_count,
        avatar,
        id,

        user_events_count,
        feedback_count,
        last_event_date,
    } = data;
    const isAdmin = false;
    return (
        !!data && (
            <div onClick={onClick} className={style.item} key={id}>
                <Avatar alt="" src={avatar || ''}>
                    {`${gets(first_name, '[0]', '')}${gets(last_name, '[0]', '')}`}
                </Avatar>
                <div className={style.titleContainer}>
                    <div>
                        <div className={style.title}>
                            {`${first_name || ''} ${last_name || ''}`}
                        </div>
                        {phone && !isMaster && <div className={style.phone}>+{phone}</div>}
                    </div>
                </div>

                <div className={style.additionalInfo}>
                    <div className={style.rating}>
                        <Rating
                            data={{
                                user_rating: rating,
                                master_feedbacks_count: feedback_count || master_feedbacks_count,
                            }}
                        />
                    </div>
                    {/*!isMaster && (
                        <div className={style.items}>
                            <div>
                                <span className={style.name}>Визиты:</span>
                                <span className={style.value}>{`${user_events_count || 0}`}</span>
                            </div>
                            {last_event_date && (
                                <div>
                                    <span className={style.name}>Последний:</span>
                                    <span className={style.value}>
                                        {last_event_date
                                            ? ` ${moment(last_event_date).format('DD MMMM YYYY')}`
                                            : ' Нет визитов'}
                                    </span>
                                </div>
                            )}
                        </div>
                    )*/}
                    {isAdmin && <span>Admin</span>}
                </div>
            </div>
        )
    );
};
UserInfo.defaultProps = {
    data: {},
    onClick: () => {},
};

UserInfo.propTypes = {
    onClick: PropTypes.func,
    isMaster: PropTypes.bool,
};

export default UserInfo;
