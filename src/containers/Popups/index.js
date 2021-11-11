import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Popup } from 'feelqueen_components';
import { connect } from 'react-redux';
import { popupSelector, hidePopupAction } from 'modules/popups';
import style from './style.scss';
const Popups = ({ confirms = [], hidePopupAction }) => {
    return (
        <Fragment>
            {confirms.map(item => (
                <Popup
                    key={item.id}
                    type={item.type}
                    message={item.message}
                    show
                    showForce
                    {...item}
                    onSubmit={ev => {
                        if (typeof item.onClick === 'function' && item.onClick(ev)) {
                            hidePopupAction(item.id);
                        }
                    }}
                    onCancel={ev => {
                        if (typeof item.onCancel === 'function' && item.onCancel(ev)) {
                            hidePopupAction(item.id);
                        }
                    }}
                    onClear={ev => {
                        if (typeof item.onClear === 'function') {
                            item.onCancel(ev);
                        }
                        hidePopupAction(item.id);
                    }}
                    textConfirm={item.textConfirm}
                    textCancel={item.textCancel || 'Cancel'}
                    classes={{ buttonContainer: style.buttonContainer }}
                    confirmButtonProps={{ ...item.confirmButtonProps }}
                />
            ))}
        </Fragment>
    );
};

Popups.propTypes = {
    confirms: PropTypes.array.isRequired,
    hidePopupAction: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    confirms: popupSelector(state),
});
const mapDispatchToProps = dispatch => ({
    hidePopupAction: bindActionCreators(hidePopupAction, dispatch),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Popups);
