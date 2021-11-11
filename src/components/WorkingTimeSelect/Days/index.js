import React from 'react';
import PropTypes from 'prop-types';
import { WEEKDAYS_SHORT, getWorkPeriodsOfDay } from '../../../helpers/calendar';
import style from './style.module.scss';

const Days = ({ selectedTime, interval, startTime, startWeekDay }) => {
	const days = selectedTime.reduce((accumulator, item) => {
		accumulator[item.col - 1] = accumulator[item.col - 1]
			? [...accumulator[item.col - 1], item.row]
			: [item.row];
		return accumulator;
	}, []);

	return (
		<React.Fragment>
			{days.map((item, index) => {
				const sorted = item.sort((a, b) => a - b);
				return item ? (
					<div key={`day_${index}`} className={style.timeTag}>
						<div className={style.circle}>{WEEKDAYS_SHORT[(index + startWeekDay) % 7]}</div>
						<div className={style.time}>{getWorkPeriodsOfDay(sorted, interval, startTime)}</div>
					</div>
				) : (
					''
				);
			})}
		</React.Fragment>
	);
};

Days.propTypes = {
	selectedTime: PropTypes.array,
	interval: PropTypes.number,
	startTime: PropTypes.number,
	startWeekDay: PropTypes.number,
};

export default Days;
