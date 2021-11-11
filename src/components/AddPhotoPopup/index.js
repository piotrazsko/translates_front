import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import { PopupBackground } from 'feelqueen_components';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import Dropzone from '../Dropzone';

import style from './style.scss';
const color = '#fa835f';

const AddPhotoPopup = ({ data, onClose, onChange }) => {
    const { images } = data;
    return (
        <PopupBackground onClick={onClose} visible childrenClassName={style.container}>
            <div className={style.headerPopup}>
                <div className={style.firstRow}>
                    <IconButton size="small" onClick={onClose}>
                        <ClearIcon />
                    </IconButton>
                </div>
                <div className={style.lastRow}>
                    <Typography variant="h4">Фотографии</Typography>
                </div>
                <div className={style.images}>
                    {images.map((i, index) => (
                        <div
                            key={index}
                            className={style.image}
                            style={{ backgroundImage: `url(${i})` }}
                        >
                            <IconButton size="small">
                                <ClearIcon
                                    className={style.icon}
                                    onClick={() => {
                                        onChange({
                                            ...data,
                                            images: [...images.filter(item => item !== i)],
                                        });
                                    }}
                                />
                            </IconButton>
                        </div>
                    ))}

                    <Dropzone
                        className={style.image}
                        onDrop={image =>
                            onChange({
                                ...data,
                                images: [...images, image],
                            })
                        }
                    >
                        <div className={style.imageDropZone}>
                            <AddIcon className={style.icon} htmlColor={color} />
                        </div>
                    </Dropzone>
                </div>
            </div>
        </PopupBackground>
    );
};

AddPhotoPopup.defaultProps = {
    data: { images: [] },
};
AddPhotoPopup.propTypes = {
    data: PropTypes.array,
    onClose: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default AddPhotoPopup;
