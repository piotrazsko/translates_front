import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.action.hover,
    },
    outlined: { backgroundColor: '#fff', borderRadius: '6px' },
    checkboxContainer: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
}));

export default function SimpleSelect({
    options,
    placeholder,
    onChange,
    value,
    className,
    variant = 'text',
    color,
    // value,
    // required,
    // ...props
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Button
                color={color}
                aria-describedby={id}
                onClick={handleClick}
                classes={{ text: classes.root, outlined: classes.outlined }}
                name="name"
                variant={variant}
                endIcon={<ExpandMoreIcon color="primary" />}
            >
                {get(value, 'label', placeholder)}
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
                <div className={classes.checkboxContainer}>
                    {options.map(i => (
                        <FormControlLabel
                            key={i.id || i.label}
                            control={
                                <Checkbox
                                    checked={i.id === value.id}
                                    onChange={() => {
                                        handleClose();
                                        if (i.id !== value.id) {
                                            onChange(i);
                                        } else {
                                            onChange(false);
                                        }
                                    }}
                                    color="primary"
                                />
                            }
                            label={i.label}
                        />
                    ))}
                </div>
            </Popover>
        </>
    );
}
SimpleSelect.defaultProps = {
    options: [],
    onChange: () => {},
};
SimpleSelect.propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array.isRequired,
    value: PropTypes.any,
    className: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
};
