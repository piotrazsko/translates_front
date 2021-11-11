import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

import { SkillsSelect, SkillItem } from 'feelqueen_components';
import { Skeleton } from 'components';
import {
    getListSkillsSelector,
    getSkillsRequest,
    setSkillsRequest,
    getSalonSkillsSelector,
} from 'modules/skills';
import { getSalonSelector } from 'modules/salon';
import { deleteCustomSkillSubSkillsRequest } from 'modules/skills/customSkills';
import style from './style.scss';

const color = '#fa835f';

const ServiceEdit = ({ history, ...props }) => {
    const dispatch = useDispatch();
    const [search, setSearch] = React.useState('');
    const [selectedSkills, setSelectedSkills] = React.useState([]);
    const { id, services = [], currency_id } = useSelector(getSalonSelector);
    const initSkills = useSelector(getSalonSkillsSelector);
    const skills = useSelector(getListSkillsSelector);
    const [textError, setTextError] = React.useState('');
    const [textInfo, setTextInfo] = React.useState('');
    const [showOnlySkills, setShowOnlySkills] = React.useState(false);
    React.useEffect(() => {
        if (id) {
            dispatch(getSkillsRequest({ id }));
        }
    }, [id]);
    React.useEffect(() => {
        if (selectedSkills.length) {
            setTextInfo(`Выбрано  услуг: ${selectedSkills.length + services.length}`);
        }
    }, [selectedSkills]);
    React.useEffect(() => {
        setSelectedSkills([
            ...initSkills.map(i => {
                return {
                    id: i.id,
                    price: get(i, 'pivot.price'),
                    duration: get(i, 'pivot.duration'),
                };
            }),
        ]);
    }, [initSkills]);

    const onSubmit = () => {
        switch (true) {
            case selectedSkills.length == 0: {
                setTextError('Выберите оказываемые услуги');
                setShowOnlySkills(selectedSkills.map(i => i.id));
                return;
            }
            case !!selectedSkills.find(i => {
                setShowOnlySkills(selectedSkills.map(i => i.id));
                return i.price === undefined;
            }): {
                setTextError('Заполните цену  услуги');
                return;
            }
            case !!selectedSkills.find(i => {
                return i.duration == undefined;
            }): {
                setTextError('Заполните продолжительность услуги');
                return;
            }
            default: {
                const preparedSkills = {};
                selectedSkills.forEach(i => {
                    preparedSkills[i.id] = { price: i.price, duration: i.duration };
                });
                dispatch(
                    setSkillsRequest(
                        { id, data: preparedSkills },
                        {
                            onSuccess: () => {
                                history.goBack();
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
            nextButtonText="Сохранить"
            textError={textError}
            textInfo={textInfo}
            showBreadcump
            breadcamps={[{ title: 'Услуги', link: '/services' }]}
            title="Услуги салона"
            subTitle=""
            onNext={onSubmit}
        >
            <Grid container>
                <Grid item xs={12}>
                    <div className={style.searchContainer}>
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
                            selectedSkills={selectedSkills}
                            onChange={setSelectedSkills}
                            skills={skills}
                            searchText={search}
                            addCustomSkills={() => {
                                history.push('/init-custom-skills');
                            }}
                            showOnlySkills={showOnlySkills}
                            currency_id={currency_id}
                            customSkills={services}
                            itemComponentCustomSubSkill={i => (
                                <SkillItem
                                    key={i.id}
                                    showEdit
                                    onEdit={() => {
                                        history.push(`/init-custom-skills/${i.id}`);
                                    }}
                                    onDelete={() => {
                                        dispatch(
                                            deleteCustomSkillSubSkillsRequest({
                                                id,
                                                service_id: i.id,
                                            })
                                        );
                                    }}
                                    currency_id={currency_id}
                                    data={i}
                                />
                            )}
                        />
                    </div>
                    <div className={style.buttonContainer}>
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

ServiceEdit.propTypes = {
    history: PropTypes.object.isRequired,
};

export default ServiceEdit;
