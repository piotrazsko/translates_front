import React from 'react';
import PropTypes from 'prop-types';
import { FeedbackItem as Feedback } from 'feelqueen_components';

const FeedbackItem = ({ data = {}, history }) => {
    return <Feedback data={data} history={history} />;
};

FeedbackItem.propTypes = {
    data: PropTypes.object,
    history: PropTypes.object,
};

export default FeedbackItem;
