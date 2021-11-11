import React from 'react';
import PropTypes from 'prop-types';
import { DownloadLink as Link } from 'feelqueen_components';
const DownloadLink = ({ ...props }) => {
    return <Link target="_blank" rel="noopener noreferrer" {...props} />;
};

export default DownloadLink;
