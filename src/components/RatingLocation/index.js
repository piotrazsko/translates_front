import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from '@material-ui/icons/Star';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { Phone, Location } from 'assets/img/svg/prepared';

import style from './style.scss';

const RatingLocation = ({ master_feedbacks_count, user_rating, city }) => {
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
            {city && <Location className={style.locationIcon} />}
            <span className={style.city}>{city}</span>
        </div>
    );
};

RatingLocation.propTypes = {
    master_feedbacks_count: PropTypes.number,
    user_rating: PropTypes.number,
    city: PropTypes.string,
};

export default RatingLocation;
