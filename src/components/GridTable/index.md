grid example:

```js
<Grid
	cols={4}
	rows={4}
	cellProps={{
		children: ({ col, row }) => (
			<div>
				{col} {row}
			</div>
		),
	}}
/>
```
