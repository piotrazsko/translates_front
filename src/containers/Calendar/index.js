import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TimelineIcon from '@material-ui/icons/Timeline';
import AddIcon from '@material-ui/icons/Add';
import { TimeGrid } from 'feelqueen_components';
import { getSalonSelector } from 'modules/salon';
import {
    getMastersRequest,
    setMasterWorkingTimeRequest,
    getSalonMastersSelector,
} from 'modules/masters';

import { getWorkingTimeRequest, getWorkingTimeSelector } from 'modules/working_time';
import { getEventsHistoryRequest, getEventsHistorySelector } from 'modules/events';
import { getDailyStatisticRequest, getDailyStatisticSelector } from 'modules/statistics';
import {
    Skeleton,
    NumberFormat,
    Calendar as CalendarComponent,
    InfoCard,
    InfoCardLine,
    PagePlaceHolder,
} from 'components';
import { prepareSearchString } from 'helpers/url';
import TimeBreackPopup from './components/TimeBreackPopup';
import { useContext } from './hooks';
import style from './style.scss';

const useStyles = makeStyles(theme => ({
    add: {
        minWidth: '50px',
        // padding: '6px',
    },
    price: {
        marginLeft: 'auto',
    },
}));

const Calendar = ({ viewPort, history, ...props }) => {
    const classes = useStyles();
    const interval = 10;
    const {
        handleClickCard,
        handleCloseCard,
        showTimeBreackPopup,
        switchTimeBreakPopup,
        handleCloseContext,
        handleCloseContextMaster,
        handleContextMasterClick,
        handleContextClick,
        contextPosition,
        anchorEl,
        contextData,
        contextCellEl,
        contextCellElMaster,
    } = useContext(history);
    const { id, currency_id, services = [], skills = [], ...salon } = useSelector(getSalonSelector);
    const [date, setDate] = React.useState(new Date());
    const mastersArr = useSelector(getSalonMastersSelector);
    const events = useSelector(getEventsHistorySelector);
    const statiscDaily = useSelector(getDailyStatisticSelector);
    const workingTime = useSelector(getWorkingTimeSelector);
    React.useEffect(() => {
        if (id) {
            dispatch(getMastersRequest({ id }));
            dispatch(
                getEventsHistoryRequest({
                    id,
                    fromDate: moment(date)
                        .startOf('day')
                        .format('YYYY-MM-DD HH:mm:ss'),
                    toDate: moment(date)
                        .endOf('day')
                        .format('YYYY-MM-DD HH:mm:ss'),
                })
            );
            dispatch(getDailyStatisticRequest({ id, date: moment(date).format('YYYY-MM-DD') }));
            dispatch(
                getWorkingTimeRequest({
                    id,
                    from: moment(date).format('YYYY-MM-DD'),
                    to: moment(date).format('YYYY-MM-DD'),
                })
            );
        }
    }, [id]);
    React.useEffect(() => {
        if (id) {
            dispatch(
                getDailyStatisticRequest({
                    id,
                    date: moment(date).format('YYYY-MM-DD'),
                    showLoaderFlag: false,
                })
            );
            dispatch(
                getWorkingTimeRequest({
                    id,
                    from: moment(date).format('YYYY-MM-DD'),
                    to: moment(date).format('YYYY-MM-DD'),
                })
            );
            dispatch(
                getEventsHistoryRequest({
                    id,
                    fromDate: moment(date)
                        .startOf('day')
                        .format('YYYY-MM-DD HH:mm:ss'),
                    toDate: moment(date)
                        .endOf('day')
                        .format('YYYY-MM-DD HH:mm:ss'),
                })
            );
        }
    }, [date]);

    const [filter, setFilter] = React.useState([]);
    const { masters } = React.useMemo(() => {
        return {
            masters: [
                ...mastersArr
                    .filter(i => i.status == 'confirmed')
                    .filter(i => i.skills_count > 0 || i.services_count > 0)
                    .map(i => {
                        const eventsArr = events
                            .filter(item => item.master_id == i.id)
                            .filter(item =>
                                filter.length > 0 ? filter.find(i => i == item.status_id) : true
                            )
                            .sort((a, b) => -a.status_id + b.status_id)
                            .filter(
                                item =>
                                    moment(item.date)
                                        .endOf('day')
                                        .unix() ===
                                    moment(date)
                                        .endOf('day')
                                        .unix()
                            )
                            .map(item => {
                                const time = moment(item.date);
                                const minutes = time.hour() * 60 + time.minute();
                                return {
                                    id: item.id,
                                    is_imported: item.is_imported,
                                    startTime: minutes,
                                    endTime: minutes + parseInt(item.duration),
                                    confirmed: false,
                                    phone: item.phone,
                                    clientName: `Клиент: ${get(item, 'user.first_name', '') ||
                                        ''} ${get(item, 'user.last_name', '') || ''}`,
                                    comment: item.internal_comment || '',
                                    onClick: () => {
                                        history.push('/event/' + item.id);
                                    },
                                    classes: {
                                        root: item.is_imported
                                            ? style.imported
                                            : item.status_id === 1
                                            ? style.request
                                            : item.status_id === 3
                                            ? style.confirmed
                                            : item.status_id === 4
                                            ? style.finished
                                            : style.canceled,

                                        time: style.time,
                                        title: style.title,
                                        content: style.content,
                                        name: style.name,
                                        container: style.containerCell,
                                    },

                                    title: [...item.skills, ...item.salon_services]
                                        .map(i => i.title)
                                        .join(', '),
                                };
                            });

                        const enabledTime = (
                            workingTime.find(item => item.user_id == i.id) || { enabled: [] }
                        ).enabled.map(item => {
                            const start = moment(item.start);
                            const end = moment(item.end);
                            return {
                                start: start.hour() * 60 + start.minutes(),
                                end: end.hour() * 60 + end.minutes(),
                            };
                        });
                        const disabledTime =
                            enabledTime.length > 0
                                ? enabledTime.reduce((acc, item, index, arr) => {
                                      switch (true) {
                                          case index === 0 && index == arr.length - 1:
                                              return [
                                                  ...acc,
                                                  { startTime: 0, endTime: item.start },
                                                  { startTime: item.end, endTime: 24 * 60 },
                                              ];
                                          case index === 0:
                                              return [
                                                  ...acc,
                                                  { startTime: 0, endTime: item.start },
                                              ];
                                          case index == arr.length - 1:
                                              return [
                                                  ...acc,
                                                  {
                                                      startTime: arr[index - 1].end,
                                                      endTime: item.start,
                                                  },
                                                  { startTime: item.end, endTime: 24 * 60 },
                                              ];
                                          default:
                                              return [
                                                  ...acc,
                                                  {
                                                      startTime: arr[index - 1].end,
                                                      endTime: item.start,
                                                  },
                                              ];
                                      }
                                  }, [])
                                : [{ startTime: 0, endTime: 1440 }];
                        return {
                            name: `${i.first_name} ${i.last_name || ''}`,
                            avatar: i.avatar,
                            id: i.id,
                            disabledTime: [...disabledTime],
                            events: eventsArr,
                        };
                    }),
            ].sort((a, b) => b.disabledTime.length - a.disabledTime.length),
        };
    }, [mastersArr, events, date, workingTime]);
    const dispatch = useDispatch();

    const open = Boolean(anchorEl);
    const idPopover = open ? 'simple-popover' : undefined;
    const isToday =
        moment(date)
            .endOf('day')
            .unix() ===
        moment(new Date())
            .endOf('day')
            .unix();
    const onSubmitEndInterval = ({ master_id, enabled }) => {
        dispatch(
            setMasterWorkingTimeRequest(
                {
                    id,
                    master_id,
                    workingTime: { enabled: enabled },
                },
                {
                    onSuccess: () => {
                        dispatch(
                            getWorkingTimeRequest({
                                id,
                                from: moment(date).format('YYYY-MM-DD'),
                                to: moment(date).format('YYYY-MM-DD'),
                            })
                        );
                    },
                }
            )
        );
        switchTimeBreakPopup(!showTimeBreackPopup);
    };
    return (
        <Skeleton
            backgroundColor="#fff"
            textError=""
            title="Календарь"
            subTitle=""
            buttonClasses={{ root: classes.add }}
            bottomPositionButtons={false}
            nextButtonText={<AddIcon />}
            onNext={() => {
                history.push('/event/add');
            }}
            classes={{ children: style.children }}
            headerChildren={
                <div className={style.controllsContainer}>
                    <Button
                        variant={isToday ? 'outlined' : 'contained'}
                        onClick={() => {
                            setDate(new Date());
                        }}
                        color={isToday ? 'default' : 'primary'}
                    >
                        Сегодня
                    </Button>
                    <CalendarComponent date={date} onChange={setDate} variant="outlined" />
                    <Button
                        variant={open ? 'contained' : 'outlined'}
                        color="primary"
                        endIcon={<TimelineIcon />}
                        classes={{ root: classes.price }}
                        onClick={handleClickCard}
                    >
                        <NumberFormat value={statiscDaily.income} />
                    </Button>
                    <Popover
                        id={idPopover}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={() => handleCloseCard()}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <InfoCard
                            showMenu={false}
                            title={moment().format('DD MMMM YYYY')}
                            className={style.infoCard}
                        >
                            <Grid item xs={12} className={style.dataContainerSmall}>
                                <InfoCardLine
                                    title={'Всего записей на день'}
                                    value={statiscDaily.count_events}
                                />
                                <InfoCardLine
                                    title={'Завершено'}
                                    value={statiscDaily.count_completed_events}
                                />
                                <InfoCardLine
                                    title={'Поступлений в кассу'}
                                    value={<NumberFormat value={statiscDaily.income} />}
                                />
                                <InfoCardLine
                                    title={'Оплата наличными'}
                                    value={<NumberFormat value={statiscDaily.income_cash} />}
                                />
                                <InfoCardLine
                                    title={'Оплата безналом'}
                                    value={<NumberFormat value={statiscDaily.income_card} />}
                                />
                                <InfoCardLine
                                    title={'Предстоящих записей на сумму'}
                                    value={<NumberFormat value={statiscDaily.coming_income} />}
                                />
                            </Grid>
                        </InfoCard>
                    </Popover>
                    <Button
                        onClick={() => {
                            history.push('/calendar/edit');
                        }}
                        variant="contained"
                        color="primary"
                        classes={{ root: classes.schedule }}
                    >
                        Расписание
                    </Button>
                </div>
            }
        >
            <div>
                <div className={style.legend}>
                    <div
                        className={style.legendItem}
                        onClick={() => {
                            setFilter([...filter, 3]);
                        }}
                    >
                        <div className={style.roundConfirmed} />
                        Предстоящие
                    </div>
                    <div
                        className={style.legendItem}
                        onClick={() => {
                            setFilter([...filter, 4]);
                        }}
                    >
                        <div className={style.roundFinished} />
                        Прошедшие
                    </div>
                    <div
                        className={style.legendItem}
                        onClick={() => {
                            setFilter([...filter, 5, 6]);
                        }}
                    >
                        <div className={style.roundCanceled} />
                        Отмененные
                    </div>
                    <div
                        className={style.legendItem}
                        onClick={() => {
                            setFilter([...filter, 5, 6]);
                        }}
                    >
                        <div className={style.roundSync} />
                        Синхронизированные
                    </div>
                    <div
                        className={style.legendItem}
                        onClick={() => {
                            setFilter([...filter, 5, 6]);
                        }}
                    >
                        <div className={style.disabledTime} />
                        Неактивное время
                    </div>
                </div>
                <div className={style.container}>
                    {masters.length == 0 ? (
                        <PagePlaceHolder
                            text={`Пока не добавлено ни одного мастера \nили у мастеров не  установлены оказываемые услуги`}
                            buttonText="Добавить мастера"
                            onClick={() => {
                                history.push('/masters');
                            }}
                        />
                    ) : (
                        <React.Fragment>
                            <TimeGrid
                                interval={interval}
                                onMasterClick={(data, ev) => {
                                    handleContextMasterClick({ ev, ...data });
                                    // history.push(
                                    //     `/event/add?${prepareSearchString({
                                    //         master: get(data, `id`),
                                    //     })}`
                                    // );
                                }}
                                onCellRightClick={data => {
                                    handleContextClick(data);
                                }}
                                onMasterRightClick={data => {
                                    handleContextMasterClick(data);
                                }}
                                defaultCellOnclick={data => {
                                    const dateMoment = moment(date);
                                    dateMoment.hour(data.time.hour);
                                    dateMoment.minutes(data.time.minutes);
                                    history.push(
                                        `/event/add?${prepareSearchString({
                                            date: dateMoment.format(),
                                            master: get(masters, `[${data.col - 1}].id`),
                                        })}`
                                    );
                                }}
                                setCellStyle={({ row, col }) => {
                                    return row == 0 ? style.firstRowCell : '';
                                }}
                                masters={masters}
                                showCurrentTime={isToday}
                            />

                            <Menu
                                anchorEl={contextCellEl}
                                BackdropProps={{
                                    style: { backgroundColor: 'rgba(0,0,0,0.01)' },
                                    onContextMenu: ev => {
                                        ev.preventDefault();

                                        handleCloseContext(ev);
                                    },
                                }}
                                keepMounted
                                open={Boolean(contextCellEl)}
                                onClose={handleCloseContext}
                                anchorReference="anchorPosition"
                                anchorPosition={
                                    contextPosition.mouseY !== null &&
                                    contextPosition.mouseX !== null
                                        ? {
                                              top: contextPosition.mouseY,
                                              left: contextPosition.mouseX,
                                          }
                                        : undefined
                                }
                            >
                                <MenuItem
                                    onClick={ev => {
                                        handleCloseContext(ev, 1, contextData);
                                    }}
                                >
                                    Закрыть рабочий интервал
                                </MenuItem>
                            </Menu>
                            <Menu
                                BackdropProps={{
                                    style: { backgroundColor: 'rgba(0,0,0,0.01)' },

                                    onContextMenu: ev => {
                                        ev.preventDefault();
                                        handleCloseContextMaster(ev);
                                    },
                                }}
                                anchorEl={contextCellElMaster}
                                keepMounted
                                open={Boolean(contextCellElMaster)}
                                onClose={handleCloseContextMaster}
                                anchorReference="anchorPosition"
                                anchorPosition={
                                    contextPosition.mouseY !== null &&
                                    contextPosition.mouseX !== null
                                        ? {
                                              top: contextPosition.mouseY,
                                              left: contextPosition.mouseX,
                                          }
                                        : undefined
                                }
                            >
                                <MenuItem
                                    onClick={ev => {
                                        handleCloseContextMaster(ev, 0, contextData);
                                    }}
                                >
                                    Добавить запись
                                </MenuItem>
                                <MenuItem
                                    onClick={ev => {
                                        handleCloseContextMaster(ev, 1, contextData);
                                    }}
                                >
                                    Закрыть рабочий интервал
                                </MenuItem>
                                <MenuItem
                                    onClick={ev => {
                                        handleCloseContextMaster(ev, 2, contextData);
                                    }}
                                >
                                    Редактировать расписание
                                </MenuItem>
                            </Menu>

                            {showTimeBreackPopup && (
                                <TimeBreackPopup
                                    interval={interval}
                                    workingTime={workingTime}
                                    date={date}
                                    contextData={contextData}
                                    mastersList={mastersArr}
                                    onClear={() => {
                                        switchTimeBreakPopup(!showTimeBreackPopup);
                                    }}
                                    onSubmit={onSubmitEndInterval}
                                />
                            )}
                        </React.Fragment>
                    )}
                </div>
            </div>
        </Skeleton>
    );
};

Calendar.propTypes = {
    viewPort: PropTypes.object,
};

export default Calendar;
