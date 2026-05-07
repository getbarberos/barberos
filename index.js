import { useState, useEffect } from "react";
import Head from "next/head";

// ── SUPABASE ──────────────────────────────────────────────────────────────────
async function joinWaitlist(email) {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source: "landing" }),
  });
  if (res.status === 409) return { error: "exists" };
  if (!res.ok) return { error: "failed" };
  return { success: true };
}

// ── VERTALINGEN ───────────────────────────────────────────────────────────────
const COPY = {
  nl: {
    urgency: "🔥 Founding Member — €29/mnd voor altijd · Nog 11 plekken · Verloopt over:",
    tagline1: "Own your", tagline2: "chair", tagline3: ". Own your", tagline4: "clients", tagline5: ". Own your", tagline6: "future", tagline7: ".",
    heroTitle1: "Het platform voor barbers", heroTitle2: "die hun ", heroAccent: "eigen business", heroTitle3: " bouwen.",
    heroDesc: "BarberOS geeft zzp barbers & stoelhuurders de tools om meer klanten aan te trekken, afspraken te beheren en hun inkomen te verhogen.",
    features: ["Meer eigen klanten", "Minder no-shows", "Meer herboekingen", "Meer controle"],
    dashTitle: "Dashboard", agendaTitle: "Agenda",
    omzetLabel: "Omzet deze maand", omzetChange: "+24% vs vorige maand",
    stats: [["28","Afspraken","Deze maand"],["75%","Herboekingen","+18%"],["4%","No-shows","-2%"],["156","Eigen klanten","+23%"]],
    volgende: "Volgende afspraak", vandaag: "Vandaag • 14:30",
    navItems: ["Dashboard","Agenda","Klanten","Meer"],
    agendaDays: [["Ma","17"],["Di","18"],["Wo","19"],["Do","20"]],
    appointments: [["10:00","Bas","Fade",false],["11:30","Mike","Knippen",false],["14:30","D. de Vries","Fade + Baard",true],["16:00","Rico","Knippen",false]],
    addApt: "+ Afspraak toevoegen",
    feat1: "Eigen ", feat1acc: "booking", feat1end: " link",
    feat2: "Deel jouw ", feat2acc: "QR code",
    feat3: "Klanten in ", feat3acc: "jouw app",
    feat4: "Groei jouw ", feat4acc: "business",
    service1: "Haircut", service2: "Fade + Beard", service3: "Beard Trim",
    chooseTime: "Kies een datum & tijd",
    qrBoek: "Boek direct\nbij jouw barber", qrScan: "Scan. Boek. Kom langs.",
    clientsTitle: "Klanten", zoekClient: "Zoek een klant",
    clients: [["D","D. de Vries","2 dagen geleden"],["M","Mike","12 dagen geleden"],["R","Rico","3 weken geleden"],["B","Bas","1 maand geleden"]],
    omzetOverzicht: "Omzet overzicht", dezeMaand: "Deze maand",
    feat1desc: "Jouw persoonlijke link waar klanten 24/7 direct een afspraak kunnen maken.",
    feat2desc: "Laat klanten scannen, boeken en terugkomen. Simpel.",
    feat3desc: "Bouw aan jouw eigen klantenbestand. Geen klant gaat meer verloren.",
    feat4desc: "Inzicht in je omzet, afspraken en groei. Zodat jij betere beslissingen maakt.",
    benefitsTitle1: "Jij knipt. ", benefitsAcc: "Wij regelen de rest.",
    benefits: [
      { title: "Bespaar tijd", desc: "Minder appjes. Minder gedoe. Alles op één plek." },
      { title: "Meer vaste klanten", desc: "Bouw relaties op en zorg dat klanten terugkomen." },
      { title: "Meer omzet", desc: "Meer afspraken. Minder lege stoelen. Meer inkomen." },
      { title: "Volledige controle", desc: "Jouw klanten. Jouw data. Jouw business." },
      { title: "Groei zonder grenzen", desc: "Schaal jouw business, niet alleen jouw stoel." },
    ],
    chairH: "Je huurt niet alleen\neen stoel.\nJe bouwt een\n", chairAcc: "eigen merk.",
    ctaH: "Start vandaag nog met jouw eigen barber business.",
    checks: ["14 dagen gratis proberen", "Binnen 2 minuten aan de slag"],
    ctaBtn: "Gratis starten",
    ratingCount: "Gebaseerd op 200+ barbers",
    barbersSay: "Barbers gaan voor\nBarberOS.",
    emailPh: "jouw@email.nl",
    emailBtn: "Inschrijven →",
    success: "Je staat op de lijst! We nemen snel contact op.",
    exists: "Je staat al ingeschreven!",
    error: "Er ging iets mis. Probeer opnieuw.",
    footer1h: "Veilig & betrouwbaar", footer1s: "Jouw data is veilig bij ons.",
    footer2h: "Altijd & overal", footer2s: "Werkt op al jouw devices.",
    footer3h: "Ontwikkeld voor barbers", footer3s: "Door barbers, voor barbers.",
    bewerken: "Bewerken", delen: "Delen",
    langBtn: "🇬🇧 English",
  },
  en: {
    urgency: "🔥 Founding Member — €29/mo forever · Only 11 spots left · Expires in:",
    tagline1: "Own your", tagline2: "chair", tagline3: ". Own your", tagline4: "clients", tagline5: ". Own your", tagline6: "future", tagline7: ".",
    heroTitle1: "The platform for barbers", heroTitle2: "who build their own ", heroAccent: "business", heroTitle3: ".",
    heroDesc: "BarberOS gives freelance barbers & chair renters the tools to attract more clients, manage appointments and increase their income.",
    features: ["More own clients", "Fewer no-shows", "More rebookings", "More control"],
    dashTitle: "Dashboard", agendaTitle: "Agenda",
    omzetLabel: "Revenue this month", omzetChange: "+24% vs last month",
    stats: [["28","Appointments","This month"],["75%","Rebookings","+18%"],["4%","No-shows","-2%"],["156","Own clients","+23%"]],
    volgende: "Next appointment", vandaag: "Today • 14:30",
    navItems: ["Dashboard","Agenda","Clients","More"],
    agendaDays: [["Mo","17"],["Tu","18"],["We","19"],["Th","20"]],
    appointments: [["10:00","Bas","Fade",false],["11:30","Mike","Haircut",false],["14:30","D. de Vries","Fade + Beard",true],["16:00","Rico","Haircut",false]],
    addApt: "+ Add appointment",
    feat1: "Own ", feat1acc: "booking", feat1end: " link",
    feat2: "Share your ", feat2acc: "QR code",
    feat3: "Clients in ", feat3acc: "your app",
    feat4: "Grow your ", feat4acc: "business",
    service1: "Haircut", service2: "Fade + Beard", service3: "Beard Trim",
    chooseTime: "Choose a date & time",
    qrBoek: "Book directly\nwith your barber", qrScan: "Scan. Book. Walk in.",
    clientsTitle: "Clients", zoekClient: "Search a client",
    clients: [["D","D. de Vries","2 days ago"],["M","Mike","12 days ago"],["R","Rico","3 weeks ago"],["B","Bas","1 month ago"]],
    omzetOverzicht: "Revenue overview", dezeMaand: "This month",
    feat1desc: "Your personal link where clients can book directly 24/7.",
    feat2desc: "Let clients scan, book and come back. Simple.",
    feat3desc: "Build your own client base. No client ever gets lost.",
    feat4desc: "Insight into your revenue, appointments and growth.",
    benefitsTitle1: "You cut. ", benefitsAcc: "We handle the rest.",
    benefits: [
      { title: "Save time", desc: "Fewer messages. Less hassle. Everything in one place." },
      { title: "More loyal clients", desc: "Build relationships and keep clients coming back." },
      { title: "More revenue", desc: "More appointments. Fewer empty chairs. More income." },
      { title: "Full control", desc: "Your clients. Your data. Your business." },
      { title: "Grow without limits", desc: "Scale your business, not just your chair." },
    ],
    chairH: "You don't just\nrent a chair.\nYou build your\n", chairAcc: "own brand.",
    ctaH: "Start building your own barber business today.",
    checks: ["14 days free trial", "Up and running in 2 minutes"],
    ctaBtn: "Start for free",
    ratingCount: "Based on 200+ barbers",
    barbersSay: "Barbers choose\nBarberOS.",
    emailPh: "you@email.com",
    emailBtn: "Sign up →",
    success: "You're on the list! We'll be in touch soon.",
    exists: "You're already registered!",
    error: "Something went wrong. Try again.",
    footer1h: "Safe & reliable", footer1s: "Your data is safe with us.",
    footer2h: "Always & everywhere", footer2s: "Works on all your devices.",
    footer3h: "Built for barbers", footer3s: "By barbers, for barbers.",
    bewerken: "Edit", delen: "Share",
    langBtn: "🇳🇱 Nederlands",
  },
};

// ── COUNTDOWN ─────────────────────────────────────────────────────────────────
function Countdown() {
  const [t, setT] = useState({ h:23, m:47, s:33 });
  useEffect(() => {
    const i = setInterval(() => setT(p => {
      let { h, m, s } = p;
      s--; if(s<0){s=59;m--;} if(m<0){m=59;h--;} if(h<0){h=23;}
      return {h,m,s};
    }), 1000);
    return () => clearInterval(i);
  }, []);
  const pad = n => String(n).padStart(2,"0");
  return <b style={{fontVariantNumeric:"tabular-nums",color:"#F59E0B"}}>{pad(t.h)}:{pad(t.m)}:{pad(t.s)}</b>;
}

// ── EMAIL FORM ────────────────────────────────────────────────────────────────
function EmailForm({ c }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const submit = async e => {
    e?.preventDefault();
    if (!email.includes("@")) return;
    setState("loading");
    const r = await joinWaitlist(email);
    if (r.success) setState("success");
    else if (r.error === "exists") setState("exists");
    else setState("error");
  };
  if (state === "success") return <p style={{color:"#4ade80",fontWeight:600,fontSize:13,marginTop:12}}>{c.success}</p>;
  if (state === "exists") return <p style={{color:"#fbbf24",fontWeight:600,fontSize:13,marginTop:12}}>{c.exists}</p>;
  return (
    <form onSubmit={submit} style={{marginTop:16,display:"flex",flexDirection:"column",gap:8}}>
      <input value={email} onChange={e=>setEmail(e.target.value)}
        placeholder={c.emailPh}
        style={{background:"#1a1a1a",border:"1px solid #333",borderRadius:8,padding:"11px 14px",color:"#fff",fontSize:14,outline:"none",fontFamily:"inherit",width:"100%"}}/>
      <button type="submit" disabled={state==="loading"}
        style={{background:"linear-gradient(135deg,#6d28d9,#7c3aed)",color:"#fff",border:"none",borderRadius:10,padding:"12px 20px",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:6,opacity:state==="loading"?.7:1}}>
        {state==="loading"?"...":c.ctaBtn}
        <svg width="16" height="16" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2" fill="none"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
      {state==="error"&&<p style={{color:"#f87171",fontSize:12}}>{c.error}</p>}
    </form>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang] = useState("nl");
  const c = COPY[lang];

  return (
    <>
      <Head>
        <title>BarberOS - Het platform voor barbers</title>
        <meta name="description" content="BarberOS geeft zzp barbers de tools om eigen klanten op te bouwen, meer te verdienen en onafhankelijk te zijn."/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <meta name="theme-color" content="#000000"/>
      </Head>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: #000000; color: #ffffff;
          overflow-x: hidden; -webkit-font-smoothing: antialiased;
        }
        .top-bar { display:flex; justify-content:flex-end; align-items:center; padding:8px 20px; background:#000; border-bottom:1px solid #111; }
        .top-btn { background:transparent; border:none; cursor:pointer; padding:4px; display:flex; align-items:center; justify-content:center; }
        .top-btn svg { width:18px; height:18px; stroke:#9ca3af; stroke-width:1.5; fill:none; }
        .lang-btn { background:#1a1a1a; border:1px solid #333; color:#fff; border-radius:20px; padding:8px 14px; font-size:12px; font-weight:600; cursor:pointer; font-family:inherit; white-space:nowrap; }

        .urgency-bar { display:flex; justify-content:center; align-items:center; gap:8px; padding:10px 20px; background:linear-gradient(90deg,#3a0ea0,#7c3aed,#3a0ea0); font-size:12px; font-weight:700; color:#fff; flex-wrap:wrap; text-align:center; }

        .hero { padding:30px 24px 50px; position:relative; overflow:hidden; background:#000; }
        .hero-content { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:30px; align-items:center; }
        .logo { display:flex; align-items:center; gap:10px; font-size:40px; font-weight:800; letter-spacing:-1px; margin-bottom:6px; }
        .logo-icon { width:44px; height:44px; background:linear-gradient(135deg,#7c3aed,#a78bfa); border-radius:10px; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; }
        .logo-icon::before { content:''; position:absolute; width:18px; height:28px; background:#000; border-radius:0 8px 8px 0; left:3px; }
        .logo-icon::after { content:''; position:absolute; width:12px; height:12px; background:#000; border-radius:50%; right:5px; top:50%; transform:translateY(-50%); }
        .logo-text-barber { color:#fff; }
        .logo-text-os { color:#8b5cf6; }
        .tagline { font-size:11px; font-weight:600; letter-spacing:2.5px; text-transform:uppercase; color:#6b7280; }
        .tagline span { color:#8b5cf6; }
        .hero-title { font-size:32px; font-weight:700; line-height:1.15; margin-bottom:14px; color:#fff; }
        .hero-title .highlight { color:#8b5cf6; }
        .hero-desc { font-size:15px; line-height:1.55; color:#9ca3af; margin-bottom:28px; max-width:400px; }
        .hero-features { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
        .hero-feature { text-align:center; }
        .hero-feature-icon { width:40px; height:40px; margin:0 auto 6px; border-radius:10px; background:rgba(139,92,246,0.08); border:1px solid rgba(139,92,246,0.15); display:flex; align-items:center; justify-content:center; }
        .hero-feature-icon svg { width:18px; height:18px; stroke:#8b5cf6; stroke-width:1.5; fill:none; }
        .hero-feature-text { font-size:11px; font-weight:500; color:#d1d5db; }

        .phone-mockups { position:relative; display:flex; justify-content:center; align-items:flex-end; min-height:480px; }
        .phone { width:210px; height:420px; background:#111; border-radius:24px; border:2px solid #222; position:relative; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,.9),0 0 80px rgba(124,58,237,.12); }
        .phone-back { position:absolute; right:30px; bottom:20px; transform:scale(.92) rotate(3deg); z-index:1; opacity:.85; }
        .phone-front { position:relative; z-index:2; margin-right:60px; }
        .phone-notch { position:absolute; top:0; left:50%; transform:translateX(-50%); width:90px; height:22px; background:#111; border-radius:0 0 12px 12px; z-index:10; }
        .phone-screen { padding:28px 12px 10px; height:100%; display:flex; flex-direction:column; }
        .phone-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding:0 4px; }
        .phone-time { font-size:10px; font-weight:600; color:#fff; }
        .phone-title { font-size:15px; font-weight:700; margin-bottom:10px; padding:0 4px; }
        .dash-card { background:linear-gradient(135deg,#6d28d9,#7c3aed,#8b5cf6); border-radius:12px; padding:12px; margin-bottom:8px; position:relative; overflow:hidden; }
        .dash-card::after { content:''; position:absolute; top:-20px; right:-20px; width:80px; height:80px; background:rgba(255,255,255,.05); border-radius:50%; }
        .dash-card-label { font-size:9px; opacity:.75; margin-bottom:3px; }
        .dash-card-amount { font-size:22px; font-weight:700; margin-bottom:3px; }
        .dash-card-change { font-size:9px; opacity:.7; }
        .dash-stats { display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-bottom:8px; }
        .dash-stat { background:#1a1a1a; border-radius:8px; padding:8px; }
        .dash-stat-label { font-size:8px; color:#6b7280; margin-bottom:3px; }
        .dash-stat-value { font-size:16px; font-weight:700; }
        .dash-stat-change { font-size:9px; color:#4ade80; font-weight:500; }
        .dash-stat-change.neg { color:#f87171; }
        .dash-next { background:#1a1a1a; border-radius:8px; padding:8px; margin-bottom:8px; }
        .dash-next-label { font-size:8px; color:#6b7280; margin-bottom:4px; }
        .dash-next-person { display:flex; align-items:center; gap:6px; }
        .dash-next-avatar { width:24px; height:24px; border-radius:50%; background:linear-gradient(135deg,#4b5563,#6b7280); display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:600; color:#fff; flex-shrink:0; }
        .dash-next-name { font-size:10px; font-weight:600; }
        .dash-next-service { font-size:8px; color:#6b7280; }
        .dash-next-time { font-size:8px; color:#a78bfa; flex-shrink:0; }
        .phone-nav { display:flex; justify-content:space-around; padding:6px 0; border-top:1px solid #222; margin-top:auto; }
        .phone-nav-item { display:flex; flex-direction:column; align-items:center; gap:1px; }
        .phone-nav-item svg { width:14px; height:14px; stroke:#8b5cf6; stroke-width:1.5; fill:none; }
        .phone-nav-item span { font-size:7px; color:#8b5cf6; }
        .phone-nav-item.inactive svg { stroke:#4b5563; }
        .phone-nav-item.inactive span { color:#4b5563; }

        .agenda-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding:0 4px; }
        .agenda-title { font-size:15px; font-weight:700; }
        .agenda-days { display:flex; gap:5px; margin-bottom:12px; padding:0 2px; }
        .agenda-day { flex:1; text-align:center; padding:6px 2px; border-radius:8px; background:#1a1a1a; }
        .agenda-day.active { background:#7c3aed; }
        .agenda-day-name { font-size:8px; color:#6b7280; margin-bottom:1px; }
        .agenda-day.active .agenda-day-name { color:rgba(255,255,255,.7); }
        .agenda-day-num { font-size:13px; font-weight:700; }
        .agenda-list { display:flex; flex-direction:column; gap:6px; padding:0 2px; }
        .agenda-item { display:flex; align-items:center; gap:8px; padding:6px; border-radius:8px; }
        .agenda-item.active { background:#5b21b6; }
        .agenda-item-time { font-size:9px; color:#6b7280; width:28px; flex-shrink:0; }
        .agenda-item.active .agenda-item-time { color:rgba(255,255,255,.7); }
        .agenda-item-name { font-size:10px; font-weight:600; }
        .agenda-item-service { font-size:8px; color:#6b7280; }
        .agenda-item.active .agenda-item-service { color:rgba(255,255,255,.6); }
        .agenda-add { background:#1a1a1a; border:1px dashed #374151; border-radius:8px; padding:8px; text-align:center; font-size:10px; color:#8b5cf6; margin-top:auto; }

        .section-divider { height:1px; background:#1a1a1a; margin:0 20px; }
        .features-section { padding:0 20px 50px; }
        .features-grid { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
        .feature-card { background:#0a0a0a; border:1px solid #1a1a1a; border-radius:14px; padding:16px; text-align:center; }
        .feature-card-title { font-size:15px; font-weight:600; margin-bottom:12px; text-align:left; }
        .feature-card-title .highlight { color:#8b5cf6; }
        .feature-card-image { width:100%; aspect-ratio:3/4; background:#111; border-radius:10px; margin-bottom:10px; overflow:hidden; position:relative; }
        .feature-card-desc { font-size:11px; line-height:1.5; color:#6b7280; text-align:left; }

        .mock-booking { padding:10px; text-align:left; }
        .mock-profile { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
        .mock-avatar { width:32px; height:32px; border-radius:50%; background:linear-gradient(135deg,#374151,#4b5563); display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:600; color:#fff; flex-shrink:0; }
        .mock-profile-info h4 { font-size:11px; font-weight:600; }
        .mock-profile-info p { font-size:8px; color:#6b7280; }
        .mock-rating { display:flex; align-items:center; gap:2px; margin-bottom:10px; }
        .mock-rating svg { width:9px; height:9px; fill:#fbbf24; }
        .mock-rating span { font-size:9px; color:#6b7280; margin-left:3px; }
        .mock-label { font-size:9px; color:#6b7280; margin-bottom:6px; }
        .mock-service { display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #222; font-size:10px; }
        .mock-service:last-child { border-bottom:none; }
        .mock-btn { background:#5b21b6; color:#fff; border:none; border-radius:6px; padding:8px; width:100%; font-size:10px; font-weight:600; cursor:pointer; }
        .mock-qr { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; padding:14px; }
        .mock-qr-text { font-size:11px; font-weight:600; text-align:center; margin-bottom:10px; line-height:1.4; white-space:pre-line; }
        .mock-qr-code { width:90px; height:90px; background:#fff; border-radius:6px; margin-bottom:10px; position:relative; overflow:hidden; padding:8px; }
        .qr-pattern { width:100%; height:100%; background-image:linear-gradient(to right,#000 2px,transparent 2px),linear-gradient(to bottom,#000 2px,transparent 2px); background-size:8px 8px; }
        .mock-qr-logo { width:20px; height:20px; background:#000; border-radius:3px; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); display:flex; align-items:center; justify-content:center; }
        .mock-qr-logo::after { content:'B'; color:#fff; font-size:12px; font-weight:800; }
        .mock-qr-sub { font-size:9px; color:#6b7280; text-align:center; }
        .mock-clients { padding:10px; text-align:left; }
        .mock-clients h4 { font-size:13px; font-weight:600; margin-bottom:10px; }
        .mock-search { background:#1a1a1a; border-radius:6px; padding:6px 8px; display:flex; align-items:center; gap:5px; margin-bottom:10px; }
        .mock-search svg { width:10px; height:10px; stroke:#4b5563; fill:none; }
        .mock-search span { font-size:9px; color:#4b5563; }
        .mock-client-item { display:flex; align-items:center; gap:6px; margin-bottom:6px; }
        .mock-client-avatar { width:24px; height:24px; border-radius:50%; background:linear-gradient(135deg,#374151,#4b5563); display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:600; color:#fff; flex-shrink:0; }
        .mock-client-name { font-size:10px; font-weight:500; }
        .mock-client-last { font-size:8px; color:#4b5563; }
        .mock-revenue { padding:10px; text-align:left; }
        .mock-revenue-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
        .mock-revenue-header h4 { font-size:11px; font-weight:600; }
        .mock-revenue-header span { font-size:9px; color:#6b7280; }
        .mock-revenue-amount { font-size:22px; font-weight:700; margin-bottom:3px; }
        .mock-revenue-change { font-size:10px; color:#4ade80; margin-bottom:12px; }
        .mock-chart { height:50px; }
        .mock-chart svg { width:100%; height:100%; }
        .mock-chart-labels { display:flex; justify-content:space-between; margin-top:3px; }
        .mock-chart-labels span { font-size:7px; color:#4b5563; }

        .benefits-section { padding:50px 20px; text-align:center; }
        .benefits-title { font-size:26px; font-weight:700; margin-bottom:36px; }
        .benefits-title .highlight { color:#8b5cf6; }
        .benefits-grid { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(5,1fr); gap:20px; }
        .benefit-item { text-align:center; }
        .benefit-icon { width:48px; height:48px; margin:0 auto 12px; border-radius:50%; background:rgba(139,92,246,.06); border:1px solid rgba(139,92,246,.12); display:flex; align-items:center; justify-content:center; }
        .benefit-icon svg { width:20px; height:20px; stroke:#8b5cf6; stroke-width:1.5; fill:none; }
        .benefit-title { font-size:13px; font-weight:600; margin-bottom:6px; }
        .benefit-desc { font-size:11px; line-height:1.5; color:#6b7280; }

        .cta-section { padding:0 20px 50px; }
        .cta-grid { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; align-items:stretch; }
        .cta-left { position:relative; border-radius:14px; overflow:hidden; min-height:320px; display:flex; flex-direction:column; justify-content:flex-start; padding:28px; }
        .cta-left-bg { position:absolute; top:0; left:0; right:0; bottom:0; background:url('data:image/jpeg;base64,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') center/cover no-repeat; z-index:0; }
        .cta-left-bg::after { content:''; position:absolute; top:0; left:0; right:0; bottom:0; background:linear-gradient(to right,rgba(0,0,0,.85),rgba(0,0,0,.4) 50%,rgba(0,0,0,.2)); }
        .cta-left h2 { position:relative; z-index:1; font-size:26px; font-weight:700; line-height:1.2; white-space:pre-line; }
        .cta-left .highlight { color:#8b5cf6; }
        .cta-center { background:#0a0a0a; border:1px solid #1a1a1a; border-radius:14px; padding:28px; display:flex; flex-direction:column; justify-content:center; }
        .cta-center h3 { font-size:16px; font-weight:600; margin-bottom:18px; line-height:1.4; }
        .cta-checklist { list-style:none; margin-bottom:20px; }
        .cta-checklist li { display:flex; align-items:center; gap:8px; margin-bottom:10px; font-size:13px; color:#d1d5db; }
        .cta-checklist li svg { width:16px; height:16px; stroke:#8b5cf6; stroke-width:2.5; fill:none; flex-shrink:0; }
        .cta-right { background:#0a0a0a; border:1px solid #1a1a1a; border-radius:14px; padding:28px; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; }
        .cta-rating { font-size:28px; font-weight:700; margin-bottom:6px; }
        .cta-stars { display:flex; gap:3px; margin-bottom:6px; }
        .cta-stars svg { width:18px; height:18px; fill:#7c3aed; }
        .cta-review-count { font-size:11px; color:#6b7280; margin-bottom:16px; }
        .cta-avatars { display:flex; margin-bottom:10px; }
        .cta-avatar { width:32px; height:32px; border-radius:50%; background:linear-gradient(135deg,#374151,#4b5563); border:2px solid #0a0a0a; margin-left:-6px; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:600; color:#fff; }
        .cta-avatar:first-child { margin-left:0; }
        .cta-quote { font-size:12px; color:#8b5cf6; font-weight:500; white-space:pre-line; }

        .footer { padding:20px; border-top:1px solid #1a1a1a; }
        .footer-content { max-width:1100px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; }
        .footer-logo { display:flex; align-items:center; gap:6px; font-size:16px; font-weight:700; }
        .footer-logo-icon { width:24px; height:24px; background:linear-gradient(135deg,#7c3aed,#a78bfa); border-radius:5px; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; }
        .footer-logo-icon::before { content:''; position:absolute; width:8px; height:14px; background:#000; border-radius:0 4px 4px 0; left:2px; }
        .footer-logo-icon::after { content:''; position:absolute; width:6px; height:6px; background:#000; border-radius:50%; right:3px; top:50%; transform:translateY(-50%); }
        .footer-links { display:flex; gap:24px; flex-wrap:wrap; }
        .footer-link { display:flex; align-items:center; gap:6px; font-size:10px; color:#4b5563; }
        .footer-link svg { width:14px; height:14px; stroke:#6b7280; stroke-width:1.5; fill:none; }
        .footer-link strong { color:#9ca3af; display:block; margin-bottom:1px; font-size:10px; }
        .footer-url { color:#8b5cf6; font-size:13px; font-weight:600; text-decoration:none; }


        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#000; }
        ::-webkit-scrollbar-thumb { background:#222; border-radius:2px; }

        /* ===== ZELFDE LAYOUT OP ALLE SCHERMEN ===== */
        html { font-size: clamp(10px, 1.4vw, 16px); }
        body { min-width: 320px; overflow-x: auto; }
        .hero-content { grid-template-columns:1fr 1fr !important; }
        .features-grid { grid-template-columns:repeat(4,1fr) !important; }
        .benefits-grid { grid-template-columns:repeat(5,1fr) !important; }
        .cta-grid { grid-template-columns:1fr 1fr 1fr !important; }
        .phone-back { display:block !important; }




      `}</style>

      {/* URGENCY BAR */}
      <div className="urgency-bar">
        {c.urgency} <Countdown/>
      </div>

      {/* TOP BAR */}
      <div className="top-bar">
        <div className="top-bar-right">
          <button className="lang-btn" onClick={() => setLang(lang==="nl"?"en":"nl")}>{c.langBtn}</button>
          <button className="top-btn">
            <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </button>
          <button className="top-btn">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
          </button>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <div className="logo-section">
              <div className="logo">
                <div className="logo-icon"></div>
                <span className="logo-text-barber">Barber</span><span className="logo-text-os">OS</span>
              </div>
              <div className="tagline">
                {c.tagline1} <span>{c.tagline2}</span>{c.tagline3} <span>{c.tagline4}</span>{c.tagline5} <span>{c.tagline6}</span>{c.tagline7}
              </div>
            </div>
            <h1 className="hero-title">
              {c.heroTitle1}<br/>
              {c.heroTitle2}<span className="highlight">{c.heroAccent}</span>{c.heroTitle3}
            </h1>
            <p className="hero-desc">{c.heroDesc}</p>
            <div className="hero-features">
              {[
                <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>,
                <svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
                <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg>,
              ].map((icon, i) => (
                <div key={i} className="hero-feature">
                  <div className="hero-feature-icon">{icon}</div>
                  <div className="hero-feature-text">{c.features[i]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* PHONES */}
          <div className="phone-mockups" style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:480}}>
            <img src="/phones.jpg" alt="BarberOS Dashboard en Agenda app" style={{maxWidth:"100%",maxHeight:500,objectFit:"contain",filter:"drop-shadow(0 20px 80px rgba(124,58,237,0.55))"}}/>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* FEATURES */}
      <section className="features-section">
        <div className="features-grid">
          {/* Booking link */}
          <div className="feature-card">
            <div className="feature-card-title">{c.feat1}<span className="highlight">{c.feat1acc}</span>{c.feat1end}</div>
            <div className="feature-card-image">
              <div className="mock-booking">
                <div className="mock-profile">
                  <div className="mock-avatar">J</div>
                  <div className="mock-profile-info"><h4>Jay</h4><p>Specialist in fades & beards</p></div>
                </div>
                <div className="mock-rating">
                  {[1,2,3,4,5].map(i=><svg key={i} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                  <span>4.9 (128)</span>
                </div>
                <div className="mock-label">{lang==="nl"?"Kies een dienst":"Choose a service"}</div>
                <div>
                  {[[c.service1,"€25"],[c.service2,"€35"],[c.service3,"€20"]].map(([s,p],i)=>(
                    <div key={i} className="mock-service"><span>{s}</span><span style={{color:"#9ca3af"}}>{p}</span></div>
                  ))}
                </div>
                <button className="mock-btn">{c.chooseTime}</button>
              </div>
            </div>
            <div className="feature-card-desc">{c.feat1desc}</div>
          </div>

          {/* QR */}
          <div className="feature-card">
            <div className="feature-card-title">{c.feat2}<span className="highlight">{c.feat2acc}</span></div>
            <div className="feature-card-image" style={{padding:0,overflow:"hidden",borderRadius:10}}>
              <img src="/qr.jpg" alt="BarberOS QR standaard" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}}/>
            </div>
            <div className="feature-card-desc">{c.feat2desc}</div>
          </div>

          {/* Clients */}
          <div className="feature-card">
            <div className="feature-card-title">{c.feat3}<span className="highlight">{c.feat3acc}</span></div>
            <div className="feature-card-image">
              <div className="mock-clients">
                <h4>{c.clientsTitle}</h4>
                <div className="mock-search">
                  <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <span>{c.zoekClient}</span>
                </div>
                {c.clients.map(([av,name,last],i)=>(
                  <div key={i} className="mock-client-item">
                    <div className="mock-client-avatar">{av}</div>
                    <div><div className="mock-client-name">{name}</div><div className="mock-client-last">{lang==="nl"?"Laatste afspraak:":"Last visit:"} {last}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="feature-card-desc">{c.feat3desc}</div>
          </div>

          {/* Revenue */}
          <div className="feature-card">
            <div className="feature-card-title">{c.feat4}<span className="highlight">{c.feat4acc}</span></div>
            <div className="feature-card-image">
              <div className="mock-revenue">
                <div className="mock-revenue-header"><h4>{c.omzetOverzicht}</h4><span>{c.dezeMaand} ▾</span></div>
                <div className="mock-revenue-amount">€4.680</div>
                <div className="mock-revenue-change">+24% {lang==="nl"?"vs vorige maand":"vs last month"}</div>
                <div className="mock-chart">
                  <svg viewBox="0 0 200 50" preserveAspectRatio="none">
                    <defs><linearGradient id="cg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25"/><stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/></linearGradient></defs>
                    <path d="M0,42 Q20,40 35,36 T70,30 T105,22 T140,14 T175,8 T200,4 L200,50 L0,50 Z" fill="url(#cg)"/>
                    <path d="M0,42 Q20,40 35,36 T70,30 T105,22 T140,14 T175,8 T200,4" fill="none" stroke="#7c3aed" strokeWidth="2"/>
                    <circle cx="200" cy="4" r="3" fill="#7c3aed"/>
                  </svg>
                </div>
                <div className="mock-chart-labels"><span>1</span><span>6</span><span>11</span><span>16</span><span>21</span><span>26</span><span>31</span></div>
              </div>
            </div>
            <div className="feature-card-desc">{c.feat4desc}</div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* BENEFITS */}
      <section className="benefits-section">
        <h2 className="benefits-title">{c.benefitsTitle1}<span className="highlight">{c.benefitsAcc}</span></h2>
        <div className="benefits-grid">
          {[
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
            <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
            <svg viewBox="0 0 24 24"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>,
            <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
            <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
          ].map((icon,i) => (
            <div key={i} className="benefit-item">
              <div className="benefit-icon">{icon}</div>
              <div className="benefit-title">{c.benefits[i].title}</div>
              <div className="benefit-desc">{c.benefits[i].desc}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider"></div>

      {/* CTA + CHAIR */}
      <section className="cta-section">
        <div className="cta-grid">
          <div className="cta-left">
            <div className="cta-left-bg"></div>

            <h2>{c.chairH}<span className="highlight">{c.chairAcc}</span></h2>
          </div>
          <div className="cta-center">
            <h3>{c.ctaH}</h3>
            <ul className="cta-checklist">
              {c.checks.map((ch,i)=>(
                <li key={i}>
                  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  {ch}
                </li>
              ))}
            </ul>
            <EmailForm c={c}/>
          </div>
          <div className="cta-right">
            <div className="cta-rating">4.9/5</div>
            <div className="cta-stars">
              {[1,2,3,4,5].map(i=><svg key={i} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
            </div>
            <div className="cta-review-count">{c.ratingCount}</div>
            <div className="cta-avatars">
              {["D","M","R","B"].map((av,i)=><div key={i} className="cta-avatar">{av}</div>)}
            </div>
            <div className="cta-quote">{c.barbersSay}</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="footer-logo-icon"></div>
            <span>Barber<span style={{color:"#8b5cf6"}}>OS</span></span>
          </div>
          <div className="footer-links">
            {[
              [<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, c.footer1h, c.footer1s],
              [<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, c.footer2h, c.footer2s],
              [<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>, c.footer3h, c.footer3s],
            ].map(([icon,h,s],i)=>(
              <div key={i} className="footer-link">
                {icon}<div><strong>{h}</strong>{s}</div>
              </div>
            ))}
          </div>
          <a href="#" className="footer-url">getbarberos.com</a>
        </div>
      </footer>

    </>
  );
}
