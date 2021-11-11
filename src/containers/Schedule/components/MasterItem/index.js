import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import get from 'lodash/get';
import moment from 'moment';
import Badge from '@material-ui/core/Badge';

import style from './style.scss';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const MasterItem = ({ data, setActiveMaster, status = '', isActive = false }) => {
    const { id, first_name, last_name, avatar } = data;
    return (
        <div
            className={[style.container, isActive ? style.activeCard : ''].join(' ')}
            onClick={() => {
                setActiveMaster(id);
            }}
        >
            <Avatar src={avatar || ''} />
            <div className={style.infoContainer}>
                <div className={style.name}>{`${first_name} ${last_name || ''}`}</div>
                <div className={style.lastMessage}>{status}</div>
            </div>
        </div>
    );
};

MasterItem.propTypes = {
    data: PropTypes.object,
    setActiveChat: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
};

export default MasterItem;
