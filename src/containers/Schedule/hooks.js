import React from 'react';
import moment from 'moment';
import gets from 'lodash/get';
import {
    getWorkingTimeRequest,
    getWorkingTimeSelector,
    getSalonWorkTimeRequest,
    getSalonWorkingTimeSelector,
} from 'modules/working_time';
import { useSelector, useDispatch } from 'react-redux';
import { showPopupAction } from 'modules/popups';
import { getSalonSelector } from 'modules/salon';
import {
    getMastersRequest,
    setMasterWorkingTimeRequest,
    getSalonMastersSelector,
} from 'modules/masters';

export const useWorkingPeriod = () => {
    const [workingStartPeriod, setWorkingStartPeriod] = React.useState(
        moment()
            .hour(10)
            .minutes(0)
            .toDate()
    );
    const [workingEndPeriod, setWorkingEndPeriod] = React.useState(
        moment()
            .hour(21)
            .minutes(0)
            .toDate()
    );
    return {
        workingStartPeriod,
        setWorkingStartPeriod,
        workingEndPeriod,
        setWorkingEndPeriod,
    };
};
export const useEffeects = ({ id, date, masterId }) => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (id) {
            dispatch(getMastersRequest({ id }));
        }
    }, [id]);

    const getWorkingTime = () => {
        dispatch(
            getWorkingTimeRequest({
                id,
                from: moment(date)
                    .startOf('month')
                    .format('YYYY-MM-DD'),
                to: moment(date)
                    .endOf('month')
                    .format('YYYY-MM-DD'),
            })
        );
    };
    React.useEffect(() => {
        if (id) {
            dispatch(getSalonWorkTimeRequest({ id }));
        }
    }, [id]);
    React.useEffect(() => {
        if (id) {
            getWorkingTime();
        }
    }, [id, date]);

    return { getWorkingTime };
};

export const useHooks = ({ masterId, history }) => {
    const dispatch = useDispatch();
    const { id } = useSelector(getSalonSelector);
    const mastersArr = useSelector(getSalonMastersSelector);
    const workingTime = useSelector(getWorkingTimeSelector);

    const {
        workingStartPeriod,
        setWorkingStartPeriod,
        workingEndPeriod,
        setWorkingEndPeriod,
    } = useWorkingPeriod();

    // const
    const [date, setDate] = React.useState(new Date());
    const [selectedDates, setSelectedDates] = React.useState([]);
    const [disableDay, setDisableDay] = React.useState(false);
    const [timeBreak, setTimeBreak] = React.useState();
    const [search, setSearch] = React.useState();

    const { masters } = React.useMemo(() => {
        return {
            masters: [
                ...mastersArr
                    .filter(i => i.status == 'confirmed' && i.is_master)
                    .filter(i => i.skills_count > 0 || i.services_count > 0)
                    .filter(item => {
                        return !search
                            ? true
                            : `${item.first_name} ${item.last_name}`
                                  .toLowerCase()
                                  .indexOf(search.toLowerCase()) !== -1 ||
                                  ('+' + item.phone).indexOf(search.toLowerCase()) !== -1;
                    }),
            ],
        };
    }, [mastersArr, date, search]);

    const [activeMaster, setActiveMasterState] = React.useState();
    const { getWorkingTime } = useEffeects({ id, date, masterId });
    const setActiveMaster = id => {
        history.push('/calendar/edit/' + id);
    };
    React.useEffect(() => {
        if (masterId) {
            setActiveMasterState(masterId);
            setSelectedDates([]);
        }
    }, [masterId]);
    React.useEffect(() => {
        if (mastersArr.length > 0 && !masterId) {
            setActiveMaster(
                gets(
                    mastersArr.find(i => i.is_master == 1),
                    'id'
                )
            );
        }
    }, [mastersArr]);
    React.useEffect(() => {
        if (disableDay) {
            setTimeBreak();
        }
    }, [disableDay]);

    const highlighed = React.useMemo(() => {
        if (activeMaster) {
            const masterTime = workingTime.find(i => i.user_id == activeMaster);
            return gets(masterTime, 'enabled', []).map(i => {
                return { start: moment(i.start).toDate(), end: moment(i.end).toDate() };
            });
        }
        return [];
    }, [workingTime, activeMaster, masterId]);

    React.useEffect(() => {
        if (selectedDates.length > 0) {
            const selectedDay = highlighed.filter(
                i =>
                    moment(i.start).format('DDMMYYYY') ===
                    moment(selectedDates[0]).format('DDMMYYYY')
            );
            if (selectedDay.length > 0) {
                setWorkingStartPeriod(selectedDay[0].start);
                setWorkingEndPeriod(selectedDay[selectedDay.length - 1].end);
            }
            if (selectedDay.length > 1) {
                setTimeBreak({
                    start: selectedDay[0].end,
                    end: selectedDay[selectedDay.length - 1].start,
                });
            }
        } else if (selectedDates.length === 0) {
            setTimeBreak();
            // ;
            // TODO:  need set working time
            // setWorkingStartPeriod()
            // setWorkingEndPeriod
        }
    }, [selectedDates, highlighed]);

    const selectedDatesText = React.useMemo(() => {
        const str = selectedDates
            .sort(function(a, b) {
                return a - b;
            })
            .map(i => moment(i).format('D MMMM'))

            .join(', ');

        return str;
    }, [selectedDates]);

    const setWorkingTime = () => {
        const showPopup = () =>
            dispatch(
                showPopupAction({
                    message: 'Введенное время некорректно',
                    onClick: () => {
                        return true;
                    },
                    onCancel: () => true,
                    showCancel: false,
                    submitButtonText: 'Ok',
                    confirmButtonProps: { size: 'small' },
                    cancelButtonProps: { size: 'small' },
                })
            );
        const startTimeBreakMS = timeBreak
            ? timeBreak.start.valueOf() -
              moment(timeBreak.start)
                  .startOf('day')
                  .toDate()
                  .valueOf()
            : null;
        const endTimeBreakMS = timeBreak
            ? timeBreak.end.valueOf() -
              moment(timeBreak.end)
                  .startOf('day')
                  .toDate()
                  .valueOf()
            : null;
        const workingStartPeriodMS =
            workingStartPeriod.valueOf() -
            moment(workingStartPeriod)
                .startOf('day')
                .toDate()
                .valueOf();
        const workingEndPeriodMS =
            workingEndPeriod.valueOf() -
            moment(workingEndPeriod)
                .startOf('day')
                .toDate()
                .valueOf();
        switch (true) {
            case workingStartPeriodMS > workingEndPeriodMS: {
                showPopup();
                return;
            }
            case timeBreak && startTimeBreakMS > endTimeBreakMS: {
                showPopup();
                return;
            }
            case timeBreak && startTimeBreakMS > workingEndPeriodMS: {
                showPopup();
                return;
            }
            case timeBreak && endTimeBreakMS < workingStartPeriodMS: {
                showPopup();
                return;
            }
            case timeBreak && endTimeBreakMS > workingEndPeriodMS: {
                showPopup();
                return;
            }
            default:
            // return;
        }
        const startBreak = timeBreak
            ? moment(timeBreak.start)
                  .date(moment(workingStartPeriod).date())
                  .month(moment(workingStartPeriod).month())
                  .year(moment(workingStartPeriod).year())
                  .toDate()
            : null;
        const endBreak = timeBreak
            ? moment(timeBreak.end)
                  .date(moment(workingStartPeriod).date())
                  .month(moment(workingStartPeriod).month())
                  .year(moment(workingStartPeriod).year())
                  .toDate()
            : null;
        const arr = timeBreak
            ? [
                  workingStartPeriod.valueOf(),
                  workingEndPeriod.valueOf(),
                  startBreak.valueOf(),
                  endBreak.valueOf(),
              ].sort()
            : [workingStartPeriod.valueOf(), workingEndPeriod.valueOf()].sort();
        const enabled = timeBreak
            ? selectedDates.reduce((acc, i) => {
                  const workingStartPeriod = new Date(arr[0]);
                  const workingEndPeriod = new Date(arr[3]);
                  const timeBreakStart = new Date(arr[1]);
                  const timeBreakEnd = new Date(arr[2]);
                  return [
                      ...acc,
                      {
                          start: moment(i)
                              .hour(workingStartPeriod.getHours())
                              .minutes(workingStartPeriod.getMinutes())
                              .format('YYYY-MM-DD HH:mm'),
                          end: moment(i)
                              .hour(timeBreakStart.getHours())
                              .minutes(timeBreakStart.getMinutes())
                              .format('YYYY-MM-DD HH:mm'),
                      },
                      {
                          start: moment(i)
                              .hour(timeBreakEnd.getHours())
                              .minutes(timeBreakEnd.getMinutes())
                              .format('YYYY-MM-DD HH:mm'),
                          end: moment(i)
                              .hour(workingEndPeriod.getHours())
                              .minutes(workingEndPeriod.getMinutes())
                              .format('YYYY-MM-DD HH:mm'),
                      },
                  ];
              }, [])
            : selectedDates.map(i => {
                  const workingStartPeriod = new Date(arr[0]);
                  const workingEndPeriod = new Date(arr[1]);
                  return {
                      start: moment(i)
                          .hour(workingStartPeriod.getHours())
                          .minutes(workingStartPeriod.getMinutes())
                          .format('YYYY-MM-DD HH:mm'),
                      end: moment(i)
                          .hour(workingEndPeriod.getHours())
                          .minutes(workingEndPeriod.getMinutes())
                          .format('YYYY-MM-DD HH:mm'),
                  };
              });
        dispatch(
            setMasterWorkingTimeRequest(
                {
                    id,
                    master_id: masterId,
                    workingTime: disableDay
                        ? {
                              disabled: [...enabled],
                          }
                        : {
                              enabled: [...enabled],
                          },
                },
                {
                    onSuccess: () => {
                        setDisableDay(false);
                        setSelectedDates([]);
                        getWorkingTime();
                        setTimeBreak();
                    },
                }
            )
        );
    };
    return {
        search,
        setSearch,
        masters,
        activeMaster,
        setActiveMaster,
        setDate,
        date,
        highlighed,
        selectedDates,
        setSelectedDates,
        selectedDatesText,
        workingStartPeriod,
        workingEndPeriod,
        setWorkingStartPeriod,
        setWorkingEndPeriod,
        timeBreak,
        setTimeBreak,
        disableDay,
        setDisableDay,
        setWorkingTime,
    };
};
