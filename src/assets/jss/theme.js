import { createMuiTheme } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
const bigestFontSize = 36;
const majorFontSize = 20;
const largeFontSize = 18;
const mediumFontSize = 16;
const normalFontSize = 14;
const smallFontSize = 12;
const breakpoints = createBreakpoints({});
const transitionName = 'cubic-bezier(0.7, 0, 0.25, 1)';
const marginTransition = `margin 0.5s ${transitionName}`;
const labelFontSize = 18;
export const theme = createMuiTheme({
    master: {
        title: {
            fontSize: bigestFontSize,
            fontWeight: 900,

            color: '#000000',
            transition: marginTransition,
            textAlign: 'left',
            margin: '70px 0 20px',
            '@media (max-height: 850px)': {
                marginTop: 60,
            },
            '@media (max-height: 800px)': {
                marginTop: 50,
            },
            '@media (max-height: 750px)': {
                marginTop: 40,
            },
            '@media (max-height: 730px)': {
                marginTop: 30,
            },
            '@media (max-height: 680px)': {
                marginTop: 20,
            },
        },
        description: {
            fontSize: normalFontSize,
            fontWeight: 400,
            textAlign: 'left',
            margin: '0 0 40px',
            color: '#767676',
            transition: marginTransition,
            '@media (max-height: 850px)': {
                marginBottom: 40,
            },
        },
    },
    custom: {
        blue: '#3195ff',

        transitionName,
        marginTransition,

        bigestFontSize,
        majorFontSize,
        largeFontSize,
        mediumFontSize,
        normalFontSize,
        smallFontSize,

        layoutContainer: {
            margin: '0 auto',
            width: 1230,
            padding: '0 15px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
        },
        title: {
            fontSize: bigestFontSize,
            fontWeight: 900,
            margin: '120px 0 20px',
            color: '#000000',
            transition: marginTransition,
        },
        error: {
            position: 'absolute',
            fontSize: 14,
            fontWeight: 400,
            color: '#ff1744',
            width: 330,
            textAlign: 'left',
            boxSizing: 'border-box',
        },
        dialog: {
            buttons: {
                accept: {
                    width: 120,
                    height: 30,
                    padding: 0,
                    fontSize: 12,
                    minHeight: 30,
                    fontWeight: 500,
                    color: '#ffffff',
                },
                decline: {
                    width: 120,
                    height: 30,
                    padding: 0,
                    fontSize: 12,
                    minHeight: 30,
                    fontWeight: 500,
                    color: '#5b5b5b',
                },
            },
        },
    },
    palette: {
        primary: {
            main: '#fa835f',
        },
        secondary: {
            main: '#8138ED',
        },
        warning: {
            main: '#FFBB2F',
        },
        success: {
            main: '#60AF6E',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1400,
            xl: 1820,
        },
    },
    props: {
        // withWidth component ⚛️
        MuiWithWidth: {
            // Initial width property
            initialWidth: 'lg', // Breakpoint being globally set 🌎!
        },
    },
    typography: {
        fontSize: 16,
        fontWeight: 500,
        fontFamily: ['Montserrat'].join(','),
        h1: {
            fontFamily: ['Montserrat'].join(','),
            fontSize: 50,
            fontWeight: 900,
            [breakpoints.down('md')]: {
                fontSize: 28,
            },
        },
        h2: {
            fontFamily: ['Montserrat'].join(','),
            fontSize: 46,
            fontWeight: 900,
            [breakpoints.down('md')]: {
                fontSize: 28,
            },
        },
        h4: {
            fontFamily: ['Raleway'].join(','),
            fontSize: 32,
            fontWeight: 700,
        },
        h5: {
            fontFamily: ['Montserrat'].join(','),
            fontSize: 24,
            fontWeight: 700,
        },
        h6: {
            fontFamily: ['Montserrat'].join(','),
            fontSize: 18,
            fontWeight: 900,
        },
        button: {
            'font-family': 'Montserrat',
            'font-size': '14px',
            'font-style': 'normal',
            fontWeight: 600,
            textTransform: 'none',
        },
    },
    overrides: {
        MuiButton: {
            root: {
                fontSize: 14,
                'min-width': 130,
                margin: '0  10px 0 0',
                '&:disabled': {
                    'background-color': 'rgba(0, 0, 0, 0.12)',
                },
                height: 40,
                borderRadius: 6,
                padding: '0 24px',
            },
            contained: {
                'box-shadow': 'none',
            },
            outlined: {
                minWidth: '128px',
                padding: '0 12px',
            },
            sizeSmall: {
                'min-width': '120px',
                padding: '0px 16px',
                fontSize: 14,
                height: 32,
                borderRadius: 12,
            },
            sizeLarge: {
                padding: '0px 24px',
                'min-width': '180px',
                fontSize: 14,
                height: 48,
                borderRadius: 12,
            },
            outlinedPrimary: {
                color: 'black',
                '&:hover': {
                    'background-color': 'rgba(255, 167, 140, 0.1)',
                    'box-shadow': 'none',
                },
            },
            containedPrimary: {
                color: 'white',
                '&:hover': {
                    'background-color': '#ffa78c',
                    'box-shadow': 'none',
                },
            },
        },
        MuiFormLabel: {
            root: {
                fontWeight: 500,
                fontSize: labelFontSize,
                // color: '#000',
            },
            shrink: {
                color: '#000',
            },
        },
        MuiFormControlLabel: {
            label: {
                fontWeight: 500,
            },
        },
        MuiInputLabel: {
            root: {
                fontWeight: 500,
                fontSize: labelFontSize,
                // color: '#000',
            },
            shrink: {
                color: '#000',
            },
        },
        MuiInputBase: {
            root: {
                fontSize: '16px',
                fontWeight: 500,
            },
        },
        MuiIconButton: {
            sizeSmall: {
                minHeight: '32px',
            },
        },
        PrivateNotchedOutline: {
            legendNotched: {
                fontSize: 0.75 * labelFontSize,
            },
        },
        MuiStepIcon: {
            root: {
                width: '1.3em',
                height: '1.3em',
                color: 'transparent',
                border: '1px solid #DADADA',
                borderRadius: '50%',
                marginRight: '16px',
            },
            active: {
                border: 'none',
                '& $text': {
                    fill: '#fff',
                },
            },
            completed: {
                border: 'none',
            },
            text: {
                fontSize: '13px',
                fill: '#000',
                '&$active': {
                    fill: '#fff',
                },
            },
        },
        MuiStepContent: {
            root: {
                borderLeft: 'none',
                marginLeft: '60px',
                paddingLeft: 0,
                paddingRight: '30px',
            },
        },
        MuiStepLabel: {
            root: {
                fontFamily: ['Montserrat'].join(','),
            },
            label: {
                fontSize: '24px',
                fontWeight: 700,
                '&$active': {
                    fontWeight: 700,
                },
                '&$completed': {
                    fontWeight: 700,
                },
            },
        },
    },
});
