import * as React from 'react';

function SvgNailIcon(props) {
    return (
        <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M24 27v-9a7.985 7.985 0 0 0-3-6.245M8 27v-9a7.985 7.985 0 0 1 3-6.245"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
            />
            <rect x={11} y={5} width={10} height={17} rx={5} stroke="#000" strokeWidth={2} />
            <path
                d="M12 19a4.992 4.992 0 0 1 4-2c1.636 0 3.088.786 4 2"
                stroke="#000"
                strokeWidth={2}
            />
        </svg>
    );
}

export default SvgNailIcon;
