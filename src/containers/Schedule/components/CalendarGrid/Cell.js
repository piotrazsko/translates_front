import React from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { WEEKDAYS_LONG, WEEKDAYS_SHORT } from 'helpers/calendar.js';

import style from './style.scss';

const Cell = ({
    startWeekDay = 0,
    lastDate,
    row,
    col,
    isSelected,
    isMobile = true,
    firstDayOfWeek,
    selectedTimeText = '',
    selectedDaysArr,
    onClick,
    highlighedDays,
}) => {
    switch (true) {
        case isSelected: {
            return <div className={style.selectedCell}>{'selected'}</div>;
        }

        case row === 0: {
            const dayOfWeek = (col + startWeekDay) % 7;
            return (
                <div className={style.cellDay}>
                    <div>{isMobile ? WEEKDAYS_SHORT[dayOfWeek] : WEEKDAYS_LONG[dayOfWeek]}</div>
                </div>
            );
        }

        default: {
            const date = col + (row - 1) * 7 - firstDayOfWeek + 1;
            const isHightlighted = highlighedDays.indexOf(date) !== -1;
            const selected = selectedDaysArr.find(i => i == date);
            return (
                <div
                    className={
                        selected
                            ? style.selected
                            : isHightlighted
                            ? style.hightlighted
                            : style.dateCell
                    }
                    onClick={() => {
                        if (date >= 1 && date <= lastDate) {
                            onClick(date, selected);
                        }
                    }}
                >
                    {date < 1 || date > lastDate ? '' : date}
                </div>
            );
        }
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
