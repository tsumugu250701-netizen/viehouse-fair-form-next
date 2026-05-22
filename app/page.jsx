'use client';

import { useRef, useState } from 'react';

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
  { value: 'towerカタログギフト', title: 'towerカタログギフト', body: '暮らしを彩るインテリア雑貨が豊富に選べるカタログギフト。', image: '/gift-tower.jpg' },
  { value: '松阪牛カタログギフト', title: '松阪牛カタログギフト', body: '日本を代表するブランド牛、松阪牛のカタログギフト。', image: '/gift-beef.jpg' },
  { value: 'スターバックスギフト', title: 'スターバックスギフト', body: '全国のスターバックス店舗で使えるギフトカード。', image: '/gift-starbucks.jpg' },
];

export default function Page() {
  const [sent, setSent] = useState(false);
  const [modelhouse, setModelhouse] = useState('');
  const [gift, setGift] = useState('');
  const resultRef = useRef(null);

  const giftEnabled = modelhouse === 'ぜひ見学したい';

  const onModelhouseChange = (value) => {
    setModelhouse(value);
    if (value !== 'ぜひ見学したい') setGift('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body: data,
      });
      setSent(true);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
      form.reset();
      setModelhouse('');
      setGift('');
    } catch (error) {
      alert('送信に失敗しました。時間をおいて再度お試しください。');
    }
  };

  return (
    <main className="page">
      <section className="hero">
        <div className="heroText">
          <div className="logo">Vie house<span>smart-off-grid-house</span></div>
          <p className="ribbon">イエタテフェア 2026 in 埼玉北 出展</p>
          <h1>本日はご来場<br />ありがとうございます！</h1>
          <p className="lead">アンケートにご回答いただくと、<br />素敵な特典やモデルハウスのご案内をお届けします。</p>
        </div>
        <div className="heroPhoto" />
        <div className="eventCircle">
          <p>イエタテフェア2026<br />in 埼玉北</p>
          <strong>5/23<span>SAT</span>・24<span>SUN</span></strong>
          <p>10:00 - 17:00</p>
          <p>SOCIO SQUARE ホール<br />埼玉県熊谷市問屋町2-4</p>
        </div>
      </section>

      <section className="giftLead">
        <div className="bubble">アンケート<br />回答で</div>
        <div className="giftLeadMain">
          <h2>5千円相当 選べるプレゼント！</h2>
          <div className="giftMiniCards">
            <MiniGift title="tower" sub="カタログギフト" img="/gift-tower.jpg" />
            <MiniGift title="松阪牛" sub="カタログギフト" img="/gift-beef.jpg" />
            <MiniGift title="スターバックス" sub="ギフト" img="/gift-starbucks.jpg" />
          </div>
          <p>※対象条件：モデルハウスご来場の方限定　※1家族様1回限り</p>
        </div>
        <div className="o2Box">
          <span>さらに！</span>
          <p>6月開催予定の<br />O2ボックス体験会へ<br />優先的にご案内します！</p>
          <div className="o2Icon">O₂</div>
        </div>
      </section>

      <section className="reasons">
        <h2><span>Vie houseのモデルハウスを見学する</span> 3つの理由</h2>
        <div className="reasonGrid">
          <Reason no="01" icon="⌂" title="デザイン・心地よさを体感">自然素材の温もりや、南仏・プロヴァンススタイルの心地よい空間を、実際に体感できます。</Reason>
          <Reason no="02" icon="♨" title="高性能な住まいを体感">断熱性・気密性など、性能にこだわった快適な住まいを、体感を通して確認いただけます。</Reason>
          <Reason no="03" icon="♡" title="わかりやすい家づくり相談">土地探しや資金計画など、家づくりの不安や疑問を、経験豊富なスタッフが丁寧にサポートします。</Reason>
        </div>
      </section>

      <section className="formBlock" id="survey" ref={resultRef}>
        {!sent ? (
          <>
            <div className="formTitle">
              <h2>アンケートにご協力ください</h2>
              <p>所要時間：約1分</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="basicFields">
                <Field label="お名前" name={ENTRY.name} placeholder="例）山田 太郎" required />
                <Field label="電話番号" name={ENTRY.phone} placeholder="例）090-1234-5678" required />
                <Field label="メールアドレス" name={ENTRY.email} placeholder="例）example@mail.com" required type="email" />
              </div>

              <Question title="Q1. Vie houseを知ったきっかけは？" note="（複数選択可）">
                <CheckGroup name={ENTRY.source} items={sources} />
              </Question>

              <Question title="Q2. 家づくりで気になっていることは？" note="（複数選択可）">
                <CheckGroup name={ENTRY.interest} items={interests} />
              </Question>

              <Question title="Q3. 今後、モデルハウスの見学を希望されますか？">
                <div className="choices radioChoices">
                  {['ぜひ見学したい', '話だけ聞いてみたい', '今回は情報収集のみ'].map((item) => (
                    <label className="choice" key={item}>
                      <input type="radio" name={ENTRY.modelhouse} value={item} checked={modelhouse === item} onChange={() => onModelhouseChange(item)} />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </Question>

              <Question title="Q4. ご希望のご連絡方法を教えてください。">
                <RadioGroup name={ENTRY.contact} items={['電話', 'メール', 'どれでもOK']} />
              </Question>

              <Question title="Q5. 5千円相当 選べるプレゼントをご希望の方はお選びください。">
                <p className="giftNotice">※「ぜひ見学したい」を選択した方のみ選択できます。</p>
                <div className="giftCards">
                  {gifts.map((item) => (
                    <label className={`giftCard ${!giftEnabled ? 'disabled' : ''} ${gift === item.value ? 'selected' : ''}`} key={item.value}>
                      <input
                        type="radio"
                        name={ENTRY.gift}
                        value={item.value}
                        disabled={!giftEnabled}
                        checked={gift === item.value}
                        onChange={() => setGift(item.value)}
                      />
                      <img src={item.image} alt="" />
                      <strong>{item.title}</strong>
                      <span>{item.body}</span>
                    </label>
                  ))}
                </div>
              </Question>

              <Question title="Q6. ご質問・ご要望があればご入力ください">
                <textarea name={ENTRY.message} className="message" placeholder="ご質問・ご要望があればご入力ください" />
              </Question>

              <p className="privacy">ご入力いただいた個人情報は、厳重に管理し、ご連絡・ご案内目的以外には使用いたしません。</p>
              <button className="submitBtn" type="submit">アンケートを送信する <span>›</span></button>
            </form>
          </>
        ) : (
          <div className="thanksScreen">
            <div className="checkIcon">✓</div>
            <h2>ご回答ありがとうございました</h2>
            <p>内容を確認のうえ、Vie houseよりご連絡いたします。</p>
            <p>モデルハウス見学をご希望の方には、日程調整のご案内をお送りいたします。</p>
            <div className="visitNote">
              <h3>ご来場時のお願い</h3>
              <p>ご来場の際は、このフォームでご回答いただいたお名前をスタッフにお伝えください。</p>
            </div>
            <button className="backBtn" onClick={() => setSent(false)}>続けて回答する</button>
          </div>
        )}
      </section>

      <section className="bottomPanel">
        <img src="/bottom.jpg" alt="モデルハウス見学のご案内" />
      </section>
    </main>
  );
}

function MiniGift({ title, sub, img }) {
  return <div className="miniGift"><img src={img} alt="" /><strong>{title}</strong><span>{sub}</span></div>;
}
function Reason({ no, icon, title, children }) {
  return <div className="reason"><div className="reasonHead"><span className="reasonIcon">{icon}</span><b>{no}</b></div><h3>{title}</h3><p>{children}</p></div>;
}
function Field({ label, name, placeholder, type = 'text', required }) {
  return <label className="field"><span>{label}{required && <b>必須</b>}</span><input type={type} name={name} placeholder={placeholder} required={required} /></label>;
}
function Question({ title, note, children }) {
  return <div className="question"><p className="questionTitle"><strong>{title}</strong>{note && <em>{note}</em>}</p>{children}</div>;
}
function CheckGroup({ name, items }) {
  return <div className="choices">{items.map((item) => <label className="choice" key={item}><input type="checkbox" name={name} value={item} /><span>{item}</span></label>)}</div>;
}
function RadioGroup({ name, items }) {
  return <div className="choices radioChoices">{items.map((item) => <label className="choice" key={item}><input type="radio" name={name} value={item} /><span>{item}</span></label>)}</div>;
}
