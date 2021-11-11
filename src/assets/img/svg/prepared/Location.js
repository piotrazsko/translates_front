import * as React from 'react';

function SvgLocation(props) {
    return (
        <svg width={10} height={12} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M4.8 0A4.8 4.8 0 0 0 0 4.8c0 3.24 4.23 6.9 4.41 7.056a.6.6 0 0 0 .78 0C5.4 11.7 9.6 8.04 9.6 4.8A4.8 4.8 0 0 0 4.8 0zm0 10.59C3.522 9.39 1.2 6.804 1.2 4.8a3.6 3.6 0 0 1 7.2 0c0 2.004-2.322 4.596-3.6 5.79zm0-8.19a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8zm0 3.6a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4z"
                fill="#000"
            />
        </svg>
    );
}

export default SvgLocation;
