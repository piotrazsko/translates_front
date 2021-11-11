import * as React from 'react';

function SvgTime(props) {
    return (
        <svg width={48} height={48} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M8.072 15.377a2 2 0 0 0 2.784-.503 16.1 16.1 0 1 1-2.623 11.569l3.944 2.736a2 2 0 1 0 2.28-3.287l-7.444-5.164a2 2 0 0 0-2.783.503L-.9 28.625a2 2 0 0 0 3.286 2.28l2.018-2.908a20 20 0 1 0 3.165-15.403 2 2 0 0 0 .503 2.783z"
                fill="#767676"
            />
        </svg>
    );
}

export default SvgTime;
