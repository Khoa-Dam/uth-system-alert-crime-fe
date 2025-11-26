import * as React from "react";

export type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

export const Logo = ({ size = 24, height, width, ...props }: IconProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    height={height ?? size}
    width={width ?? size}
    {...props}
  >
    <rect width="24" height="24" rx="4" fill="#E24340" />

    <g
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </g>
  </svg>
);
