import * as React from 'react';

function SvgSpaIcon(props) {
    return (
        <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M20.906 11.757c1.956-.4 4.047-.681 5.435-.845a.955.955 0 0 1 1.001 1.319C25.56 16.505 23.033 20.76 18.555 23M16.055 25H26.42c.748 0 1.205-.776.788-1.396-.675-1.005-1.742-2.393-3.153-3.604M11.654 11.757c-1.956-.4-4.048-.681-5.436-.845a.954.954 0 0 0-1 1.319C7 16.505 9.525 20.76 14.004 23M16.055 25H6.187c-.747 0-1.202-.776-.785-1.396.675-1.005 1.742-2.393 3.153-3.604"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
            />
            <path
                d="M15.16 5.789l-2.882 5.764a10 10 0 0 0 1.873 11.543l1.197 1.197a1 1 0 0 0 1.414 0l1.196-1.197a10 10 0 0 0 1.873-11.543L16.95 5.79a1 1 0 0 0-1.789 0z"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
            />
        </svg>
    );
}

export default SvgSpaIcon;
