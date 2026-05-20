'use client';

import { useState } from 'react';

// ▼ Googleフォーム連携設定
// 1. Googleフォームを作成
// 2. 回答タブからスプレッドシート連携
// 3. フォームのHTMLから formResponse URL と entry番号を取得
// 4. 下記を差し替え
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/【ここにFORM_ID】/formResponse';
const ENTRY = {
  name: 'entry.1111111111',
  phone: 'entry.2222222222',
  email: 'entry.3333333333',
  knownFrom: 'entry.4444444444',
  interests: 'entry.5555555555',
  modelVisit: 'entry.6666666666',
  contactMethod: 'entry.7777777777',
  gift: 'entry.8888888888',
  message: 'entry.9999999999',
};

const field = (style) => ({ position: 'absolute', ...style });

export default function Page() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = () => {
    setTimeout(() => setSubmitted(true), 600);
  };

  return (
    <main className="page">
      <section className="lp-wrap">
        <img src="/viehouse-fair-lp.png" alt="Vie house イエタテフェア アンケートLP" className="base-img" />

        <form
          className="hotspot-form"
          action={GOOGLE_FORM_ACTION}
          method="POST"
          target="hidden_iframe"
          onSubmit={onSubmit}
        >
          {/* 左側入力欄 */}
          <input name={ENTRY.name} required placeholder="例）山田 太郎" className="text-input" style={field({ left: '6.4%', top: '66.55%', width: '25.5%', height: '2.25%' })} />
          <input name={ENTRY.phone} required placeholder="例）090-1234-5678" className="text-input" style={field({ left: '6.4%', top: '72.05%', width: '25.5%', height: '2.25%' })} />
          <input name={ENTRY.email} required type="email" placeholder="例）sample@example.com" className="text-input" style={field({ left: '6.4%', top: '77.75%', width: '25.5%', height: '2.25%' })} />

          {/* Q1 Vie houseを知ったきっかけ */}
          <Check name={ENTRY.knownFrom} value="イエタテフェア" left="37.0%" top="66.35%" />
          <Check name={ENTRY.knownFrom} value="Instagram" left="47.8%" top="66.35%" />
          <Check name={ENTRY.knownFrom} value="YouTube" left="57.8%" top="66.35%" />
          <Check name={ENTRY.knownFrom} value="TikTok" left="66.7%" top="66.35%" />
          <Check name={ENTRY.knownFrom} value="Google検索" left="76.2%" top="66.35%" />
          <Check name={ENTRY.knownFrom} value="ご紹介" left="90.3%" top="66.35%" />
          <Check name={ENTRY.knownFrom} value="その他" left="37.0%" top="69.03%" />

          {/* Q2 気になっていること */}
          <Check name={ENTRY.interests} value="デザイン" left="37.0%" top="72.12%" />
          <Check name={ENTRY.interests} value="平屋" left="46.6%" top="72.12%" />
          <Check name={ENTRY.interests} value="自然素材" left="55.4%" top="72.12%" />
          <Check name={ENTRY.interests} value="高性能住宅" left="66.2%" top="72.12%" />
          <Check name={ENTRY.interests} value="土地探し" left="78.1%" top="72.12%" />
          <Check name={ENTRY.interests} value="資金計画・住宅ローン" left="37.0%" top="75.03%" />
          <Check name={ENTRY.interests} value="リフォーム・リノベーション" left="56.0%" top="75.03%" />
          <Check name={ENTRY.interests} value="その他" left="79.0%" top="75.03%" />

          {/* Q3 モデルハウス見学 */}
          <Radio name={ENTRY.modelVisit} value="ぜひ見学したい" left="37.0%" top="79.17%" />
          <Radio name={ENTRY.modelVisit} value="話だけ聞いてみたい" left="52.1%" top="79.17%" />
          <Radio name={ENTRY.modelVisit} value="今回は情報収集のみ" left="71.0%" top="79.17%" />

          {/* Q4 連絡方法 */}
          <Radio name={ENTRY.contactMethod} value="電話" left="37.0%" top="83.45%" />
          <Radio name={ENTRY.contactMethod} value="メール" left="46.2%" top="83.45%" />
          <Radio name={ENTRY.contactMethod} value="どれでもOK" left="56.2%" top="83.45%" />

          {/* Q5 プレゼント */}
          <Check name={ENTRY.gift} value="希望する（モデルハウスご来場でお渡しいたします）" left="37.0%" top="87.45%" defaultChecked />

          {/* ご質問 */}
          <textarea name={ENTRY.message} placeholder="ご自由にご入力ください" className="textarea" style={field({ left: '37.0%', top: '90.25%', width: '37.0%', height: '3.5%' })} />

          <button className="submit-btn" type="submit" style={field({ left: '29.0%', top: '95.05%', width: '45.5%', height: '2.85%' })} aria-label="アンケートを送信する" />
        </form>

        <iframe name="hidden_iframe" title="hidden form submit" className="hidden-frame" />

        {submitted && (
          <div className="thanks">
            <div className="thanks-card">
              <h2>送信ありがとうございました。</h2>
              <p>後日、Vie house担当者よりご案内いたします。</p>
              <button onClick={() => setSubmitted(false)}>閉じる</button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function Check({ name, value, left, top, defaultChecked = false }) {
  return <input type="checkbox" name={name} value={value} defaultChecked={defaultChecked} className="check" style={field({ left, top })} />;
}

function Radio({ name, value, left, top }) {
  return <input type="radio" name={name} value={value} className="radio" style={field({ left, top })} />;
}
