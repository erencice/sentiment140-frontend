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
          className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-sm leading-relaxed text-gray-900 placeholder:text-gray-400 transition-colors focus:border-gray-300 focus:bg-white focus:outline-hidden dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-gray-600 dark:focus:bg-gray-900"
          aria-describedby="input-hint"
        />
        <p id="input-hint" className="mt-1.5 text-xs text-gray-400 dark:text-gray-500">
          Press <kbd className="rounded border border-gray-200 px-1 py-0.5 font-sans text-[11px] dark:border-gray-700">⌘Enter</kbd> to analyze
        </p>
      </div>
    </div>
  );
}
