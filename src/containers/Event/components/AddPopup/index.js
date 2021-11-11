import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { Popup as PopupBackground } from 'components';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { SkillsSelect, UserInfo } from 'components';
import style from './style.scss';
const color = '#fa835f';

const AddPopup = ({
    onSubmit,
    onCancel,
    onClose,
    items,
    placeholder,
    title = '',
    children,
    isMaster = false,
}) => {
    const [search, setSearch] = React.useState();
    const filtered = React.useMemo(() => {
        return (search
            ? items.filter(
                  i =>
                      `${i.first_name || ''} ${i.last_name || ''}`
                          .toLowerCase()
                          .search(search.toLowerCase()) !== -1 ||
                      (typeof i.phone === 'string' &&
                          `${i.phone}`.toLowerCase().search(search.toLowerCase()) !== -1)
              )
            : items
        ).sort((a, b) => {
            if (a.first_name.toLowerCase() < b.first_name.toLowerCase()) {
                return -1;
            }
            if (a.first_name.toLowerCase() > b.first_name.toLowerCase()) {
                return 1;
            }
            return 0;
        });
    }, [items, search]);
    return (
        <PopupBackground
            onSubmit={() => {}}
            onCancel={() => {
                onCancel();
            }}
            onClear={() => {
                onClose();
            }}
            title={title}
            showPopup
            showClear
            visible
            showCancel={false}
            showSubmit={false}
            cancelButtonText="Очистить"
            submitButtonText="Добавить"
            childrenContainerClassName={style.dataContainer}
            popupBackgroundsProps={{ onClick: onClose }}
        >
            <div className={style.topBlock}>
                <TextField
                    className={style.searchInput}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon htmlColor={color} />
                            </InputAdornment>
                        ),
                    }}
                    required
                    value={search}
                    onChange={ev => setSearch(ev.target.value)}
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder={
                        !isMaster ? 'Введите имя клиента, либо его номер' : 'Введите имя мастера'
                    }
                />
            </div>
            <div className={filtered.length ? style.container : style.emptyContainer}>
                {filtered.length ? (
                    filtered.map(i => (
                        <UserInfo
                            isMaster={isMaster}
                            key={i.id}
                            data={i}
                            onClick={() => onSubmit(i)}
                        />
                    ))
                ) : (
                    <div className={style.placeholder}>{placeholder}</div>
                )}
            </div>
            {children}
        </PopupBackground>
    );
};

AddPopup.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    items: PropTypes.array,
    placeholder: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    isMaster: PropTypes.bool,
    title: PropTypes.string,
    children: PropTypes.element,
};

export default AddPopup;
