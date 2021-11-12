import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Skeleton } from 'components';

import style from './style.scss';

const useStyles = makeStyles(theme => ({
    root: {
        height: 40,
        width: 40,
        borderWidth: 2,
        boxSizing: 'border-box',
        '&:hover': {
            borderWidth: 2,
        },
        padding: 0,
        margin: '0px 15px 0 0 !important',
        minWidth: '0 !important',
    },
    icon: { fontSize: 22 },
}));
// TODO:  add unblock client and

const Translate = ({
    history,
    match: {
        params: { id: key },
    },
    match,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [textError] = React.useState('');

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (ev, data) => {
        ev.stopPropagation();
        setAnchorEl(null);
    };

    return (
        <Skeleton
            textError={textError}
            nextButtonText="Записать клиента"
            showBreadcump
            classes={{ subtitle: style.subtitleContainer, children: style.skeletonChildren }}
            subTitle={''}
            showTitle
            title={``}
            bottomPositionButtons={false}
            breadcamps={[{ link: '/translates', title: 'Translates' }]}
            headerChildren={
                <React.Fragment>
                    <div className={style.buttonContainer}>
                        <Button
                            classes={{ root: classes.root }}
                            onClick={handleClick}
                            variant="outlined"
                            margin="none"
                            color="primary"
                        >
                            <MoreHorizIcon className={classes.icon} />
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={ev => {
                                handleClose(ev);
                            }}
                        >
                            <MenuItem onClick={ev => handleClose(ev, 0)}>test</MenuItem>
                        </Menu>
                    </div>
                </React.Fragment>
            }
            onNext={() => {}}
        ></Skeleton>
    );
};

Translate.propTypes = {
    history: PropTypes.object,
    match: PropTypes.shape({
        params: PropTypes.object,
    }),
};

export default Translate;
