import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { loaderStatusSelector } from 'modules/loader';

const Loader = () => {
    const showLoader = useSelector(loaderStatusSelector);
    React.useEffect(() => {
        if (showLoader) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showLoader]);
    return showLoader ? (
        <div id="fuse-splash-screen">
            <div className="center">
                <div className="spinner-wrapper">
                    <div className="spinner">
                        <div className="inner">
                            <div className="gap" />
                            <div className="left">
                                <div className="half-circle" />
                            </div>
                            <div className="right">
                                <div className="half-circle" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default Loader;
