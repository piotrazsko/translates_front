import React from 'react';
import PropTypes from 'prop-types';
import { WorkingTimeSelect } from 'components';
import Skeleton from '../../components/Skeleton';
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import { recoveryDataForWorkTime } from '../../../../helpers/calendar.js';
import { getSalonSelector, updateSalonInfoRequest, getSalonInfoSelector } from 'modules/salon';
import {
    getSalonWorkTimeRequest,
    updateSalonWorkTimeRequest,
    getSalonWorkingTimeSelector,
} from 'modules/working_time';
import style from './style.scss';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        // marginTop: theme.spacing(2),
    },
}));
const defaultTime = {
    mon: [
        {
            start: '10:00',
            end: '21:00',
        },
    ],
    tue: [
        {
            start: '10:00',
            end: '21:00',
        },
    ],
    wed: [
        {
            start: '10:00',
            end: '21:00',
        },
    ],
    thu: [
        {
            start: '10:00',
            end: '21:00',
        },
    ],
    fri: [
        {
            start: '10:00',
            end: '21:00',
        },
    ],
    sat: [
        {
            start: '10:00',
            end: '21:00',
        },
    ],
    sun: [
        {
            start: '10:00',
            end: '21:00',
        },
    ],
};
const InitWorkingTime = ({ history, ...props }) => {
    const classes = useStyles();
    const { loaded, ...workingTime } = useSelector(getSalonWorkingTimeSelector);
    const dispatch = useDispatch();
    const { id } = useSelector(getSalonSelector);
    const { working_time_interval, min_time_until_event } = useSelector(getSalonInfoSelector);
    const [time, setTime] = React.useState(defaultTime);
    const [interval, setIntervalTime] = React.useState(60);
    const [minFreeTime, setSetMinFreeTime] = React.useState(15);
    const [showCircles, setSetCircle] = React.useState(false);
    const [textError, setTextError] = React.useState('');

    React.useEffect(() => {
        if (id) {
            dispatch(getSalonWorkTimeRequest({ id }));
        }
    }, [id]);
    React.useEffect(() => {
        if (loaded) {
            const keys = Object.keys(workingTime);
            const time = keys.reduce((acc, i) => {
                const res = workingTime[i] || [];
                return [...acc, ...res];
            }, []);
            if (time.length > 0) {
                setTime(workingTime);
            }
        }
    }, [workingTime]);
    React.useEffect(() => {
        setIntervalTime(working_time_interval);
        setSetMinFreeTime(min_time_until_event);
    }, [working_time_interval]);
    return (
        <Skeleton
            textError={textError}
            progress={90}
            title={'Рабочий график салона'}
            subTitle={`Установите режим работы вашего салона (автоматически выбрано пн-вс 10.00-21.00)`}
            onBack={() => {
                history.push('/init-portfolio');
            }}
            onNext={() => {
                switch (true) {
                    case recoveryDataForWorkTime(time).length == 0: {
                        setTextError('Установите рабочее время');
                        return;
                    }
                    default: {
                        dispatch(updateSalonWorkTimeRequest({ id, data: time }));
                        dispatch(
                            updateSalonInfoRequest({
                                id,
                                working_time_interval: interval,
                                min_time_until_event: minFreeTime,
                            })
                        );
                        history.push('/calendar');
                        return;
                    }
                }
            }}
        >
            <Grid container>
                <Grid item xs={12} md={9}>
                    <div className={style.controls}>
                        <FormControl className={classes.formControl}>
                            <InputLabel
                                className={style.labelContainer}
                                shrink
                                id="demo-simple-select-label"
                            >
                                Интервал
                                <Tooltip title="Установите интервал для формирования рабочего расписания, которое доступно клиентам. Например, установив значение интервала в 20 минут и работая с 9 до 11 утра, свободное время для записи будет выглядеть как 9.00, 9.20, 9.40, 10.00, 10.20, 10.40.">
                                    <ErrorOutlineIcon color="primary" className={style.infoIcon} />
                                </Tooltip>
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={interval}
                                onChange={ev => {
                                    setIntervalTime(ev.target.value);
                                }}
                                name="interval"
                            >
                                <MenuItem value={10}>10 мин</MenuItem>
                                <MenuItem value={15}>15 мин</MenuItem>
                                <MenuItem value={20}>20 мин</MenuItem>
                                <MenuItem value={30}>30 мин</MenuItem>
                                <MenuItem value={60}>60 мин</MenuItem>
                                <MenuItem value={90}>90 мин</MenuItem>
                                <MenuItem value={120}>120 мин</MenuItem>
                            </Select>
                        </FormControl>{' '}
                        {/*  <Tooltip title="Delete">
                            <TextField
                                className={[classes.formControl, style.preinterval].join(' ')}
                                value={minFreeTime}
                                onChange={ev => {
                                    setSetMinFreeTime(ev.target.value.replace(/\D/g, ''));
                                }}
                                id="time"
                                label="Окно, мин "
                                type="number"
                                name="freinterval"
                            />
                        </Tooltip> */}
                        <FormControlLabel
                            className={style.sheduleSwitch}
                            control={
                                <Checkbox
                                    checked={showCircles}
                                    onChange={() => setSetCircle(!showCircles)}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Показать график работы"
                        />
                    </div>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} md={9}>
                    <WorkingTimeSelect
                        startWeekDay={1}
                        isMobile
                        showIntervals={showCircles}
                        interval={interval}
                        startTime={300}
                        endTime={1440}
                        onChange={data => {
                            setTime(data);
                        }}
                        workingTimeIntervals={time}
                    />
                </Grid>
            </Grid>
        </Skeleton>
    );
};

InitWorkingTime.propTypes = {
    // : PropTypes.
};

export default InitWorkingTime;
