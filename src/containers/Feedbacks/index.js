import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';

import { getSalonSelector } from 'modules/salon';
import {
    getFeedbacksRequest,
    getFeedbacksSelector,
    getFeedbacksDetailsRequest,
    getFeedbacksDetailsSelector,
} from 'modules/feedback';
import FeedbackItem from './components/FeedbackItem';
import RatingDetails from './components/RatingDetails';
import { Skeleton } from 'components';
import style from './style.scss';

const InitFeedbacks = ({ history }) => {
    const dispatch = useDispatch();

    const { id } = useSelector(getSalonSelector);
    const feedbacks = useSelector(getFeedbacksSelector);
    const feedbacksDetails = useSelector(getFeedbacksDetailsSelector);
    console.log(feedbacksDetails);
    React.useEffect(() => {
        if (id) {
            dispatch(getFeedbacksRequest({ id, limit: 100, offset: 0 }));
            dispatch(getFeedbacksDetailsRequest({ id, limit: 100, offset: 0 }));
        }
    }, [id]);
    return (
        <Skeleton textError="" title="Отзывы" subTitle="" nextButtonText="">
            <Grid container className={style.gridContainer}>
                {feedbacks.length > 0 ? (
                    <React.Fragment>
                        <Grid item xs={7}>
                            {feedbacks.map(i => (
                                <FeedbackItem history={history} key={i.id} data={i} />
                            ))}
                        </Grid>
                        <Grid item xs={5}>
                            <RatingDetails data={feedbacksDetails} />
                        </Grid>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Grid xs={2} />
                        <Grid item xs={8} className={style.container}>
                            <div className={style.circle} />
                            <div className={style.emptyText}>
                                Здесь будут отображены отзывы ваших клиентов.
                                <br /> Приглашайте их в FeelQueen и после окончания каждой услуги
                                напомните оставить положительный отзыв.
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    history.push('/clients/');
                                }}
                            >
                                Добавить клиента
                            </Button>
                        </Grid>
                        <Grid xs={2} />
                    </React.Fragment>
                )}
            </Grid>
        </Skeleton>
    );
};

InitFeedbacks.propTypes = {
    history: PropTypes.object,
};

export default InitFeedbacks;
