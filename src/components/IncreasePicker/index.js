import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import { NumberFormat, SkillItem } from 'components';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import style from './style.scss';
const color = '#fa835f"';
const useStyles = makeStyles(theme => ({
    button: {
        background: '#FFFAF6',
        border: '2px solid #FA835F',
        color: '#FA835F',
        margin: '0 0px;',
        width: '32px',
        height: '32px',
    },
    inputRoot: {
        minWidth: '180px',
        margin: '0 10px',
    },
    input: {
        height: '32px',
        boxSizing: 'border-box',
        'text-align': 'center',
        fontSize: '12px',
    },
    formControll: {
        width: '100%',
        minWidth: '180px',
    },
}));

const saveNumber = ({ setNumber, ev }) => {
    const str = ev.target.value || '';
    const number = str.replace(/[^0-9.]/g, '');
    if (number >= 0) {
        setNumber(number);
    }
};

const IncreasePicker = ({
    step = 5,
    required = true,
    max,
    min,
    onChange,
    value,
    helperText,
    label,
    suffix,
    disabled = false,
}) => {
    const classes = useStyles();

    return (
        <FormControl required={required} classes={{ root: classes.formControll }}>
            <InputLabel shrink htmlFor="my-input">
                {label || ''}
            </InputLabel>
            <div id="my-input" className={style.durationContainer}>
                <IconButton
                    disabled={disabled}
                    size="small"
                    classes={{ root: classes.button }}
                    onClick={() => {
                        if (value - step > min) {
                            onChange((parseFloat(value) || min) - step);
                        }
                    }}
                >
                    <RemoveIcon className={style.icon} htmlColor={color} />
                </IconButton>
                <TextField
                    disabled={disabled}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    onChange={ev => {
                        saveNumber({ setNumber: onChange, ev });
                    }}
                    className={style.textField}
                    InputProps={{
                        inputProps: {
                            displayType: 'input',
                            suffix: suffix || '',
                        },
                        inputComponent: NumberFormat,
                        classes: { input: classes.input, root: classes.inputRoot },
                    }}
                    value={value}
                    variant="outlined"
                    placeholder="Например 120 мин"
                    helperText={helperText}
                />
                <IconButton
                    disabled={disabled}
                    size="small"
                    classes={{ root: classes.button }}
                    onClick={() => {
                        if (!value || value <= max - step) {
                            onChange((parseFloat(value) || 0) + step);
                        } else {
                            onChange(max);
                        }
                    }}
                >
                    <AddIcon className={style.icon} htmlColor={color} />
                </IconButton>
            </div>
        </FormControl>
    );
};

IncreasePicker.propTypes = {
    step: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    onChange: PropTypes.func,
    value: PropTypes.number,
    helperText: PropTypes.any,
    suffix: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default IncreasePicker;
