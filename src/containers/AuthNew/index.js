import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import { getTokenRequest, getCodeRequest, checkUserAuth, getCodeSelector } from 'modules/auth';
import { useDispatch } from 'react-redux';

import { showPopupAction } from 'modules/popups';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Code from './components/Code';
import Phone from './components/Phone';
import SelectUserType from './components/SelectUserType';

import style from './style.scss';

const Auth = ({
    getCodeRequest,
    history,
    getTokenRequest,
    codeResponce: { code: smsCode, is_new, user_id, is_deleted },
    showPopupAction,
    match: {
        params: { path },
    },
    currentLocalization: { countryCode },
}) => {
    const dispatch = useDispatch();
    const [phone, setPhone] = React.useState('');
    const [code, setCode] = React.useState();
    const [lastName, setLastName] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [userType, setuserType] = React.useState(2);
    const [confitmPolicy, setConfirmPolicy] = React.useState(false);
    const [textError, setTextError] = React.useState('');

    React.useEffect(() => {
        if (smsCode) {
            setCode(smsCode);
        }
    }, [smsCode]);
    React.useEffect(() => {
        setTextError('');
    }, [path]);

    return (
        <div className={style.container}>
            <form
                name="form_auth"
                className={style.centerBlock}
                onSubmit={ev => {
                    // console.log('SUBMIT');
                    // ev.preventDefault();
                }}
            >
                {path !== 'registration' && (
                    <div className={style.logoContainer}>
                        <div className={style.logo}></div>
                    </div>
                )}
                <div
                    className={
                        path !== 'registration'
                            ? style.dataContainer
                            : style.dataContainerRegistration
                    }
                >
                    {(() => {
                        switch (path) {
                            case undefined:
                                return (
                                    <Grid container>
                                        <span className={style.textContainer}>
                                            Введите номер телефона
                                        </span>
                                        <Phone
                                            fullWidth
                                            countryCode={countryCode}
                                            name="phone"
                                            phone={phone}
                                            setPhone={setPhone}
                                        />
                                    </Grid>
                                );
                            case 'code':
                                return (
                                    <Grid container>
                                        <span className={style.textContainer}>
                                            Введите код с телефона
                                        </span>
                                        <Code code={code} name="code" setCode={setCode} />
                                    </Grid>
                                );
                            case 'registration':
                                return (
                                    <SelectUserType
                                        email={email}
                                        setEmail={setEmail}
                                        name="userType"
                                        confitmPolicy={confitmPolicy}
                                        setConfirmPolicy={setConfirmPolicy}
                                        firstName={firstName}
                                        lastName={lastName}
                                        userType={userType}
                                        setFirstName={setFirstName}
                                        setLastName={setLastName}
                                        setuserType={setuserType}
                                    />
                                );
                            default:
                                return;
                        }
                    })()}
                    {path == 'code' && ( //// TODO: need set 'code ' for show this code
                        <div
                            className={style.resendButton}
                            onClick={() => {
                                history.push('/auth');
                            }}
                        >
                            Отправить код еще раз
                        </div>
                    )}
                    <div className={style.buttonNextContainer}>
                        {path == 'code' && (
                            <Button
                                onClick={() => {
                                    history.push('/auth');
                                }}
                                size="large"
                                color="primary"
                                disabled={path == 'registration' && !confitmPolicy}
                                fontSize={12}
                                variant="outlined"
                            >
                                Назад
                            </Button>
                        )}
                        <Button
                            type="submit"
                            typeButton="submit"
                            color="primary"
                            disabled={
                                path == 'registration' &&
                                (!confitmPolicy ||
                                    email.length == 0 ||
                                    firstName.length == 0 ||
                                    lastName.length === 0)
                            }
                            fontSize={12}
                            size="large"
                            variant="contained"
                        >
                            Продолжить
                        </Button>
                        <div className={style.textError}>{textError}</div>
                    </div>
                </div>
            </form>
        </div>
    );
};
Auth.defaultProps = {
    currentLocalization: { countryCode: 'by' },
};

Auth.propTypes = {
    getCodeRequest: PropTypes.func.isRequired,
    history: PropTypes.object,
    getTokenRequest: PropTypes.func.isRequired,
    codeResponce: PropTypes.shape({
        code: PropTypes.string,
        user_id: PropTypes.string,
        is_new: PropTypes.number,
    }),
    showPopupAction: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.object,
    }),
};
const mapDispatchToProps = dispatch => ({
    getTokenRequest: bindActionCreators(getTokenRequest, dispatch),
    getCodeRequest: bindActionCreators(getCodeRequest, dispatch),
    showPopupAction: bindActionCreators(showPopupAction, dispatch),
});
const mapStateToProps = state => ({
    codeResponce: getCodeSelector(state),
    userIsAuth: checkUserAuth(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
