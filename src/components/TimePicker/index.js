/* global Set */
import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import Button from '@material-ui/core/Button';
const TimePicker = ({
    value,
    onChange,
    disabledTime,
    hourStep,
    minuteStep,
    inputProps,
    disabled,
    disableBeforeNow = true,
}) => {
    const hours = [];
    for (let i = 0; i < 24; i = i + hourStep) {
        hours.push(i);
    }
    const minutes = [];
    for (let i = 0; i < 60; i = i + minuteStep) {
        minutes.push(i);
    }
    const inputElHour = React.useRef(null);
    const inputElMinutes = React.useRef(null);
    const [selectedHour, setHour] = React.useState();
    const [selectedMinute, setMinutes] = React.useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleClick = event => {
        if (!disabled) {
            setAnchorEl(event.currentTarget);
        }
    };
    const handleClose = save => {
        setAnchorEl(null);
        if (save) {
            const date = moment(value || Date.now());
            date.hours(selectedHour);
            date.minutes(selectedMinute);
            date.seconds(0);

            onChange(date.toDate());
        }
    };

    React.useEffect(() => {
        setHour(moment(value).hours());
        setMinutes(moment(value).minutes());
    }, [value, open]);
    React.useEffect(() => {
        setTimeout(() => {
            if (open && inputElHour.current && inputElMinutes.current) {
                inputElHour.current.scrollIntoView();
                inputElMinutes.current.scrollIntoView();
            }
        }, 100);
    }, [open, value]);
    let str = (selectedMinute || `0`).toString();
    str = str.length < 2 ? `0${str}` : str;
    return (
        <div>
            <TextField
                disabled={disabled}
                classes={{ root: style.textField }}
                onClick={handleClick}
                value={typeof selectedHour !== 'undefined' ? `${selectedHour}:${str || '00'}` : ''}
                {...inputProps}
            />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={() => handleClose(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className={style.container}>
                    <div className={style.timeColumn}>
                        {hours.map(i => {
                            // const disabled = ;
                            const selected = i == parseInt(selectedHour);
                            const disabled = false;

                            return (
                                <div
                                    ref={inputElHour}
                                    className={[
                                        style.item,
                                        selected ? style.selectedItem : '',
                                    ].join(' ')}
                                    key={i}
                                    onClick={() => {
                                        setHour(i);
                                    }}
                                >
                                    {i}
                                </div>
                            );
                        })}
                    </div>
                    <div className={style.timeColumn}>
                        {minutes.map(i => {
                            const selected = i == parseInt(selectedMinute);
                            const disabled = disabledTime.find(item => {
                                const currentTime = selectedHour * 60 + i;
                                return currentTime < item.start + item.duration &&
                                    currentTime >= item.start
                                    ? true
                                    : false;
                            });
                            return (
                                <div
                                    ref={inputElMinutes}
                                    className={[
                                        style.item,
                                        selected ? style.selectedItem : '',
                                        disabled ? style.disabledItem : '',
                                    ].join(' ')}
                                    key={i}
                                    onClick={() => {
                                        if (!disabled) {
                                            setMinutes(i);
                                        }
                                    }}
                                >
                                    {i < 10 ? `0${i}` : i}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={style.button}>
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            handleClose(true);
                        }}
                    >
                        Ok
                    </Button>
                </div>
            </Popover>
        </div>
    );
};

TimePicker.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    hourStep: PropTypes.number,
    minuteStep: PropTypes.number,
    inputProps: PropTypes.object,
    disabledTime: PropTypes.array,
};

TimePicker.defaultProps = {
    disabledTime: [],
    onChange: date => {
        console.log(date);
    },
    hourStep: 1,
    minuteStep: 5,
    inputProps: {},
};
export default TimePicker;
