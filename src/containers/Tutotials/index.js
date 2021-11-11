import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { showPopupAction } from 'modules/popups';
import {
    switchOffTutorialAction,
    getTutorialState,
    setSteps,
    getTutorialsSelector,
    defaultSteps,
} from 'modules/tutorials';
import style from './style.scss';

const useStyles = makeStyles(theme => ({
    buttonClose: {
        position: 'absolute',
        left: 'calc(100vw - 221px)',
        bottom: '60px',
    },
}));

const Tutorial = ({ children, match: { path } }) => {
    const classes = useStyles();
    const { is_enabled = true, ...stepsData } = useSelector(getTutorialsSelector);
    const forceShow = useSelector(getTutorialState);
    const { data } = stepsData || {};
    function createMarkup(path) {
        switch (path) {
            case '/calendar/edit/:masterId?':
                return {
                    __html: `<iframe src="https://www.iorad.com/player/1786529/-----2-------------------------------------?src=iframe&oembed=1"            width="100%" height="100vh"            style="width: 100%; height: 100vh; border-bottom: 1px solid #ccc;"            referrerpolicy="strict-origin-when-cross-origin"            frameborder="0" webkitallowfullscreen="webkitallowfullscreen"            mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>`,
                };
            case '/calendar':
                return {
                    __html: `<iframe src="https://www.iorad.com/player/1786617/-----1-----------------------------?src=iframe&oembed=1"            width="100%" height="100vh"            style="width: 100%; height: 100vh; border-bottom: 1px solid #ccc;"            referrerpolicy="strict-origin-when-cross-origin"            frameborder="0" webkitallowfullscreen="webkitallowfullscreen"            mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>`,
                };
            case '/clients':
                return {
                    __html: `<iframe src="https://www.iorad.com/player/1781525/-----3-------------------------?src=iframe&oembed=1"            width="100%" height="100vh"            style="width: 100%; height: 100vh; border-bottom: 1px solid #ccc;"            referrerpolicy="strict-origin-when-cross-origin"            frameborder="0" webkitallowfullscreen="webkitallowfullscreen"            mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>`,
                };
            case '/messages/:chatId?':
                return {
                    __html: `<iframe src="https://www.iorad.com/player/1780404/-----4-----------------------?src=iframe&oembed=1"            width="100%" height="100vh"            style="width: 100%; height: 100vh; border-bottom: 1px solid #ccc;"            referrerpolicy="strict-origin-when-cross-origin"            frameborder="0" webkitallowfullscreen="webkitallowfullscreen"            mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>`,
                };
            case '/finance':
                return {
                    __html: ` <iframe src="https://www.iorad.com/player/1786591/-----5---------------?src=iframe&oembed=1"            width="100%" height="100vh"            style="width: 100%; height: 100vh; border-bottom: 1px solid #ccc;"            referrerpolicy="strict-origin-when-cross-origin"            frameborder="0" webkitallowfullscreen="webkitallowfullscreen"            mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>`,
                };
            case '/analitics':
                return {
                    __html: `<iframe src="https://www.iorad.com/player/1781748/-----6----------------------------?src=iframe&oembed=1"            width="100%" height="100vh"            style="width: 100%; height: 100vh; border-bottom: 1px solid #ccc;"            referrerpolicy="strict-origin-when-cross-origin"            frameborder="0" webkitallowfullscreen="webkitallowfullscreen"            mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>`,
                };
            case '/masters':
                return {
                    __html: `<iframe src="https://www.iorad.com/player/1781420/-----7-------------------------?src=iframe&oembed=1"            width="100%" height="100vh"            style="width: 100%; height: 100vh; border-bottom: 1px solid #ccc;"            referrerpolicy="strict-origin-when-cross-origin"            frameborder="0" webkitallowfullscreen="webkitallowfullscreen"            mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>`,
                };
            case '/profile':
                return {
                    __html: `<iframe src="https://www.iorad.com/player/1778966/-----8----------------------------?src=iframe&oembed=1"            width="100%" height="100vh"            style="width: 100%; height: 100vh; border-bottom: 1px solid #ccc;"            referrerpolicy="strict-origin-when-cross-origin"            frameborder="0" webkitallowfullscreen="webkitallowfullscreen"            mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>`,
                };
            case '/':
                return {
                    __html: `<iframe src="https://www.iorad.com/player/1778854/-----9------------------?src=iframe&oembed=1"            width="100%" height="100vh"            style="width: 100%; height: 100vh; border-bottom: 1px solid #ccc;"            referrerpolicy="strict-origin-when-cross-origin"            frameborder="0" webkitallowfullscreen="webkitallowfullscreen"            mozallowfullscreen="mozallowfullscreen" allowfullscreen="allowfullscreen"></iframe>`,
                };
            default:
                return;
        }
    }
    const dispatch = useDispatch();
    const { tutorialPathes, tutorials, popupShowed } = React.useMemo(() => {
        const tutorials = get(JSON.parse(get(stepsData, 'data', '{}')), 'tutorials', []);
        const popupShowed = get(JSON.parse(get(stepsData, 'data', '{}')), 'popupShowed');
        const tutorialPathes = get(JSON.parse(get(stepsData, 'data', '{}')), 'tutorials', []).find(
            i => path === i.path
        );
        return { tutorials, tutorialPathes, popupShowed };
    }, [stepsData]);
    React.useEffect(() => {
        if (is_enabled && popupShowed === false) {
            dispatch(
                showPopupAction({
                    title: 'Добро пожаловать в FeelQueen!',
                    message: (
                        <React.Fragment>
                            {`Чтобы ознакомиться с возможностями сервиса,
мы предлагаем вам пройти интерактивные уроки,
которые в удобной форме научат вас по максимуму
использовать все преимущества.`}
                        </React.Fragment>
                    ),
                    submitButtonText: 'Начать обучение',
                    cancelButtonText: 'Пропустить',
                    onClick: () => {
                        dispatch(
                            setSteps({
                                is_enabled: true,
                                data: JSON.stringify({
                                    popupShowed: true,
                                    tutorials: [
                                        { path: '/calendar/edit/:masterId?', finished: false },
                                        { path: '/finance', finished: false },
                                        { path: '/calendar', finished: false },
                                        { path: '/clients', finished: false }, //+
                                        { path: '/messages/:chatId?', finished: false }, //+
                                        { path: '/analitics', finished: false }, //+
                                        { path: '/masters', finished: false }, //+
                                        { path: '/profile', finished: false }, //+
                                        { path: '/', finished: false }, //+
                                    ],
                                }),
                            })
                        );
                        return true;
                    },
                    onCancel: () => {
                        dispatch(
                            setSteps({
                                is_enabled: false,
                                data: JSON.stringify({
                                    popupShowed: true,
                                }),
                            })
                        );
                        return true;
                    },
                })
            );
        }
    }, [data]);

    switch (true) {
        case (Boolean(popupShowed) && !!is_enabled && !get(tutorialPathes, 'finished', true)) ||
            forceShow:
            return (
                <div>
                    <Button
                        classes={{ root: classes.buttonClose }}
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            dispatch(
                                showPopupAction({
                                    title: 'Завершение урока',
                                    message: (
                                        <React.Fragment>
                                            <span
                                                className={style.message}
                                            >{`Вы всегда можете вернуться к данному уроку,
нажав на иконку книги возле заголовка экрана`}</span>
                                        </React.Fragment>
                                    ),
                                    submitButtonText: 'Закончить',
                                    cancelButtonText: 'Отмена',
                                    showCancelButton: false,
                                    onClick: () => {
                                        dispatch(switchOffTutorialAction());
                                        dispatch(
                                            setSteps({
                                                is_enabled: true,
                                                data: JSON.stringify({
                                                    popupShowed,
                                                    tutorials: [
                                                        ...tutorials.filter(i => i.path !== path),
                                                        { path, finished: true },
                                                    ],
                                                }),
                                            })
                                        );
                                        return true;
                                    },
                                    onCancel: () => {
                                        return true;
                                    },
                                })
                            );

                            return true;
                        }}
                    >
                        Завершить урок
                    </Button>
                    <div style={{ height: '100vh' }} dangerouslySetInnerHTML={createMarkup(path)} />
                </div>
            );
        default:
            return children;
    }
};

Tutorial.propTypes = {
    path: PropTypes.string,
};

export default Tutorial;
