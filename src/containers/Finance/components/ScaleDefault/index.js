/* global Chart */
import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { options } from 'config/scale';
import style from './style.scss';
Chart.defaults.global.legend.display = false;
Chart.defaults.global.defaultFontFamily = 'Montserrat';
Chart.defaults.global.elements.line.tension = 0;

const Scale = ({ data, viewPort, currency, dateRange }) => {
    const diffMS = Math.abs(dateRange.to.endOf('day').toDate() - dateRange.from.toDate());
    const diff = Math.ceil(diffMS / (1000 * 60 * 60 * 24));
    const div = React.useRef(null);
    const [state, setState] = React.useState(false);
    const labels = React.useMemo(() => {
        setTimeout(function() {
            setState(true);
        }, 100);
        const labels = Array(diff)
            .fill(1)
            .map((i, index) => {
                const newDate = dateRange.from.toDate();
                const addedDay = moment(newDate).add(index, 'days');
                return { text: `${addedDay.format('DD.MM')}`, date: addedDay };
            });

        const datesValuesIncome = [...labels].map(i => {
            const dayValue = get(data, 'incomes', []).find(
                item =>
                    moment(item.day)
                        .startOf('day')
                        .toDate()
                        .valueOf() ==
                    i.date
                        .startOf('day')
                        .toDate()
                        .valueOf()
            );
            return dayValue ? dayValue.amount : 0;
        });
        const datesValuesExpenses = [...labels].map(i => {
            const dayValue = get(data, 'expenses', []).find(
                item =>
                    moment(item.day)
                        .startOf('day')
                        .toDate()
                        .valueOf() ==
                    i.date
                        .startOf('day')
                        .toDate()
                        .valueOf()
            );
            return dayValue ? dayValue.amount : 0;
        });
        return {
            labels: labels.map(i => i.text),

            datasets: [
                {
                    pointRadius: 2,
                    label: 'Расход',
                    backgroundColor: 'rgba(235, 87, 87, 0.1)',
                    borderColor: '#EB5757',
                    data: datesValuesExpenses,
                    fill: 'origin',
                    borderWidth: 1.5,
                    lineTension: 0.3,
                    showLine: true,
                    pointBackgroundColor: '#EB5757',
                },
                {
                    pointRadius: 2,
                    pointBackgroundColor: '#46A198',
                    label: 'Доход',
                    data: datesValuesIncome,
                    // fill: false,
                    backgroundColor: 'rgba(70, 161, 152, 0.1)',
                    borderColor: '#46A198',
                    borderWidth: 1.5,
                    showLine: true,
                    lineTension: 0.3,
                    fill: 'origin',
                },
            ],
        };
    }, [data]);

    const { width, height } = React.useMemo(() => {
        const { width = 1920, height = 1080 } = viewPort;
        return {
            width: width * 0.6,
            height: height * 0.48,
        };
    }, [state, viewPort.width]);

    return (
        <div className={style.container} ref={div}>
            <Line data={{ ...labels }} width={width} height={height} options={options(currency)} />
        </div>
    );
};
Scale.propTypes = {
    data: PropTypes.object,
    currency: PropTypes.string,
    viewPort: PropTypes.object,
};
export default Scale;
