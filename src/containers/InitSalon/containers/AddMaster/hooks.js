/* global Promise */
import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserRequest, getUserRequest } from 'modules/user';
import { getCurrencySelector } from 'modules/localization';

import { getListSkillsSelector, getSalonSkillsSelector, getSkillsRequest } from 'modules/skills';
import { getCustomSkillsRequest, getSalonCustomSkillsSelector } from 'modules/skills/customSkills';
import { getSalonSelector } from 'modules/salon';
import {
    getMastersByPhoneSelector,
    clearMasterByPhoneAction,
    createMasterRequest,
    inviteMasterRequest,
    setMasterSkillsRequest,
    getSalonMastersSelector,
    updateMasterRequest,
    getMastersRequest,
    getMastersSkillsRequest,
    getMastersSkillsSelector,
    getMastersCustomSkillsRequest,
    getMastersCustomSkillSelector,
    setMastersCustomSkillsRequest,
    getMasterByPhoneRequest,
    getMasterDetailsRequest,
    getMasterDetailSelector,
} from 'modules/masters';

export const useHooks = ({ editedMasterId, history }) => {
    const [textError, setTextError] = React.useState('');
    const [customPrice, setCustomPrice] = React.useState(true);
    const [submitPushed, setSubmitPush] = React.useState(false);
    const [name, setName] = React.useState();
    const [phone, setPhone] = React.useState();
    const [showPopup, switchShowPopup] = React.useState(false);
    const [lastName, setLastName] = React.useState();
    const [includedSkills, setIncludedSkills] = React.useState([]);
    const [includedCustomSkills, setIncludedCustomSkills] = React.useState([]);
    const [accessCreateRequest, setAccessCreateRequest] = React.useState(false);
    const [accessControllRequest, setAccessControllRequest] = React.useState(false);
    const dispatch = useDispatch();
    // const localization = useSelector(getLocalizationSelector);
    const currency = useSelector(getCurrencySelector);
    const { id, currency_id } = useSelector(getSalonSelector);

    const skills = useSelector(getListSkillsSelector);
    const masterDetails = useSelector(getMasterDetailSelector);
    const salonSkills = useSelector(getSalonSkillsSelector);
    const customSkills = useSelector(getSalonCustomSkillsSelector);
    const masters = useSelector(getSalonMastersSelector);
    const mastersSkills = useSelector(getMastersSkillsSelector);
    const [master] = useSelector(getMastersByPhoneSelector);
    const masterCustomSkills = useSelector(getMastersCustomSkillSelector);

    const currentMaster = React.useMemo(() => {
        return masters.find(master => master.id == editedMasterId);
    }, [masters]);

    const currencyCurrent = React.useMemo(() => {
        return (currency.find(i => i.id == currency_id) || {}).badge;
    }, [currency_id, currency]);

    React.useEffect(() => {
        if (masterCustomSkills.length > 0) {
            setIncludedCustomSkills(masterCustomSkills.map(i => ({ id: i.id })));
        }
    }, [masterCustomSkills]);

    const selectedCustomSkills = React.useMemo(() => {
        const selected = customSkills.filter(i => {
            return includedCustomSkills.find(item => item.id == i.id);
        });
        return selected;
    }, [includedCustomSkills, customSkills]);

    React.useEffect(() => {
        if (master) {
            const { last_name, first_name } = master;
            setLastName(last_name);
            setName(first_name);
        }
    }, [master]);

    React.useEffect(() => {
        if (id) {
            dispatch(getMastersRequest({ id }));
            dispatch(getSkillsRequest({ id }));
            dispatch(getCustomSkillsRequest({ id }));
        }
    }, [id]);
    React.useEffect(() => {
        if (id && editedMasterId) {
            dispatch(getMasterDetailsRequest({ id, master_id: editedMasterId }));
        }
    }, [id, editedMasterId]);

    React.useEffect(() => {
        if (editedMasterId) {
            dispatch(getMastersSkillsRequest({ id: editedMasterId }));
            dispatch(getMastersCustomSkillsRequest({ id: editedMasterId }));
        }
    }, [editedMasterId]);

    React.useEffect(() => {
        if (mastersSkills.length && editedMasterId) {
            setIncludedSkills(mastersSkills);
        }
    }, [mastersSkills]);

    React.useEffect(() => {
        if (masterDetails && currentMaster) {
            setPhone(masterDetails.phone);
            setLastName(masterDetails.last_name);
            setName(masterDetails.first_name);
            setAccessCreateRequest(masterDetails.can_create_event);
            setAccessControllRequest(masterDetails.can_update_event);
        }
    }, [masterDetails]);
    const addMaster = () => {
        setSubmitPush(true);
        switch (true) {
            case !name || !phone || !lastName:
                setTextError('Заполните обязательные поля');
                return;
            case includedSkills.length == 0 && includedCustomSkills.length == 0 && !master:
                setTextError('Добавьте хотя бы одну услугу к мастеру');
                return;
            default: {
                const addedSkils = includedSkills.map(i => i.id);
                const addedCustomSkils = includedCustomSkills.map(i => i.id);
                let resolve1, resolve2;
                const prom1 = new Promise(resolve => {
                    resolve1 = resolve;
                });
                const prom2 = new Promise(resolve => {
                    resolve2 = resolve;
                });
                Promise.all([prom1, prom2]).then(() => {
                    dispatch(clearMasterByPhoneAction());
                    history.goBack();
                });
                if (!currentMaster) {
                    if (master) {
                        dispatch(
                            inviteMasterRequest(
                                { id, user_id: master.id },
                                {
                                    postSaveToStoreCallback: data => {
                                        resolve1();
                                        resolve2();
                                    },
                                }
                            )
                        );
                    } else {
                        dispatch(
                            createMasterRequest(
                                {
                                    id,
                                    phone: phone.replace(/\D/g, ''),
                                    first_name: name,
                                    last_name: lastName,
                                    can_create_event: accessCreateRequest,
                                    can_update_event: accessControllRequest,
                                },
                                {
                                    postSaveToStoreCallback: data => {
                                        dispatch(
                                            setMasterSkillsRequest(
                                                {
                                                    id,
                                                    user_id: get(data, 'data.id'),
                                                    ...(customPrice
                                                        ? {
                                                              skills_data: includedSkills.map(
                                                                  i => ({
                                                                      skill_id: i.id,
                                                                      duration: i.duration,
                                                                      price: i.price,
                                                                  })
                                                              ),
                                                          }
                                                        : { skills: addedSkils }),
                                                },
                                                {
                                                    onSuccess: () => {
                                                        resolve1();
                                                    },
                                                }
                                            )
                                        );
                                        dispatch(
                                            setMastersCustomSkillsRequest(
                                                {
                                                    id,
                                                    user_id: get(data, 'data.id'),
                                                    ...(customPrice
                                                        ? {
                                                              salon_services_data: includedCustomSkills.map(
                                                                  i => ({
                                                                      salon_service_id: i.id,
                                                                      duration: i.duration,
                                                                      price: i.price,
                                                                  })
                                                              ),
                                                          }
                                                        : { salon_services: addedCustomSkils }),
                                                },
                                                {
                                                    onSuccess: () => {
                                                        resolve2();
                                                    },
                                                }
                                            )
                                        );
                                    },
                                }
                            )
                        );
                    }
                } else {
                    if (
                        currentMaster.is_admin == 1 &&
                        currentMaster.is_master == 0 &&
                        addedSkils.length > 0
                    ) {
                        dispatch(
                            updateUserRequest({
                                is_master: true,
                            })
                        );
                    }

                    dispatch(
                        updateMasterRequest(
                            {
                                id,
                                user_id: currentMaster.id,
                                first_name: name,
                                last_name: lastName,
                                phone: phone.replace(/\D/g, ''),
                                can_create_event: accessCreateRequest,
                                can_update_event: accessControllRequest,
                            },
                            {
                                postSaveToStoreCallback: () => {
                                    dispatch(
                                        setMasterSkillsRequest(
                                            {
                                                id,
                                                user_id: currentMaster.id,
                                                ...(customPrice
                                                    ? {
                                                          skills_data: includedSkills.map(i => ({
                                                              skill_id: i.id,
                                                              duration: i.duration,
                                                              price: i.price,
                                                          })),
                                                      }
                                                    : { skills: addedSkils }),
                                            },
                                            {
                                                onSuccess: () => {
                                                    resolve1();
                                                },
                                            }
                                        )
                                    );
                                    dispatch(
                                        setMastersCustomSkillsRequest(
                                            {
                                                id,
                                                user_id: currentMaster.id,

                                                ...(customPrice
                                                    ? {
                                                          salon_services_data: includedCustomSkills.map(
                                                              i => ({
                                                                  salon_service_id: i.id,
                                                                  duration: i.duration,
                                                                  price: i.price,
                                                              })
                                                          ),
                                                      }
                                                    : { salon_services: addedCustomSkils }),
                                            },
                                            {
                                                onSuccess: () => {
                                                    resolve2();
                                                },
                                            }
                                        )
                                    );
                                },
                            }
                        )
                    );
                }
            }
        }
    };
    const allSkills = React.useMemo(
        () => skills.reduce((acc, item) => [...acc, ...item.sub_skills], []),
        [skills]
    );

    const salonFiltredSkills = React.useMemo(() => {
        return skills
            .reduce((acc, i) => {
                return [
                    ...acc,
                    {
                        ...i,
                        sub_skills: i.sub_skills.filter(sub =>
                            salonSkills.find(skill => {
                                return skill.id == sub.id;
                            })
                        ),
                    },
                ];
            }, [])
            .filter(i => i.sub_skills.length > 0);
    }, [salonSkills, skills]);
    const getSkillDataById = ({ id, allSkills }) => {
        return allSkills.find(i => i.id == id);
    };

    const onSubmitPopup = (data, customSkillsSelected) => {
        const selectedSkillsPrepared = data.map(i => {
            const skill =
                mastersSkills.find(item => i.id == item.id) ||
                salonSkills.find(item => i.id == item.id);
            return {
                price: get(skill, 'pivot.price'),
                duration: get(skill, 'pivot.duration'),
                ...i,
            };
        });
        const preparedCustomSkills = customSkillsSelected.map(i => {
            const skill =
                masterCustomSkills.find(item => i.id == item.id) ||
                customSkills.find(item => i.id == item.id);
            return { price: skill.price, duration: skill.duration, ...i };
        });
        setIncludedSkills(selectedSkillsPrepared);
        setIncludedCustomSkills(preparedCustomSkills);
        switchShowPopup(!showPopup);
    };

    const skillSelectProps = React.useMemo(() => {
        return {
            defaultExpand: true,
            showInputs: customPrice,
            subItemProps: i => {
                const price =
                    get(
                        mastersSkills.find(item => item.id === i.id),
                        'price'
                    ) ||
                    get(
                        masterCustomSkills.find(item => item.id === i.id),
                        'price'
                    ) ||
                    get(
                        salonSkills.find(item => item.id === i.id),
                        'pivot.price'
                    ) ||
                    get(
                        customSkills.find(item => item.id === i.id),
                        'price'
                    ) ||
                    0;
                const duration =
                    get(
                        mastersSkills.find(item => item.id === i.id),
                        'duration'
                    ) ||
                    get(
                        masterCustomSkills.find(item => item.id === i.id),
                        'duration'
                    ) ||
                    get(
                        salonSkills.find(item => item.id === i.id),
                        'pivot.duration'
                    ) ||
                    get(
                        customSkills.find(item => item.id === i.id),
                        'duration'
                    ) ||
                    0;
                return {
                    InputPriceProps: {
                        endAdornment: (
                            <InputAdornment position="start">
                                <span>{currencyCurrent}</span>
                            </InputAdornment>
                        ),
                    },
                    InputDurationProps: {
                        endAdornment: (
                            <InputAdornment position="start">
                                <span>мин</span>
                            </InputAdornment>
                        ),
                    },
                    showInputsForce: true,
                    priceProps: { defaultValue: price },
                    durationProps: { defaultValue: duration },
                };
            },
        };
    }, [
        salonSkills,
        customSkills,
        customPrice,
        currencyCurrent,
        mastersSkills,
        masterCustomSkills,
    ]);

    return {
        textError,
        dispatch,
        addMaster,
        showPopup,
        skillSelectProps,
        includedCustomSkills,
        customSkills,
        includedSkills,
        salonFiltredSkills,
        setIncludedSkills,
        switchShowPopup,
        onSubmitPopup,
        currentMaster,
        phone,
        setName,
        name,
        submitPushed,
        lastName,
        setLastName,
        setIncludedCustomSkills,
        getSkillDataById,
        allSkills,
        setAccessCreateRequest,
        accessCreateRequest,
        setAccessControllRequest,
        accessControllRequest,
        clearMasterByPhoneAction,
        selectedCustomSkills,
        setPhone,
        id,
        master,
        getMasterByPhoneRequest,
    };
};
