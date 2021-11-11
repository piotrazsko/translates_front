import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Skeleton from '../../components/Skeleton';
import { SkillsSelect, SkillItem } from 'feelqueen_components';

import Button from '@material-ui/core/Button';

import {
    getListSkillsSelector,
    addSkillAction,
    getSelectedSkillsSelector,
    getSkillsRequest,
    setSkillsRequest,
    getSalonSkillsSelector,
} from 'modules/skills';
import {
    getCustomSkillsRequest,
    getSalonCustomSkillsSelector,
    deleteCustomSkillSubSkillsRequest,
} from 'modules/skills/customSkills';

import { getSalonSelector } from 'modules/salon';
import style from './style.scss';

const color = '#fa835f"';

const InitSkills = ({ history, ...props }) => {
    const dispatch = useDispatch();
    const addSkills = data => {
        dispatch(addSkillAction(data));
    };
    const savedSkills = useSelector(getSelectedSkillsSelector);
    const customSkills = useSelector(getSalonCustomSkillsSelector);
    const [search, setSearch] = React.useState('');
    const { id, currency_id } = useSelector(getSalonSelector);
    const initSkills = useSelector(getSalonSkillsSelector);
    const skills = useSelector(getListSkillsSelector);
    const [textError, setTextError] = React.useState('');
    const [textInfo, setTextInfo] = React.useState('');
    React.useEffect(() => {
        if (id) {
            dispatch(getSkillsRequest({ id }));
            dispatch(getCustomSkillsRequest({ id }));
        }
    }, [id]);
    React.useEffect(() => {
        setTextInfo(`Выбрано  услуг: ${savedSkills.length + customSkills.length}`);
    }, [savedSkills, customSkills]);
    React.useEffect(() => {
        if (savedSkills.length === 0) {
            addSkills([
                ...initSkills.map(i => {
                    return {
                        id: i.id,
                        price: get(i, 'pivot.price'),
                        duration: get(i, 'pivot.duration'),
                    };
                }),
            ]);
        }
    }, [initSkills]);

    const onSubmit = () => {
        switch (true) {
            case !!savedSkills.find(i => !i.price || !i.duration): {
                setTextError('Заполните продолжительность и стоимость услуг');
                return;
            }
            case savedSkills.length == 0: {
                setTextError('Выберите оказываемые услуги');
                return;
            }
            default: {
                const preparedSkills = {};
                savedSkills.forEach(i => {
                    preparedSkills[i.id] = { price: i.price, duration: i.duration };
                });
                dispatch(
                    setSkillsRequest(
                        { id, data: preparedSkills },
                        {
                            onSuccess: () => {
                                history.push('/init-masters');
                            },
                        }
                    )
                );

                return;
            }
        }
    };
    return (
        <Skeleton
            textError={textError}
            textInfo={textInfo}
            progress={15}
            title="Какие услуги оказывает салон?"
            subTitle="Выбирайте услуги из списка либо добавляйте свои уникальные услуги"
            onNext={onSubmit}
            onBack={() => {
                history.push('/init-profile');
            }}
        >
            <Grid container>
                <Grid item xs={10} sm={8} md={6}>
                    <div>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon htmlColor={color} />
                                    </InputAdornment>
                                ),
                            }}
                            required
                            value={search}
                            onChange={ev => setSearch(ev.target.value)}
                            fullWidth
                            size="small"
                            variant="outlined"
                            placeholder="Введите название услуги, например маникюр"
                        />
                    </div>
                    <div className={style.accordionContainer}>
                        <SkillsSelect
                            selectedSkills={savedSkills}
                            onChange={addSkills}
                            skills={skills}
                            customSkills={customSkills}
                            searchText={search}
                            itemComponentCustomSubSkill={i => (
                                <SkillItem
                                    onEdit={() => {
                                        history.push(`/init-custom-skills/${i.id}`);
                                    }}
                                    showEdit
                                    onDelete={() => {
                                        dispatch(
                                            deleteCustomSkillSubSkillsRequest(
                                                {
                                                    id,
                                                    service_id: i.id,
                                                },
                                                {
                                                    onSuccess: () => {
                                                        dispatch(getCustomSkillsRequest({ id }));
                                                    },
                                                }
                                            )
                                        );
                                    }}
                                    currency_id={currency_id}
                                    data={i}
                                />
                            )}
                            addCustomSkills={() => {
                                history.push('/init-custom-skills');
                            }}
                            currency_id={currency_id}
                        />
                        <Button
                            onClick={() => {
                                history.push('/init-custom-skills');
                            }}
                            size="small"
                            variant="contained"
                            color="primary"
                        >
                            {'+ Добавить уникальную услугу'}
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </Skeleton>
    );
};

InitSkills.propTypes = {
    // : PropTypes.
};

export default InitSkills;
