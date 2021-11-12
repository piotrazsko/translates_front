import React from 'react';
import { initDataAction } from 'modules/init';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
// import locale from 'moment/locale';

const InitData = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(initDataAction());
    }, [dispatch]);
    return false;
};

export default InitData;
