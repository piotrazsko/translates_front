/*global  Set, Map*/
import _ from 'lodash';
import moment from 'moment';
const DAY_MS = 60 * 1000 * 60 * 24;
export const MONTHS = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];
export const WEEKDAYS_LONG = [
    'Воскресение',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
];
export const WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
export const WEEKDAYS_ENG_RUS = [
    { rus: 'Вс', eng: 'sun' },
    { eng: 'mon', rus: 'Пн' },
    { eng: 'tue', rus: 'Вт' },
    { eng: 'wed', rus: 'Ср' },
    { eng: 'thu', rus: 'Чт' },
    { eng: 'fri', rus: 'Пт' },
    { eng: 'sat', rus: 'Сб' },
];

export const DAYS_OF_WEEK = [
    {
        label: 'Воскресенье',
        shortLabel: 'Вс',
        value: 'sun',
    },
    {
        label: 'Понедельник',
        shortLabel: 'Пн',
        value: 'mon',
    },
    {
        label: 'Вторник',
        shortLabel: 'Вт',
        value: 'tue',
    },
    {
        label: 'Среда',
        shortLabel: 'Ср',
        value: 'wed',
    },
    {
        label: 'Четверг',
        shortLabel: 'Чт',
        value: 'thu',
    },
    {
        label: 'Пятница',
        shortLabel: 'Пт',
        value: 'fri',
    },
    {
        label: 'Суббота',
        shortLabel: 'Сб',
        value: 'sat',
    },
];

export const preppareDataforWorkTime = data => {
    const res = {
        mon: {},
        tue: {},
        wed: {},
        thu: {},
        fri: {},
        sat: {},
        sun: {},
    };
    if (Array.isArray(data)) {
        data.forEach(i => {
            switch (i.col) {
                case 1: {
                    res.sun[i.row] = 'white';
                    break;
                }
                case 2: {
                    res.mon[i.row] = 'white';
                    break;
                }
                case 3: {
                    res.tue[i.row] = 'white';
                    break;
                }
                case 4: {
                    res.wed[i.row] = 'white';
                    break;
                }
                case 5: {
                    res.thu[i.row] = 'white';
                    break;
                }
                case 6: {
                    res.fri[i.row] = 'white';
                    break;
                }
                case 7: {
                    res.sat[i.row] = 'white';
                    break;
                }

                default:
                    break;
            }
        });
    }
    return res;
};

export const formatHours = (row, interval, startTime) => {
    let hour = Math.floor((startTime + interval * (row - 1)) / 60);
    hour = hour >= 24 ? hour - 24 : hour;
    const minutes = ((startTime + interval * (row - 1)) % 60).toString();
    return `${hour.toString().length < 2 ? `0${hour}` : hour}:${
        minutes.length === 1 ? '0' + minutes : minutes
    }`;
};
export const getObjectOfPeriods = dayData => {
    return _.reduce(
        dayData,
        (memo, row) => {
            const formatedHours = _.parseInt(row);
            const prevPeriodIndex = _.findIndex(memo, { to: formatedHours });

            if (prevPeriodIndex > -1) {
                memo[prevPeriodIndex] = {
                    ...memo[prevPeriodIndex],
                    to: formatedHours + 1,
                };
            } else {
                memo.push({
                    from: formatedHours,
                    to: formatedHours + 1,
                });
            }
            return memo;
        },
        []
    );
};

export const getWorkPeriodsOfDay = (dayData, interval, startTime, divider = '/') => {
    const periods = getObjectOfPeriods(dayData, interval, startTime);
    const formatedPeriods = _.map(
        periods,
        period =>
            `${formatHours(period.from, interval, startTime)} - ${formatHours(
                period.to,
                interval,
                startTime
            )}`
    );

    return formatedPeriods.join(' ' + divider + ' ');
};

export const strPrepare = min => {
    const hours = Math.floor(min / 60).toString();
    const mins = (min % 60).toString();
    return `${hours.length == 1 ? '0' + hours : hours}:${mins.length == 1 ? '0' + mins : mins}`;
};

export const prepareWorkingTimeIntervals = ({
    startWeekDay = 1,
    startCol = 1,
    data,
    interval,
    startTime,
}) => {
    const res = {
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        sun: [],
    };
    DAYS_OF_WEEK.forEach((day, index) => {
        const i = (index + 7 - startWeekDay) % 7;
        const item = DAYS_OF_WEEK[index];
        const col = i + startCol;
        const rows = Array.from(
            new Set(data.filter(item => item.col === col).map(item => item.row))
        ).sort((a, b) => a - b);

        const fromTo = getObjectOfPeriods([...rows], interval, startTime);

        res[item.value] = fromTo.map(item => {
            const start = (item.from - 1) * interval + startTime;
            const end = (item.to - 1) * interval + startTime;
            // console.log(end);
            return {
                start: `${strPrepare(start)}`,
                end: `${strPrepare(end < 1440 ? end : 1440)}`,
            };
        });
    });

    return res;
};
export const recoveryDataForWorkTime = (
    data = {
        mon: '{}',
        tue: '{}',
        wed: '{}',
        thu: '{}',
        fri: '{}',
        sat: '{}',
        sun: '{}',
    }
) => {
    let res = [];
    if (typeof data === 'object' && data !== null) {
        Object.keys(data).forEach(i => {
            const day =
                data[i] !== null && (typeof data[i] === 'string' || typeof data[i] === 'object')
                    ? Object.keys(typeof data[i] === 'string' ? JSON.parse(data[i]) : data[i])
                    : [];
            day.forEach(item => {
                let key = 1;
                switch (i) {
                    case 'sun': {
                        key = 1;
                        break;
                    }
                    case 'mon': {
                        key = 2;
                        break;
                    }
                    case 'tue': {
                        key = 3;
                        break;
                    }
                    case 'wed': {
                        key = 4;
                        break;
                    }
                    case 'thu': {
                        key = 5;
                        break;
                    }
                    case 'fri': {
                        key = 6;
                        break;
                    }
                    case 'sat': {
                        key = 7;
                        break;
                    }

                    default:
                        break;
                }
                res = [...res, { col: key, row: parseInt(item) }];
            });
        });
    }
    return res;
};
export const recoveryWorkingTimeIntervals = ({
    data = {
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        sun: [],
    },
    interval,
    startTime = 0,
    startWeekDay = 0,
}) => {
    let res = [];
    if (typeof data === 'object' && data !== null) {
        for (let index = startWeekDay; index < DAYS_OF_WEEK.length + startWeekDay; index++) {
            const day = data[DAYS_OF_WEEK[(index + startWeekDay) % 7].value] || [];

            const arr = day.reduce((acc, item) => {
                const start = item.start.split(':');
                const end = item.end.split(':');
                const startWorkingTime = start[0] * 60 + parseInt(start[1]);
                const endWorkingTime = end[0] * 60 + parseInt(end[1]) || 1440;
                if (endWorkingTime < startWorkingTime) {
                    throw new Error("endWork can't be less than startWorkingTime");
                }
                for (
                    let j = Math.floor(startWorkingTime / interval);
                    j < Math.floor(endWorkingTime / interval);
                    j++
                ) {
                    const col = (index % 7) + 1;
                    acc = [
                        ...acc,
                        { col: col, row: j + 1 - Math.floor(startTime / interval) || 1 },
                    ];
                }
                return acc;
            }, []);
            res = [...res, ...arr];
        }
    }
    return res;
};
