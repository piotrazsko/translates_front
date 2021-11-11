import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from '@material-ui/icons/Star';
import get from 'lodash/get';
import style from './style.scss';

const Rating = ({ data }) => {
    const { master_feedbacks_count, user_rating } = data;

    return (
        <div className={style.additionalInfo}>
            {master_feedbacks_count ? (
                <React.Fragment>
                    <StarIcon htmlColor="#FFBB2F" className={style.locationIcon} />
                    <span className={style.rating}>{user_rating}</span>
                </React.Fragment>
            ) : (
                ''
            )}
            <span className={style.feedbacks}>
                {master_feedbacks_count ? `(${master_feedbacks_count})` : 'Нет отзывов'}
            </span>
        </div>
    );
};

Rating.propTypes = {
    data: PropTypes.shape({
        master_feedbacks_count: PropTypes.number,
        user_rating: PropTypes.number,
    }),
};

export default Rating;
