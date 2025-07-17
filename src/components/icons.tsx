import type { SVGProps } from 'react';

export function OmniCalcIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 9.5h8M8 14.5h8" />
      <path d="M10.5 7v10M13.5 7v10" />
    </svg>
  );
}
