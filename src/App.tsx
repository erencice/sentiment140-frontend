import { type JSX, useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TextInput } from './components/TextInput';
import { ResultCard } from './components/ResultCard';
import { HistoryPanel } from './components/HistoryPanel';
import { Footer } from './components/Footer';
import { useSentiment } from './hooks/useSentiment';

function Spinner(): JSX.Element {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
    </svg>
  );
}

export default function App(): JSX.Element {
  const { text, setText, prediction, loading, error, history, analyze, clearHistory, clearResult } = useSentiment();
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('sentiment-theme') === 'dark' ||
      (!localStorage.getItem('sentiment-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('sentiment-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const handleSubmit = () => {
    clearResult();
    analyze(text);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f3f4f6] text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
      <Header dark={dark} onToggle={() => setDark(v => !v)} />

      <main className="flex-1">
        <HeroSection />

        <TextInput
          value={text}
          onChange={setText}
          onAnalyze={handleSubmit}
          loading={loading}
        />

        <div className="mt-5 flex justify-center px-4">
          <button
            onClick={handleSubmit}
            disabled={loading || !text.trim()}
            className="flex h-11 items-center gap-2 rounded-xl bg-gray-900 px-6 text-sm font-medium text-white shadow-[0_1px_3px_0_rgba(0,0,0,0.12)] transition-all hover:bg-gray-800 hover:shadow-[0_4px_8px_-2px_rgba(0,0,0,0.15)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-gray-100 dark:text-gray-900 dark:shadow-none dark:hover:bg-gray-200 dark:focus-visible:outline-gray-100"
          >
            {loading ? (
              <>
                <Spinner />
                Analyzing…
              </>
            ) : (
              'Analyze Sentiment'
            )}
          </button>
        </div>

        {error && (
          <div className="mx-auto mt-4 max-w-xl px-4" role="alert">
            <p className="rounded-lg bg-red-50/80 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </p>
          </div>
        )}

        {prediction && !loading && (
          <ResultCard prediction={prediction} text={text.trim()} />
        )}

        <HistoryPanel items={history} onClear={clearHistory} />
      </main>

      <Footer />
    </div>
  );
}
