import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import get from 'lodash/get';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import InputAdornment from '@material-ui/core/InputAdornment';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import TextField from '@material-ui/core/TextField';

import {
    Skeleton,
    InfoCard,
    IncreasePicker,
    Label,
    UserInfo,
    NumberFormat,
    InfoCardLine,
    AddClientPopup,
    CalendarTimePicker,
} from 'components';
import { SkillItem, SelectSkillsPopup } from 'feelqueen_components';
import AddPopup from './components/AddPopup';
import AddButton from './components/AddButton';
import FeedbackPopup from './components/FeedbackPopup';
import FeedbackItem from './components/FeedbackItem';
import { makeStyles } from '@material-ui/core/styles';
import {
    CONFIRMED_STATUS,
    REQUEST_STATUS,
    FINISHED_STATUS,
    CANCELLED_STATUS_BY_MASTER,
    CANCELLED_STATUS_BY_CLIENT,
    PAYMENT_CARD,
    PAYMENT_ONLINE,
    PAYMENT_CASH,
} from 'constants/events';
import style from './style.scss';
import { useHook } from './hooks.js';

const saveNumber = ({ setNumber, ev }) => {
    const str = ev.target.value || '';
    const number = str.replace(/[^0-9.]/g, '');
    if (number >= 0) {
        setNumber(number);
    }
};

const useStyles = makeStyles(theme => ({
    button: {
        fontSize: '12px',
    },
    rootCheckbox: {
        marginTop: 24,
    },
}));

const Event = ({
    history,
    match: {
        params: { eventId: eventId },
    },
    match,
}) => {
    const classes = useStyles();
    const createEvent = eventId === 'add';
    const {
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
        date,
        duration,
        comment,
        price,
        cash,
        clients,
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
        setPrice,
        setComment,
        createClient,
        includedCustomSkills,
        selectedCustomSkills,
        salonFiltredCustomSkills,
        clientComment,
        showFeedbackPopup,
        switchFeedbackPopup,
        addFeedback,
        enableFeedback,
        textInfo,
        event,
        eventRanges,
        freeTime,
        onChangeSelectedDayInPicker,
        contractor,
    } = useHook({
        eventId,
        history,
        isCreateEvent: createEvent,
    });
    const disabledChanges =
        status == FINISHED_STATUS ||
        status == CANCELLED_STATUS_BY_CLIENT ||
        status == CANCELLED_STATUS_BY_MASTER;
    const disableChangePrice = eventRanges.started || get(event, 'fee', 0) !== 0;

    const [showPopup, switchPopup] = React.useState();
    return (
        <Skeleton
            textError={textError}
            backgroundColor="#fffaf6"
            title={
                createEvent
                    ? 'Новая запись'
                    : status === FINISHED_STATUS
                    ? 'Завершенная запись'
                    : status === CONFIRMED_STATUS
                    ? 'Предстоящая запись'
                    : 'Отмененная запись'
            }
            showBreadcump
            showTitle
            nextButtonText={false}
            subTitle=""
            match={match}
            bottomPositionButtons={false}
            breadcamps={[{ link: '/calendar', title: 'Календарь' }]}
            headerChildren={<React.Fragment></React.Fragment>}
            onNext={false}
        >
            {showPopup && (
                <AddClientPopup
                    showPopup={showPopup}
                    onClose={() => {
                        switchPopup(!showPopup);
                    }}
                    onSubmit={data => {
                        createClient(data);
                        switchPopup(!showPopup);
                    }}
                />
            )}
            <Grid container spacing={6}>
                <Grid item xs={7}>
                    <Grid container>
                        <Grid item xs={10}>
                            <div className={style.itemContainer}>
                                <Label
                                    fontSize={20}
                                    title={Boolean(selectedSkills.length) && 'Услуги'}
                                >
                                    <div
                                        className={
                                            selectedSkills.length
                                                ? style.selectedItemsContainer
                                                : ''
                                        }
                                    >
                                        {selectedSkills.map(i => (
                                            <div key={i.id} className={style.skillItemContainer}>
                                                <SkillItem
                                                    showDuration
                                                    showPrice
                                                    showEdit={false}
                                                    currency_id={get(event, 'currency_id')}
                                                    data={{
                                                        ...i,
                                                        price: get(i, 'pivot.price'),
                                                        duration: get(i, 'pivot.duration'),
                                                    }}
                                                    onDelete={() => {
                                                        onChangeSkills(
                                                            includedSkills.filter(
                                                                item => item.id !== i.id
                                                            ),
                                                            includedCustomSkills
                                                        );
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        {selectedCustomSkills.map(i => (
                                            <div key={i.id} className={style.skillItemContainer}>
                                                <SkillItem
                                                    showDuration
                                                    showPrice
                                                    showEdit={false}
                                                    currency_id={get(event, 'currency_id')}
                                                    data={{
                                                        ...i,
                                                        price: get(i, 'price'),
                                                        duration: get(i, 'duration'),
                                                    }}
                                                    onDelete={() => {
                                                        onChangeSkills(
                                                            includedSkills,
                                                            includedCustomSkills.filter(
                                                                item => item.id !== i.id
                                                            )
                                                        );
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        <AddButton
                                            textError={
                                                textError &&
                                                !(
                                                    includedSkills.length ||
                                                    includedCustomSkills.length
                                                ) ? (
                                                    <span className={style.textError}>
                                                        Выберите услугу
                                                    </span>
                                                ) : (
                                                    ''
                                                )
                                            }
                                            disabled={
                                                disabledChanges ||
                                                (eventRanges.started && eventRanges.ended)
                                            }
                                            onClick={() => switchPopupSkill(!showPopupSkill)}
                                            variant={
                                                includedSkills.length > 0 ||
                                                includedCustomSkills.length > 0
                                                    ? 'button'
                                                    : false
                                            }
                                            titleLine={'Добавить услуги'}
                                            titleButton={'Добавить'}
                                        />
                                    </div>
                                </Label>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={10}>
                            <div className={style.itemContainer}>
                                <Label fontSize={20} title={client && 'Клиент'}>
                                    <div className={client ? style.selectedItemsContainer : ''}>
                                        {client && <UserInfo data={client} />}
                                        <AddButton
                                            onClick={() => {
                                                if (clients && clients.length > 0) {
                                                    switchAddPopup(!showAddPopup);
                                                } else {
                                                    switchPopup(!showPopup);
                                                }
                                            }}
                                            variant={client ? 'button' : false}
                                            titleLine={'Добавить клиента'}
                                            titleButton={'Изменить'}
                                            disabled={
                                                (!createEvent && status == CONFIRMED_STATUS) ||
                                                disabledChanges
                                            }
                                            textError={
                                                textError && !client ? (
                                                    <span className={style.textError}>
                                                        Выберите клиента
                                                    </span>
                                                ) : (
                                                    ''
                                                )
                                            }
                                        />
                                        {!client && (
                                            <div className={style.addClientText}>
                                                Нет клиента в базе?
                                                <span
                                                    className={style.link}
                                                    onClick={() => {
                                                        switchPopup(!showPopup);
                                                    }}
                                                >
                                                    Добавьте нового
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </Label>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={10}>
                            {' '}
                            <div className={style.itemContainer}>
                                <Label fontSize={20} title={master && 'Мастер'}>
                                    <div className={master ? style.selectedItemsContainer : ''}>
                                        <UserInfo data={master} isMaster />
                                        <AddButton
                                            textError={
                                                textError && !master ? (
                                                    <span className={style.textError}>
                                                        Выберите мастера
                                                    </span>
                                                ) : (
                                                    ''
                                                )
                                            }
                                            disabled={
                                                disabledChanges ||
                                                (!createEvent && eventRanges.started)
                                            }
                                            onClick={() =>
                                                switchAddMasterPopup(!showAddMasterPopup)
                                            }
                                            variant={master ? 'button' : false}
                                            titleLine={'Добавить мастера'}
                                            titleButton={'Изменить'}
                                        />
                                    </div>
                                </Label>
                            </div>
                        </Grid>
                    </Grid>{' '}
                    <Grid container>
                        <Grid item xs={10}>
                            <Grid container className={style.calendarContainer} spacing={3}>
                                <Grid item xs={12}>
                                    <CalendarTimePicker
                                        value={date}
                                        freeTime={freeTime}
                                        onChange={onChangeDate}
                                        disabled={false}
                                        variant="outlined"
                                        isMobile={false}
                                        onChangeDay={onChangeSelectedDayInPicker}
                                        disableBeforeNow
                                        interval={get(contractor, 'info.working_time_interval', 30)}
                                        pickerProps={{
                                            maxDate: moment(new Date())
                                                .add(3, 'M')
                                                .toDate(),
                                        }}
                                    >
                                        <TextField
                                            InputLabelProps={{ shrink: true }}
                                            value={moment(date).format('DD MMMM YYYY HH:mm')}
                                            label="Дата"
                                            InputProps={{
                                                disabled:
                                                    disabledChanges ||
                                                    (!createEvent && eventRanges.started),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <CalendarTodayIcon htmlColor={'#767676'} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </CalendarTimePicker>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={10}>
                            <div className={style.durationContainer}>
                                <IncreasePicker
                                    disabled={
                                        disabledChanges ||
                                        (eventRanges.started && eventRanges.ended)
                                    }
                                    suffix={` мин`}
                                    min={0}
                                    required={false}
                                    max={500}
                                    label={'Продолжительность'}
                                    step={5}
                                    value={duration}
                                    onChange={onChangeDuration}
                                    helperText={''}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={6}>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                value={comment}
                                id="filled-multiline-static"
                                label="Комментарий для сотрудников"
                                multiline
                                placeholder="Будет виден только сотрудникам"
                                onChange={ev => setComment(ev.target.value)}
                                rowsMax={4}
                                defaultValue=""
                                onBlur={ev => onChangeComment(ev.target.value)}
                                disabled={disabledChanges}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                value={clientComment}
                                id="filled-multiline-static"
                                label="Комментарий клиента"
                                multiline
                                rowsMax={4}
                                defaultValue=""
                                InputLabelProps={{ shrink: true }}
                                disabled
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <InfoCard
                        className={style.resultBlock}
                        showHeader={includedSkills.length > 0}
                        showDivider={selectedSkills.length > 0}
                        headerContent={
                            selectedSkills.length > 0 && (
                                <div className={style.headerResult}>
                                    <div>
                                        <div className={style.labels}>
                                            <span>Услуга</span>
                                            <span>Цена</span>
                                        </div>
                                        {selectedSkills.map(i => (
                                            <InfoCardLine
                                                key={i.id}
                                                title={i.title}
                                                value={
                                                    <NumberFormat value={get(i, 'pivot.price')} />
                                                }
                                            />
                                        ))}
                                        {selectedCustomSkills.map(i => (
                                            <InfoCardLine
                                                key={i.id}
                                                title={i.title}
                                                value={<NumberFormat value={get(i, 'price')} />}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )
                        }
                        minHeight="177px"
                        showMenu={false}
                    >
                        <div className={style.headerResult}>
                            <InfoCardLine
                                title={'Комиссия Филквин'}
                                value={<NumberFormat value={get(event, 'fee', 0)} />}
                            />
                        </div>
                        <div className={style.resultPrice}>
                            {includedSkills.length === 0 ||
                            disabledChanges ||
                            disableChangePrice ? (
                                <InfoCardLine
                                    title={'Итоговая стоимость'}
                                    value={<NumberFormat value={get(event, 'income', price)} />}
                                />
                            ) : (
                                <>
                                    <div
                                        className={
                                            includedSkills.length > 0
                                                ? style.titlePrice
                                                : style.emptyTitlePrice
                                        }
                                    >
                                        Итоговая стоимость
                                    </div>
                                    <div className={style.helperText}>
                                        Вы можете изменить цену услуги
                                    </div>
                                    <TextField
                                        InputProps={{
                                            inputProps: {
                                                displayType: 'input',
                                            },

                                            inputComponent: NumberFormat,
                                        }}
                                        disabled={disabledChanges}
                                        value={price}
                                        onChange={ev => saveNumber({ setNumber: setPrice, ev })}
                                        placeholder={'Цена, руб.'}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        onBlur={ev => saveNumber({ setNumber: onChangePrice, ev })}
                                        className={style.inputPrice}
                                    />
                                </>
                            )}

                            {(status === FINISHED_STATUS || status === CONFIRMED_STATUS) && (
                                <div className={style.labelPayment}>
                                    <Label title="Выберите способ оплаты">
                                        <RadioGroup
                                            aria-label="gender"
                                            name="payment"
                                            value={cash === PAYMENT_CASH ? cash : PAYMENT_CARD}
                                            disabled={disabledChanges}
                                            onChange={ev => {
                                                onChangePayments(parseInt(ev.target.value));
                                            }}
                                            classes={{ root: classes.rootCheckbox }}
                                            row
                                        >
                                            <FormControlLabel
                                                value={PAYMENT_CASH}
                                                control={
                                                    <Radio
                                                        color="primary"
                                                        disabled={
                                                            disabledChanges ||
                                                            !(
                                                                PAYMENT_CASH == cash ||
                                                                PAYMENT_CARD == cash
                                                            )
                                                        }
                                                    />
                                                }
                                                label="Наличные"
                                            />
                                            <FormControlLabel
                                                value={PAYMENT_CARD}
                                                control={
                                                    <Radio
                                                        color="primary"
                                                        disabled={
                                                            disabledChanges ||
                                                            !(
                                                                PAYMENT_CASH == cash ||
                                                                PAYMENT_CARD == cash
                                                            )
                                                        }
                                                    />
                                                }
                                                label="Карта"
                                            />
                                        </RadioGroup>
                                    </Label>
                                </div>
                            )}
                            {createEvent && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={createEventAction}
                                >
                                    Записать
                                </Button>
                            )}
                            {FINISHED_STATUS == status && !get(event, 'master_feedback') && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={enableFeedback}
                                    onClick={() => switchFeedbackPopup(!showFeedbackPopup)}
                                >
                                    Отставить отзыв
                                </Button>
                            )}
                            {FINISHED_STATUS == status && get(event, 'master_feedback') && (
                                <Label title="Ваш отзыв">
                                    <br />
                                    <FeedbackItem
                                        data={{
                                            feedback: get(event, 'master_feedback.feedback'),
                                            rating: get(event, 'master_feedback.rating'),
                                        }}
                                    />
                                </Label>
                            )}
                            {status === CONFIRMED_STATUS && (
                                <div>
                                    <div>
                                        <Button
                                            classes={{ root: classes.button }}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                onChangeStatus(FINISHED_STATUS);
                                            }}
                                        >
                                            Завершить запись
                                        </Button>
                                        <Button
                                            classes={{ root: classes.button }}
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => {
                                                onChangeStatus(CANCELLED_STATUS_BY_MASTER);
                                            }}
                                        >
                                            Отменить
                                        </Button>
                                    </div>
                                </div>
                            )}
                            <span className={style.textErrorWithMargin}> {textError}</span>
                            <span className={style.textInfo}> {textInfo}</span>
                        </div>
                    </InfoCard>
                </Grid>
            </Grid>
            {showPopupSkill && (
                <SelectSkillsPopup
                    forceExpand
                    selectedCustomSkills={includedCustomSkills}
                    customSkills={salonFiltredCustomSkills}
                    selectedSkills={includedSkills}
                    skills={salonFiltredSkills}
                    showPopup={showPopupSkill}
                    title="Оказываемые мастером услуги"
                    onCancel={() => {
                        onChangeSkills([], []);
                    }}
                    onClose={() => {
                        switchPopupSkill(!showPopupSkill);
                    }}
                    onSubmit={(data, selectedcustomSkills) => {
                        onChangeSkills(data, selectedcustomSkills);
                        switchPopupSkill(!showPopupSkill);
                    }}
                />
            )}
            {showAddPopup && (
                <AddPopup
                    title="Выбрать клиента"
                    items={clients}
                    onSubmit={i => {
                        onChangeClient(i);
                        switchAddPopup(!showAddPopup);
                    }}
                    onClose={() => {
                        switchAddPopup(!showAddPopup);
                    }}
                >
                    <div className={style.addClientText}>
                        Нет клиента в базе?
                        <div>
                            <Button
                                className={style.button}
                                color={'primary'}
                                variant="contained"
                                onClick={() => {
                                    switchAddPopup(!showAddPopup);
                                    switchPopup(!showPopup);
                                }}
                            >
                                Добавить нового
                            </Button>
                        </div>
                    </div>
                </AddPopup>
            )}
            {showAddMasterPopup && (
                <AddPopup
                    title="Выбрать мастера"
                    isMaster
                    placeholder={
                        selectedSkills.length > 0 || selectedCustomSkills.length > 0
                            ? `Не найдено мастеров, оказывающих все выбранные услуги`
                            : ''
                    }
                    items={filtredMasters}
                    onSubmit={i => {
                        onChangeMaster(i);
                        switchAddMasterPopup(!showAddMasterPopup);
                    }}
                    onClose={() => {
                        switchAddMasterPopup(!showAddMasterPopup);
                    }}
                />
            )}
            {showFeedbackPopup && (
                <FeedbackPopup
                    onClose={() => {
                        switchFeedbackPopup(!showFeedbackPopup);
                    }}
                    onSubmit={({ feedback, rating }) => {
                        addFeedback({ feedback, rating });
                        switchFeedbackPopup(!showFeedbackPopup);
                    }}
                />
            )}
        </Skeleton>
    );
};

Event.propTypes = {
    history: PropTypes.object,
    match: PropTypes.shape({
        params: PropTypes.object,
    }),
};

export default Event;
