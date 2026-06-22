# Sentiment140 Frontend

React + TypeScript + Vite frontend for the DistilBERT sentiment analysis API.

## Development

```bash
npm install
npm run dev
```

The dev server proxies `/api` requests to `http://localhost:8000`.

## Production

```bash
npm run build
```

Build output goes to `dist/`. The API endpoint is configured via `.env.production`:

```
VITE_API_URL=https://erencice-sentiment140-api.hf.space
```

## Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS v4
