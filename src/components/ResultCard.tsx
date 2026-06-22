import { type JSX } from 'react';
import type { Prediction } from '../api';

interface Props {
  prediction: Prediction;
  text: string;
}

export function ResultCard({ prediction, text }: Props): JSX.Element {
  const isPositive = prediction.sentiment === 'positive';
  const confPct = Math.round(prediction.confidence * 100);

  // color gradient: red → amber → green based on confidence
  const barColor =
    confPct >= 80 ? 'bg-emerald-500' :
    confPct >= 60 ? 'bg-amber-500' :
    'bg-red-500';

  const bgColor =
    confPct >= 80 ? 'bg-emerald-50/80 dark:bg-emerald-950/30' :
    confPct >= 60 ? 'bg-amber-50/80 dark:bg-amber-950/30' :
    'bg-red-50/80 dark:bg-red-950/30';

  const borderColor =
    confPct >= 80 ? 'border-emerald-200 shadow-sm dark:border-emerald-800/40 dark:shadow-none' :
    confPct >= 60 ? 'border-amber-200 shadow-sm dark:border-amber-800/40 dark:shadow-none' :
    'border-red-200 shadow-sm dark:border-red-800/40 dark:shadow-none';

  return (
    <div
      className={`mx-auto mt-6 max-w-xl animate-[fadeIn_0.3s_ease-out] rounded-2xl border ${borderColor} ${bgColor} p-5 transition-colors`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl" aria-hidden="true">
          {isPositive ? '✓' : '✗'}
        </span>
        <div>
          <span className={`text-sm font-semibold ${isPositive ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
            {isPositive ? 'Positive' : 'Negative'}
          </span>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {text}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Confidence</span>
          <span className="font-medium tabular-nums">{confPct}%</span>
        </div>
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-200/70 dark:bg-gray-700/70">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
            style={{ width: `${confPct}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-gray-400 dark:text-gray-500">
          <span>Negative: {Math.round(prediction.probabilities.negative * 100)}%</span>
          <span>Positive: {Math.round(prediction.probabilities.positive * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
