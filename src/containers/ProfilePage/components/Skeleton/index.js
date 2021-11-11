import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import { NavLink } from 'react-router-dom';

import style from './style.scss';
const Skeleton = ({
    children,
    nextButtonText = '+ Добавить мастера',
    onNext,
    title = '',
    subTitle = '',
    showBreadcump = false,
    breadcamps = [],
}) => {
    return (
        <Grid container className={style.root}>
            <Grid item xs={1} />
            <Grid item xs={10}>
                <div className={style.title}>
                    {showBreadcump ? (
                        <Breadcrumbs separator=">" aria-label="breadcrumb">
                            {breadcamps.map(i => {
                                return (
                                    <NavLink key={i.link} className={style.link} to={i.link}>
                                        {i.profile}
                                    </NavLink>
                                );
                            })}
                            <Typography color="textPrimary">{title}</Typography>
                        </Breadcrumbs>
                    ) : (
                        <Typography variant="h4">{title}</Typography>
                    )}
                    {onNext && (
                        <Button onClick={onNext} variant="contained" color="primary">
                            {nextButtonText}
                        </Button>
                    )}
                </div>
                {showBreadcump && <Typography variant="h4">{title}</Typography>}
                <div className={style.children}>
                    <span className={style.subTitle}>{subTitle}</span>
                    {children}
                </div>
            </Grid>
            <Grid item={1} />
        </Grid>
    );
};

Skeleton.propTypes = {
    children: PropTypes.any,
    onNext: PropTypes.func,
    subTitle: PropTypes.string,
    title: PropTypes.string,
    showBreadcump: PropTypes.bool,
};
Skeleton.defaultProps = {
    onNext: () => {},
};

export default Skeleton;
