import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { Popup as PopupBackground } from 'components';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import style from './style.scss';
const color = '#fa835f"';

const Popup = ({ onSubmit, onCancel, onClose, showPopup, selectedSkills }) => {
    return (
        <PopupBackground
            onSubmit={() => onSubmit()}
            onCancel={() => {
                onCancel();
            }}
            showPopup={showPopup}
            visible
            cancelButtonText="Отменить"
            submitButtonText="Принять"
            childrenContainerClassName={style.dataContainer}
            popupBackgroundsProps={{ onClick: onClose }}
        >
            <div className={style.topBlock}>
                <div className={style.closeButtonContainer}>
                    <IconButton
                        size="small"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        <ClearIcon />
                    </IconButton>
                </div>
            </div>

            <div className={style.container}>
                <div className={style.masterData}>
                    <Avatar
                        classes={{ root: style.avatar }}
                        alt="Cindy Baker"
                        src="/static/images/avatar/3.jpg"
                    />
                    <div></div>
                </div>
                <Typography variant="h4">У этого мастера установлено приложение</Typography>
            </div>
        </PopupBackground>
    );
};

Popup.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    selectedSkills: PropTypes.array,
    skills: PropTypes.array,
    showPopup: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Popup;
