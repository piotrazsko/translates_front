import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveCookiesAction, getCookiesSelector } from 'modules/cookies';
import Button from '@material-ui/core/Button';

import style from './style.scss';

const Cookie = ({ cookies: { save }, saveCookiesAction }) => {
    const [show, setShow] = React.useState(true);
    const onClick = () => {
        saveCookiesAction(true);
        setShow(false);
    };
    const onCancel = () => {
        saveCookiesAction(false);
        setShow(false);
    };
    return (
        show &&
        !save && (
            <div className={style.container}>
                <div className={style.text}>
                    <span>
                        Мы используем файлы cookie для авторизации, чтобы персонализировать контент
                        и обеспечить безопасность. Перейдя на сайт, вы соглашаетесь с использованием
                        файлов cookie для сбора информации на FeelQueen и за его пределами.
                        Ознакомьтесь с нашими правилами в отношении файлов{' '}
                        <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://info.feelqueen.by/privacy#cookie"
                        >
                            cookie
                        </a>
                    </span>
                </div>
                <div className={style.buttons}>
                    <Button onClick={onClick} variant="contained" color="primary">
                        Ok
                    </Button>
                </div>
            </div>
        )
    );
};

const mapStateToProps = state => ({
    cookies: getCookiesSelector(state),
});
const mapDispatchToProps = dispatch => ({
    saveCookiesAction: bindActionCreators(saveCookiesAction, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cookie);
