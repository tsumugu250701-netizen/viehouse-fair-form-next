'use client';

import { useState } from 'react';

const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLScW2DTj4ptbYi_nr1PuiFvpCLV-D4x-DJ08T_j365l8hIxu5w/formResponse';

const ENTRY = {
  name: 'entry.972939221',
  phone: 'entry.417934510',
  email: 'entry.1291569393',
  source: 'entry.1952441446',
  interest: 'entry.1331030282',
  modelhouse: 'entry.1340301750',
  contact: 'entry.375609906',
  gift: 'entry.1203632369',
  message: 'entry.807976969',
};

const sources = ['イエタテフェア', 'Instagram', 'YouTube', 'TikTok', 'Google検索', 'ご紹介', 'その他'];
const interests = ['デザイン', '平屋', '自然素材', '高性能住宅', '土地探し', '資金計画・住宅ローン', 'リフォーム・リノベーション', 'その他'];
const gifts = [
  { value: 'towerカタログギフト', title: 'towerカタログギフト', desc: '暮らしを彩るインテリア雑貨が豊富に掲載されたカタログギフト。', img: '/gift-tower.jpg' },
  { value: '松阪牛カタログギフト', title: '松阪牛カタログギフト', desc: '日本を代表するブランド牛、松阪牛のカタログギフト。', img: '/gift-beef.jpg' },
  { value: 'スターバックスギフト', title: 'スターバックスギフト', desc: '全国のスターバックス店舗で使えるギフトカード。', img: '/gift-starbucks.jpg' },
];

function Field({ label, name, placeholder, type = 'text', required = false }) {
  return (
    <label className="field">
      <span>{label}{required && <em>必須</em>}</span>
      <input name={name} type={type} placeholder={placeholder} required={required} />
    </label>
  );
}

function CheckGroup({ name, items }) {
  return (
    <div className="choiceGrid">
      {items.map((item) => (
        <label key={item} className="choice">
          <input type="checkbox" name={name} value={item} />
          <span>{item}</span>
        </label>
      ))}
    </div>
  );
}

function RadioGroup({ name, items, value, onChange }) {
  return (
    <div className="radioRow">
      {items.map((item) => (
        <label key={item} className="choice radioChoice">
          <input type="radio" name={name} value={item} checked={value === item} onChange={() => onChange(item)} />
          <span>{item}</span>
        </label>
      ))}
    </div>
  );
}

export default function Page() {
  const [submitted, setSubmitted] = useState(false);
  const [modelhouse, setModelhouse] = useState('');
  const [selectedGift, setSelectedGift] = useState('');

  const showGift = modelhouse === 'ぜひ見学したい';

  const handleSubmit = () => {
    setTimeout(() => {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  return (
    <main className="page">
      {!submitted ? (
        <>
          <section className="topImageWrap">
            <img src="/top-static.jpg" alt="Vie house イエタテフェア案内" className="topStatic" />
          </section>

          <section className="formSection" id="survey">
            <h1>アンケートにご協力ください</h1>
            <p className="time">所要時間：約1分</p>

            <form className="surveyForm" onSubmit={handleSubmit} action={GOOGLE_FORM_ACTION} method="POST" target="hidden_iframe">
              <div className="basicFields">
                <Field label="お名前" name={ENTRY.name} placeholder="例）山田 太郎" required />
                <Field label="電話番号" name={ENTRY.phone} placeholder="例）090-1234-5678" required />
                <Field label="メールアドレス" name={ENTRY.email} placeholder="例）example@mail.com" type="email" required />
              </div>

              <div className="question">
                <h2>Q1. Vie houseを知ったきっかけは？ <small>（複数選択可）</small></h2>
                <CheckGroup name={ENTRY.source} items={sources} />
              </div>

              <div className="question">
                <h2>Q2. 家づくりで気になっていることは？ <small>（複数選択可）</small></h2>
                <CheckGroup name={ENTRY.interest} items={interests} />
              </div>

              <div className="question">
                <h2>Q3. 今後、モデルハウスの見学を希望されますか？</h2>
                <RadioGroup
                  name={ENTRY.modelhouse}
                  value={modelhouse}
                  onChange={(value) => {
                    setModelhouse(value);
                    if (value !== 'ぜひ見学したい') setSelectedGift('');
                  }}
                  items={['ぜひ見学したい', '話だけ聞いてみたい', '今回は情報収集のみ']}
                />
              </div>

              <div className="question">
                <h2>Q4. ご希望のご連絡方法を教えてください。</h2>
                <RadioGroup name={ENTRY.contact} value={undefined} onChange={() => {}} items={['電話', 'メール', 'どれでもOK']} />
              </div>

<div className="question giftQuestion">
  <h2>Q5. 5千円相当 選べるギフトをお選びください。</h2>
  <p className="giftNote">
    ※プレゼントはモデルハウスへご見学いただいた際にお渡しいたします。
  </p>

  <div className="giftGrid">
    {gifts.map((gift) => (
      <label
        className={`giftCard ${selectedGift === gift.value ? 'selected' : ''}`}
        key={gift.value}
      >
        <input
          type="radio"
          name={ENTRY.gift}
          value={gift.value}
          checked={selectedGift === gift.value}
          onChange={() => setSelectedGift(gift.value)}
        />
        <img src={gift.img} alt={gift.title} />
        <strong>{gift.title}</strong>
        <span>{gift.desc}</span>
      </label>
    ))}
  </div>
</div>

              <div className="question">
                <h2>{showGift ? 'Q6.' : 'Q5.'} ご質問・ご要望があればご入力ください</h2>
                <textarea name={ENTRY.message} className="message" placeholder="ご質問・ご要望があればご入力ください" />
              </div>

              <p className="privacy">ご入力いただいた個人情報は、厳重に管理し、ご連絡・ご案内目的以外には使用いたしません。</p>
              <button className="submitBtn" type="submit">アンケートを送信する <span>›</span></button>
            </form>
            <iframe name="hidden_iframe" title="hidden_iframe" style={{ display: 'none' }} />
          </section>

          <Footer />
        </>
      ) : (
        <Thanks />
      )}
    </main>
  );
}

function Footer() {
  return (
    <section className="footerBlock">
      <div className="footerReserve">
        <h2>モデルハウス動画公開中！</h2>
        <p>ご希望の方は、スタッフまでお気軽にお声がけください。</p>
        <a
  href="https://youtu.be/sgWQRtHu3s4"
  target="_blank"
  rel="noopener noreferrer"
>
  モデルハウス動画はこちら <span>›</span>
</a>
      </div>
      <img src="/footer-house.jpg" alt="モデルハウス" className="footerHouse" />
      <div className="footerContact">
        <div className="footerLogo">Vie house</div>
        <p>“好き”に囲まれる暮らしを、<br />Viehouseと一緒に。</p>
        <small>〒369-1201 埼玉県大里郡寄居町用土3119</small>
        <strong>048-581-8800</strong>
      </div>
    </section>
  );
}

function Thanks() {
  return (
    <section className="thanksPage">
      <div className="thanksCard">
        <div className="checkMark">✓</div>
        <h1>ご回答ありがとうございました！</h1>
        <p>内容を確認のうえ、Vie houseよりご連絡いたします。</p>
        <p>モデルハウス見学をご希望の方には、日程調整のご案内をお送りいたします。</p>
        <div className="visitNote">
          <h2>ご来場時のお願い</h2>
          <p>ご来場の際は、このフォームでご回答いただいたお名前をスタッフにお伝えください。</p>
        </div>
        <p className="thanksContact">ご不明点がございましたら、お気軽にお問い合わせください。</p>
        <strong className="thanksPhone">048-581-8800</strong>
      </div>
      <Footer />
    </section>
  );
}
