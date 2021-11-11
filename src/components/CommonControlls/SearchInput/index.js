import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import style from './style.scss';

const Search = ({ onChange }) => {
    const [textSearch, setTextSearch] = React.useState('');
    React.useEffect(() => {
        onChange(textSearch);
    }, [textSearch]);
    return (
        <div className={style.searchContainer}>
            <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Поиск</InputLabel>
                <Input
                    fullWidth
                    id="outlined-adornment-password"
                    value={textSearch}
                    onChange={ev => setTextSearch(ev.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            {textSearch.trim().length < 1 ? (
                                <SearchIcon />
                            ) : (
                                <IconButton size="small" onClick={() => setTextSearch('')}>
                                    <Clear />
                                </IconButton>
                            )}
                        </InputAdornment>
                    }
                    labelWidth={70}
                />
            </FormControl>
        </div>
    );
};
Search.defaultProps = {
    onChange: () => {},
};
Search.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default Search;
