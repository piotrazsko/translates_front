import * as React from 'react';

function SvgCosmetics(props) {
    return (
        <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M20 24a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3h7v3z"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
            />
            <path
                d="M21.219 19.248A2 2 0 0 1 19.234 21h-5.468a2 2 0 0 1-1.985-1.752L10 5h13l-1.781 14.248zM11 9h11"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
            />
        </svg>
    );
}

export default SvgCosmetics;
