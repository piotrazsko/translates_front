import React from 'react';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import style from './style.scss';

const FeedbackItem = ({ data = {}, history }) => {
    const { rating, feedback } = data;
    return (
        <div className={style.container}>
            <div>
                <Rating size="small" name="simple-controlled" value={rating} readOnly />
                <div className={style.feedbackText}>{feedback}</div>
            </div>
        </div>
    );
};

FeedbackItem.propTypes = {
    data: PropTypes.object,
    history: PropTypes.object,
};

export default FeedbackItem;
