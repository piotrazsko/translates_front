const TIME_OF_HIDE_HINT = 300;

export const crop = theme => ({
    // cancelButton: theme.custom.dialog.buttons.decline,
    // acceptButton: theme.custom.dialog.buttons.accept,
    paper: {
        minWidth: 825,
        paddingBottom: 10,
        margin: 0,
    },
    title: {
        padding: '13px 25px',
        border: '1px solid #dbdbdb',
        // fontSize: theme.custom.largeFontSize,
        fontWeight: 900,
        color: '#000000',
        letterSpacing: 0.3,
    },
    clear: {
        position: 'absolute',
        right: 0,
        top: 0,
        margin: 0,
        color: '#000000',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
    },
    actions: {
        margin: '5px 29px 0 10px',
    },
    action: {
        '&:first-child': {
            marginRight: 'auto',
        },
    },
    content: {
        padding: 0,
        margin: '29px 29px 10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    zoomHint: {
        margin: '0 0 10px',
        // fontSize: theme.custom.smallFontSize,
        lineHeight: '12px',
        padding: '0 0 0 15px',
        width: '100%',
    },
    zoomContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        '& > .rc-slider': {
            width: 120,
        },
    },
    zoomButton: {
        height: 38,
        maxWidth: 38,
        minHeight: 38,
        margin: '0 10px',
    },
    zoomIcon: {
        fontSize: 26,
        height: 38,
        lineHeight: '38px',
    },
    avatarContent: {
        display: 'inline-block',
        position: 'relative',
    },
    avatarHint: {
        position: 'absolute',
        left: 'calc(50% - 150px)',
        top: 'calc(50% - 150px)',
        width: 300,
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // transition: `opacity ${TIME_OF_HIDE_HINT}ms ${theme.custom.transitionName}`,
    },
    avatarHintHide: {
        opacity: 0,
    },
    avatarHintRemove: {
        display: 'none',
        opacity: 0,
    },
    avatarHintIconContainer: {
        borderRadius: '50%',
        padding: 5,
        background: 'rgba(0, 0, 0, 0.4)',
        // marginBottom: 10,
        width: 20,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // boxSizing: 'border-box',
    },
    avatarHintIcon: {
        color: '#ffffff',
    },
    avatarDescription: {
        color: '#ffffff',
        fontSize: 12,
        height: 27.43,
        fontWeight: 500,
        borderRadius: 30,
        padding: '0px 8px',
        border: '1px solid #ffffff',
        background: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        // lineHeight: 1,
        alignItems: 'center',
        boxSizing: 'border-box',
    },
});

export const canvasStyles = {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
};

export const sliderStyles = {
    handleStyle: {
        width: 25,
        height: 25,
        backgroundColor: '#21b4ff',
        border: '2px solid #ffffff',
        marginTop: '-11px',
        marginLeft: '-11px',
        boxShadow: '0px 1px 3.5px 0px rgba(0, 0, 0, 0.25)',
    },
    railStyle: {
        height: 2,
        backgroundColor: '#dbdbdb',
        maxWidth: 120,
    },
    trackStyle: [
        {
            height: 2,
            backgroundColor: '#21b6ff',
        },
    ],
    dotStyle: {
        opacity: 0,
    },
};
