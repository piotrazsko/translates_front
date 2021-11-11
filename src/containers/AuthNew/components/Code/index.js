import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import style from './style.scss';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        fontSize: 16,
    },
}));

const Code = ({ code, setCode }) => {
    const classes = useStyles();
    return (
        <div className={style.container}>
            <TextField
                className={style.textField}
                autoComplete="off"
                fullWidth
                type="password"
                inputmode="numeric"
                value={code}
                placeholder="xxxx"
                maxlength="4"
                minlength="4"
                color="primary"
                classes={{ root: classes.root }}
                onChange={ev => {
                    if (ev.target.value.length < 5) {
                        setCode(ev.target.value);
                    }
                }}
            />
        </div>
    );
};

Code.propTypes = {
    code: PropTypes.string,
    setCode: PropTypes.func.isRequired,
};

export default Code;
