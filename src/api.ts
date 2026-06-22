const API_BASE = 'https://erencice-sentiment140-api.hf.space';

export interface Prediction {
  sentiment: 'positive' | 'negative';
  confidence: number;
  probabilities: { positive: number; negative: number };
}

export interface HistoryItem {
  id: string;
  text: string;
  prediction: Prediction;
  timestamp: number;
}

export async function predict(text: string): Promise<Prediction> {
  const res = await fetch(`${API_BASE}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error(`Prediction failed: ${res.statusText}`);
  return res.json();
}

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return res.ok;
  } catch {
    return false;
  }
}

export function loadHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem('sentiment-history');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveHistory(items: HistoryItem[]): void {
  // keep last 10
  localStorage.setItem('sentiment-history', JSON.stringify(items.slice(0, 10)));
}

export function formatTime(ts: number): string {
  const diff = Date.now() - ts;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}
