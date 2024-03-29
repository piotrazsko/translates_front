import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Flag from '../../Flag';
import { Typography } from '@mui/material';

import { languagesList } from 'helpers/languages';

import style from './style.scss';

const LangAutocompleate = ({
    extraOptions = [],
    optionsExtraData,
    disabledOptions = [],
    showFlags = false,
    ...props
}) => {
    const optionsPrepared = React.useMemo(() => {
        const options = [...languagesList];
        const extraOptionsPrepared = extraOptions.map((i) => {
            const option = options.find((item) => item.id === i.id);
            if (option) {
                return {
                    ...option,
                    isExtra: optionsExtraData,
                };
            }
            return {
                ...i,
                isExtra: optionsExtraData,
            };
        });
        const withFlags = options
            .filter((i) => i.srcFlag)
            .sort((a, b) => (a.id > b.id ? 1 : 0));
        const withoutFlag = options
            .filter((i) => !i.srcFlag)
            .sort((a, b) => (a.id > b.id ? 1 : 0));
        return [...extraOptionsPrepared, ...withFlags, ...withoutFlag].filter(
            (i) => !disabledOptions.includes(i.id),
        );
    }, [extraOptions, languagesList, disabledOptions]);

    return (
        <Autocomplete
            freeSolo
            {...props}
            options={optionsPrepared}
            renderInput={(params) => <TextField {...props} {...params} />}
            renderOption={(props, option) => {
                return (
                    <Box
                        component="li"
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                        {...props}
                        className={style.optionContainer}
                    >
                        <Box className={style.optionContent}>
                            {showFlags
                                ? (
                                      <Flag
                                          code={option.id}
                                          src={option.srcFlag}
                                      />
                                  ) || <Box minWidth={'24px'} />
                                : null}
                            <Typography className={style.text}>
                                {option.label}
                            </Typography>
                            <span className={style.name}>
                                {option.nativeName
                                    ? `(${option.nativeName})`
                                    : null}
                            </span>
                        </Box>
                        <Typography className={style.extra}>
                            {option.isExtra || null}
                        </Typography>
                    </Box>
                );
            }}
        />
    );
};

LangAutocompleate.propTypes = {};

export default LangAutocompleate;
