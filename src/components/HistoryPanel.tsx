import { type JSX } from 'react';
import type { HistoryItem } from '../api';
import { formatTime } from '../api';

interface Props {
  items: HistoryItem[];
  onClear: () => void;
}

export function HistoryPanel({ items, onClear }: Props): JSX.Element {
  if (items.length === 0) return <></>;

  return (
    <section className="mx-auto mt-12 max-w-xl px-4 pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Prediction History
        </h2>
        <button
          onClick={onClear}
          className="text-xs text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        >
          Clear all
        </button>
      </div>

      <div className="history-scroll mt-4 max-h-[320px] space-y-1 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex items-center gap-2.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-100/60 dark:hover:bg-gray-900/50"
          >
            <span
              className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
              aria-hidden="true"
            >
              {item.prediction.sentiment === 'positive' ? (
                <span className="text-emerald-600 dark:text-emerald-400">✓</span>
              ) : (
                <span className="text-red-500 dark:text-red-400">✗</span>
              )}
            </span>
            <p className="min-w-0 flex-1 truncate text-sm text-gray-700 dark:text-gray-300">
              {item.text}
            </p>
            <span className="flex-shrink-0 text-xs text-gray-400 dark:text-gray-500">
              {formatTime(item.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
