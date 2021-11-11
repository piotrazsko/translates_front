import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Label } from 'components';
import { Popup } from 'feelqueen_components';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { Select } from 'feelqueen_components';

import style from './style.scss';

const useStyles = makeStyles(theme => ({
    adornedEnd: {
        paddingRight: 0,
        marginRight: 0,
    },
    icon: {
        color: '#767676',
    },
}));

const UploadPopup = ({ onSubmit, onClear, setCRMSync, ...props }) => {
    const classes = useStyles();
    const ref = React.useRef(null);
    const [tranzactionsFile, setTranzactionsFile] = React.useState();
    const [clientsFile, setClientsFile] = React.useState();
    const [ordersFile, setOrdersFile] = React.useState();
    const [showAuthPopup, switchAuthPopup] = React.useState();
    const [showUniversePopup, switchUniversePopup] = React.useState();
    const [password, setPassword] = React.useState();
    const [login, setLogin] = React.useState();
    const [showPassword, switchShowPassword] = React.useState();
    const [textError, setTextError] = React.useState();
    const [url, setUrl] = React.useState();
    const [selectedCompany, setSelectedCompany] = React.useState(0);
    const uploadAction = setTranzactionsFile => {
        if (ref.current) {
            const upload = function() {
                setTranzactionsFile(ref.current.files[0]);
                ref.current.removeEventListener('change', upload);
            };
            ref.current.addEventListener('change', upload);
            ref.current.click();
        }
    };
    const options = [
        { value: 0, label: 'yClients', key: 'yClients' },
        { value: 1, label: 'Universe', key: 'Universe' },
        { value: 2, label: 'Sonline', key: 'Sonline' },
        { value: 3, label: '1C.Красота', key: '1c' },
    ];
    const onSubmitPopupYclients = () => {
        switch (true) {
            case !password || !login:
                setTextError('Проверьте введенные данные');
                break;

            default: {
                setTextError('');
                setCRMSync({
                    data: { password, login, type: 'yclients', url },

                    onSuccess: () => {
                        switchAuthPopup(!showAuthPopup);
                        onClear();
                    },
                });
            }
        }
    };
    const onSubmitPopupUniverse = () => {
        switch (true) {
            case !url:
                setTextError('Проверьте введенные данные');
                break;

            default: {
                setTextError('');
                setCRMSync({
                    data: {
                        url,
                        type: options
                            .find(item => item.value === selectedCompany)
                            .key.toLowerCase(),
                    },
                    onSuccess: () => {
                        switchUniversePopup(!showUniversePopup);
                        onClear();
                    },
                });
            }
        }
    };

    const selectedCompanyName = React.useMemo(() => {
        return options.find(item => item.value === selectedCompany).label;
    }, [selectedCompany]);
    return (
        <React.Fragment>
            <Popup
                title={'Синхронизация данных'}
                onSubmit={() => {
                    if (selectedCompany == 0) {
                        switchAuthPopup(!showAuthPopup);
                    } else {
                        switchUniversePopup(!showUniversePopup);
                    }
                }}
                // disableSubmit={!clientsFile && !ordersFile && !tranzactionsFile}
                onClear={onClear}
                showClear
                submitButtonText="Синхронизировать"
                showCancel={false}
            >
                <div>
                    <div className={style.subtitle}>
                        Уже используете другую CRM-систему? Свяжите с ней Ваш профиль в FeelQueen,
                        чтобы автоматически синхронизировать рабочее расписание и занятое время
                        сотрудников. Новым клиентам будут доступны только действительно свободные
                        окна для записи.
                        <br /> Важно! Имена и фамилии сотрудников должны совпадать!
                    </div>

                    <div className={style.contentContainer}>
                        <Select
                            options={options}
                            fullWidth
                            value={selectedCompany}
                            onChange={ev => {
                                setSelectedCompany(ev.target.value);
                            }}
                            label="CRM система"
                        />
                    </div>
                </div>
            </Popup>
            {showAuthPopup && (
                <Popup
                    textError={textError}
                    title="Синхронизация с yClients"
                    childrenContainerClassName={style.popupChildrenContainer}
                    submitButtonText="Загрузить файлы"
                    showClear
                    showCancel={false}
                    onClear={() => {
                        switchAuthPopup(!showAuthPopup);
                    }}
                    disableSubmit={!clientsFile && !ordersFile && !tranzactionsFile}
                    onSubmit={() => {
                        onSubmit({
                            payments: tranzactionsFile,
                            clients: clientsFile,
                            records: ordersFile,
                        });
                        switchAuthPopup(!showAuthPopup);
                    }}
                    className={style.sync}
                >
                    <div className={style.subtitle}>Авторизуйтесь с вашими данными из yClients</div>
                    <div className={style.authContainer}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            className={style.inputAuth}
                            fullWidth
                            value={login}
                            label="Логин"
                            placeholder="Введите логин yClients"
                            onChange={ev => setLogin(ev.target.value)}
                            classes={{ adornedEnd: classes.adornedEnd }}
                        />
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            label="Пароль"
                            className={style.inputAuth}
                            value={password}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Введите пароль yClients"
                            onChange={ev => setPassword(ev.target.value)}
                            classes={{ adornedEnd: classes.adornedEnd }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment
                                        onClick={() => switchShowPassword(!showPassword)}
                                        position="end"
                                    >
                                        {!showPassword ? (
                                            <VisibilityOutlinedIcon color="primary" />
                                        ) : (
                                            <VisibilityOffOutlinedIcon color="primary" />
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <TextField
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        className={style.inputAuth}
                        label="Ссылка на виджет"
                        placeholder={'Вставьте ссылку на виджет'}
                        value={url}
                        onChange={ev => setUrl(ev.target.value)}
                    />
                    <div className={style.syncContainer}>
                        Где можно получить ссылку на виджет?
                        <Tooltip
                            title={
                                selectedCompany === 0 && (
                                    <span>
                                        1. В yClients перейти в разде «Настройки»
                                        <br />
                                        2. В разделе «Онлайн-запись» перейти в «Веб-сайт»
                                        <br />
                                        3. Перейти по ссылке напротив названия салона. (Пример
                                        ссылки: https://n000001.yclients.com/)
                                        <br />
                                        4. Скопировать ссылку на экране с виджетом. (Пример ссылки:
                                        https://n000001.yclients.com/company:483025?o=m1402857)
                                    </span>
                                )
                            }
                        >
                            <InfoOutlinedIcon color="primary" className={style.syncIcon} />
                        </Tooltip>
                    </div>
                    <React.Fragment>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={onSubmitPopupYclients}
                            disabled={!password || !login}
                        >
                            Синхронизировать
                        </Button>
                        <div className={style.subtitleFiles}>
                            Переносите рабочие данные из yClients в FeelQueen, чтобы начать
                            использовать нашу CRM-платформу без потери важной для бизнеса
                            информации. Загрузите хотя бы один файл с расширением .xls
                        </div>
                        <Label title="Таблица клиентов">
                            <div className={style.buttonContainer}>
                                {clientsFile && (
                                    <TextField
                                        size="small"
                                        disabled
                                        variant="outlined"
                                        className={style.input}
                                        value={clientsFile.name}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment
                                                    onClick={() => setClientsFile()}
                                                    position="end"
                                                >
                                                    <ClearIcon classes={{ root: classes.icon }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                                <Button
                                    className={style.button}
                                    onClick={() => uploadAction(setClientsFile)}
                                    type="file"
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                >
                                    {clientsFile ? 'Изменить ' : 'Добавить файл'}
                                    <input type="file" hidden />
                                </Button>
                            </div>
                        </Label>
                        <Label title="Таблица записей">
                            <div className={style.buttonContainer}>
                                {ordersFile && (
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        disabled
                                        className={style.input}
                                        value={ordersFile.name}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment
                                                    onClick={() => setOrdersFile()}
                                                    position="end"
                                                >
                                                    <ClearIcon classes={{ root: classes.icon }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                                <Button
                                    className={style.button}
                                    onClick={() => uploadAction(setOrdersFile)}
                                    type="file"
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                >
                                    {ordersFile ? 'Изменить ' : 'Добавить файл'}

                                    <input type="file" hidden />
                                </Button>
                            </div>
                        </Label>
                        <Label title="Таблица транзакций">
                            <div className={style.buttonContainer}>
                                {tranzactionsFile && (
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        disabled
                                        className={style.input}
                                        value={tranzactionsFile.name}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment
                                                    onClick={() => setTranzactionsFile()}
                                                    position="end"
                                                >
                                                    <ClearIcon classes={{ root: classes.icon }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                                <Button
                                    className={style.button}
                                    onClick={() => uploadAction(setTranzactionsFile)}
                                    type="file"
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                >
                                    {tranzactionsFile ? 'Изменить ' : 'Добавить файл'}
                                </Button>
                            </div>
                        </Label>
                        <input
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            hidden
                            ref={ref}
                            type="file"
                        />
                    </React.Fragment>
                </Popup>
            )}
            {showUniversePopup && (
                <Popup
                    textError={textError}
                    childrenContainerClassName={style.popupUniverseChildrenContainer}
                    submitButtonText="Синхронизировать"
                    showClear
                    showCancel={false}
                    onClear={() => {
                        switchUniversePopup(!showUniversePopup);
                    }}
                    onSubmit={onSubmitPopupUniverse}
                    title={`Синхронизация с ${selectedCompanyName}`}
                    subTitle={'test'}
                >
                    <div className={style.subtitleUniverse}>
                        Вставьте ссылку на Ваш виджет для онлайн-записи из {selectedCompanyName}.
                    </div>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        label="Ссылка на виджет"
                        placeholder={'Вставьте ссылку на виджет'}
                        value={url}
                        onChange={ev => setUrl(ev.target.value)}
                    />
                    <div className={style.syncContainer}>
                        Где можно получить ссылку на виджет?
                        <Tooltip
                            title={
                                selectedCompany === 1 ? (
                                    <span>
                                        1. В Universe перейти в раздел «Настройки» -> Виджеты
                                        <br />
                                        2. Выбрать активный виджет либо создать новый и активировать
                                        его
                                        <br />
                                        3. Нажать кнопку «Получить код вставки»
                                        <br />
                                        4. Перейти на вкладку «ссылка», скопировать полученную
                                        ссылку
                                    </span>
                                ) : (
                                    <span>
                                        1. В {selectedCompanyName} перейти в раздел «Настройки» ->
                                        Найти категорию "Виджет" <br />
                                        2. Опуститься до пункта "Ссылки на формы записи" <br />
                                        3. Скопировать общую ссылку
                                    </span>
                                )
                            }
                        >
                            <InfoOutlinedIcon color="primary" className={style.syncIcon} />
                        </Tooltip>
                    </div>
                </Popup>
            )}
        </React.Fragment>
    );
};

UploadPopup.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    setCRMSync: PropTypes.func,
};

export default UploadPopup;
