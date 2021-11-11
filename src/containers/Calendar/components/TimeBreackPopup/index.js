import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Popup, Select, TimePicker } from 'feelqueen_components';

import { Calendar } from 'components';
import style from './style.scss';
const moment = extendMoment(Moment);

const TimeBreackPopup = ({
    interval,
    onSubmit,
    date,
    onClear,
    contextData,
    mastersList,
    workingTime,
    ...props
}) => {
    const [dateState, setDate] = React.useState(date);

    const [textErorr, setTextError] = React.useState('');
    const [startTime, setStartTime] = React.useState();
    const [endTime, setEndTime] = React.useState();
    const [master, setMaster] = React.useState();
    React.useEffect(() => {
        if (mastersList && contextData) {
            const master = mastersList.find(i => i.id == get(contextData, 'master.id'));
            if (master) {
                setMaster({
                    label: `${master.first_name} ${master.last_name}`,
                    value: master.id,
                    id: master.id,
                });
            }
        }
        const hour = get(contextData, 'time.hour');
        const minutes = get(contextData, 'time.minutes');
        if (hour && minutes) {
            setStartTime(
                moment(date)
                    .hours(hour)
                    .minute(minutes)
                    .toDate()
            );
            setEndTime(
                moment(date)
                    .hours(hour)
                    .minute(minutes)
                    .add(interval, 'minutes')
                    .toDate()
            );
        } else {
            setStartTime(new Date());
            setEndTime(new Date());
        }
    }, [contextData, mastersList]);
    const workingTimeCurrentDate = React.useMemo(() => {
        const workingTimeByMaster = workingTime.find(i => i.user_id === get(master, 'id'));
        const arr = workingTimeByMaster
            ? get(workingTimeByMaster, 'enabled', []).filter(
                  i => moment(i.start).format('DDMMYYYY') === moment(date).format('DDMMYYYY')
              )
            : [];
        return arr.map(i => moment.range(moment(i.start).toDate(), moment(i.end).toDate()));
    }, [workingTime, date, master]);

    const options = React.useMemo(() => {
        return mastersList.map(i => ({
            label: `${i.first_name} ${i.last_name}`,
            value: i.id,
            id: i.id,
        }));
    }, [mastersList]);
    const submitListener = () => {
        if (startTime >= endTime) {
            setTextError('Проверите введенное время');
            return true;
        }

        if (workingTimeCurrentDate.length === 0) {
            onClear();
        } else {
            const range = moment.range(startTime, endTime);
            const intervals = workingTimeCurrentDate.reduce((acc, i) => {
                const interval = i.subtract(range);
                return [...acc, ...interval.filter(i => i)];
            }, []);
            onSubmit({
                master_id: master.id,
                enabled: intervals.map(i => ({
                    start: i.start.format('YYYY-MM-DD HH:mm'),
                    end: i.end.format('YYYY-MM-DD HH:mm'),
                })),
            });
        }
    };
    return (
        <Popup
            textError={textErorr}
            title="Закрыть рабочий интервал"
            showCancel={false}
            showClear
            onClear={onClear}
            submitButtonText="Сохранить"
            onSubmit={() => {
                submitListener();
            }}
        >
            <div>
                <div className={style.inputContainer}>
                    <Select
                        InputLabelProps={{ shrink: true }}
                        onChange={ev => {
                            setMaster(options.find(i => i.value === ev.target.value));
                        }}
                        value={master ? master.value : null}
                        options={options}
                        label="Сотрудник"
                        fullWidth
                        variant="standart"
                        color="primary"
                    />
                </div>
                <div className={style.inputContainer}>
                    <Calendar date={dateState} onChange={date => setDate(date)}>
                        <TextField
                            id="input-with-icon-textfield"
                            label="Дата"
                            fullWidth
                            value={moment(dateState).format('dddd, DD MMMM YYYY')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" className={style.inputAdornment}>
                                        <KeyboardArrowDownIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Calendar>
                </div>
                <div className={style.inputContainer}>
                    <div className={style.timepickers}>
                        <div className={style.timePicker}>
                            <TimePicker
                                inputProps={{ label: 'Начало' }}
                                value={startTime}
                                onChange={setStartTime}
                            />
                        </div>
                        <div className={style.timePicker}>
                            <TimePicker
                                inputProps={{ label: 'Конец' }}
                                value={endTime}
                                onChange={setEndTime}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

TimeBreackPopup.propTypes = {
    interval: PropTypes.number,
    onSubmit: PropTypes.func,
    date: PropTypes.object,
    onClear: PropTypes.string,
    contextData: PropTypes.object,
    mastersList: PropTypes.array,
    workingTime: PropTypes.object,
};

export default TimeBreackPopup;
