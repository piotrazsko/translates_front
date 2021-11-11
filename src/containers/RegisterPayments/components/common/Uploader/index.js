import { Button, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    icon: {
        width: '15px',
        height: '15px',
        color: '#767676',
        '&:hover': {
            color: '#525252',
            cursor: "pointer",
        },
    },
    input: {
        marginRight: '16px',
        minWidth: 320,
        '& input': {
            paddingTop: '7px',
            paddingBottom: '6px',
        }
    },
    uploadContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    uploadButton: {
        minWidth: 148,
    }
});


const Uploader = ({
    value,
    onChange,
    accept = 'image/jpeg,image/gif,image/png,application/pdf,image/x-eps',
}) => {
    const classes = useStyles();
    const ref = useRef();
    
    const resetValue = useCallback(() => {
        onChange();
    })

    const uploadAction = () => {
        if (ref.current) {
            const upload = function() {
                onChange(ref.current.files[0]);
                ref.current.removeEventListener('change', upload);
            };
            ref.current.addEventListener('change', upload);
            ref.current.click();
        }
    };

    return ( 
        <div className={classes.uploadContainer}>
            {value && (
                <TextField
                    size='small'
                    variant='outlined'
                    disabled
                    value={value?.name || "test"}
                    className={classes.input}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                onClick={resetValue}
                                position='end'
                            >
                                <ClearIcon className={classes.icon} />
                            </InputAdornment>
                        ),
                    }}
                />
            )}
            
            <Button
                className={classes.uploadButton}
                onClick={uploadAction}
                type='file'
                size='small'
                variant='contained'
                color='primary'
            >
                {value ? 'Изменить' : 'Добавить файл'}
                <input
                    accept={accept}
                    hidden
                    ref={ref}
                    type='file'
                />
            </Button>
        </div>
    );
};
Uploader.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    accept: PropTypes.string,
}

export default Uploader;