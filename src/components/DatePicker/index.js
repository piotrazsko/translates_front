import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { DateRangePicker } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import {
    addDays,
    endOfDay,
    startOfDay,
    startOfMonth,
    endOfMonth,
    addMonths,
    startOfWeek,
    endOfWeek,
    isSameDay,
    differenceInCalendarDays,
} from 'date-fns';
import style from './style.scss';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.action.hover,
    },
    outlined: {
        backgroundColor: '#fff',
        borderRadius: '6px',
    },
    buttonRoot: {
        padding: 0,
        // [theme.breakpoints.down('md')]: {
        //     fontSize: 11,
        // },
    },
    checkboxContainer: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
}));

const defineds = {
    startOfWeek: startOfWeek(new Date()),
    endOfWeek: endOfWeek(new Date()),
    startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
    endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
    startOfToday: startOfDay(new Date()),
    endOfToday: endOfDay(new Date()),
    startOfYesterday: startOfDay(addDays(new Date(), -1)),
    endOfYesterday: endOfDay(addDays(new Date(), -1)),
    startOfMonth: startOfMonth(new Date()),
    endOfMonth: endOfMonth(new Date()),
    startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
    endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
};

const staticRangeHandler = {
    range: {},
    isSelected(range) {
        const definedRange = this.range();
        return (
            isSameDay(range.startDate, definedRange.startDate) &&
            isSameDay(range.endDate, definedRange.endDate)
        );
    },
};

function createStaticRanges(ranges) {
    return ranges.map(range => ({ ...staticRangeHandler, ...range }));
}

export const defaultStaticRanges = createStaticRanges([
    {
        label: 'Сегодня',
        range: () => ({
            startDate: defineds.startOfToday,
            endDate: defineds.endOfToday,
        }),
    },
    {
        label: 'Вчера',
        range: () => ({
            startDate: defineds.startOfYesterday,
            endDate: defineds.endOfYesterday,
        }),
    },

    {
        label: 'Текущая неделя',
        range: () => ({
            startDate: defineds.startOfWeek,
            endDate: defineds.endOfWeek,
        }),
    },
    {
        label: 'Прошлая неделя',
        range: () => ({
            startDate: defineds.startOfLastWeek,
            endDate: defineds.endOfLastWeek,
        }),
    },
    {
        label: 'Текущий месяц',
        range: () => ({
            startDate: defineds.startOfMonth,
            endDate: defineds.endOfMonth,
        }),
    },
    {
        label: 'Прошлый месяц',
        range: () => ({
            startDate: defineds.startOfLastMonth,
            endDate: defineds.endOfLastMonth,
        }),
    },
]);

export default function DatePicker({
    onChange,
    date,
    color,
    variant = 'text',
    rightAlign = false,
    placeholder,
    buttonProps,
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [chagedShownDate, updateShownDate] = React.useState();
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const [state, setState] = React.useState();
    React.useEffect(() => {
        setState([
            {
                startDate: date.from ? date.from.toDate() : undefined,
                endDate: date.to ? date.to.toDate() : undefined,
                key: 'selection',
            },
        ]);
    }, [date]);

    React.useEffect(() => {
        if (open) {
            updateShownDate();
        }
    }, [open]);

    const handleClose = () => {
        setAnchorEl(null);
        onChange(state);
    };

    return (
        <>
            <Button
                className={rightAlign ? '' : style.headerButton}
                onClick={handleClick}
                color={color}
                classes={{
                    text: classes.root,
                    outlined: classes.outlined,
                    root: classes.buttonRoot,
                }}
                name="name"
                variant={variant}
                {...buttonProps}
            >
                {placeholder ? (
                    placeholder
                ) : (
                    <>
                        <ChevronLeftIcon fontSize="small" color="primary" />
                        <span className={style.textButton}>
                            {date.from.format('MM YYYY') !== date.to.format('MM YYYY')
                                ? `   ${date.from.format('DD.MM.YYYY')} - ${date.to.format(
                                      'DD.MM.YYYY'
                                  )}`
                                : `   ${date.from.format('DD')} - ${date.to.format('DD.MM.YYYY')}`}
                        </span>
                        <ChevronRightIcon color="primary" fontSize="small" />
                    </>
                )}
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
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
                    <div>
                        <DateRangePicker
                            color="#fa835f"
                            showPreview={false}
                            navigatorRenderer={(currentFocusedDate, changeShownDate) => {
                                if (!chagedShownDate) {
                                    changeShownDate(
                                        moment(currentFocusedDate)
                                            .subtract(1, 'months')
                                            .toDate()
                                    );
                                    updateShownDate(currentFocusedDate);
                                }
                                return (
                                    <div className={style.navigationContainer}>
                                        <button
                                            onClick={() => {
                                                changeShownDate(
                                                    moment(currentFocusedDate)
                                                        .subtract(1, 'months')
                                                        .toDate()
                                                );
                                            }}
                                            type="button"
                                            className="rdrNextPrevButton rdrPprevButton"
                                        >
                                            <i></i>
                                        </button>
                                        <div>
                                            <span className="rdrMonthAndYearPickers">
                                                {moment(currentFocusedDate)
                                                    .add(1, 'month')
                                                    .format('MMMM')}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                changeShownDate(
                                                    moment(currentFocusedDate)
                                                        .add(1, 'months')
                                                        .toDate()
                                                );
                                            }}
                                            type="button"
                                            className="rdrNextPrevButton rdrNextButton"
                                        >
                                            <i></i>
                                        </button>
                                    </div>
                                );
                            }}
                            showMonthAndYearPickers={false}
                            staticRanges={defaultStaticRanges}
                            showDateDisplay={false}
                            rangeColors={['#fa835f', '#fa835f']}
                            locale={locales['ru']}
                            inputRanges={[]}
                            onChange={item => setState([item.selection])}
                            showSelectionPreview
                            moveRangeOnFirstSelection={false}
                            months={2}
                            ranges={state}
                            direction="horizontal"
                            maxDate={new Date()}
                        />
                    </div>
                    <div className={style.buttonConfirm}>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={handleClose}
                        >
                            Ok
                        </Button>
                    </div>
                </div>
            </Popover>
        </>
    );
}
DatePicker.defaultProps = {
    options: [],
    onChange: () => {},
};
DatePicker.propTypes = {
    date: PropTypes.shape({
        from: PropTypes.instanceOf(moment),
        to: PropTypes.instanceOf(moment),
    }),

    onChange: PropTypes.func,
};
