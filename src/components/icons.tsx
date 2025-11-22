import * as React from "react";

export type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

export const Logo = ({ size = 24, height, width, ...props }: IconProps) => (
    <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        height={size || height}
        width={size || width}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <title>Minutemailer</title>
        <path
            d="M17.187 19.181L24 4.755 0 12.386l9.196 1.963.043 4.896 2.759-2.617-2.147-2.076 7.336 4.63z"
            fill="currentColor"
        />
    </svg>
);
