import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import { RatingDetails as RatingDetailsDefault } from 'feelqueen_components';

const RatingDetails = ({ data }) => {
    return (
        <div className={style.container}>
            <RatingDetailsDefault data={data} />
        </div>
    );
};

RatingDetails.propTypes = {
    data: PropTypes.shape({ rating: PropTypes.array, count: PropTypes.number }),
};

export default RatingDetails;
