import React from 'react';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    root: {
        // fontSize: 20,
        // marginBottom: 24,
    },
}));
const Label = ({ children, title, fontSize }) => {
    const classes = useStyles();
    const id = React.useMemo(() => Math.floor(Math.random() * 1000), []);
    return (
        <FormControl component="fieldset" fullWidth>
            <InputLabel
                htmlFor={'input-with-icon-adornment' + id}
                shrink
                classes={{ root: classes.root }}
            >
                <span style={fontSize ? { fontSize: fontSize } : {}}>{title}</span>
            </InputLabel>

            <div id={'input-with-icon-adornment' + id}>{children}</div>
        </FormControl>
    );
};

Label.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
};

export default Label;
