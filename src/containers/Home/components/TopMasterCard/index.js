import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import Avatar from '@material-ui/core/Avatar';
import { Rating } from 'components';
import { NumberFormat } from 'components';

const TopmasterCard = ({ data, currency }) => {
    const { rating, feedback_count, name, avatar, count_events, amount } = data;
    return (
        <div className={style.container}>
            <Avatar src={avatar}>{name}</Avatar>
            <div className={style.infoContainer}>
                <div className={style.name}>{name}</div>
                <div className={style.rating}>
                    <Rating
                        data={{
                            user_rating: rating,
                            master_feedbacks_count: feedback_count,
                        }}
                    />
                </div>
            </div>
            <div className={style.visitsContsiner}>
                <div className={style.items}>
                    <span className={style.name}>Записи:</span>
                    <span className={style.value}>{count_events}</span>
                </div>
                <div className={style.items}>
                    <span className={style.name}>Заработано:</span>
                    <span className={style.value}>
                        <NumberFormat
                            value={amount.split('.')[0]}
                            displayType={'text'}
                            thousandSeparator={' '}
                            suffix={` ${currency}`}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
};

TopmasterCard.propTypes = {
    data: PropTypes.shape({}),
    currency: PropTypes.string,
};

export default TopmasterCard;
