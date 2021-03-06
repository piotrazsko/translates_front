import * as React from 'react';

function SvgUilCommentAltEdit({ htmlColor, ...props }) {
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
                d="M18.5 5.5h-4a1 1 0 1 0 0 2h4a1 1 0 0 1 1 1v9.72l-1.57-1.45a1 1 0 0 0-.68-.27H8.5a1 1 0 0 1-1-1v-1a1 1 0 1 0-2 0v1a3 3 0 0 0 3 3h8.36l3 2.73a1 1 0 0 0 1.518-.18 1 1 0 0 0 .163-.55v-12a3.002 3.002 0 0 0-3.04-3zm-9.42 7h2.42a1 1 0 0 0 1-1V9.08a1 1 0 0 0-.29-.71L6.63 2.79a1 1 0 0 0-1.41 0L2.79 5.22a1 1 0 0 0 0 1.41l5.58 5.58a1 1 0 0 0 .71.29zM5.92 4.91l4.58 4.58v1h-1L4.91 5.92l1.01-1.01z"
                fill={htmlColor}
            />
        </svg>
    );
}

export default SvgUilCommentAltEdit;
