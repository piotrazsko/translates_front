/* global Map */
import React from 'react';
import PropTypes from 'prop-types';
import { CalendarPicker as Calendar } from 'feelqueen_components';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import style from './style.scss';

const CalendarPicker = ({
    showRightSide = true,
    onChange,
    isMobile = false,
    value,
    onChangeDay = () => {},
    disableBeforeNow = false,
    disableDates = [],
    pickerProps,
    freeTime,
    ...props
}) => {
    const [day, setDay] = React.useState(new Date());

    const [close, setClose] = React.useState(false);
    const arr = React.useMemo(() => {
        return freeTime instanceof Map ? freeTime.get(moment(day).format('YYYY-MM-DD')) ?? [] : [];
    }, [day, freeTime]);

    const [selectedTime, setSelectedTime] = React.useState();

    React.useEffect(() => {
        if (value) {
            setDay(day);
        }
    }, [value]);

    React.useEffect(() => {
        if (day) {
            onChangeDay(day);
        }
    }, [day]);

    const onChangeListener = () => {
        onChange(day);
        setClose(Math.random());
    };
    return (
        <Calendar
            {...props}
            date={day}
            autoClose={!showRightSide}
            onChange={date => {
                setDay(date);
                setSelectedTime();
            }}
            pickerProps={{
                disabledDates: disableDates,
                minDate: disableBeforeNow ? new Date() : undefined,
                disabledDay: day => {
                    return freeTime instanceof Map
                        ? !freeTime.get(moment(day).format('YYYY-MM-DD'))
                        : true;
                },
                onShownDateChange: date => {
                    setDay(date);
                },
                ...pickerProps,
            }}
            forceClose={close}
            calendarClasses={{
                calendarContainer: isMobile ? style.calendarContainer : '',
            }}
            rightSide={
                showRightSide && (
                    <div className={style.rightContainer}>
                        <div className={style.placeholder}>
                            Свободное время {moment(day).format('DD MMMM')}
                        </div>
                        <div className={style.rightSideCalendar}>
                            {arr.map(i => {
                                return (
                                    <div
                                        key={i.toDate().valueOf()}
                                        onClick={() => {
                                            setDay(i.toDate());
                                            setSelectedTime(i.toDate());
                                        }}
                                        className={[
                                            style.item,
                                            i.toDate().valueOf() == day.valueOf()
                                                ? style.selected
                                                : '',
                                        ].join(' ')}
                                    >
                                        {i.format('HH:mm')}
                                    </div>
                                );
                            })}
                        </div>
                        <div className={style.buttonContainer}>
                            <Button
                                onClick={onChangeListener}
                                color="primary"
                                variant={'contained'}
                                disabled={arr.length === 0 || !selectedTime}
                                size="small"
                            >
                                Ok
                            </Button>
                        </div>
                    </div>
                )
            }
        />
    );
};

CalendarPicker.propTypes = {
    isMobile: PropTypes.bool,
    showRightSide: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.object,
    disableBefore: PropTypes.bool,
    onChangeDay: PropTypes.func,
    disableBeforeNow: PropTypes.bool,
    enabledItems: PropTypes.array,
    interval: PropTypes.number,
    disableDates: PropTypes.array,
    pickerProps: PropTypes.object,
    freeTime: PropTypes.instanceOf(Map),
};
CalendarPicker.defaulpProps = {
    onChangeDay: () => {},
    enabledItems: [],
    disableDates: [],
    pickerProps: {},
};

export default CalendarPicker;
