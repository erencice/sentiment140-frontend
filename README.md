# Sentiment140 Frontend

> **Live:** [sentiment140.vercel.app](https://sentiment140.vercel.app)

React + TypeScript + Vite frontend for the DistilBERT sentiment analysis API.

- **Model:** [erencice/sentiment140-distilbert](https://huggingface.co/erencice/sentiment140-distilbert) (HF Hub)
- **API:** [sentiment140-api.hf.space](https://erencice-sentiment140-api.hf.space/docs)
- **Repo:** [github.com/erencice/sentiment140-frontend](https://github.com/erencice/sentiment140-frontend)

## Development

```bash
npm install
npm run dev
```

Proxies `/api` to `http://localhost:8000`.

## Production

```bash
npm run build
```

API endpoint in `.env.production`:

```
VITE_API_URL=https://erencice-sentiment140-api.hf.space
```

## Stack

- React 19 · TypeScript · Vite 8 · Tailwind CSS v4
