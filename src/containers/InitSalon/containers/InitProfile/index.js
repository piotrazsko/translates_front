/* global google , Promise*/
import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '../../components/Skeleton';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import get from 'lodash/get';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import Geocode from 'react-geocode';
import config from 'config/base';
import {
    CityAutoCompleate,
    CountryAutoCompleate,
    AddressAutoCompleate,
    MetroAutoCompleate,
    PhoneInput,
} from 'components';
import {
    setSalonData,
    getSalonSelector,
    getSalonInfoSelector,
    getSalonLocationSelector,
} from 'modules/salon';
import style from './style.scss';

Geocode.setApiKey(config.mapAPIKey);

const setGeocode = (addressValue, cityValue, setLatLang) => {
    if (cityValue) {
        const text = `г.${cityValue} ${addressValue}`;
        Geocode.fromAddress(text).then(response => {
            const { lat, lng } = response.results[0].geometry.location;
            setLatLang({ lat, lng });
        });
    }
};

const InitProfile = ({ history, currentLocalization: { countryCode }, ...props }) => {
    const dispatch = useDispatch();
    const [phone, setPhone] = React.useState('');
    const [city, setCity] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [metro, setMetro] = React.useState();
    const [name, setName] = React.useState('');
    const [site, setSite] = React.useState('');
    const [place, setPlace] = React.useState('');
    const [instagram, setInstagram] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [isWorkAtClient, setIsWorkAtClinet] = React.useState(false);
    const [latlng, setLatLong] = React.useState({
        lat: 0,
        lng: 0,
    });
    const salonData = useSelector(getSalonSelector);
    const salonDataInfo = useSelector(getSalonInfoSelector);
    const salonDataLocation = useSelector(getSalonLocationSelector);
    const [textError, setTextError] = React.useState('');
    const [submitPushed, setSubmitPush] = React.useState(false);
    React.useEffect(() => {
        const { title, phone } = salonData;
        setPhone(phone);
        setName(title);
    }, [salonData]);
    React.useEffect(() => {
        const { instagram, site, description, is_work_at_client } = salonDataInfo;
        setSite(site || '');
        setInstagram(instagram);
        setDescription(description);
        setIsWorkAtClinet(is_work_at_client);
    }, [salonDataInfo]);
    React.useEffect(() => {
        setGeocode(address, city, setLatLong);
    }, [address, city]);
    React.useEffect(() => {
        const {
            country,
            city,
            address,
            lat,
            lng,
            metro_station_id,
            metro_station_title,
        } = salonDataLocation;
        setLatLong({ lat, lng });
        setCity(city);
        setCountry(country);
        setAddress(address);
        setMetro({ id: metro_station_id, value: metro_station_title, label: metro_station_title });
    }, [salonDataLocation]);
    const onSubmit = () => {
        setSubmitPush(true);

        switch (true) {
            case !name ||
                !phone ||
                !country ||
                !city ||
                !address ||
                phone.replace(/\D/g, '').length < 10:
                setTextError('Заполните обязательные поля');
                break;

            default:
                dispatch(
                    setSalonData({
                        instagram,
                        site: site
                            ? site.length > 0 && site.indexOf('http') === 0
                                ? site
                                : `https://${site}`
                            : undefined,
                        description,
                        is_work_at_client: isWorkAtClient,
                        country,
                        city,
                        place,
                        address,
                        lat: latlng.lat,
                        lng: latlng.lng,
                        metro_station_id: get(metro, 'id'),
                        phone: phone.replace(/\D/g, '') || undefined,
                        title: name,
                        onSuccess: () => {
                            history.push('/init-skills');
                        },
                    })
                );
        }
    };

    return (
        <Skeleton
            progress={0}
            textError={textError}
            backButtonText=""
            title="О салоне"
            onNext={onSubmit}
            subTitle={`Заполните основную информацию о салоне, она будет доступна клиентам в вашем профиле`}
        >
            <Grid container>
                <Grid item xs={10} sm={6} md={4}>
                    <div>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            required
                            value={name}
                            onChange={ev => setName(ev.target.value)}
                            fullWidth
                            margin="normal"
                            label="Название"
                            placeholder="Введите название салона"
                            helperText={
                                submitPushed && !name ? (
                                    <span className={style.errorText}>Введите название салона</span>
                                ) : (
                                    ''
                                )
                            }
                        />
                    </div>
                    <div>
                        <PhoneInput
                            value={phone}
                            onChange={setPhone}
                            margin="normal"
                            fullWidth
                            required
                            countryCode={countryCode}
                            InputLabelProps={{ shrink: true }}
                            label="Контактный номер"
                            helperText={
                                submitPushed && (!phone || phone.replace(/\D/g, '').length < 10) ? (
                                    <span className={style.errorText}>Укажите номер для связи</span>
                                ) : (
                                    ''
                                )
                            }
                        />
                    </div>
                    <div>
                        <CountryAutoCompleate
                            required
                            name="country"
                            value={country}
                            InputLabelProps={{ shrink: true }}
                            onChange={setCountry}
                            helperText={
                                submitPushed && !country ? (
                                    <span className={style.errorText}>Выберите вашу страну</span>
                                ) : (
                                    ''
                                )
                            }
                        />
                    </div>
                    <div>
                        <CityAutoCompleate
                            required
                            value={city}
                            onChange={newInputValue => {
                                setCity(newInputValue);
                            }}
                            InputLabelProps={{ shrink: true }}
                            country={country}
                            name="city"
                            helperText={
                                submitPushed && !city ? (
                                    <span className={style.errorText}>Введите ваш город</span>
                                ) : (
                                    ''
                                )
                            }
                        />
                    </div>
                    <div>
                        <AddressAutoCompleate
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            required
                            onChange={setAddress}
                            value={address}
                            city={city}
                            name="address"
                            margin="normal"
                            label="Адрес"
                            placeholder="Например, улица Пушкина 8"
                            helperText={
                                submitPushed && !address ? (
                                    <span className={style.errorText}>Введите ваш адрес</span>
                                ) : (
                                    ''
                                )
                            }
                        />
                    </div>
                    <div>
                        <TextField
                            value={place}
                            onChange={ev => setPlace(ev.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            margin="normal"
                            label="Место оказания услуг"
                            placeholder="Например, ТЦ Афимолл 1ый уровень"
                        />
                    </div>
                    <div>
                        <MetroAutoCompleate
                            name="metro"
                            value={metro}
                            city={city}
                            onChange={setMetro}
                        />
                    </div>
                    <div>
                        <TextField
                            value={site}
                            onChange={ev => setSite(ev.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            margin="normal"
                            label="Сайт"
                            placeholder="Например, feelqueen.by"
                        />
                    </div>
                    <div>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={instagram}
                            onChange={ev => setInstagram(ev.target.value)}
                            fullWidth
                            margin="normal"
                            label="Инстаграм"
                            placeholder="Например feelqueenby"
                        />
                    </div>
                    <div className={style.input}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={description}
                            onChange={ev => setDescription(ev.target.value)}
                            fullWidth
                            margin="normal"
                            label="Описание салона"
                            placeholder="Кратко расскажите клиентам о вашем салоне"
                            multiline
                        />
                    </div>
                    {/*<div className={style.input}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isWorkAtClient}
                                    onChange={() => setIsWorkAtClinet(!isWorkAtClient)}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Выезд к клиенту"
                        />
                    </div>*/}
                </Grid>
            </Grid>
        </Skeleton>
    );
};

InitProfile.propTypes = {
    // : PropTypes.
};

export default InitProfile;
