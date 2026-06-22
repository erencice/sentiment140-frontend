import { useState, useCallback } from 'react';
import type { Prediction, HistoryItem } from '../api';
import { predict as apiPredict, loadHistory, saveHistory } from '../api';

export function useSentiment() {
  const [text, setText] = useState('');
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(() => loadHistory());

  const analyze = useCallback(async (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const result = await apiPredict(trimmed);
      setPrediction(result);

      const item: HistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        text: trimmed,
        prediction: result,
        timestamp: Date.now(),
      };

      const updated = [item, ...history];
      setHistory(updated);
      saveHistory(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [history]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    saveHistory([]);
  }, []);

  const clearResult = useCallback(() => {
    setPrediction(null);
    setError(null);
  }, []);

  return {
    text, setText,
    prediction, loading, error,
    history, analyze, clearHistory, clearResult,
  };
}
