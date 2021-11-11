import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { TimePicker } from 'components';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import style from './style.scss';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles(theme => ({
    root: {
        marginRight: 10,
        backgroundColor: '#fff',
    },
    outlined: { backgroundColor: '#fff', borderRadius: 6 },
}));
const TimeSelectLIne = ({ startTime, endTime, setStartTime, setEndTime, onDelete, disabled }) => {
    const classes = useStyles();
    // const disabledTime = React.useMemo(() => {
    //     return events
    //         .filter(
    //             i =>
    //                 master.id === i.master.id && i.status_id === CONFIRMED_STATUS && i.id != eventId
    //         )
    //         .map(i => ({
    //             start: moment(i.date).hours() * 60 + moment(i.date).minutes(),
    //             duration: i.duration,
    //         }));
    // }, [events, master]);
    return (
        <div className={style.container}>
            <TimePicker
                disabled={disabled}
                inputProps={{
                    label: 'Начало',
                    InputLabelProps: { shrink: true },
                    variant: 'outlined',
                    classes: { root: classes.root, outlined: classes.outlined },
                    InputProps: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <KeyboardArrowDownIcon htmlColor={'#767676'} />
                            </InputAdornment>
                        ),
                    },
                }}
                value={startTime}
                onChange={setStartTime}
            />
            <TimePicker
                disabled={disabled}
                inputProps={{
                    label: 'Конец',
                    InputLabelProps: { shrink: true },
                    color: 'primary',
                    variant: 'outlined',
                    classes: { root: classes.root },
                    InputProps: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <KeyboardArrowDownIcon htmlColor={'#767676'} />
                            </InputAdornment>
                        ),
                    },
                }}
                value={endTime}
                onChange={setEndTime}
            />
            {onDelete ? (
                <IconButton size="small" color="primary" onClick={onDelete}>
                    <DeleteOutlineIcon />
                </IconButton>
            ) : (
                <IconButton size="small" />
            )}
        </div>
    );
};

TimeSelectLIne.propTypes = {
    startTime: PropTypes.object,
    endTime: PropTypes.object,
    setStartTime: PropTypes.func,
    setEndTime: PropTypes.func,
    onDelete: PropTypes.func,
    disabled: PropTypes.bool,
};

export default TimeSelectLIne;
