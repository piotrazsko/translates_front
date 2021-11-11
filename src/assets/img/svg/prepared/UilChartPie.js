import * as React from 'react';

function SvgUilChartPie({ htmlColor, ...props }) {
    return (
        <svg
            viewBox="2 2 20 20"
            width={24}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M11.999 2a10 10 0 1 0 4.93 18.69h.12A10 10 0 0 0 11.999 2zm1 2.07a8 8 0 0 1 6.93 6.93h-6.93V4.07zm-1 15.93a8 8 0 0 1-1-15.93V12c.003.12.027.238.07.35v.15l4 6.87c-.97.415-2.015.63-3.07.63zm4.83-1.64l-3.1-5.36h6.2a8.002 8.002 0 0 1-3.1 5.36z"
                fill={htmlColor}
            />
        </svg>
    );
}

export default SvgUilChartPie;
