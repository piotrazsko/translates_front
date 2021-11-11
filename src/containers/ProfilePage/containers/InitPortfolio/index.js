import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';

import { getSalonSelector } from 'modules/salon';
import {
    createSalonPortfolioRequest,
    getSalonPortfolioRequest,
    getPortfolioSelector,
    deletePortfolioRequest,
    updateSalonPortfolioRequest,
} from 'modules/portfolio';
import { Dropzone, AddPhotoPopup, ImageUploadedItem, Skeleton } from 'components';
import style from './style.scss';

const InitPortfolio = ({ history, ...props }) => {
    const dispatch = useDispatch();
    const [preparedImages, setPreparedImages] = React.useState([]);
    const [textError, setTextError] = React.useState('');
    const [showPopup, switchPopup] = React.useState(false);
    const { id } = useSelector(getSalonSelector);
    const portfolio = useSelector(getPortfolioSelector);
    React.useEffect(() => {
        if (id) {
            dispatch(getSalonPortfolioRequest({ id }));
        }
    }, [id]);
    React.useEffect(() => {
        if (portfolio.length) {
            const portfolioPrepared = portfolio.map(i => {
                return {
                    id: preparedImages.length + Math.random().toString(),
                    images: i.images.map(i => i.path),
                    description: i.title,
                    isInterier: i.type == 'working_place',
                    imagesData: i.images,
                    isCreated: false,
                    portfolio_id: i.id,
                };
            });
            setPreparedImages(portfolioPrepared);
        }
    }, [portfolio]);
    return (
        <Skeleton
            breadcamps={[{ link: '/profile', title: 'Профиль' }]}
            textError={textError}
            progress={75}
            title="Портфолио и рабочее место"
            subTitle={`Добавьте от двух фотографий интерьера салона и примеры выполненных работ.\nЭто поможет вам повысить лояльность клиентов, подняться в каталоге исполнителей и визуально улучшить ваш профиль.`}
            showBreadcump
            nextButtonText="Сохранить"
            onNext={() => {
                switch (true) {
                    case preparedImages.length == 0: {
                        setTextError('Добавьте хотя бы одно портфолио и отметьте  рабочее место');
                        return;
                    }
                    // case !preparedImages.find(i => i.isInterier): {
                    //     setTextError('Отметьте рабочее место');
                    //     return;
                    // }
                    default:
                        {
                            preparedImages.forEach(i => {
                                const { images, description, isInterier, isCreated } = i;
                                if (isCreated) {
                                    dispatch(
                                        createSalonPortfolioRequest({
                                            id,
                                            images,
                                            title: description,
                                            type: isInterier ? 'working_place' : 'portfolio',
                                        })
                                    );
                                } else {
                                    const images = i.imagesData
                                        .filter(item => {
                                            return !i.images.find(i => i === item.path);
                                        })
                                        .map(item => item.id);
                                    dispatch(
                                        updateSalonPortfolioRequest({
                                            id,
                                            type: isInterier ? 'working_place' : 'portfolio',
                                            portfolio_id: i.portfolio_id,
                                            title: description,
                                            deleted_images: [...images],
                                            images: i.images.filter(
                                                i => i.indexOf('base64') !== -1
                                            ),
                                        })
                                    );
                                }
                            });
                            history.goBack();
                        }
                        return;
                }
            }}
            onBack={() => {
                history.goBack();
            }}
        >
            <Grid container>
                <Grid item md={7} xs={12}>
                    {preparedImages.map((i, index) => (
                        <ImageUploadedItem
                            addImageClick={() => {
                                switchPopup({ ...i });
                            }}
                            onChange={data => {
                                setPreparedImages([
                                    ...preparedImages.map(item => {
                                        return item.id !== i.id ? item : data;
                                    }),
                                ]);
                            }}
                            onDelete={() => {
                                setPreparedImages([
                                    ...preparedImages.filter(item => item.id !== i.id),
                                ]);
                                if (!i.isCreated) {
                                    dispatch(
                                        deletePortfolioRequest({ id, portfolio_id: i.portfolio_id })
                                    );
                                }
                            }}
                            key={index}
                            data={i}
                        />
                    ))}
                    <Dropzone
                        className={style.button}
                        onDrop={image => {
                            setPreparedImages([
                                ...preparedImages,
                                {
                                    isCreated: true,
                                    images: [image],
                                    id: preparedImages.length + Math.random().toString(),
                                },
                            ]);
                        }}
                    >
                        {!preparedImages.length ? (
                            <div className={style.uploadPane} accept="image/*">
                                <div className={style.text}>Выбрать фото с компьютера</div>
                                <AddIcon htmlColor="#fa835f" />
                            </div>
                        ) : (
                            <Button variant="contained" color="primary" size="small">
                                {'+ Добавить'}
                            </Button>
                        )}
                    </Dropzone>

                    {showPopup && (
                        <AddPhotoPopup
                            data={showPopup}
                            onChange={data => {
                                if (data.images.length > 0) {
                                    showPopup.images.length > 0
                                        ? setPreparedImages([
                                              ...preparedImages.map(item => {
                                                  return item.id !== showPopup.id ? item : data;
                                              }),
                                          ])
                                        : setPreparedImages([{ ...data }]);
                                } else {
                                    setPreparedImages([
                                        ...preparedImages.filter(i => i.id !== showPopup.id),
                                    ]);
                                }
                                switchPopup({ ...data });
                            }}
                            onClose={() => {
                                switchPopup(!showPopup);
                            }}
                        />
                    )}
                </Grid>
            </Grid>
        </Skeleton>
    );
};

InitPortfolio.propTypes = {
    history: PropTypes.object,
};

export default InitPortfolio;
