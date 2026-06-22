import { type JSX } from 'react';

interface Props {
  dark: boolean;
  onToggle: () => void;
}

export function Header({ dark, onToggle }: Props): JSX.Element {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200/80 bg-white/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] backdrop-blur-sm dark:border-gray-800/60 dark:bg-gray-950/80 dark:shadow-none">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
        <span className="text-sm font-semibold tracking-tight text-gray-800 dark:text-gray-100">
          Sentiment Analyzer
        </span>
        <button
          onClick={onToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-200/60 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
        </button>
      </div>
    </header>
  );
}
