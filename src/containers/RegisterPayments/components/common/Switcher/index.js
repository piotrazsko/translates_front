import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const useStyles = makeStyles(theme => {
    const borderRadius = theme.overrides.MuiButton.root.borderRadius;
    return {
        button: {
            marginRight: 0,
            minWidth: 160,
            height: 37,
        },
        left: {
            borderRadius: `${borderRadius}px 0 0 ${borderRadius}px`,
        },
        right: {
            borderRadius: `0 ${borderRadius}px ${borderRadius}px 0`,
        },
    };
});

const Switcher = ({values, value, onChange, getValue, getLabel}) => {
    const styles = useStyles();
    const onButtonClick = (v) => () => {
        onChange(v);
    }

    return (
        <>
            {values.map((v, i) => {
                const currentValue = getValue(v);
                const isActive = currentValue === value;
                return <Button
                    key={i}
                    variant={isActive ? 'contained' : 'outlined'}
                    color='primary'
                    onClick={onButtonClick(currentValue)}
                    size='medium'
                    className={classNames(styles.button, {
                        [styles.left]: i === 0,
                        [styles.right]: i === 1,
                    })}
                >
                    {getLabel(v)}
                </Button>
            })}
        </>
    )
}

Switcher.propTypes = {
    values: PropTypes.arrayOf(PropTypes.object).isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    getLabel: PropTypes.func.isRequired,
};

export default Switcher;