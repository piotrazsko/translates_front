import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { SkillItem, SelectSkillsPopup as Popup, PhoneInput } from 'feelqueen_components';
import Skeleton from '../../components/Skeleton';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useHooks } from './hooks';
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
    },
}));

const AddMaster = ({
    history,
    match: {
        params: { id: editedMasterId },
    },
    currentLocalization: { countryCode },
}) => {
    const classes = useStyles();
    const {
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
        phone,
        name,
        setName,
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
        currentMaster,
        setPhone,
        id,
        master,
        getMasterByPhoneRequest,
    } = useHooks({ editedMasterId, history });
    return (
        <Skeleton
            textError={textError}
            title={editedMasterId ? 'Редактирование мастера' : 'Добавление мастера'}
            showProgressBar={false}
            onBack={() => {
                history.goBack();
                dispatch(clearMasterByPhoneAction());
            }}
            onNext={addMaster}
            nextButtonText={currentMaster ? 'Применить' : 'Добавить'}
            backButtonText="Назад"
            subTitle={`Вы можете добавить нового мастера в сервис \nлибо пригласить уже зарегистрированного, указав его номер`}
        >
            {showPopup && (
                <Popup
                    showSelectAll
                    skillsSelectProps={skillSelectProps}
                    showSelectedItemsCount
                    selectedCustomSkills={includedCustomSkills}
                    customSkills={customSkills}
                    selectedSkills={includedSkills}
                    skills={salonFiltredSkills}
                    showPopup={showPopup}
                    title="Оказываемые мастером услуги"
                    onCancel={() => {
                        setIncludedSkills([]);
                        switchShowPopup(!showPopup);
                    }}
                    onClose={() => {
                        switchShowPopup(!showPopup);
                    }}
                    onSubmit={onSubmitPopup}
                />
            )}
            <Grid container>
                <Grid item md={6} xs={12}>
                    <div className={style.itemForm}>
                        <PhoneInput
                            disabled={currentMaster}
                            onBlur={() => {
                                if (typeof phone === 'string') {
                                    dispatch(
                                        getMasterByPhoneRequest({
                                            id,
                                            phone: phone.replace(/\D/g, ''),
                                        })
                                    );
                                }
                            }}
                            value={phone}
                            countryCode={countryCode}
                            onChange={setPhone}
                            margin="none"
                            fullWidth
                            required
                            label="Добавьте номер телефона"
                            helperText={
                                submitPushed && !phone ? (
                                    <span className={style.errorText}>Укажите номер мастера</span>
                                ) : (
                                    ''
                                )
                            }
                        />
                    </div>
                    <div className={style.itemForm}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            margin="none"
                            required
                            label="Имя"
                            fullWidth
                            value={name}
                            onChange={ev => {
                                setName(ev.target.value);
                            }}
                            placeholder="Введите имя мастера"
                            helperText={
                                submitPushed && !name ? (
                                    <span className={style.errorText}>Укажите имя мастера</span>
                                ) : (
                                    ''
                                )
                            }
                        />
                    </div>
                    <div className={style.itemForm}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            margin="none"
                            required
                            label="Фамилия"
                            fullWidth
                            value={lastName}
                            onChange={ev => {
                                if (ev.target.value.length <= 256) {
                                    setLastName(ev.target.value);
                                }
                            }}
                            placeholder="Введите фамилию мастера"
                            helperText={
                                submitPushed && !lastName ? (
                                    <span className={style.errorText}>Укажите фамилию мастера</span>
                                ) : (
                                    ''
                                )
                            }
                        />
                    </div>
                    <div className={style.itemForm}>
                        <FormControl classes={{ root: classes.formControll }}>
                            <InputLabel shrink htmlFor="my-input">
                                Оказываемые услуги
                            </InputLabel>
                            <div className={style.selectedItemsContainer}>
                                {includedSkills.map(i => (
                                    <div key={i.id} className={style.skillItemContainer}>
                                        <SkillItem
                                            showDuration={false}
                                            showPrice={false}
                                            showEdit={false}
                                            data={getSkillDataById({ allSkills, id: i.id })}
                                            onDelete={() => {
                                                setIncludedSkills(
                                                    includedSkills.filter(item => item.id !== i.id)
                                                );
                                            }}
                                        />
                                    </div>
                                ))}{' '}
                                {selectedCustomSkills.map(i => (
                                    <div key={i.id} className={style.skillItemContainer}>
                                        <SkillItem
                                            showDuration={false}
                                            showPrice={false}
                                            showEdit={false}
                                            data={{
                                                ...i,
                                                price: get(i, 'price'),
                                                duration: get(i, 'duration'),
                                            }}
                                            onDelete={() => {
                                                setIncludedCustomSkills(
                                                    includedCustomSkills.filter(
                                                        item => item.id !== i.id
                                                    )
                                                );
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className={style.buttonContainer}>
                                <Button
                                    margin="none"
                                    size="small"
                                    disabled={
                                        (master && get(master, 'status') !== 'confirmed') ||
                                        (currentMaster &&
                                            get(currentMaster, 'status') !== 'confirmed')
                                    }
                                    onClick={() => switchShowPopup(!showPopup)}
                                    variant="contained"
                                    color="primary"
                                >
                                    {'+ Добавить'}
                                </Button>
                            </div>
                            <FormHelperText id="component-error-text">
                                {submitPushed && includedSkills.length == 0 && !master ? (
                                    <span className={style.errorText}>
                                        Добавьте хотя бы одну услугу к мастеру
                                    </span>
                                ) : (
                                    ''
                                )}
                            </FormHelperText>
                        </FormControl>
                        <div className={style.accessControlls}>
                            <FormControlLabel
                                className={style.accessControllItem}
                                control={
                                    <Checkbox
                                        checked={accessCreateRequest}
                                        onChange={() => {
                                            setAccessCreateRequest(!accessCreateRequest);
                                        }}
                                        name="unworkedDay"
                                        color="primary"
                                    />
                                }
                                label="Возможность создания записи"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={accessControllRequest}
                                        onChange={() => {
                                            setAccessControllRequest(!accessControllRequest);
                                        }}
                                        name="unworkedDay"
                                        color="primary"
                                    />
                                }
                                label="Возможность редактирования записи"
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Skeleton>
    );
};

AddMaster.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    currentLocalization: PropTypes.object.isRequired,
};

export default AddMaster;
