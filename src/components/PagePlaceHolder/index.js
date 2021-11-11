import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import style from './style.scss';

const PagePlaceholder = ({ text, buttonText, onClick }) => {
    return (
        <Grid item xs={12} className={style.container}>
            <div className={style.circle} />
            <div className={style.emptyText}>{text}</div>
            <Button size="large" variant="contained" color="primary" onClick={onClick}>
                {buttonText}
            </Button>
        </Grid>
    );
};

PagePlaceholder.propTypes = {
    text: PropTypes.string,
    buttonText: PropTypes.string,
    onClick: PropTypes.func,
};
PagePlaceholder.defaultProps = {
    text: `Здесь будут отображены отзывы ваших клиентов. Приглашайте их в FeelQueen
        и после окончания каждой услуги напомните оставить положительный отзыв.`,
    buttonText: 'Добавить клиента',
    onClick: () => {},
};

export default PagePlaceholder;
