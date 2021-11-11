import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '../../components/Skeleton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { useSelector, useDispatch } from 'react-redux';
import get from 'lodash/get';
import { getListSkillsSelector } from 'modules/skills';
import {
    addCustomSkillSubSkillsRequest,
    updateSalonCustomSkillRequest,
    createSalonCustomSkillRequest,
    getCustomSkillsRequest,
    getSalonCustomSkillsSelector,
} from 'modules/skills/customSkills';
import { getSalonSelector } from 'modules/salon';
import { NumberFormat } from 'components';
import { SelectSkillsPopup, Select, IncreasePicker, SkillItem } from 'feelqueen_components';
import { getAllSkills } from 'helpers/skills';

import style from './style.scss';

const useStyles = makeStyles(theme => ({
    root: {
        background: '#FFFAF6',
        border: '2px solid #FA835F',
        color: '#FA835F',
        margin: 'auto 10px;',
    },
    formControll: {
        width: '100%',
        marginTop: '26px',
    },
    setKeySkills: {
        marginTop: '23px',
    },
}));

const saveNumber = ({ setNumber, ev }) => {
    const str = ev.target.value || '';
    const number = str.replace(/[^0-9.]/g, '');
    if (number >= 0) {
        setNumber(number);
    }
};

const CustomSkills = ({
    history,
    match: {
        params: { id: skillId },
    },
    ...props
}) => {
    const [textError, setTextError] = React.useState('');
    const [submitPushed, setSubmitPush] = React.useState(false);
    const [showPopupSkill, switchSkillsPopup] = React.useState(false);
    const [selectedKeysSkills, setKeysSkillsItems] = React.useState([]);
    const classes = useStyles();
    const dispatch = useDispatch();
    const skills = useSelector(getListSkillsSelector);
    const { id } = useSelector(getSalonSelector);
    const [name, setName] = React.useState();
    const [description, setDescription] = React.useState();
    const [duration, setDuration] = React.useState();
    const [price, setPrice] = React.useState();
    const [parentUid, setParentUid] = React.useState();
    const customSkills = useSelector(getSalonCustomSkillsSelector);
    React.useEffect(() => {
        if (id) {
            dispatch(getCustomSkillsRequest({ id }));
        }
    }, [id]);
    React.useEffect(() => {
        if (skillId) {
            const skill = customSkills.find(i => i.id == skillId);

            if (skill) {
                const {
                    duration,
                    id,
                    parent_skill_id,
                    description,
                    parent_uid,
                    price,
                    title,
                    related_skills,
                } = skill;

                setDuration(duration);
                setName(title);
                setParentUid(parent_uid);
                setDescription(description);
                setPrice(price);
                setKeySkills(related_skills);
            }
        }
    }, [customSkills, skillId]);

    const addCustomSkills = () => {
        setSubmitPush(true);
        switch (true) {
            case !name || !price || !duration:
                setTextError('Заполните обязательные поля');
                return;

            default:
                {
                    if (!skillId) {
                        dispatch(
                            createSalonCustomSkillRequest({
                                id,
                                title: name,
                                duration,
                                description,
                                price,
                                parent_uid: parentUid,
                                related_skills: selectedKeysSkills.map(i => i.id),
                            })
                        );
                    } else {
                        dispatch(
                            updateSalonCustomSkillRequest({
                                id,
                                service_id: skillId,
                                title: name,
                                duration,
                                description,
                                price,
                                parent_uid: parentUid,
                                related_skills: selectedKeysSkills.map(i => i.id),
                            })
                        );
                    }
                }
                history.goBack();
                return;
        }
    };

    const preparedSkills = React.useMemo(() => {
        return skills.filter(i => i.uid === parentUid);
    }, [parentUid, skills]);

    const skillsOptionbs = skills.map(i => ({ value: i.uid, label: i.title }));
    const setKeySkills = (data = []) => {
        const selectedSkills = getAllSkills(skills).filter(i => data.find(item => i.id == item.id));
        setKeysSkillsItems(selectedSkills);
    };
    return (
        <Skeleton
            textError={textError}
            title={skillId ? 'Редактирование уникальной услуги' : 'Создание уникальной услуги'}
            showProgressBar={false}
            onBack={() => {
                history.goBack();
            }}
            subTitle={`Вы можете создать не представленную в списке услугу либо комплекс услуг.\nДобавляйте описание входящих в комплекс процедур`}
            onNext={addCustomSkills}
            nextButtonText={skillId ? 'Сохранить' : 'Добавить'}
            backButtonText="Назад"
        >
            <Grid container>
                <Grid item md={6} xs={12}>
                    <div className={style.itemForm}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            margin="normal"
                            required
                            label="Название услуги"
                            fullWidth
                            value={name}
                            onChange={ev => {
                                setName(ev.target.value);
                            }}
                            helperText={
                                submitPushed && !name ? (
                                    <span className={style.errorText}>Укажите название услуги</span>
                                ) : (
                                    ''
                                )
                            }
                            placeholder="Введите название услуги"
                        />
                    </div>
                    <div className={style.itemForm}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            margin="normal"
                            label="Описание"
                            fullWidth
                            value={description}
                            onChange={ev => {
                                if (ev.target.value.length <= 256) {
                                    setDescription(ev.target.value);
                                }
                            }}
                            multiline
                            rowsMax={8}
                            placeholder="Краткое описание услуги"
                        />
                    </div>
                    <div className={style.itemForm}>
                        <TextField
                            onChange={ev => {
                                saveNumber({ setNumber: setPrice, ev });
                            }}
                            InputLabelProps={{ shrink: true }}
                            margin="normal"
                            required
                            fullWidth
                            InputProps={{
                                inputProps: {
                                    displayType: 'input',
                                },
                                inputComponent: NumberFormat,
                            }}
                            label="Цена"
                            value={price}
                            placeholder="Итоговая цена услуги"
                            helperText={
                                submitPushed && !price ? (
                                    <span className={style.errorText}>Укажите цену услуги</span>
                                ) : (
                                    ''
                                )
                            }
                        />
                    </div>
                    <div className={style.itemForm}>
                        <FormControl classes={{ root: classes.formControll }}>
                            <InputLabel shrink htmlFor="my-input">
                                Категория услуги
                            </InputLabel>
                            <Select
                                placeholder=""
                                variant="text"
                                value={parentUid ? parentUid : null}
                                options={skillsOptionbs}
                                onChange={ev => {
                                    setParentUid(ev.target.value);
                                    setKeySkills([]);
                                }}
                            />
                        </FormControl>
                        <FormControl classes={{ root: classes.formControll }}>
                            <InputLabel shrink htmlFor="my-input">
                                Ключевые услуги
                            </InputLabel>
                            <div className={style.keySkillsContainer}>
                                {selectedKeysSkills.map(i => (
                                    <SkillItem
                                        key={i.id}
                                        data={i}
                                        showDuration={false}
                                        showPrice={false}
                                        showEdit={false}
                                        showInfo={false}
                                        onDelete={() => {
                                            setKeySkills(
                                                selectedKeysSkills.filter(j => j.id !== i.id)
                                            );
                                        }}
                                    />
                                ))}
                            </div>
                            <div>
                                <Button
                                    className={classes.setKeySkills}
                                    size="small"
                                    onClick={() => {
                                        switchSkillsPopup(!showPopupSkill);
                                    }}
                                    disabled={!parentUid}
                                    variant="contained"
                                    color="primary"
                                >
                                    {'+ Добавить услуги'}
                                </Button>
                            </div>
                        </FormControl>
                    </div>
                    <div className={style.itemFormLast}>
                        <IncreasePicker
                            suffix={` мин`}
                            min={0}
                            max={500}
                            label={'Продолжительность'}
                            step={5}
                            placeholder={'Например 120 мин'}
                            value={duration}
                            onChange={setDuration}
                            helperText={
                                submitPushed && !duration ? (
                                    <span className={style.errorText}>
                                        Укажите продолжительность услуги
                                    </span>
                                ) : (
                                    ''
                                )
                            }
                        />
                    </div>
                    {showPopupSkill && (
                        <SelectSkillsPopup
                            selectedSkills={selectedKeysSkills}
                            skills={preparedSkills}
                            showPopup={showPopupSkill}
                            title="Выберите ключевые услуги"
                            skillsSelectProps={{
                                defaultExpand: true,
                                showSelectedItemsCount: true,
                            }}
                            onCancel={() => {
                                setKeySkills([]);
                                switchSkillsPopup(!showPopupSkill);
                            }}
                            onClose={() => {
                                switchSkillsPopup(!showPopupSkill);
                            }}
                            onSubmit={data => {
                                setKeySkills(data);
                                switchSkillsPopup(!showPopupSkill);
                            }}
                        />
                    )}
                </Grid>
            </Grid>
        </Skeleton>
    );
};

CustomSkills.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object,
};

export default CustomSkills;
