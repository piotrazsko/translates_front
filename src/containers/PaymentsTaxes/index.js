import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'components';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrencySelector } from 'modules/localization';

import style from './style.scss';

const Analitics = ({ history }) => {
    const currency = useSelector(getCurrencySelector);
    const dispatch = useDispatch();

    return (
        <Skeleton
            backgroundColor="#fffaf6"
            textError=""
            title="Размеры комиссий FeelQueen"
            subTitle=""
            showBackButtonInTop
            backText="Платежи"
            onBack={() => {
                history.goBack();
            }}
            classes={{ titleContainer: style.titleContainer }}
            bottomPositionButtons={false}
            onNext={false}
        >
            <Grid container spacing={3} className={style.container}>
                <Grid item md={12} className={style.priceItem}>
                    <div className={style.price}>
                        <span className={style.procent}>20%</span> от стоимости услуги*
                    </div>
                    <div className={style.description}>
                        За первую запись нового клиента через маркетплейс
                    </div>
                    <div className={style.note}>
                        * FeelQueen привлёк клиента и он записался к Вам через приложение или сайт.
                        Включая комиссию за эквайринг.{' '}
                    </div>
                </Grid>
                <Grid item md={12} className={style.priceItem}>
                    <div className={style.price}>
                        <span className={style.procent}>5%</span> от стоимости услуги**
                    </div>
                    <div className={style.description}>
                        За вторую и последующие записи нового клиента через маркетплейс{' '}
                    </div>
                    <div className={style.note}>
                        ** Повторные записи клиента, привлечённого FeelQueen. Включая комиссию за
                        эквайринг.{' '}
                    </div>
                </Grid>
                <Grid item md={12} className={style.priceItem}>
                    <div className={style.price}>
                        <span className={style.procent}>0%</span> от стоимости услуги***
                    </div>
                    <div className={style.description}>За любую запись вашего клиента </div>
                    <div className={style.note}>
                        *** Добавлены Вами в список клиентов либо перешедших по ссылке для
                        онлайн-записи. В случае онлайн-оплаты услуги клиентом — комиссия за
                        эквайринг 5%.{' '}
                    </div>
                </Grid>
            </Grid>
        </Skeleton>
    );
};

Analitics.propTypes = {
    history: PropTypes.object,
};

export default Analitics;
