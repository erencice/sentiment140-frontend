import { type JSX } from 'react';

export function HeroSection(): JSX.Element {
  return (
    <section className="px-4 pt-16 pb-8 text-center sm:pt-20 sm:pb-10">
      <h1 className="text-balance text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        Sentiment Analyzer
      </h1>
      <p className="mx-auto mt-3 max-w-md text-balance text-base leading-relaxed text-gray-500 dark:text-gray-400">
        AI-powered sentiment analysis for your text. See the emotion behind any sentence in real time.
      </p>
    </section>
  );
}
