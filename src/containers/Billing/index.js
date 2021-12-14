import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { Pane } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserRequest, getCurrentUserSelector } from 'modules/auth';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

const Billing = ({ ...props }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getCurrentUserRequest());
    }, []);
    const { apiKey, url, ...user } = useSelector(getCurrentUserSelector);
    return (
        <>
            <Pane title={t('title.billing')}>
                <Box>
                    <Typography gutterBottom variant="body1" display="inline">
                        {t('text.billing')}
                    </Typography>
                </Box>
            </Pane>
        </>
    );
};

Billing.propTypes = {
    // : PropTypes.
};

export default Billing;
