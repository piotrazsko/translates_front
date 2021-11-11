import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';

import MasterItem from './components/MasterItem';
import TimeSelectLine from './components/TimeSelectLine';
import CalendarGrid from './components/CalendarGrid';

import { useHooks } from './hooks';
import style from './style.scss';

const color = '#FA835F';

const useStyles = makeStyles(theme => ({
    buttonRoot: {
        // padding: '12px 20px',
        margin: '0px',
    },
    root: {
        backgroundColor: theme.palette.action.hover,
    },
    label: { fontSize: 14 },
    outlined: { backgroundColor: '#fff' },
}));

const Schedule = ({
    match: {
        params: { masterId: masterId },
    },
    history,
}) => {
    const classes = useStyles();
    const {
        search,
        setSearch,
        masters,
        activeMaster,
        setActiveMaster,
        setDate,
        date,
        highlighed,
        selectedDates,
        setSelectedDates,
        selectedDatesText,
        disableDay,
        workingStartPeriod,
        workingEndPeriod,
        setWorkingStartPeriod,
        setWorkingEndPeriod,
        timeBreak,
        setTimeBreak,
        setDisableDay,
        setWorkingTime,
    } = useHooks({ masterId, history });
    return (
        <Grid container className={style.container}>
            <Grid item xs={3} className={style.column}>
                <div className={style.employee}>
                    <div className={style.title}>Сотрудники</div>
                    <div className={style.searchContainer}>
                        <TextField
                            fullWidth
                            className={style.searchInput}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon htmlColor={color} />
                                    </InputAdornment>
                                ),
                                endAdornment: search ? (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setSearch('')} size="small">
                                            <ClearIcon htmlColor={color} />
                                        </IconButton>
                                    </InputAdornment>
                                ) : (
                                    false
                                ),
                            }}
                            required
                            value={search}
                            onChange={ev => setSearch(ev.target.value)}
                            size="small"
                            variant="outlined"
                            placeholder="Введите имя мастера"
                        />
                    </div>
                </div>
                <div>
                    {masters.map(i => (
                        <MasterItem
                            key={i.id}
                            data={i}
                            setActiveMaster={setActiveMaster}
                            isActive={i.id == activeMaster}
                        />
                    ))}
                </div>
            </Grid>
            <Grid item xs={5} className={style.columnTime}>
                <span className={style.title}>Расписание</span>
                <div className={style.calendarButtons}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setDate(new Date());
                        }}
                    >
                        Текущий
                    </Button>
                    <Button
                        variant={'outlined'}
                        classes={{
                            text: classes.root,
                            outlined: classes.outlined,
                            root: classes.buttonRoot,
                        }}
                    >
                        <div className={style.buttonContent}>
                            <div
                                size="small"
                                className={style.iconContainer}
                                onClick={() => {
                                    setDate(
                                        moment(date)
                                            .subtract(1, 'month')
                                            .toDate()
                                    );
                                }}
                            >
                                <ChevronLeftIcon
                                    className={style.chevrons}
                                    fontSize="small"
                                    htmlColor={'#fa835f'}
                                />
                            </div>
                            <div
                                className={style.headerButton}
                                color={color}
                                name="name"
                                size="small"
                            >
                                {`${moment(date).format('MMMM YYYY')}`}
                            </div>
                            <div
                                size="small"
                                className={style.iconContainer}
                                onClick={() => {
                                    setDate(
                                        moment(date)
                                            .add(1, 'month')
                                            .toDate()
                                    );
                                }}
                            >
                                <ChevronRightIcon
                                    className={style.chevrons}
                                    fontSize="small"
                                    htmlColor={'#fa835f'}
                                />
                            </div>
                        </div>
                    </Button>
                </div>
                <div className={style.calendarContainer}>
                    <CalendarGrid
                        highlighed={highlighed}
                        selectedMonth={date}
                        selectedDates={selectedDates}
                        setSelectedDates={setSelectedDates}
                    />
                </div>
                <div className={style.legend}>
                    <div className={style.legendItem}>
                        <div className={style.round} />
                        Рабочие дни мастера
                    </div>
                    <div className={style.legendItem}>
                        <div className={style.roundRed} />
                        Выбранный день
                    </div>
                </div>
            </Grid>
            <Grid item xs={4} className={[style.column, style.workingTimeColumn].join(' ')}>
                <div>
                    <span className={style.title}>Рабочий график</span>
                </div>
                <div className={style.selectedDaysList}>
                    <span>{` ${selectedDatesText}`}</span>
                </div>
                <div className={style.workingTime}>
                    <TimeSelectLine
                        disabled={disableDay || selectedDates.length == 0}
                        startTime={workingStartPeriod}
                        endTime={workingEndPeriod}
                        setStartTime={setWorkingStartPeriod}
                        setEndTime={setWorkingEndPeriod}
                    />
                </div>
                <div>
                    <div
                        className={
                            !disableDay && !timeBreak && selectedDates.length > 0
                                ? style.addTimeBreak
                                : style.disableTimeBreak
                        }
                        onClick={() => {
                            if (!disableDay && selectedDates.length > 0) {
                                setTimeBreak({
                                    start: moment()
                                        .hour(12)
                                        .minutes(0)
                                        .toDate(),
                                    end: moment()
                                        .hour(13)
                                        .minutes(0)
                                        .toDate(),
                                });
                            }
                        }}
                    >
                        {'Добавить перерыв'}
                    </div>
                </div>
                {timeBreak && (
                    <div className={style.workingTime}>
                        <TimeSelectLine
                            startTime={timeBreak.start}
                            endTime={timeBreak.end}
                            setStartTime={time => {
                                setTimeBreak({ ...timeBreak, start: time });
                            }}
                            setEndTime={time => {
                                setTimeBreak({ ...timeBreak, end: time });
                            }}
                            onDelete={() => {
                                setTimeBreak();
                            }}
                        />
                    </div>
                )}
                <FormControlLabel
                    disabled={selectedDates.length == 0}
                    control={
                        <Checkbox
                            checked={disableDay}
                            onChange={() => {
                                setDisableDay(!disableDay);
                            }}
                            inputProps={{ checked: disableDay }}
                            name="unworkedDay"
                            color="primary"
                        />
                    }
                    classes={{ label: classes.label }}
                    label="Отметить как нерабочий"
                />
                <br />
                <Button
                    onClick={setWorkingTime}
                    disabled={!selectedDates.length}
                    variant={'contained'}
                    color="primary"
                >
                    Сохранить
                </Button>
            </Grid>
        </Grid>
    );
};

Schedule.propTypes = {
    match: PropTypes.object,
};

export default Schedule;
