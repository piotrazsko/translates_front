import React from 'react';
import moment from 'moment';
import get from 'lodash/get';
import { prepareSearchString } from 'helpers/url';

import { useSelector, useDispatch } from 'react-redux';

export const useContext = history => {
    const initialState = {
        mouseX: null,
        mouseY: null,
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [contextCellEl, setContextEl] = React.useState(null);
    const [contextCellElMaster, setContextElMaster] = React.useState(null);

    const [showTimeBreackPopup, switchTimeBreakPopup] = React.useState(false);
    const [contextPosition, setContextPosition] = React.useState(initialState);
    const [contextData, setContextData] = React.useState();
    const handleContextClick = ({ ev, ...data }) => {
        setContextEl(ev.currentTarget);
        setContextData(data);
        setContextPosition({
            mouseX: ev.clientX - 2,
            mouseY: ev.clientY - 4,
        });
    };
    const handleContextMasterClick = ({ ev, ...data }) => {
        ev.preventDefault();
        setContextElMaster(ev.currentTarget);
        setContextData(data);
        setContextPosition({
            mouseX: ev.clientX - 2,
            mouseY: ev.clientY - 4,
        });
    };

    const handleCloseContext = (ev, i, data) => {
        if (i === 1) {
            switchTimeBreakPopup(!showTimeBreackPopup);
        }
        setContextEl(null);
        setContextPosition(initialState);
    };
    const handleCloseContextMaster = (ev, i, data) => {
        setContextElMaster(null);
        setContextPosition(initialState);
        const masterId = get(data, `id`);
        switch (i) {
            case 0:
                history.push(
                    `/event/add?${prepareSearchString({
                        master: masterId,
                    })}`
                );
                return;
            case 1:
                switchTimeBreakPopup(!showTimeBreackPopup);
                return;
            case 2:
                history.push(`/calendar/edit/${masterId}`);
                return;
            default:
                return;
        }
        // setContextData();
    };

    const handleCloseCard = () => {
        setAnchorEl(null);
    };
    const handleClickCard = event => {
        setAnchorEl(event.currentTarget);
    };
    return {
        handleClickCard,
        handleCloseCard,
        showTimeBreackPopup,
        switchTimeBreakPopup,
        handleCloseContext,
        handleCloseContextMaster,
        handleContextMasterClick,
        handleContextClick,
        contextPosition,
        anchorEl,
        contextData,
        contextCellEl,
        contextCellElMaster,
    };
};
