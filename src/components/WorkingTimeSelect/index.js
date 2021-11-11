import React from 'react';
import PropTypes from 'prop-types';
import Grid from '../GridTable';
import Cell from './Cell';
import Days from './Days';
import { prepareWorkingTimeIntervals, recoveryWorkingTimeIntervals } from './utils';
import style from './style.module.scss';

const WorkingTimeSelect = ({
    workingTimeIntervals,
    isMobile = false,
    selectedTimeText = 'Рабочее время',
    startTime,
    endTime,
    interval,
    startWeekDay,
    onChange,
    showIntervals = true,
}) => {
    const workingTimePrepared = React.useMemo(() => {
        return recoveryWorkingTimeIntervals({
            data: workingTimeIntervals,
            startTime,
            interval,
            startWeekDay,
        });
    }, [workingTimeIntervals, startTime, interval, startWeekDay]);

    const [selectedTime, selectTime] = React.useState([...workingTimePrepared]);

    React.useEffect(() => {
        onChange(
            prepareWorkingTimeIntervals({ data: selectedTime, startTime, interval, startWeekDay })
        );
    }, [selectedTime]);
    React.useEffect(() => {
        if (
            workingTimePrepared.length !== selectedTime.length ||
            !workingTimePrepared.every(item =>
                selectedTime.find(i => i.col == item.col && i.row == item.row)
            )
        ) {
            selectTime([...workingTimePrepared]);
        }
    }, [workingTimePrepared]);

    const onSelect = selected => {
        if (
            selectedTime.find(item => {
                return (
                    selected.length > 0 &&
                    item.col === selected[0].col &&
                    item.row === selected[0].row
                );
            })
        ) {
            selectTime([
                ...selectedTime.filter(item => {
                    return !selected.find(i => item.col == i.col && item.row == i.row);
                }),
            ]);
        } else {
            selectTime([...selectedTime, ...selected]);
        }
    };
    const onClear = col => {
        selectTime([...[...selectedTime].filter(item => item.col !== col)]);
    };

    return (
        <div className={style.container}>
            {showIntervals && (
                <div className={style.resultContainer}>
                    <Days
                        startWeekDay={startWeekDay}
                        selectedTime={selectedTime}
                        startTime={startTime}
                        interval={interval}
                    />
                </div>
            )}
            <Grid
                isMobile={isMobile}
                className={style.gridContainer}
                cols={8}
                rows={Math.ceil((endTime - startTime) / interval + 1)}
                selectFromCol={1}
                selectToCol={7}
                selectFromRow={1}
                selectToRow={Math.ceil((endTime - startTime) / interval + 1)}
                setRowStyle={row => {
                    return row === 0 ? style.firstRow : '';
                }}
                setColStyle={col => {
                    return col === 0 ? style.firstColumn : '';
                }}
                cellProps={{
                    children: (
                        <Cell
                            startTime={startTime}
                            startWeekDay={startWeekDay}
                            endTime={endTime}
                            interval={interval}
                            selectedTimeText={selectedTimeText}
                            onClear={onClear}
                            isMobile={isMobile}
                        />
                    ),
                }}
                selected={selectedTime}
                onSelect={onSelect}
            />
        </div>
    );
};

WorkingTimeSelect.propTypes = {
    onChange: PropTypes.func,
    isMobile: PropTypes.bool,
    selectedTimeText: PropTypes.string,
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    startWeekDay: PropTypes.number,
    interval: PropTypes.number,
    workingTimeIntervals: PropTypes.object,
    showIntervals: PropTypes.bool,
};
WorkingTimeSelect.defaultProps = {
    workingTime: [],
    startTime: 300,
    endTime: 1440,
    interval: 60,
    startWeekDay: 1, //utc day of week
    workingTimeIntervals: {},
};

export default WorkingTimeSelect;
