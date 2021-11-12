import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { Pane } from 'components';

const Home = ({ ...props }) => {
    const { t } = useTranslation();

    return (
        <>
            <Pane title={t('about_me')}>
                <Typography variant="body1">{t('user_about_me')}</Typography>
            </Pane>
        </>
    );
};

Home.propTypes = {
    // : PropTypes.
};

export default Home;
