import * as React from 'react';

function SvgCase(props) {
    return (
        <svg width={40} height={38} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M34 8h-6V6a6 6 0 0 0-6-6h-4a6 6 0 0 0-6 6v2H6a6 6 0 0 0-6 6v18a6 6 0 0 0 6 6h28a6 6 0 0 0 6-6V14a6 6 0 0 0-6-6zM16 6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h-8V6zm20 26a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V21.9h6V24a2 2 0 0 0 4 0v-2.1h12V24a2 2 0 0 0 4 0v-2.1h6V32zm0-14H4v-4a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v4z"
                fill="#767676"
            />
        </svg>
    );
}

export default SvgCase;
