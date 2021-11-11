WorkingTimeSelect example:

```js
const [time, setTime] = React.useState({
    mon: [{ start: '02:00:00', end: '07:00:00' }],
    tue: [{ start: '04:00:00', end: '08:00:00' }, { start: '10:00:00', end: '14:00:00' }],
    wed: [{ start: '04:00:00', end: '08:00:00' }, { start: '09:00:00', end: '14:00:00' }],
    thu: [{ start: '04:00:00', end: '10:00:00' }],
    fri: [{ start: '00:00', end: '14:00' }],
    sat: [{ start: '04:00', end: '00:00' }],
    sun: [{ start: '04:00', end: '00:00' }],
});
const [x, setX] = React.useState(1);
<div>
    <select value={x} onChange={ev => setX(ev.target.value)}>
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
    </select>
    <WorkingTimeSelect
        startWeekDay={parseInt(x)}
        onChange={data => {
            // setTime(data);
        }}
        isMobile={false}
        interval={45}
        startTime={0}
        workingTimeIntervals={time}
    />
</div>;
```
