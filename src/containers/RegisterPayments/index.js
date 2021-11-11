/* global Map */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { withStyles } from '@material-ui/core/styles';
import { getSalonSelector } from 'modules/salon';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { DATE_FORMAT_FOR_DOCS } from '../../constants';
import { Skeleton } from 'components';
import {
    savePaymentsDataRequest,
    getUploadedDataRequest,
    getUploadedDocsSelector,
    getPaymentsDocsRequest,
} from 'modules/register_payments';
import Bank from './components/Bank';
import Copies from './components/Copies';
import Director from './components/Director';
import DocumentsSign from './components/DocumentsSign';
import Founders from './components/Founders';
import Organization from './components/Organization';
import { getDataFromCurrentLocarion } from 'helpers/url';

import style from './style.scss';

const NoLineConnector = withStyles({
    line: {
        height: 0,
        border: 0,
    },
    root: {
        border: 0,
    },
})(StepConnector);

const RegisterPayments = ({ history, currentLocalization: { countryCode } }) => {
    const { step } = getDataFromCurrentLocarion();
    const dispatch = useDispatch();
    const { id } = useSelector(getSalonSelector);
    const isBel = countryCode === 'by';
    const confirmedData = useSelector(getUploadedDocsSelector);
    const [stepsData, setStepsData] = useState({});
    React.useEffect(() => {
        const {
            authorized_capital,
            bank_account,
            bank_bik,
            bank_correspondent_account,
            bank_name,
            full_name,
            unp,
            inn,
            is_juridic_founder,
            kpp,
            legal_address,
            loaded,
            manager_address,
            manager_birthday,
            manager_code,
            manager_company_docs,
            manager_docs_date,
            manager_docs_number,
            manager_docs_organ,
            manager_docs_series,
            manager_docs_type,
            manager_name,
            manager_post,
            ogrn,
            okved,
            registration_authority,
            registration_date,
            short_name,
            founders,
        } = confirmedData;
        const bank = {
            bank_account,
            bank_bik,
            bank_correspondent_account,
            bank_name,
        };
        const manager = {
            manager_address,
            manager_birthday,
            manager_code,
            manager_company_docs,
            manager_docs_date,
            manager_docs_number,
            manager_docs_organ,
            manager_docs_series,
            manager_docs_type,
            manager_name,
            manager_post,
        };
        const step0 = isBel
            ? {
                  legal_address,
                  unp: unp || inn,
                  // inn,
                  short_name,
              }
            : {
                  authorized_capital,
                  full_name,
                  inn,
                  kpp,
                  legal_address,
                  loaded,
                  ogrn,
                  okved,
                  registration_authority,
                  registration_date,
                  short_name,
              };
        const foundersStep = is_juridic_founder
            ? {
                  is_juridic_founder,
              }
            : { founders };

        setStepsData({
            ...stepsData,
            Organization: step0,
            Bank: bank,
            Founders: foundersStep,
            Director: manager,
        });
    }, [confirmedData]);
    const [activeStep, setActiveStep] = React.useState(step || 0);

    const getSteps = useCallback(() => {
        const steps = new Map();

        steps.set('Organization', { title: 'Организация', content: Organization });
        if (!isBel) {
            steps.set('Founders', { title: 'Учредители', content: Founders });
        }
        steps.set('Director', { title: 'Директор', content: Director });
        steps.set('Bank', { title: 'Банковские реквизиты', content: Bank });
        steps.set('DocumentsSign', { title: 'Подписание документов', content: DocumentsSign });
        steps.set('Copies', { title: 'Загрузка копий', content: Copies });

        return steps;
    }, [isBel]);

    React.useEffect(() => {
        if (id) {
            dispatch(getUploadedDataRequest({ id }));
        }
    }, [id]);

    const steps = getSteps(isBel);

    const setStepData = useCallback((step, data) => {
        setStepsData({ ...stepsData, [step]: data });
    });
    // console.log(stepsData);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const prepareData = () => {
        return Object.values(stepsData).reduce((obj, item) => (obj = { ...obj, ...item }), {});
    };

    const sendForm = (additionalData, callback) => {
        const data = prepareData();
        // HACK: use for fix format date  on server
        //
        data.manager_docs_date = moment(data.manager_docs_date).format(DATE_FORMAT_FOR_DOCS);
        data.manager_birthday = moment(data.manager_birthday).format(DATE_FORMAT_FOR_DOCS);
        data.registration_date = moment(data.registration_date).format(DATE_FORMAT_FOR_DOCS);
        data.founders = Array.isArray(data.founders)
            ? data.founders.map(i => ({
                  ...i,
                  birthday: moment(i.birthday).format(DATE_FORMAT_FOR_DOCS),
                  passport_date: moment(i.passport_date).format(DATE_FORMAT_FOR_DOCS),
              }))
            : undefined;
        dispatch(
            savePaymentsDataRequest(
                {
                    id: id,
                    data: {
                        ...data,
                        ...additionalData,
                    },
                },
                {
                    onSuccess: () => {
                        dispatch(
                            getPaymentsDocsRequest(
                                {
                                    id: id,
                                    type: 'all',
                                },
                                {
                                    onSuccess: () => {
                                        if (typeof callback == 'function') {
                                            callback();
                                        }
                                    },
                                }
                            )
                        );
                    },
                }
            )
        );
    };

    const renderSteps = React.useCallback(() => {
        const stepsContent = [];
        for (let [stepName, data] of steps.entries()) {
            const { content: StepContentComponent, title } = data;
            stepsContent.push(
                <Step key={stepName}>
                    <StepLabel>{title}</StepLabel>
                    <StepContent>
                        <StepContentComponent
                            step={stepName}
                            saveStepData={setStepData}
                            savedStepData={stepsData[stepName]}
                            handleNext={handleNext}
                            handleBack={handleBack}
                            sendForm={sendForm}
                            history={history}
                            isBel={isBel}
                        />
                    </StepContent>
                </Step>
            );
        }
        return stepsContent;
    }, [steps, stepsData, history, isBel]);

    return (
        <Skeleton
            backgroundColor="#fff"
            textError=""
            subTitle=""
            showBackButtonInTop
            backText="Выйти"
            onBack={() => {
                history.goBack();
            }}
            classes={{ titleContainer: style.titleContainer }}
            nextButtonText={false}
        >
            <Grid container>
                <Grid item xs={10} md={6} lg={5}>
                    <Stepper
                        activeStep={activeStep}
                        orientation="vertical"
                        connector={<NoLineConnector />}
                    >
                        {renderSteps()}
                    </Stepper>
                </Grid>
            </Grid>
        </Skeleton>
    );
};

RegisterPayments.propTypes = {
    history: PropTypes.object,
    currentLocalization: PropTypes.object,
};

export default RegisterPayments;
