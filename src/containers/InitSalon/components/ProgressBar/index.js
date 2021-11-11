import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles(theme => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#FA835F',
    },
}))(LinearProgress);

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    textContainer: {
        display: 'flex',
        'justify-content': 'space-between',
        marginBottom: 15,
        width: '100%',
        fontSize: 14,
    },
});

const ProgressBar = ({ progress = 0, text = 'Создание салона' }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.textContainer}>
                <div>{text}</div>
                <div>{`${progress}%`}</div>
            </div>
            <BorderLinearProgress variant="determinate" value={progress} />
        </div>
    );
};
ProgressBar.propTypes = {
    progress: PropTypes.number,
    text: PropTypes.string,
};
export default ProgressBar;
