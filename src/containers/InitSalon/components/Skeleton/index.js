import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ProgressBar from '../ProgressBar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';

import style from './style.scss';
const Skeleton = ({
    children,
    onBack,
    onNext,
    progress = 0,
    nextButtonText = 'Далее',
    backButtonText = 'Назад',
    showProgressBar = true,
    title = '',
    textError = '',
    textInfo = '',
    subTitle = '',
}) => {
    return (
        <Grid container className={style.root}>
            <Grid item xs={1} />
            <Grid item xs={10}>
                {showProgressBar && (
                    <Grid container>
                        <Grid item xs={8}>
                            <ProgressBar progress={progress} />
                        </Grid>
                    </Grid>
                )}
                <div className={showProgressBar ? style.title : ''}>
                    <Typography variant="h4">{title}</Typography>
                </div>
                <div className={style.children}>
                    <span className={style.subTitle}>{subTitle}</span>
                    {children}
                </div>
                <div>
                    {backButtonText && (
                        <Button
                            size="large"
                            variant="outlined"
                            className={style.buttonLeft}
                            color="primary"
                            onClick={onBack}
                        >
                            <ArrowBackIcon className={style.arrow} />
                            {backButtonText}
                        </Button>
                    )}
                    {nextButtonText && (
                        <Button
                            size="large"
                            variant="contained"
                            className={style.buttonRight}
                            color="primary"
                            onClick={onNext}
                        >
                            {nextButtonText}
                        </Button>
                    )}
                    <span className={style.textError}> {textError}</span>
                    <span className={style.textInfo}> {textInfo}</span>
                </div>
            </Grid>
            <Grid item={1} />
        </Grid>
    );
};

Skeleton.propTypes = {
    children: PropTypes.any,
    onBack: PropTypes.func,
    onNext: PropTypes.func,
    progress: PropTypes.number,
    nextButtonText: PropTypes.string,
    backButtonText: PropTypes.string,
    title: PropTypes.string,
    showProgressBar: PropTypes.bool,
    textError: PropTypes.string,
    // : PropTypes.
};
Skeleton.defaultProps = {
    onBack: () => {},
    onNext: () => {},
};

export default Skeleton;
