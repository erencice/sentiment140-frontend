import { type JSX, useRef, useEffect } from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onAnalyze: () => void;
  loading: boolean;
}

export function TextInput({ value, onChange, onAnalyze, loading }: Props): JSX.Element {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onAnalyze();
    }
  };

  return (
    <div className="px-4">
      <div className="mx-auto max-w-xl">
        <label htmlFor="sentiment-input" className="sr-only">
          Enter text to analyze
        </label>
        <textarea
          ref={textareaRef}
          id="sentiment-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a sentence to analyze…"
          rows={1}
          disabled={loading}
          spellCheck={false}
          className="w-full resize-none rounded-xl border border-[#e5d9c4] bg-[#fdf9f2] px-4 py-3.5 text-sm leading-relaxed text-[#3d3226] shadow-[0_1px_2px_rgba(140,110,70,0.08)] placeholder:text-[#b5a794] transition-all hover:border-[#d6c8ae] focus:border-[#c2410c] focus:bg-[#fefcf6] focus:shadow-[0_4px_8px_-2px_rgba(140,110,70,0.12)] focus:outline-hidden dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-100 dark:placeholder:text-gray-500 dark:shadow-none dark:hover:border-gray-600 dark:focus:border-gray-500 dark:focus:bg-gray-900"
          aria-describedby="input-hint"
        />
        <p id="input-hint" className="mt-1.5 text-xs text-[#b5a794] dark:text-gray-500">
          Press <kbd className="rounded border border-[#e5d9c4] px-1 py-0.5 font-sans text-[11px] dark:border-gray-700">⌘Enter</kbd> to analyze
        </p>
      </div>
    </div>
  );
}
