import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton } from 'components';
import { showPopupAction } from 'modules/popups';

import { getSalonSelector } from 'modules/salon';
import { getMastersRequest, getSalonMastersSelector, deleteMasterRequest } from 'modules/masters';
import MasterItem from 'components/MasterItem';

const InitMasters = ({ history }) => {
    const dispatch = useDispatch();
    const [textError, setTextError] = React.useState('');

    const { id } = useSelector(getSalonSelector);
    const masters = useSelector(getSalonMastersSelector);
    React.useEffect(() => {
        if (id) {
            dispatch(getMastersRequest({ id }));
        }
    }, [id]);
    const deleteMaster = user_id => {
        dispatch(
            showPopupAction({
                message: 'Вы действительно хотите удалить мастера?',
                onClick: () => {
                    dispatch(
                        deleteMasterRequest(
                            {
                                id,
                                user_id,
                            },
                            {
                                onSuccess: () => {
                                    dispatch(getMastersRequest({ id }));
                                },
                            }
                        )
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
    };
    return (
        <Skeleton
            textError={textError}
            title="Сотрудники"
            bottomPositionButtons={false}
            onNext={() => {
                switch (true) {
                    case masters.length == 0:
                        setTextError('Добавьте хотя бы одного мастера');
                        return;
                    default:
                        history.push('/add-master');
                        return;
                }
            }}
            subTitle=""
        >
            <Grid container>
                <Grid item xs={12}>
                    {masters.map(i => (
                        <MasterItem
                            key={i.id}
                            data={i}
                            onClick={() => {
                                if (i.status !== 'pending') {
                                    history.push('/masters/' + i.id);
                                }
                            }}
                            onClose={s => {
                                switch (s) {
                                    case 0:
                                        history.push(`/event/add?master=${i.id}`);
                                        break;
                                    case 2:
                                        history.push(`/add-master/${i.id}`);
                                        break;
                                    case 1:
                                        history.push(`/calendar/edit/${i.id}`);
                                        break;
                                    case 3:
                                        deleteMaster(i.id);
                                        break;
                                    default:
                                        break;
                                }
                            }}
                        />
                    ))}
                </Grid>
            </Grid>
        </Skeleton>
    );
};

InitMasters.propTypes = {
    history: PropTypes.object,
};

export default InitMasters;
