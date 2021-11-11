import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '../../components/Skeleton';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getSalonSelector } from 'modules/salon';
import { getMastersRequest, getSalonMastersSelector, deleteMasterRequest } from 'modules/masters';
import MasterItem from '../../components/MasterItem';
import style from './style.scss';

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
    return (
        <Skeleton
            progress={40}
            textError={textError}
            title="Сотрудники салона"
            onNext={() => {
                switch (true) {
                    case masters.length == 0:
                        setTextError('Добавьте хотя бы одного мастера');
                        return;
                    default:
                        history.push('/init-portfolio');
                        return;
                }
            }}
            onBack={() => {
                history.push('/init-skills');
            }}
            subTitle="Добавьте всех мастеров вашего салона, чтобы удобно управлять их записями и расписанием"
        >
            <Grid container>
                <Grid item xs={12} sm={10} md={8} lg={8}>
                    {masters.map(i => (
                        <MasterItem
                            key={i.id}
                            data={i}
                            onEdit={() => {
                                history.push(`/add-master/${i.id}`);
                            }}
                            onDelete={() => {
                                dispatch(deleteMasterRequest({ id, user_id: i.id }));
                            }}
                        />
                    ))}

                    <Button
                        className={style.button}
                        size="small"
                        onClick={() => {
                            history.push('/add-master');
                        }}
                        variant="contained"
                        color="primary"
                    >
                        {'+ Добавить мастера'}
                    </Button>
                </Grid>
            </Grid>
        </Skeleton>
    );
};

InitMasters.propTypes = {
    history: PropTypes.object,
};

export default InitMasters;
