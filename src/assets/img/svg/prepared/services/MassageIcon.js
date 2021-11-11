import * as React from 'react';

function SvgMassageIcon(props) {
    return (
        <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M16 26h7M20 15.5a3.5 3.5 0 1 0-7 0 6.5 6.5 0 1 0 13 0C26 9.977 21.523 6 16 6S6 10.477 6 16s4.477 10 10 10"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
            />
        </svg>
    );
}

export default SvgMassageIcon;
