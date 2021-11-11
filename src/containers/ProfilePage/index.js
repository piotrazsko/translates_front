import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import InstagramIcon from '@material-ui/icons/Instagram';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinkIcon from '@material-ui/icons/Link';
import {
    getSalonSelector,
    setSalonAvatarRequest,
    getDeeplinkRequest,
    getSalonDeeplinkSelector,
    deleteSalonAction,
    getSalonRequest,
} from 'modules/salon';
import { getSalonWorkTimeRequest, getSalonWorkingTimeSelector } from 'modules/working_time';

import { Skeleton, InfoCard, Label } from 'components';
import EditCard from './components/EditCard';
import ProfileData from './components/ProfileData';
import { recoveryWorkingTimeIntervals } from '../../components/WorkingTimeSelect/utils';
import { WEEKDAYS_SHORT, getWorkPeriodsOfDay } from 'helpers/calendar';
import UploadPopup from './components/UploadPopup';
import { setUploadCrmRequest, setAuthYclientsRequest } from 'modules/upload_crm';
import style from './style.scss';

const startWeekDay = 1;
const startTime = 300;

const ProfilePage = ({ route, history }) => {
    const { id, ...currentUser } = useSelector(getSalonSelector);
    const instagram = get(currentUser, 'info.instagram');
    const site = get(currentUser, 'info.site');
    const [textError, setTextError] = React.useState();
    const [showUploadPopup, switchUploadPopup] = React.useState(false);

    const dispatch = useDispatch();
    const { title, avatar, phone, location, rating, feedback_count, portfolio = [] } = currentUser;
    const metro = get(location, 'metro_station.title');
    const address = get(location, 'address');
    const place = get(location, 'place');
    const delivery = get(currentUser, 'info.is_work_at_client');
    const portfolioPaths = portfolio.reduce((acc, item) => {
        return [...acc, ...item.images];
    }, []);
    const workingTime = useSelector(getSalonWorkingTimeSelector);
    const deepLink = useSelector(getSalonDeeplinkSelector);
    const interval = get(currentUser, 'info.working_time_interval', 60);
    React.useEffect(() => {
        if (id) {
            dispatch(getSalonWorkTimeRequest({ id }));
            dispatch(getDeeplinkRequest({ id }));
            dispatch(getSalonRequest({ id }));
        }
    }, [id]);

    const workingTimePrepared = React.useMemo(() => {
        const arr = recoveryWorkingTimeIntervals({
            data: workingTime,
            startTime,
            interval,
            startWeekDay,
        });
        const days = arr.reduce((accumulator, item) => {
            accumulator[item.col - 1] = accumulator[item.col - 1]
                ? [...accumulator[item.col - 1], item.row]
                : [item.row];
            return accumulator;
        }, []);
        const res = days.map((item, index) => {
            const sorted = item.sort((a, b) => a - b);
            return {
                day: WEEKDAYS_SHORT[(index + startWeekDay) % 7],
                time: getWorkPeriodsOfDay(sorted, interval, startTime, ' '),
            };
        });

        return res;
    }, [workingTime]);
    const ref = React.useRef(null);
    const importFiles = data => {
        var fd = new FormData();
        Object.keys(data).map(i => fd.append(i, data[i]));
        dispatch(
            setUploadCrmRequest(
                { id, data: fd },
                { onSuccess: () => switchUploadPopup(!showUploadPopup) }
            )
        );
    };
    const setCRMSync = ({ onSuccess, data }) => {
        dispatch(setAuthYclientsRequest({ id, data }, { onSuccess, onFailure: onSuccess }));
    };
    return (
        <Skeleton
            bottomPositionButtons={false}
            backgroundColor="#fffaf6"
            textError={textError}
            title="Профиль"
            onNext={false}
            subTitle=""
            classes={{ children: style.skeletonChildren }}
            headerChildren={
                <React.Fragment>
                    <div className={style.headerButtons}>
                        {instagram && (
                            <IconButton
                                onClick={() => window.open('https://instagram.com/' + instagram)}
                            >
                                <InstagramIcon />
                            </IconButton>
                        )}
                        {site && (
                            <IconButton onClick={() => window.open(site)}>
                                <LinkIcon />
                            </IconButton>
                        )}
                        <IconButton
                            onClick={() => {
                                dispatch(deleteSalonAction());
                            }}
                        >
                            <DeleteOutlineIcon htmlColor="#EB5757" />
                        </IconButton>
                    </div>
                </React.Fragment>
            }
        >
            <ProfileData
                setAvatar={data => {
                    dispatch(setSalonAvatarRequest({ id, image: data }));
                }}
                name={title}
                avatar={avatar}
                feedback_count={feedback_count}
                rating={rating}
                location={location}
                phone={phone}
            />
            <Grid container spacing={3} className={style.container}>
                <Grid item md={6}>
                    <EditCard title="О салоне" onClick={() => history.push('/profile/edit')}>
                        <div>
                            {metro && (
                                <div className={style.item}>
                                    <div className={style.title}>Метро</div>
                                    <div className={style.value}>{metro}</div>
                                </div>
                            )}
                            {address && (
                                <div className={style.item}>
                                    <div className={style.title}>Адрес</div>
                                    <div className={style.value}>{address}</div>
                                </div>
                            )}
                            {place && (
                                <div className={style.item}>
                                    <div className={style.title}>Место</div>
                                    <div className={style.value}>{place}</div>
                                </div>
                            )}
                            {delivery && (
                                <div className={style.item}>
                                    <div className={style.title}>Выезд к клиенту</div>
                                    <div className={style.value}>
                                        <CheckCircleIcon color="primary" fontSize="small" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </EditCard>
                    <EditCard
                        onClick={() => history.push('/profile/working-time')}
                        title="Рабочее время"
                    >
                        {workingTimePrepared.map(i => {
                            return (
                                <div key={i.day} className={style.item}>
                                    <div className={style.title}>{i.day}</div>
                                    <div className={style.value}>{i.time}</div>
                                </div>
                            );
                        })}
                    </EditCard>
                </Grid>
                <Grid item md={6}>
                    <EditCard title="Портфолио" onClick={() => history.push('/profile/portfolio')}>
                        <div className={style.images}>
                            {portfolioPaths.map(i => {
                                return (
                                    <img
                                        className={style.image}
                                        key={i.id}
                                        src={i.thumb}
                                        alt={''}
                                    />
                                );
                            })}
                        </div>
                    </EditCard>
                    <InfoCard
                        showDivider={false}
                        title="Дополнительно"
                        showMenu={false}
                        classNameChildren={style.deepLinkCard}
                        className={style.deepLinkContainer}
                    >
                        <div className={style.deeplink}>
                            <TextField
                                value={deepLink.link}
                                id="outlined-basic"
                                label="Ссылка для записи через соц.сети"
                                fullWidth
                                inputProps={{ ref: ref }}
                                InputLabelProps={{ shrink: true }}
                            />
                            <Button
                                className={style.getLinkButton}
                                color="primary"
                                size="small"
                                variant="contained"
                                onClick={() => {
                                    ref.current.select();
                                    document.execCommand('copy');
                                }}
                            >
                                Копировать
                            </Button>
                        </div>
                        <div className={style.crms}>
                            <Button
                                onClick={() => switchUploadPopup(!showUploadPopup)}
                                color="primary"
                            >
                                Синхронизация данных с другими CRM
                            </Button>
                            {showUploadPopup && (
                                <UploadPopup
                                    setCRMSync={setCRMSync}
                                    onClear={() => {
                                        switchUploadPopup(!showUploadPopup);
                                    }}
                                    onSubmit={importFiles}
                                />
                            )}
                        </div>
                    </InfoCard>
                </Grid>
            </Grid>
        </Skeleton>
    );
};

ProfilePage.propTypes = {
    history: PropTypes.object,
};

export default ProfilePage;
