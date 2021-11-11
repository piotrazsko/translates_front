import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { getSalonSelector } from 'modules/salon';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { getEventsHistoryRequest, getEventsHistorySelector } from 'modules/events';
import { Phone } from 'assets/img/svg/prepared';

import { getClientInfoRequest, getClientInfoSelector, blockClientRequest } from 'modules/clients';
import { openChat } from 'modules/chat';
import { RatingLocation, Skeleton, EventItem, NumberFormat } from 'components';
import style from './style.scss';
const color = ' #fa835f';
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
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
// TODO:  add unblock client and

const ClinetDetails = ({
    history,
    match: {
        params: { id: user_id },
    },
    match,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [textError] = React.useState('');

    const events = useSelector(getEventsHistorySelector);
    const { id } = useSelector(getSalonSelector);
    const client = useSelector(getClientInfoSelector);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (ev, data) => {
        if (typeof data !== 'undefined') {
            dispatch(
                blockClientRequest(
                    { id, clientId: user_id },
                    {
                        onSucces: () => {
                            dispatch(getClientInfoRequest({ id, user_id: user_id }));
                        },
                    }
                )
            );
        }
        ev.stopPropagation();
        setAnchorEl(null);
    };

    React.useEffect(() => {
        if (id) {
            dispatch(getClientInfoRequest({ id, user_id: user_id }));
            dispatch(getEventsHistoryRequest({ id, client_ids: [user_id] }));
        }
    }, [id]);

    const {
        first_name = ' ',
        last_name = ' ',
        phone,
        avatar,
        rating,
        user_events_count,
        income,
        city,
        updated_at,
        feedback_count,
    } = client;
    return (
        <Skeleton
            textError={textError}
            nextButtonText="Записать клиента"
            showBreadcump
            classes={{ subtitle: style.subtitleContainer, children: style.skeletonChildren }}
            subTitle={
                <span className={style.subtitle}>
                    Добавлен: {moment(updated_at).format('MMMM YYYY')}
                </span>
            }
            showTitle
            title={`${first_name} ${last_name ? last_name : ''}`}
            bottomPositionButtons={false}
            breadcamps={[{ link: '/clients', title: 'Клиенты' }]}
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
                            <MenuItem onClick={ev => handleClose(ev, 0)}>
                                Заблокировать клиента
                            </MenuItem>
                        </Menu>
                        <Button
                            onClick={() => {
                                dispatch(openChat(user_id));
                            }}
                            variant="contained"
                            color="primary"
                        >
                            Написать
                        </Button>
                    </div>
                </React.Fragment>
            }
            onNext={() => {
                history.push('/event/add?client=' + user_id);
                // switchPopup(!showPopup);
            }}
        >
            <Grid container className={style.gridContainer}>
                <Grid item xs={12}>
                    <div className={style.infoContainer}>
                        <Avatar
                            src={avatar}
                            className={classes.avatar}
                        >{`${first_name[0].toUpperCase()} ${
                            last_name ? last_name[0].toUpperCase() : ''
                        }`}</Avatar>
                        <div className={style.info}>
                            <div className={style.phone}>
                                <Phone className={style.icon} htmlColor={color} /> +{phone}
                            </div>
                            <div
                                onClick={() => {
                                    history.push('/clients/' + user_id + '/feedbacks');
                                }}
                            >
                                <RatingLocation
                                    user_rating={rating}
                                    master_feedbacks_count={feedback_count}
                                    city={city}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={style.ordersInfo}>
                        <span>
                            Записи клиента: <span className={style.count}>{user_events_count}</span>{' '}
                        </span>
                        <span>
                            Оказано услуг на:{' '}
                            <span className={style.count}>
                                <NumberFormat value={income} />
                            </span>
                        </span>
                    </div>
                    {events.length > 0 ? (
                        <div>
                            {events.map(item => (
                                <EventItem showMaster key={item.id} data={item} history={history} />
                            ))}
                        </div>
                    ) : (
                        <div className={style.placeHolderContainer}>
                            <div className={style.placeHolder}>
                                Здесь будет отображена история записей клиента
                            </div>
                        </div>
                    )}
                </Grid>
            </Grid>
        </Skeleton>
    );
};

ClinetDetails.propTypes = {
    history: PropTypes.object,
    match: PropTypes.shape({
        params: PropTypes.object,
    }),
};

export default ClinetDetails;
