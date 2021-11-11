import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { getSalonSelector } from 'modules/salon';
import {
    deleteCustomSkillSubSkillsRequest,
    getCustomSkillsRequest,
    getSalonCustomSkillsSelector,
} from 'modules/skills/customSkills.js';
import { showPopupAction } from 'modules/popups';
import { Skeleton, PagePlaceHolder } from 'components';
import { SkillItem } from 'feelqueen_components';
import style from './style.scss';
import {
    getListSkillsSelector,
    deleteSkillRequest,
    getSkillsRequest,
    getSalonSkillsSelector,
} from 'modules/skills';

const Services = ({ history }) => {
    const dispatch = useDispatch();
    const [textError, setTextError] = React.useState('');
    const skillsFullList = useSelector(getListSkillsSelector);
    const skills = useSelector(getSalonSkillsSelector);
    const services = useSelector(getSalonCustomSkillsSelector);
    const { id, currency_id } = useSelector(getSalonSelector);
    React.useEffect(() => {
        if (id) {
            dispatch(getSkillsRequest({ id }));
            dispatch(getCustomSkillsRequest({ id }));
        }
    }, [id]);
    let prevTitle;
    const preparedSkills = React.useMemo(() => {
        return skills.sort((a, b) => {
            return a.parent_skill_id - b.parent_skill_id;
        });
    }, [skills]);
    return (
        <Skeleton
            bottomPositionButtons={false}
            textError={textError}
            nextButtonText="+ Добавить/Изменить"
            title={`Услуги  ${preparedSkills.length + services.length || ''}`}
            onNext={
                preparedSkills.length > 0 || services.length > 0
                    ? () => {
                          history.push('/services/edit');
                      }
                    : false
            }
            subTitle=""
        >
            <Grid container>
                {preparedSkills.length > 0 || services.length > 0 ? (
                    <Grid item xs={12} md={12}>
                        {preparedSkills.map((i, index) => {
                            const title = get(
                                skillsFullList.find(item => item.id == i.parent_skill_id),
                                'title'
                            );
                            return (
                                <React.Fragment key={i.id}>
                                    {prevTitle !== title && (prevTitle = title) && (
                                        <div
                                            className={
                                                index ? style.skillCategory : style.firstCategory
                                            }
                                        >
                                            {title}
                                        </div>
                                    )}

                                    <SkillItem
                                        showEdit={false}
                                        onEdit={() => {
                                            // history.push(`/init-custom-skills/${i.id}`);
                                        }}
                                        onDelete={() => {
                                            dispatch(
                                                showPopupAction({
                                                    message:
                                                        'Вы действительно хотите удалить услугу?',
                                                    onClick: () => {
                                                        dispatch(
                                                            deleteSkillRequest({
                                                                id,
                                                                skill_id: i.id,
                                                            })
                                                        );
                                                        return true;
                                                    },
                                                    onCancel: () => true,
                                                    showCancel: true,
                                                    submitButtonText: 'Ok',
                                                    // confirmButtonProps0: { size: 'small' },
                                                    // cancelButtonProps: { size: 'small' },
                                                })
                                            );
                                        }}
                                        currency_id={currency_id}
                                        data={{ ...i, ...(i.pivot || {}) }}
                                    />
                                </React.Fragment>
                            );
                        })}
                        {services.length > 0 && (
                            <div className={style.skillCategory}>Уникальные услуги</div>
                        )}
                        {services.map(i => (
                            <SkillItem
                                key={i.id}
                                onEdit={() => {
                                    history.push(`/init-custom-skills/${i.id}`);
                                }}
                                onDelete={() => {
                                    dispatch(
                                        showPopupAction({
                                            message: 'Вы действительно хотите удалить услугу?',
                                            onClick: () => {
                                                dispatch(
                                                    deleteCustomSkillSubSkillsRequest({
                                                        id,
                                                        service_id: i.id,
                                                    })
                                                );
                                                return true;
                                            },
                                            onCancel: () => true,
                                            showCancel: true,
                                            submitButtonText: 'Ok',
                                            confirmButtonProps: { size: 'small' },
                                            cancelButtonProps: { size: 'small' },
                                        })
                                    );
                                }}
                                currency_id={currency_id}
                                data={{ ...i, ...(i.pivot || {}) }}
                            />
                        ))}
                    </Grid>
                ) : (
                    <Grid item xs={12} md={12}>
                        <PagePlaceHolder
                            text={`Вы еше не добавили ни одной услуги и не можете записывать клиентов`}
                            buttonText="Добавить услуги"
                            onClick={() => {
                                history.push('/services/edit');
                            }}
                        />
                    </Grid>
                )}
            </Grid>
        </Skeleton>
    );
};

Services.propTypes = {
    history: PropTypes.object,
};

export default Services;
