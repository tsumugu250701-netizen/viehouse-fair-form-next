'use client';

import { useMemo, useState } from 'react';

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

const interests = ['デザイン', '平屋', 'Google検索', '自然素材', '高性能住宅', 'ご紹介', '土地探し', '資金計画・住宅ローン', 'その他', 'リフォーム・リノベーション'];
const sources = ['イエタテフェア', 'Instagram', 'YouTube', 'TikTok', 'Google検索', 'ご紹介', 'その他'];
const gifts = [
  { value: 'towerカタログギフト', title: 'towerカタログギフト', desc: '暮らしを彩るインテリア雑貨が選べるカタログギフト。', img: '/images/gift-tower.svg' },
  { value: '松阪牛カタログギフト', title: '松阪牛カタログギフト', desc: '日本を代表するブランド牛を楽しめるカタログギフト。', img: '/images/gift-beef.svg' },
  { value: 'スターバックスギフト', title: 'スターバックスギフト', desc: '全国の店舗で使える、気軽に嬉しいギフト。', img: '/images/gift-starbucks.svg' },
];

function CheckItem({ name, value, children }) {
  return (
    <label className="choiceItem">
      <input type="checkbox" name={name} value={value} />
      <span>{children || value}</span>
    </label>
  );
}

function RadioItem({ name, value, onChange, checked, children }) {
  return (
    <label className="choiceItem radioItem">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
      <span>{children || value}</span>
    </label>
  );
}

export default function Page() {
  const [modelhouse, setModelhouse] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const showGift = modelhouse === 'ぜひ見学したい';

  const handleSubmit = () => {
    setTimeout(() => {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 700);
  };

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="siteShell">
      <div className="pageFrame">
        {!submitted ? (
          <>
            <Hero />
            <Benefits />
            <section className="formCard" id="survey">
              <div className="sectionTitle">
                <h2>アンケートにご協力ください</h2>
                <p>所要時間：約1分</p>
              </div>

              <form className="surveyForm" onSubmit={handleSubmit} action={GOOGLE_FORM_ACTION} method="POST" target="hidden_iframe">
                <div className="basicGrid">
                  <Field label="お名前" name={ENTRY.name} placeholder="例）山田 太郎" required />
                  <Field label="電話番号" name={ENTRY.phone} placeholder="例）090-1234-5678" required />
                  <Field label="メールアドレス" name={ENTRY.email} placeholder="例）example@mail.com" type="email" required />
                </div>

                <Question title="Q1. Vie houseを知ったきっかけは？" note="（複数選択可）">
                  <div className="choiceGrid sourceGrid">
                    {sources.map((item) => <CheckItem key={item} name={ENTRY.source} value={item} />)}
                  </div>
                </Question>

                <Question title="Q2. 家づくりで気になっていることは？" note="（複数選択可）">
                  <div className="choiceGrid interestGrid">
                    {interests.map((item) => <CheckItem key={item} name={ENTRY.interest} value={item} />)}
                  </div>
                </Question>

                <Question title="Q3. 今後、モデルハウスの見学を希望されますか？">
                  <div className="choiceGrid threeCol">
                    {['ぜひ見学したい', '話だけ聞いてみたい', '今回は情報収集のみ'].map((item) => (
                      <RadioItem key={item} name={ENTRY.modelhouse} value={item} checked={modelhouse === item} onChange={(e) => setModelhouse(e.target.value)} />
                    ))}
                  </div>
                </Question>

                <Question title="Q4. ご希望のご連絡方法を教えてください。">
                  <div className="choiceGrid threeCol">
                    {['電話', 'メール', 'どれでもOK'].map((item) => <RadioItem key={item} name={ENTRY.contact} value={item} />)}
                  </div>
                </Question>

                {showGift && (
                  <Question title="Q5. 5千円相当 選べるプレゼントをご希望の方はお選びください。">
                    <div className="giftGrid">
                      {gifts.map((gift) => (
                        <label className="giftCard" key={gift.value}>
                          <input type="radio" name={ENTRY.gift} value={gift.value} />
                          <span className="giftImageWrap"><img src={gift.img} alt="" /></span>
                          <strong>{gift.title}</strong>
                          <small>{gift.desc}</small>
                        </label>
                      ))}
                    </div>
                    <p className="giftNote">※モデルハウスへご来場いただいた方への特典です。※1家族様1回限り。</p>
                  </Question>
                )}

                <Question title={showGift ? 'Q6. ご質問・ご要望があればご入力ください' : 'Q5. ご質問・ご要望があればご入力ください'}>
                  <textarea name={ENTRY.message} className="messageArea" placeholder="ご質問・ご要望があればご入力ください" />
                </Question>

                <p className="privacy">ご入力いただいた個人情報は、厳重に管理し、ご連絡・ご案内目的以外には使用いたしません。</p>
                <button className="submitBtn" type="submit">アンケートを送信する <span>›</span></button>
              </form>
              <iframe name="hidden_iframe" title="hidden_iframe" style={{ display: 'none' }} />
            </section>
          </>
        ) : (
          <Thanks />
        )}
        <Footer year={year} />
      </div>
    </main>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="heroText">
        <div className="brand">Vie house<span>smart-off-grid-house</span></div>
        <div className="ribbon">イエタテフェア 2026 in 埼玉北 出展</div>
        <h1>本日はご来場<br />ありがとうございます！</h1>
        <p>アンケートにご回答いただくと、<br />素敵な特典やモデルハウスのご案内をお届けします。</p>
      </div>
      <img className="leaf" src="/images/leaf.svg" alt="" />
      <div className="heroVisual"><img src="/images/hero-provence.svg" alt="Vie houseの南仏スタイル住宅" /></div>
      <div className="eventBadge">
        <p>イエタテフェア2026<br />in 埼玉北</p>
        <strong>5/23・24</strong>
        <span>10:00 - 17:00</span>
        <small>SOCIO SQUARE ホール<br />埼玉県熊谷市問屋町2-4</small>
      </div>
      <div className="giftBanner">
        <div className="circleLabel">アンケート<br />回答で</div>
        <div className="giftIntro">
          <h2>5千円相当 選べるプレゼント！</h2>
          <div className="giftMiniList">
            {gifts.map((gift) => <div key={gift.title}><img src={gift.img} alt="" /><span>{gift.title}</span></div>)}
          </div>
          <p>※対象条件：モデルハウスご来場の方限定　※1家族様1回限り</p>
        </div>
        <div className="o2Box">
          <span>さらに！</span>
          <p>6月開催予定の<br />O2ボックス体験会へ<br />優先的にご案内します！</p>
          <img src="/images/o2box.svg" alt="O2ボックス" />
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const data = [
    { n: '01', title: 'デザイン・心地よさを体感', body: '自然素材の温もりや、南仏・プロヴァンススタイルの心地よい空間を、実際に体感できます。', icon: 'home' },
    { n: '02', title: '高性能な住まいを体感', body: '断熱性・気密性など、性能にこだわった快適な住まいを、体感を通してご確認いただけます。', icon: 'thermo' },
    { n: '03', title: 'わかりやすい家づくり相談', body: '土地探しや資金計画など、家づくりの不安や疑問を、経験豊富なスタッフが丁寧にサポートします。', icon: 'heart' },
  ];
  return (
    <section className="benefits">
      <h2>Vie houseのモデルハウスを見学する <strong>3</strong> つの理由</h2>
      <div className="benefitGrid">
        {data.map((b) => <div className="benefit" key={b.n}><SvgIcon type={b.icon} /><span>{b.n}</span><h3>{b.title}</h3><p>{b.body}</p></div>)}
      </div>
    </section>
  );
}

function SvgIcon({ type }) {
  if (type === 'thermo') return <svg viewBox="0 0 80 80"><path d="M22 35 40 18l18 17v25H22z"/><path d="M40 32v18"/><circle cx="40" cy="55" r="7"/><path d="M52 33c8-10 16-12 22-10-3 8-10 14-22 10z"/></svg>;
  if (type === 'heart') return <svg viewBox="0 0 80 80"><path d="M40 30c8-17 30-10 27 8-3 14-27 27-27 27S16 52 13 38c-3-18 19-25 27-8z"/><path d="M18 61h30l16-10"/><path d="M15 53h24"/></svg>;
  return <svg viewBox="0 0 80 80"><path d="M13 38 40 15l27 23"/><path d="M20 35v32h40V35"/><path d="M34 67V49h12v18"/></svg>;
}

function Field({ label, name, placeholder, type = 'text', required }) {
  return <label className="field"><span>{label}{required && <em>必須</em>}</span><input name={name} type={type} placeholder={placeholder} required={required} /></label>;
}

function Question({ title, note, children }) {
  return <div className="question"><h3>{title}{note && <small>{note}</small>}</h3>{children}</div>;
}

function Thanks() {
  return (
    <section className="thanksPage">
      <div className="thanksHero"><div className="brand">Vie house<span>smart-off-grid-house</span></div></div>
      <div className="thanksCard">
        <div className="checkMark">✓</div>
        <h1>ご回答ありがとうございました！</h1>
        <p>内容を確認のうえ、Vie houseよりご連絡いたします。<br />モデルハウス見学をご希望の方には、日程調整のご案内をお送りいたします。</p>
        <div className="visitNotice"><SvgIcon type="home" /><h2>ご来場時のお願い</h2><p>ご来場の際は、このフォームでご回答いただいたお名前をスタッフにお伝えください。</p></div>
        <p className="contactLine">ご不明点がございましたら、お気軽にお問い合わせください。</p>
        <a className="phone" href="tel:0485818800">048-581-8800</a>
        <small>受付時間 10:00〜18:00（水曜定休）</small>
      </div>
    </section>
  );
}

function Footer({ year }) {
  return (
    <footer className="footer">
      <div className="footerCta">
        <h2>モデルハウス見学のご予約も受付中！</h2>
        <p>ご希望の方は、スタッフまでお気軽にお声がけください。</p>
        <a href="#survey">モデルハウスの詳細はこちら <span>›</span></a>
      </div>
      <img className="footerHouse" src="/images/model-house.svg" alt="モデルハウス外観" />
      <div className="footerInfo">
        <div className="brand white">Vie house<span>smart-off-grid-house</span></div>
        <p>“好き”に囲まれる暮らしを、<br />Viehouseと一緒に。</p>
        <small>〒369-1201 埼玉県大里郡寄居町用土3119</small>
        <a className="footerPhone" href="tel:0485818800">048-581-8800</a>
      </div>
      <p className="copy">© {year} Vie house</p>
    </footer>
  );
}
