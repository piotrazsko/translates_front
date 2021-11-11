import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';

import { WEEKDAYS_LONG, WEEKDAYS_SHORT } from '../../helpers/calendar.js';
import style from './style.module.scss';
const Cell = ({
    startTime,
    startWeekDay = 0,
    interval,
    row,
    col,
    isSelected,
    isMobile,
    onClear = () => {},
    selectedTimeText = 'Рабочее время',
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const onMenuClick = col => {
        onClear(col);
        handleClose();
    };
    switch (true) {
        case isSelected: {
            // const time = startTime + (row - 1) * interval;
            // const minutes = (time % 60).toString();
            const child = selectedTimeText;
            return <div className={style.selectedCell}>{child}</div>;
        }
        case col === 0 && row > 0: {
            const time = startTime + (row - 1) * interval;
            const minutes = (time % 60).toString();
            return (
                <div className={style.cellTime}>{`${Math.floor(time / 60)}:${
                    minutes.length === 1 ? '0' + minutes : minutes
                }`}</div>
            );
        }
        case col > 0 && row === 0: {
            const dayOfWeek = (col - 1 + startWeekDay) % 7;
            return (
                <div className={style.cellDay}>
                    <div className={style.dayName}>
                        {isMobile ? WEEKDAYS_SHORT[dayOfWeek] : WEEKDAYS_LONG[dayOfWeek]}
                    </div>
                    <div>
                        <IconButton size="small" onClick={handleClick}>
                            <MoreVertIcon style={{ fontSize: 15 }} />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => onMenuClick(col)}>
                                <div className={style.menuItem}>
                                    <DeleteForeverIcon style={{ fontSize: 18 }} /> Очистить
                                </div>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            );
        }

        default:
            return <div />;
    }
};

Cell.propTypes = {
    row: PropTypes.number,
    col: PropTypes.number,
    isSelected: PropTypes.bool,
    onClear: PropTypes.func,
    isMobile: PropTypes.bool,
    selectedTimeText: PropTypes.string,
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    interval: PropTypes.number,
    startWeekDay: PropTypes.number,
};

export default Cell;
