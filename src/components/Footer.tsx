import { type JSX } from 'react';

export function Footer(): JSX.Element {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-6">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Powered by FastAPI + Transformers
        </p>
        <a
          href="https://huggingface.co/erencice/sentiment140-distilbert"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-400 transition-colors hover:text-yellow-600 dark:text-gray-500 dark:hover:text-yellow-400"
        >
          🤗 HF Hub
        </a>
      </div>
    </footer>
  );
}
