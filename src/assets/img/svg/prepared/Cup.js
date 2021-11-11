import * as React from 'react';

function SvgCup(props) {
    return (
        <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M38 4h-6V2a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v6a8 8 0 0 0 8 8h3.08A12 12 0 0 0 18 23.82V28h-2a6 6 0 0 0-6 6v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a6 6 0 0 0-6-6h-2v-4.18A12 12 0 0 0 28.92 20H32a8 8 0 0 0 8-8V6a2 2 0 0 0-2-2zM8 16a4 4 0 0 1-4-4V8h4v4a12 12 0 0 0 .7 4H8zm16 16a2 2 0 0 1 2 2v2H14v-2a2 2 0 0 1 2-2h8zm4-20a8 8 0 0 1-16 0V4h16v8zm8 0a4 4 0 0 1-4 4h-.7a12 12 0 0 0 .7-4V8h4v4z"
                fill="#767676"
            />
        </svg>
    );
}

export default SvgCup;
