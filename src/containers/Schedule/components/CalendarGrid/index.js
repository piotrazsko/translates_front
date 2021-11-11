import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'feelqueen_components';
import moment from 'moment';
import Cell from './Cell';
import style from './style.scss';

const startWeekDay = 1;

const CalendarGrid = ({
    data,
    highlighed,
    selectedMonth = new Date(),
    selectedDates = [],
    setSelectedDates = () => [],
}) => {
    const highlighedDays = React.useMemo(() => {
        return highlighed.map(i => moment(i.start).date());
    }, [highlighed]);
    const startOfMonth = moment(selectedMonth).date(0);
    const endOfMonth = moment(selectedMonth).endOf('month');
    const firstDayOfWeek = startOfMonth.day();
    const onClick = (day, isDelete = false) => {
        if (!isDelete) {
            setSelectedDates([
                ...selectedDates,
                moment(selectedMonth)
                    .date(day)
                    .toDate(),
            ]);
        } else {
            setSelectedDates([
                ...selectedDates.filter(i => {
                    return (
                        moment(i).format('DDMMYYYY') !==
                        moment(selectedMonth)
                            .date(day)
                            .format('DDMMYYYY')
                    );
                }),
            ]);
        }
    };
    const selectedDaysArr = React.useMemo(() => {
        return selectedDates
            .filter(
                i =>
                    moment(i)
                        .startOf('month')
                        .toDate()
                        .valueOf() ===
                    moment(selectedMonth)
                        .startOf('month')
                        .toDate()
                        .valueOf()
            )
            .map(i => moment(i).date());
    }, [selectedDates, selectedMonth]);
    return (
        <div className={style.container}>
            <Grid
                className={style.gridContainer}
                setRowStyle={row => {
                    switch (true) {
                        case row == 0:
                            return style.firstRow;
                        default:
                            return style.cell;
                    }
                }}
                setColStyle={col => {
                    return style.column;
                }}
                cols={7}
                rows={7}
                cellProps={{
                    children: (
                        <Cell
                            highlighedDays={highlighedDays}
                            selectedDaysArr={selectedDaysArr}
                            onClick={onClick}
                            startWeekDay={startWeekDay}
                            firstDayOfWeek={firstDayOfWeek}
                            lastDate={endOfMonth.date()}
                        />
                    ),
                }}
            />
        </div>
    );
};

CalendarGrid.propTypes = {
    data: PropTypes.object,
};

export default CalendarGrid;
