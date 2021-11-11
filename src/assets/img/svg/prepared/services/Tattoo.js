import * as React from 'react';

function SvgTattoo(props) {
    return (
        <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M5.214 26.686l1.5-2.598" stroke="#000" strokeWidth={2} strokeLinecap="round" />
            <path
                d="M7.616 16.258l5.196 3-3.5 6.33-5.196-3 3.5-6.33zM21.044 9l5.196 3-4.5 7.794-5.196-3L21.044 9zm0 0l-4.33-2.5"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.464 17.325l1.75-3.03m0 0l9.526 5.5L26.24 12l2.165 1.25m-16.19 1.044l-2.599-1.5"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default SvgTattoo;
