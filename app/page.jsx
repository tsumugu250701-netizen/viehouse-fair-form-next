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
const visitOptions = ['ぜひ見学したい', '話だけ聞いてみたい', '今回は情報収集のみ'];
const contactOptions = ['電話', 'メール', 'どれでもOK'];
const gifts = [
  {
    value: 'towerカタログギフト',
    title: 'towerカタログギフト',
    desc: '暮らしを彩るインテリア雑貨が選べる人気カタログギフト。',
    img: '/images/gift-tower.svg',
  },
  {
    value: '松阪牛カタログギフト',
    title: '松阪牛カタログギフト',
    desc: '日本を代表するブランド牛を楽しめるカタログギフト。',
    img: '/images/gift-beef.svg',
  },
  {
    value: 'スターバックスギフト',
    title: 'スターバックスギフト',
    desc: '全国のスターバックス店舗で使えるギフトカード。',
    img: '/images/gift-coffee.svg',
  },
];

function Leaf() {
  return (
    <svg className="leaf" viewBox="0 0 120 120" aria-hidden="true">
      <path d="M22 99 C35 70 55 43 94 22" />
      <path d="M38 76 C25 73 18 63 14 51 C29 53 38 62 38 76Z" />
      <path d="M56 55 C44 50 39 40 39 28 C53 32 60 42 56 55Z" />
      <path d="M72 39 C66 27 68 17 76 7 C83 20 81 30 72 39Z" />
      <path d="M72 40 C86 34 99 35 109 43 C95 52 83 51 72 40Z" />
      <path d="M54 58 C69 55 82 60 91 72 C75 76 64 72 54 58Z" />
    </svg>
  );
}

function Logo() {
  return (
    <div className="logo" aria-label="Vie house">
      <div className="logoScript">Vie house</div>
      <div className="logoSub">smart-off-grid-house</div>
    </div>
  );
}

function IconHouse() {
  return <svg viewBox="0 0 80 80"><path d="M13 39 L40 16 L67 39"/><path d="M21 37 V66 H59 V37"/><path d="M35 66 V49 H47 V66"/></svg>;
}
function IconThermo() {
  return <svg viewBox="0 0 80 80"><path d="M36 17 V45"/><path d="M36 45 a14 14 0 1 0 8 0 V17 a4 4 0 0 0-8 0Z"/><path d="M49 27 c8-10 18-8 20-8 c-2 8-9 17-20 17"/></svg>;
}
function IconHeart() {
  return <svg viewBox="0 0 80 80"><path d="M40 30 C31 15 12 22 15 39 C18 55 40 66 40 66 C40 66 62 55 65 39 C68 22 49 15 40 30Z"/><path d="M14 68 H34 C45 68 50 59 59 58 H70"/></svg>;
}
function IconCalendar() {
  return <svg viewBox="0 0 80 80"><rect x="14" y="20" width="52" height="46" rx="5"/><path d="M14 33 H66"/><path d="M28 13 V25"/><path d="M52 13 V25"/><path d="M28 44 H35 M45 44 H52 M28 55 H35 M45 55 H52"/></svg>;
}

function Field({ label, name, type = 'text', placeholder }) {
  return (
    <label className="field">
      <span>{label}<b>必須</b></span>
      <input name={name} type={type} placeholder={placeholder} required />
    </label>
  );
}
function Question({ title, note, children }) {
  return <div className="question"><h3>{title}{note && <small>{note}</small>}</h3>{children}</div>;
}
function CheckGroup({ name, items }) {
  return <div className="choiceGrid">{items.map((item) => <label className="choice" key={item}><input type="checkbox" name={name} value={item} /><span>{item}</span></label>)}</div>;
}
function RadioGroup({ name, items, onChange }) {
  return <div className="radioRow">{items.map((item) => <label className="choice radio" key={item}><input type="radio" name={name} value={item} onChange={() => onChange?.(item)} required /><span>{item}</span></label>)}</div>;
}
function GiftSelector({ visible }) {
  if (!visible) return null;
  return (
    <Question title="Q4. 5千円相当 選べるプレゼントをご希望の方はお選びください。">
      <div className="giftGrid">
        {gifts.map((gift) => (
          <label className="giftCard" key={gift.value}>
            <input type="radio" name={ENTRY.gift} value={gift.value} required />
            <span className="giftRadio" />
            <img src={gift.img} alt="" />
            <strong>{gift.title}</strong>
            <small>{gift.desc}</small>
          </label>
        ))}
      </div>
      <p className="giftNote">※プレゼントはモデルハウスご来場時のお渡しとなります。1家族様1回限り。</p>
    </Question>
  );
}
function Thanks() {
  return (
    <section className="thanksPanel">
      <Logo />
      <div className="checkMark">✓</div>
      <h1>ご回答ありがとうございました！</h1>
      <div className="line" />
      <p>内容を確認のうえ、Vie houseよりご連絡いたします。</p>
      <p>モデルハウス見学をご希望の方には、日程調整のご案内をお送りいたします。</p>
      <div className="noticeBox">
        <IconHouse />
        <h2>ご来場時のお願い</h2>
        <p>ご来場の際は、このフォームでご回答いただいたお名前をスタッフにお伝えください。</p>
      </div>
      <p className="contactText">ご不明点がございましたら、お気軽にお問い合わせください。</p>
      <div className="phone">048-581-8800</div>
      <small>受付時間 10:00〜18:00（水曜定休）</small>
    </section>
  );
}

export default function Page() {
  const [wantsVisit, setWantsVisit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!wantsVisit) data.delete(ENTRY.gift);
    setSending(true);
    try {
      await fetch(GOOGLE_FORM_ACTION, { method: 'POST', mode: 'no-cors', body: data });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <div className="heroText">
          <Logo />
          <div className="ribbon">イエタテフェア 2026 in 埼玉北 出展</div>
          <h1>本日はご来場<br />ありがとうございます！</h1>
          <p>アンケートにご回答いただくと、<br />素敵な特典やモデルハウスのご案内をお届けします。</p>
        </div>
        <div className="heroImage"><img src="/images/hero-house.svg" alt="南仏スタイルの住まい" /></div>
        <Leaf />
        <div className="eventBadge"><span>イエタテフェア2026<br />in 埼玉北</span><b>5/23・24</b><small>10:00 - 17:00<br />SOCIO SQUARE ホール<br />埼玉県熊谷市問屋町2-4</small></div>
      </section>

      <section className="campaign">
        <div className="roundLabel">アンケート<br />回答で</div>
        <div className="campaignMain"><h2>5千円相当 選べるプレゼント！</h2><div className="miniGifts">{gifts.map(g => <div key={g.value}><img src={g.img} alt=""/><span>{g.title}</span></div>)}</div><p>※対象条件：モデルハウスご来場の方限定　※1家族様1回限り</p></div>
        <div className="divider" />
        <div className="o2"><span>さらに！</span><p>6月開催予定の<br />O2ボックス体験会へ<br />優先的にご案内します！</p><img src="/images/o2box.svg" alt="O2ボックス" /></div>
      </section>

      <section className="reasons">
        <h2><Leaf />Vie houseのモデルハウスを見学する <b>3</b> つの理由<Leaf /></h2>
        <div className="reasonGrid">
          <article><IconHouse /><span>01</span><h3>デザイン・心地よさを体感</h3><p>自然素材の温もりや、南仏・プロヴァンススタイルの心地よい空間を、実際に体感できます。</p></article>
          <article><IconThermo /><span>02</span><h3>高性能な住まいを体感</h3><p>断熱性・気密性など、性能にこだわった快適な住まいを、体感を通してご確認いただけます。</p></article>
          <article><IconHeart /><span>03</span><h3>わかりやすい家づくり相談</h3><p>土地探しや資金計画など、家づくりの不安や疑問を、経験豊富なスタッフが丁寧にサポートします。</p></article>
        </div>
      </section>

      {submitted ? (
        <Thanks />
      ) : (
        <section className="formSection">
          <h2>アンケートにご協力ください</h2>
          <p className="time">所要時間：約1分</p>
          <form onSubmit={handleSubmit}>
            <div className="topFields">
              <Field label="お名前" name={ENTRY.name} placeholder="例）山田 太郎" />
              <Field label="電話番号" name={ENTRY.phone} placeholder="例）090-1234-5678" />
              <Field label="メールアドレス" name={ENTRY.email} type="email" placeholder="例）example@mail.com" />
            </div>
            <Question title="Q1. 家づくりで気になっていることは？" note="（複数選択可）"><CheckGroup name={ENTRY.interest} items={interests} /></Question>
            <Question title="Q2. Vie houseを知ったきっかけは？" note="（複数選択可）"><CheckGroup name={ENTRY.source} items={sources} /></Question>
            <Question title="Q3. 今後、モデルハウスの見学を希望されますか？"><RadioGroup name={ENTRY.modelhouse} items={visitOptions} onChange={(v) => setWantsVisit(v === 'ぜひ見学したい')} /></Question>
            <Question title="Q4. ご希望のご連絡方法を教えてください。"><RadioGroup name={ENTRY.contact} items={contactOptions} /></Question>
            <GiftSelector visible={wantsVisit} />
            <Question title="Q5. ご質問・ご要望があればご入力ください"><textarea name={ENTRY.message} placeholder="ご質問・ご要望があればご入力ください" /></Question>
            <p className="privacy">ご入力いただいた個人情報は、厳重に管理し、ご連絡・ご案内目的以外には使用いたしません。</p>
            <button className="submitBtn" type="submit" disabled={sending}>{sending ? '送信中...' : 'アンケートを送信する'} <span>›</span></button>
          </form>
        </section>
      )}

      <section className="bottomCta">
        <div className="visitBox"><h3>モデルハウス見学のご予約も受付中！</h3><p>ご希望の方は、スタッフまでお気軽にお声がけください。</p><button type="button"><IconCalendar />モデルハウスの詳細はこちら <span>›</span></button></div>
        <img className="modelPhoto" src="/images/model-house.svg" alt="モデルハウス" />
        <div className="contactBox"><Logo /><p>“好き”に囲まれる暮らしを、<br />Viehouseと一緒に。</p><small>〒369-1201 埼玉県大里郡寄居町用土3119</small><b>048-581-8800</b><Leaf /></div>
      </section>
    </main>
  );
}
