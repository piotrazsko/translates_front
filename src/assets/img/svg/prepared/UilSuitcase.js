import * as React from 'react';

function SvgUilSuitcase({ htmlColor, ...props }) {
    return (
        <svg
            viewBox="2 3 20 20"
            width={24}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M19 6h-3V5a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3zm-9-1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h-4V5zm10 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5.05h3V14a1 1 0 1 0 2 0v-1.05h6V14a1 1 0 0 0 2 0v-1.05h3V18zm0-7H4V9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2z"
                fill={htmlColor}
            />
        </svg>
    );
}

export default SvgUilSuitcase;
