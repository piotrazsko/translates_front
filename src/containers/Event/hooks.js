import React, { useRef } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import gets from 'lodash/get';
import { getSalonSelector, getSalonFreeTimesSalonRequest, getSalonsFreeTime } from 'modules/salon';
import { createFeedbackRequest } from 'modules/feedback';
import { getListSkillsSelector, getSkillsRequest, getSalonSkillsSelector } from 'modules/skills';
import { getCustomSkillsRequest, getSalonCustomSkillsSelector } from 'modules/skills/customSkills';
import {
    createEventRequest,
    getEventRequest,
    getEventSelector,
    updateEventRequest,
} from 'modules/events';
import { showPopupAction } from 'modules/popups';
import { getSalonsSkills, getAllSkills } from 'helpers/skills';
import { getClientsRequest, createClientRequest, getClientsSelector } from 'modules/clients';
import {
    getMastersRequest,
    getSalonMastersSelector,
    getMastersSkillsRequest,
    getMastersSkillsSelector,
    getMastersCustomSkillSelector,
    getMastersCustomSkillsRequest,
} from 'modules/masters';
import {
    CONFIRMED_STATUS,
    FINISHED_STATUS,
    CANCELLED_STATUS_BY_MASTER,
    CANCELLED_STATUS_BY_CLIENT,
    PAYMENT_CARD,
    PAYMENT_ONLINE,
    PAYMENT_CASH,
} from 'constants/events';
import { getDataFromCurrentLocarion } from 'helpers/url';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

/**
 * [useInitData description]
 * @param  {[type]}  eventId              [description]
 * @param  {Boolean} [isCreateEvent=false }]            [description]
 * @return {[type]}                       [description]
 */

export const useInitData = ({ id, eventId, isCreateEvent = false, date }) => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (id) {
            dispatch(getSkillsRequest({ id }));
            dispatch(getClientsRequest({ id }));
            dispatch(getMastersRequest({ id }));
            dispatch(
                getSalonFreeTimesSalonRequest({
                    id,
                    start_date: moment()
                        .startOf('day')
                        .format(dateFormat),
                })
            );
            dispatch(getCustomSkillsRequest({ id }));
        }
        if (id && eventId && !isCreateEvent) {
            dispatch(getEventRequest({ id, event_id: eventId }));
        }
    }, [id]);
};

/**
 * [useHook description]
 * @param  {[type]}  eventId              [description]
 * @param  {Boolean} [isCreateEvent=false }]            [description]
 * @return {[type]}                       [description]
 */

export const useHook = ({ eventId, isCreateEvent = false, history }) => {
    const dispatch = useDispatch();
    const dataFromUrl = getDataFromCurrentLocarion();
    const masterCustomSkills = useSelector(getMastersCustomSkillSelector);
    const { id, services = [], ...contractor } = useSelector(getSalonSelector);
    const skills = useSelector(getListSkillsSelector);
    const masters = useSelector(getSalonMastersSelector);
    const clients = useSelector(getClientsSelector);
    const masterSkill = useSelector(getMastersSkillsSelector);
    const event = useSelector(getEventSelector);
    const skillsSalon = useSelector(getSalonSkillsSelector);
    const customSkills = useSelector(getSalonCustomSkillsSelector);

    const freeTime = useSelector(getSalonsFreeTime);

    const [duration, setDuration] = React.useState(15);

    const [date, setDate] = React.useState(
        dataFromUrl.date ? new Date(dataFromUrl.date) : new Date()
    );

    const [cash, setCash] = React.useState(PAYMENT_CASH);
    const [showFeedbackPopup, switchFeedbackPopup] = React.useState(false);
    const [status, setStatus] = React.useState();
    const [comment, setComment] = React.useState('');
    const [clientComment, setClientComment] = React.useState('');
    const [master, setMaster] = React.useState('');
    const [client, setClient] = React.useState('');
    const [showPopupSkill, switchPopupSkill] = React.useState(false);
    const [showAddPopup, switchAddPopup] = React.useState(false);
    const [showAddMasterPopup, switchAddMasterPopup] = React.useState(false);
    const [includedSkills, setIncludedSkills] = React.useState([]);
    const [includedCustomSkills, setIncludedCustomSkills] = React.useState([]);
    const [price, setPrice] = React.useState();
    const [taxes, setTaxes] = React.useState();

    const filtredMasters = React.useMemo(() => {
        return masters.filter(i => i.status === 'confirmed');
    }, [masters]);

    const salonFiltredSkills = React.useMemo(() => {
        return getSalonsSkills(skills, master ? masterSkill : skillsSalon);
    }, [skillsSalon, skills, masterSkill]);

    const salonFiltredCustomSkills = React.useMemo(() => {
        return master
            ? customSkills.filter(i => masterCustomSkills.find(item => item.id === i.id))
            : customSkills;
    }, [customSkills, masterCustomSkills]);

    const selectedSkills = React.useMemo(() => {
        const selected = (master ? masterSkill : skillsSalon).filter(i => {
            return includedSkills.find(item => item.id == i.id);
        });
        return selected;
    }, [includedSkills, masterSkill]);

    const selectedCustomSkills = React.useMemo(() => {
        const selected = (master ? masterCustomSkills : customSkills).filter(i => {
            return includedCustomSkills.find(item => item.id == i.id);
        });
        return selected;
    }, [includedCustomSkills, masterCustomSkills]);

    const enableFeedback = React.useMemo(() => {
        if (event && event.master_feedback) {
            return true;
        }
        return false;
    }, [event]);

    React.useEffect(() => {
        if (master) {
            dispatch(getMastersSkillsRequest({ id: master.id }));
            dispatch(getMastersCustomSkillsRequest({ id: master.id }));
        }
    }, [master]);

    React.useEffect(() => {
        const masterId = dataFromUrl.master;
        if (isCreateEvent && masters.length > 0 && masterId) {
            const masterNew = masters.find(i => i.id == masterId);
            if (masterNew && master.id !== masterId) {
                setMaster(masterNew);
            }
        }
    }, [masters]);

    React.useEffect(() => {
        if (isCreateEvent && clients.length > 0) {
            const clientId = dataFromUrl.client;
            const clinet = clients.find(i => i.id == clientId);
            if (clinet) {
                setClient(clinet);
            }
        }
    }, [clients]);

    // set default data from income event
    React.useEffect(() => {
        if (!isCreateEvent && !Array.isArray(event)) {
            const {
                date,
                user,
                master,
                amount,
                duration,
                comment,
                internal_comment,
                status_id,
                skills,
                payment_type_id,
                salon_services,
            } = event;
            setClientComment(comment);
            setDate(moment(date).toDate());
            setClient(user);
            setMaster(master);
            setStatus(status_id);
            setPrice(amount);
            setDuration(duration);
            setComment(internal_comment);
            setCash(parseInt(payment_type_id));
            setIncludedSkills(skills.map(i => ({ id: i.id })));
            setIncludedCustomSkills(salon_services.map(i => ({ id: i.id })));
        }
    }, [event]);

    // set price  and duration  and get masters after select skills and services
    React.useEffect(() => {
        if (isCreateEvent) {
            setDuration(
                selectedSkills.reduce((acc, i) => {
                    return acc + i.pivot.duration;
                }, 0) +
                    selectedCustomSkills.reduce((acc, i) => {
                        return acc + i.duration;
                    }, 0)
            );
            setPrice(
                selectedSkills.reduce((acc, i) => {
                    return acc + parseInt(i.pivot.price);
                }, 0) +
                    selectedCustomSkills.reduce((acc, i) => {
                        return acc + parseInt(i.price);
                    }, 0)
            );
        }
        if (id) {
            dispatch(
                getMastersRequest({
                    id,
                    skills: includedSkills.map(i => i.id),
                    sevices: includedCustomSkills.map(i => i.id),
                })
            );
        }
    }, [selectedSkills, selectedCustomSkills]);

    // get first data (requests)
    useInitData({ id, eventId, isCreateEvent, date });

    // create event
    const createEventAction = () => {
        switch (true) {
            case !(includedCustomSkills.length != 0 || includedSkills.length !== 0) ||
                !master.id ||
                !client.id ||
                !date:
                setTextError('Заполните обязательные поля');
                return;
            default:
                dispatch(
                    createEventRequest(
                        {
                            clinet_id: client.id,
                            master_id: master.id,
                            date: moment(date).format('YYYY-MM-DD HH:mm'),
                            utc_date: moment(date)
                                .subtract(moment(new Date()).utcOffset(), 'minutes')
                                .format('YYYY-MM-DD HH:mm'),
                            amount: price,
                            duration,
                            skills: includedSkills.map(i => i.id),
                            salon_services: includedCustomSkills.map(i => i.id),
                            internal_comment: comment,
                        },
                        {
                            onSuccess: () => {
                                history.push('/calendar');
                            },
                        }
                    )
                );
                return;
        }
    };
    // update events
    const onChange = ({
        showLoader = true,
        showPopup = true,
        redirect = false,
        onSuccess = () => {},
        preparedData = {},
    }) => {
        if (!isCreateEvent) {
            const update = () => {
                dispatch(
                    updateEventRequest(
                        {
                            id,
                            status_id: status,
                            event_id: eventId,
                            ...preparedData,
                            showLoader,
                        },
                        {
                            onSuccess: () => {
                                onSuccess();
                                if (redirect) {
                                    {
                                        history.push('/calendar');
                                    }
                                }
                            },
                            onFailure: () => {
                                dispatch(getEventRequest({ id, event_id: eventId }));
                            },
                        }
                    )
                );
            };
            if (showPopup) {
                dispatch(
                    showPopupAction({
                        message: 'Сохранить изменения?',
                        textError: '',
                        onClick: () => {
                            update();
                            return true;
                        },
                        onCancel: () => {
                            return true;
                        },
                    })
                );
            } else {
                update();
            }
        } else {
            onSuccess();
        }
    };
    // listener for change skills
    const onChangeSkills = (data, customSkills) => {
        onChange({
            saveToStore: setIncludedSkills,
            onSuccess: () => {
                setIncludedSkills(data);
                setIncludedCustomSkills(customSkills);
            },
            data,
            preparedData: {
                skills: data.map(i => i.id),
                salon_services: customSkills.map(i => i.id),
            },
        });
    };
    //listener of change  master
    const onChangeMaster = data => {
        onChange({
            saveToStore: setMaster,
            onSuccess: () => {
                setMaster(data);
            },
            preparedData: { master_id: data.id },
        });
    };
    // listener of change  client
    const onChangeClient = data => {
        setClient(data);
    };

    //listener of change  duration
    const onChangeDuration = data => {
        if (data != duration) {
            setDuration(data);
            onChange({
                saveToStore: setDuration,
                onSuccess: () => {
                    setDuration(data);
                },
                showPopup: false,
                showLoader: false,
                preparedData: { duration: data },
            });
        }
    };
    // listener of change price
    const onChangePrice = data => {
        onChange({
            saveToStore: setPrice,
            onSuccess: () => {
                setPrice(data);
            },
            showPopup: false,
            preparedData: { amount: data },
        });
    };
    // listener of change date
    const onChangeDate = data => {
        onChange({
            saveToStore: setDate,
            onSuccess: () => {
                setDate(data);
            },
            preparedData: {
                date: moment(data).format('YYYY-MM-DD HH:mm'),
                utc_date: moment(data)
                    .subtract(moment(new Date()).utcOffset(), 'minutes')
                    .format('YYYY-MM-DD HH:mm'),
            },
        });
    };
    //change of  status
    const onChangeStatus = data => {
        onChange({
            saveToStore: setStatus,
            onSuccess: () => {
                setStatus(data);
            },
            redirect: true,
            showPopup: false,
            preparedData:
                data === FINISHED_STATUS
                    ? { status_id: data, payment_type_id: cash }
                    : { status_id: data },
        });
    };
    // change  payments
    const onChangePayments = data => {
        setCash(data);
    };
    //change comment
    const onChangeComment = data => {
        onChange({
            saveToStore: setComment,
            onSuccess: () => {
                setComment(data);
            },
            preparedData: { internal_comment: data },
        });
    };
    const [shownDay, setShownDay] = React.useState(
        moment()
            .startOf('day')
            .format(dateFormat)
    );

    const onChangeSelectedDayInPicker = day => {
        if (id) {
            setShownDay(day);
            dispatch(
                getSalonFreeTimesSalonRequest({
                    id,
                    start_date: moment(day)
                        .startOf('month')
                        .format(dateFormat),
                    skills: Array.isArray(includedSkills)
                        ? includedSkills.map(i => i.id)
                        : undefined,
                    salon_services: Array.isArray(includedCustomSkills)
                        ? includedCustomSkills.map(i => i.id)
                        : undefined,
                    masters: master ? [master.id] : undefined,
                })
            );
        }
    };
    React.useEffect(() => {
        onChangeSelectedDayInPicker(date);
    }, [includedCustomSkills, includedSkills, master]);
    const saveFeedback = data => {};
    //create clients
    const createClient = data => {
        dispatch(
            createClientRequest(
                { id, ...data },
                {
                    onSuccess: data => {
                        dispatch(getClientsRequest({ id, showLoaderFlag: false }));
                        setClient(gets(data, 'data'));
                    },
                }
            )
        );
    };
    //add feedback
    const addFeedback = ({ rating, feedback }) => {
        dispatch(
            createFeedbackRequest(
                { id: eventId, rating, feedback },
                {
                    onSuccess: () => {
                        dispatch(getEventRequest({ id, event_id: eventId }));
                    },
                }
            )
        );
    };

    const [textError, setTextError] = React.useState('');
    const [textInfo, setTextInfo] = React.useState('');

    const eventRanges = {
        started: new Date() > date,
        ended:
            new Date() >
            moment(date)
                .add(duration, 'minutes')
                .toDate(),
    };
    return {
        setTextError,
        textInfo,
        setTextInfo,
        textError,
        selectedSkills,
        includedSkills,
        switchPopupSkill,
        showPopupSkill,
        switchAddPopup,
        showAddPopup,
        client,
        switchAddMasterPopup,
        showAddMasterPopup,
        master,
        setMaster,
        date,
        duration,
        comment,
        price,
        cash,
        clients,
        services,
        salonFiltredSkills,
        filtredMasters,
        status,
        createEventAction,
        onChangeSkills,
        onChangeMaster,
        onChangeClient,
        onChangeDuration,
        onChangePrice,
        onChangeDate,
        onChangeStatus,
        onChangePayments,
        onChangeComment,
        saveFeedback,
        setPrice,
        setComment,
        createClient,
        customSkills,
        includedCustomSkills,
        selectedCustomSkills,
        salonFiltredCustomSkills,
        clientComment,
        showFeedbackPopup,
        switchFeedbackPopup,
        addFeedback,
        enableFeedback,
        event,
        eventRanges,
        taxes,
        PAYMENT_ONLINE,
        PAYMENT_CARD,
        PAYMENT_CASH,
        freeTime,
        onChangeSelectedDayInPicker,
        contractor,
    };
};
// export const useStates = ()=>{}
