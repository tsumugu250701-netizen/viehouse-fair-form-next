# Vie house イエタテフェア アンケートLP（Next.js）

## Vercel設定
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: 空欄

## Googleフォーム連携
`app/page.jsx` の以下を差し替えてください。

```js
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/xxxxx/formResponse';
const ENTRY = {
  name: 'entry.xxxxx',
  phone: 'entry.xxxxx',
  email: 'entry.xxxxx',
  source: 'entry.xxxxx',
  interest: 'entry.xxxxx',
  modelhouse: 'entry.xxxxx',
  contact: 'entry.xxxxx',
  gift: 'entry.xxxxx',
  message: 'entry.xxxxx',
};
```

Googleフォーム側の回答は、フォーム管理画面の「回答」→ スプレッドシート連携で管理できます。
