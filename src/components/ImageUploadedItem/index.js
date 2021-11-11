import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import style from './style.scss';
import { DeleteIcon } from 'feelqueen_components';
const color = '#fa835f';

const ImageUploadedItem = ({ data, onDelete, onChange, addImageClick }) => {
    const { images, description, isInterier } = data;

    return (
        <div className={style.container}>
            {images.length === 1 ? (
                <div className={style.image} style={{ backgroundImage: `url(${images[0]})` }}>
                    <IconButton size="small" onClick={addImageClick}>
                        <AddIcon className={style.iconButton} htmlColor={'#fff'} />
                    </IconButton>
                </div>
            ) : (
                <div className={style.imagesContainer}>
                    <div className={style.images}>
                        {[...images].slice(0, 4).map((i, index) => (
                            <div
                                key={index}
                                className={style.imagesmall}
                                style={{ backgroundImage: `url(${i})` }}
                            />
                        ))}
                    </div>
                    <IconButton size="small" className={style.editButtton} onClick={addImageClick}>
                        <EditIcon className={style.iconButton} htmlColor={'#fff'} />
                    </IconButton>
                </div>
            )}
            <div className={style.controlls}>
                <div className={style.firstLine}>
                    <FormControlLabel
                        className={style.sheduleSwitch}
                        control={
                            <Checkbox
                                checked={isInterier}
                                onChange={() => onChange({ ...data, isInterier: !isInterier })}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Отметить как фото интерьера"
                    />
                    <IconButton onClick={onDelete}>
                        <DeleteIcon className={style.icon} htmlColor={color} />
                    </IconButton>
                </div>
                <div className={style.lastLine}>
                    <TextField
                        label="Описание"
                        fullWidth
                        value={description}
                        onChange={ev => onChange({ ...data, description: ev.target.value })}
                    />
                </div>
            </div>
        </div>
    );
};

ImageUploadedItem.propTypes = {
    data: PropTypes.object,
    isWorkPlace: PropTypes.bool,
    onMarkAsWorkPlace: PropTypes.func.isRequired,
    addImageClick: PropTypes.func,
};
ImageUploadedItem.defaultProps = {
    onMarkAsWorkPlace: () => {},
};

export default ImageUploadedItem;
