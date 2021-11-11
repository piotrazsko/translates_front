import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import EditIcon from '@material-ui/icons/Edit';
import { Phone } from 'assets/img/svg/prepared';
import { showPopupAction } from 'modules/popups';
import { prepareSearchString } from 'helpers/url';
import { getSalonSelector } from 'modules/salon';
import { getEventsHistoryRequest, getEventsHistorySelector } from 'modules/events';
import {
    getMasterDetailsRequest,
    getMasterDetailSelector,
    deleteMasterRequest,
    addAvatarRequest,
} from 'modules/masters';
import { RatingLocation, Skeleton, EventItem, Dropzone } from 'components';
import { SkillItem } from 'feelqueen_components';

import { ReactComponent as EditIcon } from '../../assets/img/svg/edit.svg';
import { ReactComponent as DeleteIcon } from '../../assets/img/svg/delete.svg';
import style from './style.scss';

const color = ' #fa835f';
const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '0 !important',
        height: 40,
        width: 40,
        boxSizing: 'border-box',
        '&:hover': {
            borderWidth: 1,
        },
        padding: 0,
        margin: '0px 15px 0 0 !important',
        // minWidth: 40,
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

const InitFeedbacks = ({
    history,
    match: {
        params: { id: user_id },
    },
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [textError] = React.useState('');
    const { id, currency_id } = useSelector(getSalonSelector);
    const master = useSelector(getMasterDetailSelector);
    const events = useSelector(getEventsHistorySelector);
    React.useEffect(() => {
        if (id) {
            dispatch(getMasterDetailsRequest({ id, master_id: user_id }));
            dispatch(getEventsHistoryRequest({ id, master_ids: [user_id], limit: 5 }));
        }
    }, [id]);
    const onDrop = data => {
        dispatch(
            addAvatarRequest(
                { id, master_id: user_id, image: data },
                {
                    onSuccess: () => {
                        dispatch(getMasterDetailsRequest({ id, master_id: user_id }));
                    },
                }
            )
        );
    };
    const {
        first_name = ' ',
        last_name = ' ',
        phone,
        avatar,
        rating,
        city,
        salon_services = [],
        skills = [],
        can_create_event,
        can_update_event,
        feedback_count,
    } = master;
    const onDelete = () => {
        dispatch(
            showPopupAction({
                message: 'Вы действительно хотите удалить мастера?',
                onClick: () => {
                    dispatch(
                        deleteMasterRequest(
                            {
                                id,
                                user_id,
                            },
                            {
                                onSuccess: () => {
                                    history.push('/masters');
                                },
                            }
                        )
                    );
                    return true;
                },
                onCancel: () => true,
                showCancel: true,
                submitButtonText: 'Ok',
                confirmButtonProps: { size: 'small' },
                cancelButtonProps: { size: 'small' },
            })
        );
    };
    return (
        <Skeleton
            textError={textError}
            title={`${first_name || ''} ${last_name ? last_name : ''}`}
            nextButtonText="Новая запись"
            showBreadcump
            subTitle=""
            classes={{ children: style.skeletonChildren }}
            bottomPositionButtons={false}
            breadcamps={[{ link: '/masters', title: 'Сотрудники' }]}
            headerChildren={
                <React.Fragment>
                    <div className={style.buttonContainer}>
                        <Button
                            classes={{ root: classes.root }}
                            onClick={() => {
                                history.push('/add-master/' + user_id);
                            }}
                            variant="outlined"
                        >
                            <EditIcon className={classes.icon} />
                        </Button>

                        <Button
                            classes={{ root: classes.root }}
                            margin="none"
                            onClick={onDelete}
                            variant="outlined"
                        >
                            <DeleteIcon className={classes.icon} />
                        </Button>
                        <Button
                            margin="none"
                            onClick={() => {
                                history.push('/calendar/edit/' + user_id);
                            }}
                            variant="contained"
                            color="primary"
                        >
                            Расписание
                        </Button>
                    </div>
                </React.Fragment>
            }
            onNext={() => {
                history.push(
                    `/event/add?${prepareSearchString({
                        master: user_id,
                    })}`
                );
            }}
        >
            <Grid container className={style.gridContainer}>
                <Grid item xs={12}>
                    <div className={style.infoContainer}>
                        <Dropzone onDrop={onDrop}>
                            <Avatar
                                src={avatar}
                                className={classes.avatar}
                            >{`${first_name[0].toUpperCase()} ${
                                last_name ? last_name[0].toUpperCase() : ''
                            }`}</Avatar>
                        </Dropzone>
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
                    <div className={style.accessContainer}>
                        <div className={style.accessItem}>
                            {can_create_event ? (
                                <CheckCircleIcon className={style.iconAccess} color="primary" />
                            ) : (
                                <RadioButtonUncheckedIcon
                                    className={style.iconAccess}
                                    color="primary"
                                />
                            )}
                            Создает записи
                        </div>
                        <div className={style.accessItem}>
                            {can_update_event ? (
                                <CheckCircleIcon className={style.iconAccess} color="primary" />
                            ) : (
                                <RadioButtonUncheckedIcon
                                    className={style.iconAccess}
                                    color="primary"
                                />
                            )}
                            Редактирует записи
                        </div>
                    </div>
                    <div className={style.subtitle}>Оказываемые услуги</div>
                    <div className={style.item}>
                        {skills.map(i => (
                            <SkillItem
                                key={i.id}
                                currency_id={currency_id}
                                showDelete={false}
                                showEdit={false}
                                data={{
                                    ...i,
                                    duration: get(i, 'pivot.duration'),
                                    price: get(i, 'pivot.price'),
                                }}
                            />
                        ))}
                        {salon_services.map(i => (
                            <SkillItem
                                currency_id={currency_id}
                                key={i.id}
                                showDelete={false}
                                showEdit={false}
                                data={{
                                    ...i,
                                }}
                            />
                        ))}
                        {salon_services.length == 0 && skills.length == 0 && (
                            <div className={style.placeHolderContainer}>
                                <div className={style.placeHolder}>
                                    Здесь будут отображены услуги,оказываемые сотрудником
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={style.subtitle}>История записей</div>
                    {events.length > 0 ? (
                        <div className={style.item}>
                            {events.map(item => (
                                <EventItem key={item.id} data={item} history={history} />
                            ))}
                        </div>
                    ) : (
                        <div className={style.placeHolderContainer}>
                            <div className={style.placeHolder}>
                                Здесь будет отображена история записей сотрудника
                            </div>
                        </div>
                    )}
                </Grid>
            </Grid>
        </Skeleton>
    );
};

InitFeedbacks.propTypes = {
    history: PropTypes.object,
    match: PropTypes.shape({
        params: PropTypes.object,
    }),
};

export default InitFeedbacks;
