import type { SVGProps } from 'react';

export function OrcidIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="currentColor"
        d="M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128z"
      ></path>
      <path
        fill="#fff"
        d="M86.3 186.2H70.9V79.1h15.4v107.1zM108.9 79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6h-41.8V79.1zm15.4 93.3h24.5c34.9 0 42.1-25.7 42.1-39.7 0-16.2-12.7-39.7-43.9-39.7h-22.7v79.4z"
      ></path>
      <path
        fill="currentColor"
        d="M128 20.2c-29.9 0-58.1 11.6-79 32.5-20.9 20.9-32.5 49.1-32.5 79s11.6 58.1 32.5 79c20.9 20.9 49.1 32.5 79 32.5s58.1-11.6 79-32.5c20.9-20.9 32.5-49.1 32.5-79s-11.6-58.1-32.5-79C186.1 31.8 157.9 20.2 128 20.2zM86.3 186.2H70.9V79.1h15.4v107.1zm68-107.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6h-41.8V79.1zm15.4 93.3h24.5c34.9 0 42.1-25.7 42.1-39.7 0-16.2-12.7-39.7-43.9-39.7h-22.7v79.4z"
      ></path>
    </svg>
  );
}

export function GoogleScholarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <path
        fill="currentColor"
        d="M256 373.3l-128 72.4V128H256v245.3z"
      />
      <path
        fill="currentColor"
        d="M384 128v245.3l-128-72.4V128H384zM256 74.7L128 0v128h128V74.7zm128 53.3V0L256 74.7V128H384z"
      />
      <path
        fill="currentColor"
        d="M256 128H128v245.3l128-72.4V128zm128 0H256v172.9l128 72.4V128z"
      />
      <path
        fill="currentColor"
        d="M256 74.7L128 0v128h128V74.7z"
      />
      <path fill="currentColor" d="M384 128V0L256 74.7V128H384z" />
      <path
        fill="currentColor"
        d="M128 128H0v192l128-72.4V128z"
      />
      <path
        fill="currentColor"
        d="M384 128v120.6l128 72.4V128H384z"
      />
    </svg>
  );
}
