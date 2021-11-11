import * as React from 'react';

function SvgScissorsIcon(props) {
    return (
        <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx={10} cy={23} r={3} stroke="#000" strokeWidth={2} />
            <circle cx={22} cy={23} r={3} stroke="#000" strokeWidth={2} />
            <path
                d="M19.03 22.925L7.13 8.51a1.73 1.73 0 0 1 .268-2.465v0a1.73 1.73 0 0 1 2.407.268l6.224 7.613 6.223-7.613a1.73 1.73 0 0 1 2.407-.268v0c.767.6.888 1.714.268 2.465L13.03 22.925"
                stroke="#000"
                strokeWidth={2}
            />
        </svg>
    );
}

export default SvgScissorsIcon;
