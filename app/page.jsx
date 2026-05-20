'use client';

import { useState } from 'react';

// ▼Googleフォーム連携時はここを差し替え
// 1. Googleフォームを作成
// 2. フォームURLの /viewform を /formResponse に変更
// 3. 各質問の entry.xxxxx を下記に設定
const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLScW2DTj4ptbYi_nr1PuiFvpCLV-D4x-DJ08T_j365l8hIxu5w/formResponse";
const ENTRY = {
  name: "entry.972939221",
  phone: "entry.417934510",
  email: "entry.1291569393",
  source: "entry.1952441446",
  interest: "entry.1331030282",
  modelhouse: "entry.1340301750",
  contact: "entry.375609906",
  gift: "entry.1203632369",
  message: "entry.ここに新しい番号",
};

const sources = ['イエタテフェア', 'Instagram', 'YouTube', 'TikTok', 'Google検索', 'ご紹介', 'その他'];
const interests = ['デザイン', '平屋', '自然素材', '高性能住宅', '土地探し', '資金計画・住宅ローン', 'リフォーム・リノベーション', 'その他'];

export default function Page() {
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    if (!GOOGLE_FORM_ACTION) return;
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await fetch(GOOGLE_FORM_ACTION, { method: 'POST', mode: 'no-cors', body: data });
      setSent(true);
      form.reset();
    } catch (err) {
      alert('送信に失敗しました。時間をおいて再度お試しください。');
    }
  };

  return (
    <main className="page">
      <div className="sheet">
        <img src="/top.jpg" alt="Vie house イエタテフェア案内" className="topImage" />

        <section className="formBlock" id="survey">
          <div className="formTitleRow">
            <h2>アンケートにご協力ください</h2>
            <span>所要時間：約1分</span>
          </div>

          {sent && (
            <div className="thanks">
              ご回答ありがとうございました。スタッフよりご案内いたします。
            </div>
          )}

          <form onSubmit={handleSubmit} action={GOOGLE_FORM_ACTION || undefined} method="POST" target={GOOGLE_FORM_ACTION ? 'hidden_iframe' : undefined}>
            <div className="formGrid">
              <div className="leftFields">
                <Field label="お名前" name={ENTRY.name} placeholder="例）山田 太郎" required />
                <Field label="電話番号" name={ENTRY.phone} placeholder="例）090-1234-5678" required />
                <Field label="メールアドレス" name={ENTRY.email} placeholder="例）sample@example.com" required type="email" />
                <p className="privacy">🔒 ご入力いただいた個人情報は、厳重に管理し、ご連絡・ご案内目的以外には使用いたしません。</p>
              </div>

              <div className="rightSurvey">
                <Question title="Q1. Vie houseを知ったきっかけは？" note="（複数選択可）">
                  <CheckGroup name={ENTRY.source} items={sources} />
                </Question>

                <Question title="Q2. 家づくりで気になっていることは？" note="（複数選択可）">
                  <CheckGroup name={ENTRY.interest} items={interests} />
                </Question>

                <Question title="Q3. 今後、モデルハウスの見学を希望されますか？">
                  <RadioGroup name={ENTRY.modelhouse} items={['ぜひ見学したい', '話だけ聞いてみたい', '今回は情報収集のみ']} />
                </Question>

                <Question title="Q4. ご希望のご連絡方法を教えてください。">
                  <RadioGroup name={ENTRY.contact} items={['電話', 'メール', 'どれでもOK']} />
                </Question>

                <Question title="Q5. プレゼントの応募を希望しますか？">
                  <label className="choice giftChoice">
                    <input
  type="checkbox"
  name={ENTRY.gift}
  value="希望する（モデルハウスご来場でお渡しいたします）"
/>
                  </label>
                </Question>

                <textarea name={ENTRY.message} className="message" placeholder="ご質問・ご要望があればご入力ください"></textarea>
              </div>
            </div>

            <button className="submitBtn" type="submit">アンケートを送信する <span>›</span></button>
          </form>
          <iframe name="hidden_iframe" style={{ display: 'none' }} title="hidden_iframe" />
        </section>

        <img src="/bottom.jpg" alt="モデルハウス見学のご案内" className="bottomImage" />
      </div>
    </main>
  );
}

function Field({ label, name, placeholder, type = 'text', required }) {
  return (
    <label className="field">
      <span>{label} {required && <b>必須</b>}</span>
      <input type={type} name={name} placeholder={placeholder} required={required} />
    </label>
  );
}

function Question({ title, note, children }) {
  return (
    <div className="question">
      <p><strong>{title}</strong>{note && <em>{note}</em>}</p>
      {children}
    </div>
  );
}

function CheckGroup({ name, items }) {
  return <div className="choices">{items.map((item) => <label className="choice" key={item}><input type="checkbox" name={name} value={item} /><span>{item}</span></label>)}</div>;
}

function RadioGroup({ name, items }) {
  return <div className="choices radioChoices">{items.map((item) => <label className="choice" key={item}><input type="radio" name={name} value={item} /><span>{item}</span></label>)}</div>;
}
