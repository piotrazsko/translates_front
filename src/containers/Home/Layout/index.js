import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer.js';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './theme';

import { SideBar, Header } from 'components';
import AOS from 'aos/dist/aos';
import 'aos/dist/aos.css';
import GlobalStyles from './GlobalStyles.js';

AOS.init({ once: true });

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        // marginTop: '80px',
        // display: 'flex',
    },
}));

const Layout = ({
    myPermissionsSelector,
    children,
    viewPort,
    currentLocalization,
    history,
    route: { showHeader = true, showSidebar = true },
    ...rest
}) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { isMobile } = viewPort ?? {};

    const [isEndOfPage, setEndOfPage] = React.useState(false);
    const restWithPermissons = {
        viewPort,
        isEndOfPage,
        children,
        currentLocalization,
        history,
        ...rest,
    };

    return (
        <>
            <Helmet>
                <title>{t('user_name')}</title>
            </Helmet>
            <GlobalStyles />
            {showHeader ? <Header history={history} /> : null}
            <MuiThemeProvider theme={theme}>
                <Container maxWidth="" classes={{ root: classes.root }}>
                    {React.createElement(children, restWithPermissons)}
                </Container>
                <Footer />
            </MuiThemeProvider>
        </>
    );
};

Layout.propTypes = {
    viewPort: PropTypes.shape({ isMobile: PropTypes.bool.isRequired })
        .isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.any,
        PropTypes.arrayOf(PropTypes.element),
    ]),
    myPermissionsSelector: PropTypes.object,
    currentLocalization: PropTypes.string,
};

export default Layout;