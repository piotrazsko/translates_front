import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { InfoCard } from 'components';
import DoneIcon from '@material-ui/icons/Done';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import Button from '@material-ui/core/Button';

import style from './style.scss';
const INACTIVE = 'inactive';

const PaymentsData = ({ data, history, countryCode }) => {
    const { document_status, online_payment_status, name, inn, kpp, unp = '' } = data;
    return (
        <InfoCard
            title="Платёжные данные"
            minHeight="377px"
            showMenu={document_status !== INACTIVE}
            menuItems={[
                {
                    id: 1,
                    title: 'Загрузить документы',
                    classes: {},
                    onClick: () => {
                        if (countryCode === 'ru') {
                            history.push('/payments-register?step=5');
                        } else {
                            history.push('/payments-register?step=4');
                        }
                    },
                },
            ]}
        >
            <Grid item xs={12} className={style.dataContainerSmall}>
                {document_status !== INACTIVE ? (
                    <div>
                        <div className={style.status}>
                            <DoneIcon htmlColor="#60AF6E" />
                            <span>Документы загружены</span>
                        </div>
                        {countryCode == 'ru' ? (
                            <div className={style.description}>{`${name}
ИНН: ${inn}
КПП:${kpp}`}</div>
                        ) : (
                            <div className={style.description}>{`${name}
УНП: ${unp || ''}`}</div>
                        )}
                    </div>
                ) : (
                    <div>
                        <div className={style.status}>
                            <ReportProblemOutlinedIcon htmlColor="#FFBB2F" color="warning" />
                            <span>Документы не загружены</span>
                        </div>
                        <div className={style.description}>
                            Заполните данные организации и загрузите подписанный договор, чтобы
                            получать счета и акты для бухгалтерии.{' '}
                        </div>
                    </div>
                )}
                {countryCode !== 'ru' ? null : online_payment_status !== INACTIVE ? (
                    <div>
                        <div className={style.status}>
                            <DoneIcon htmlColor="#60AF6E" color="success" />
                            <span>Онлайн оплата подключена</span>
                        </div>
                        <div className={style.description}>
                            Завершая запись с онлайн-оплатой, средства будут автоматически списаны с
                            карты клиента и отправлены на ваш банковский счёт.
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className={style.status}>
                            <ReportProblemOutlinedIcon htmlColor="#FFBB2F" color="warning" />
                            <span>Онлайн оплата не подключена</span>
                        </div>
                        <div className={style.description}>
                            Подключите онлайн-платежи, чтобы предоставить клиентам самый удобный
                            способ оплаты: списание средств после завершения услуги (как в такси).{' '}
                        </div>
                    </div>
                )}
                {document_status === INACTIVE && (
                    <div className={style.button}>
                        <Button
                            onClick={() => {
                                history.push('/payments-register');
                            }}
                            className={style.button}
                            color="primary"
                            variant="contained"
                        >
                            Загрузить документы
                        </Button>
                    </div>
                )}
            </Grid>
        </InfoCard>
    );
};

PaymentsData.propTypes = {
    data: PropTypes.object,
    history: PropTypes.object,
    countryCode: PropTypes.string,
};
PaymentsData.defaultProps = {};

export default PaymentsData;
