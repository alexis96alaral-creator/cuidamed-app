import { useState } from "react";
import EnfermeroPortal from "./Enfermero.jsx";
import "./index.css";

const C = {
  navy: "#1B3A5C", teal: "#2AABB0", tealLight: "#3BBFC4", tealDark: "#1D8A8F",
  bg: "#F4F8F9", bgAlt: "#EAF4F5", white: "#FFFFFF", text: "#1A1A2E",
  muted: "#6B7E8F", border: "#C8DDE0", accent: "#E8F6F7",
};

const WA_NUMBER = "59174510892";

const SERVICIOS = [
  { icon: "💉", title: "Inyecciones y sueros",          desc: "Aplicación de inyecciones intramusculares, subcutáneas y endovenosas. Colocación y mantenimiento de catéteres y sueros en domicilio." },
  { icon: "🩹", title: "Curación de heridas",           desc: "Limpieza, desinfección y cambio de vendajes en heridas quirúrgicas, úlceras por presión y lesiones crónicas." },
  { icon: "📊", title: "Control de signos vitales",     desc: "Medición de presión arterial, temperatura, frecuencia cardíaca, saturación de oxígeno y glucemia. Reporte al médico tratante." },
  { icon: "💊", title: "Administración de medicamentos", desc: "Suministro correcto y puntual de medicamentos según prescripción médica. Control de dosis y horarios." },
  { icon: "🛁", title: "Higiene y movilización",        desc: "Baño, aseo personal y cambio de ropa a pacientes encamados. Cambios posturales y apoyo en traslados." },
  { icon: "👴", title: "Cuidado de adulto mayor",       desc: "Acompañamiento integral: alimentación, medicación, estimulación cognitiva y supervisión continua. Turno diurno o nocturno." },
  { icon: "👶", title: "Cuidado neonatal y pediátrico", desc: "Atención a recién nacidos y niños: control de peso, nebulizaciones, orientación en lactancia y seguimiento del desarrollo." },
  { icon: "🏥", title: "Cuidados post-operatorios",     desc: "Recuperación en casa tras cirugías: control de herida, antibióticos, detección de complicaciones." },
  { icon: "🚗", title: "Acompañamiento hospitalario",   desc: "Enfermero presente durante internaciones, estudios o consultas. Intermediación con el equipo médico." },
];

const nurses = [
  { id: 1, name: "Lic. María Fernández", specialty: "Cuidado adulto mayor",     zone: "Equipetrol", rating: 4.9, reviews: 38, price: 150, available: true,  exp: "8 años",  avatar: "MF", color: C.teal,     trabajo: "Hospital Percy Boland · SCZ" },
  { id: 2, name: "Lic. Carlos Suárez",   specialty: "Enfermería general",       zone: "Norte",      rating: 4.8, reviews: 21, price: 130, available: true,  exp: "5 años",  avatar: "CS", color: C.navy,     trabajo: "Clínica del Norte · SCZ" },
  { id: 3, name: "Lic. Valeria Torrico", specialty: "Pediatría domiciliaria",   zone: "Plan 3000",  rating: 5.0, reviews: 54, price: 170, available: false, exp: "10 años", avatar: "VT", color: C.tealDark, trabajo: "Hospital de la Mujer · SCZ" },
  { id: 4, name: "Lic. Jorge Méndez",   specialty: "Post-operatorio",           zone: "Radial 26",  rating: 4.7, reviews: 17, price: 160, available: true,  exp: "6 años",  avatar: "JM", color: "#2D6A8A",  trabajo: "Clínica Los Olivos · SCZ" },
];

const zones    = ["Todas las zonas", "Equipetrol", "Norte", "Plan 3000", "Radial 26"];
const services = ["Todos los servicios", "Cuidado adulto mayor", "Enfermería general", "Pediatría domiciliaria", "Post-operatorio"];

/* ── Icons ── */
function WAIcon({ size = 20, color = "white" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function LogoIcon({ size = 32, white = false }) {
  const f  = white ? "#FFFFFF" : C.teal;
  const f2 = white ? "rgba(255,255,255,0.7)" : C.navy;
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="10" r="7" fill={f}/>
      <path d="M10 28C10 18 20 14 30 22C40 14 50 18 50 28C50 40 30 52 30 52C30 52 10 40 10 28Z" fill={f} opacity=".85"/>
      <rect x="24" y="30" width="12" height="10" rx="1" fill={f2} opacity=".9"/>
      <path d="M22 31L30 24L38 31" stroke={f2} strokeWidth="2" fill="none" strokeLinejoin="round"/>
      <rect x="27.5" y="34" width="5" height="6" rx=".5" fill={white?"rgba(255,255,255,.4)":C.accent}/>
    </svg>
  );
}

function buildWhatsAppURL({ nurse, nombre, telefono, fecha, descripcion }) {
  const msg = [
    "🏥 *Nueva solicitud CuidaMed*","",
    `👤 *Paciente:* ${nombre||"No indicado"}`,
    `📱 *Teléfono:* ${telefono||"No indicado"}`, "",
    `🩺 *Enfermero:* ${nurse.name}`,
    `📋 *Especialidad:* ${nurse.specialty}`,
    `📍 *Zona:* ${nurse.zone}`,
    `💰 *Precio:* Bs. ${nurse.price}`, "",
    `📅 *Fecha:* ${fecha||"A coordinar"}`,
    `📝 *Descripción:* ${descripcion||"Sin descripción"}`, "",
    "_Enviado desde alaralcuidamed.com_",
  ].join("\n");
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function buildDirectWA() {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola CuidaMed, necesito información sobre sus servicios de enfermería.")}`;
}

/* ── App ── */
export default function App() {
  const [page, setPage]               = useState("home");
  const [selectedZone, setZone]       = useState("Todas las zonas");
  const [selectedService, setSvc]     = useState("Todos los servicios");
  const [selectedNurse, setNurse]     = useState(null);
  const [booked, setBooked]           = useState(false);
  const [form, setForm]               = useState({ nombre:"", telefono:"", fecha:"", descripcion:"" });

  const filtered = nurses.filter(n =>
    (selectedZone    === "Todas las zonas"      || n.zone      === selectedZone) &&
    (selectedService === "Todos los servicios"  || n.specialty === selectedService)
  );

  function handleConfirmar() {
    if (!form.nombre || !form.telefono) { alert("Por favor completá tu nombre y teléfono."); return; }
    window.open(buildWhatsAppURL({ nurse: selectedNurse, ...form }), "_blank");
    setBooked(true);
  }

  function go(p) { setPage(p); window.scrollTo(0,0); }

  return (
    <div style={{ background: C.bg, minHeight:"100vh", color: C.text }}>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => go("home")}>
          <LogoIcon size={30} white />
          <span className="nav-logo-text">
            <span style={{ color: C.white }}>Cuida</span>
            <span style={{ color: C.teal  }}>Med</span>
          </span>
        </div>

        {/* Desktop links */}
        <div className="nav-links">
          {[["home","Inicio"],["search","Buscar"],["servicios","Servicios"],["about","Quiénes somos"]].map(([p,lbl]) => (
            <span key={p} onClick={() => go(p)} style={{ color: page===p ? C.white : "rgba(255,255,255,0.7)", fontSize:"0.875rem", cursor:"pointer", fontWeight: page===p?"700":"400" }}>{lbl}</span>
          ))}
          <a href={buildDirectWA()} target="_blank" rel="noreferrer" className="nav-wa">
            <WAIcon size={15}/> Contactar
          </a>
        </div>

        {/* Mobile: only WA button */}
        <a href={buildDirectWA()} target="_blank" rel="noreferrer" className="nav-wa" style={{ display:"flex" }}>
          <WAIcon size={15}/> <span style={{ marginLeft:"4px" }}>WhatsApp</span>
        </a>
      </nav>

      {/* ── PAGES ── */}
      <div className="page-content">

        {/* HOME */}
        {page === "home" && (
          <>
            {/* Hero — mobile first: everything above fold */}
            <section className="hero">
              <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"220px", height:"220px", borderRadius:"50%", background:"rgba(42,171,176,0.08)", pointerEvents:"none" }}/>
              <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"160px", height:"160px", borderRadius:"50%", background:"rgba(42,171,176,0.06)", pointerEvents:"none" }}/>

              <div className="hero-layout">
                {/* Nuti mascot — LEFT */}
                <div className="hero-nuti">
                  <img src="/nuti_hero.png" alt="Nuti, mascota de CuidaMed" className="nuti-img" />
                </div>
                {/* Text content — RIGHT */}
                <div className="hero-inner">
                  <div className="hero-badge">Santa Cruz de la Sierra · Bolivia</div>
                  <h1 className="hero-title">
                    Enfermería profesional<br/>
                    <span>en tu hogar</span>
                  </h1>
                  <p className="hero-sub">
                    Enfermeros certificados y verificados en Santa Cruz. Rápido, seguro y con calificaciones reales.
                  </p>
                  <button className="hero-btn" onClick={() => go("search")}>
                    Encontrar un enfermero →
                  </button>
                </div>
              </div>
            </section>

            {/* Stats */}
            <div className="stats-bar">
              {[["48+","Enfermeros","🩺"],["4.9★","Calificación","⭐"],["500+","Servicios","✅"],["< 2h","Respuesta","⚡"]].map(([n,l,icon]) => (
                <div key={l} className="stat-item">
                  <div className="stat-icon">{icon}</div>
                  <div className="stat-num">{n}</div>
                  <div className="stat-label">{l}</div>
                </div>
              ))}
            </div>

            {/* Servicios preview */}
            <div className="section" style={{ background: C.white }}>
              <div style={{ textAlign:"center", marginBottom:"1.25rem" }}>
                <div style={{ display:"inline-block", background:C.accent, color:C.tealDark, borderRadius:"100px", padding:"0.25rem 0.9rem", fontSize:"0.68rem", letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:"700", marginBottom:"0.5rem" }}>Nuestros servicios</div>
                <h2 className="section-title">¿Qué hacemos?</h2>
                <p className="section-sub">Atención profesional de enfermería en tu hogar</p>
              </div>
              <div className="services-grid">
                {SERVICIOS.map((s,i) => (
                  <div key={i} style={{ background:C.bg, borderRadius:"12px", padding:"1.1rem", border:`1px solid ${C.border}`, display:"flex", gap:"0.85rem", alignItems:"flex-start" }}>
                    <div style={{ fontSize:"1.5rem", flexShrink:0 }}>{s.icon}</div>
                    <div>
                      <div style={{ fontWeight:"700", color:C.navy, fontSize:"0.88rem", marginBottom:"0.25rem" }}>{s.title}</div>
                      <div style={{ color:C.muted, fontSize:"0.75rem", lineHeight:1.6 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign:"center", marginTop:"1.5rem" }}>
                <button onClick={() => go("search")} style={{ background:C.teal, color:C.white, border:"none", borderRadius:"8px", padding:"0.85rem 2rem", fontSize:"0.9rem", fontWeight:"700", cursor:"pointer", boxShadow:"0 4px 16px rgba(42,171,176,0.3)", width:"100%", maxWidth:"320px" }}>
                  Solicitar un enfermero →
                </button>
              </div>
            </div>

            {/* Cómo funciona */}
            <div className="section" style={{ background:C.bgAlt, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, textAlign:"center" }}>
              <h2 className="section-title">¿Cómo funciona?</h2>
              <p className="section-sub">Tres pasos simples para recibir atención en casa</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                {[["🔍","Buscá un enfermero","Filtrá por zona y especialidad."],["📋","Completá el formulario","Ingresá tus datos y describí qué necesitás."],["💬","Confirmá por WhatsApp","Se abre WhatsApp directo con CuidaMed. Coordinamos todo."]].map(([icon,t,d],i) => (
                  <div key={i} style={{ background:C.white, borderRadius:"12px", padding:"1.25rem", border:`1px solid ${C.border}`, display:"flex", gap:"1rem", alignItems:"flex-start", textAlign:"left" }}>
                    <div style={{ width:"36px", height:"36px", background:C.teal, color:C.white, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.85rem", fontWeight:"800", flexShrink:0 }}>{i+1}</div>
                    <div>
                      <div style={{ fontWeight:"700", color:C.navy, fontSize:"0.9rem", marginBottom:"0.2rem" }}>{t}</div>
                      <div style={{ color:C.muted, fontSize:"0.78rem", lineHeight:1.55 }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WA banner */}
            <div className="section" style={{ background:`linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, textAlign:"center" }}>
              <h2 style={{ color:C.white, fontSize:"1.2rem", fontWeight:"800", marginBottom:"0.5rem" }}>¿Sos enfermero/a en Santa Cruz?</h2>
              <p style={{ color:"rgba(255,255,255,0.82)", marginBottom:"1.25rem", fontSize:"0.82rem" }}>Unite a CuidaMed y conseguí clientes de forma constante.</p>
              <a href={buildDirectWA()} target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:C.white, color:C.tealDark, borderRadius:"8px", padding:"0.8rem 1.5rem", fontSize:"0.88rem", fontWeight:"700", textDecoration:"none" }}>
                <WAIcon size={16} color={C.tealDark}/> Registrarme por WhatsApp
              </a>
            </div>
          </>
        )}

        {/* BUSCAR */}
        {page === "search" && (
          <div className="section">
            <h2 className="section-title">Encontrá tu enfermero</h2>
            <p className="section-sub">Filtrá por zona y tipo de servicio</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem", marginBottom:"1.5rem" }}>
              {[[zones,selectedZone,setZone],[services,selectedService,setSvc]].map(([opts,val,setter],i) => (
                <select key={i} value={val} onChange={e => setter(e.target.value)} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:"8px", padding:"0.75rem 1rem", fontSize:"0.9rem", color:C.text, outline:"none", width:"100%" }}>
                  {opts.map(o => <option key={o}>{o}</option>)}
                </select>
              ))}
            </div>
            {filtered.length === 0 ? (
              <div style={{ textAlign:"center", color:C.muted, padding:"3rem 0" }}>
                <div style={{ fontSize:"2.5rem", marginBottom:"1rem" }}>🔍</div>
                No hay enfermeros con esos filtros.
              </div>
            ) : (
              <div className="cards-grid">
                {filtered.map(n => (
                  <NurseCard key={n.id} nurse={n} onSelect={() => { setNurse(n); setBooked(false); setForm({ nombre:"", telefono:"", fecha:"", descripcion:"" }); }}/>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SERVICIOS */}
        {page === "servicios" && (
          <div>
            <div style={{ background:`linear-gradient(135deg, ${C.navy} 0%, #1D5070 60%, ${C.tealDark} 100%)`, padding:"3rem 1.25rem 2.5rem", textAlign:"center" }}>
              <h1 style={{ color:C.white, fontSize:"1.6rem", fontWeight:"800", lineHeight:1.2, marginBottom:"0.75rem" }}>
                Nuestros servicios de<br/><span style={{ color:C.teal }}>enfermería a domicilio</span>
              </h1>
              <p style={{ color:"rgba(255,255,255,0.72)", fontSize:"0.85rem", maxWidth:"500px", margin:"0 auto", lineHeight:1.7 }}>
                Todos los servicios son realizados por enfermeros licenciados y verificados en Santa Cruz.
              </p>
            </div>
            <div className="section">
              <div className="services-grid" style={{ marginBottom:"2rem" }}>
                {SERVICIOS.map((s,i) => (
                  <div key={i} style={{ background:C.white, borderRadius:"14px", padding:"1.5rem", border:`1px solid ${C.border}`, boxShadow:"0 2px 8px rgba(27,58,92,0.05)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.85rem", marginBottom:"0.75rem" }}>
                      <div style={{ width:"44px", height:"44px", borderRadius:"10px", background:C.accent, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem", flexShrink:0 }}>{s.icon}</div>
                      <div style={{ fontWeight:"800", color:C.navy, fontSize:"0.9rem", lineHeight:1.3 }}>{s.title}</div>
                    </div>
                    <p style={{ color:C.muted, fontSize:"0.78rem", lineHeight:1.7, marginBottom:"1rem" }}>{s.desc}</p>
                    <a href={buildDirectWA()} target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:"6px", background:"#25D366", color:C.white, borderRadius:"7px", padding:"0.55rem 0.9rem", fontSize:"0.75rem", fontWeight:"700", textDecoration:"none" }}>
                      <WAIcon size={13}/> Consultar
                    </a>
                  </div>
                ))}
              </div>
              <div style={{ background:`linear-gradient(135deg, ${C.navy}, #1D5070)`, borderRadius:"16px", padding:"2rem", textAlign:"center" }}>
                <h2 style={{ color:C.white, fontSize:"1.1rem", fontWeight:"800", marginBottom:"0.5rem" }}>¿No encontrás lo que buscás?</h2>
                <p style={{ color:"rgba(255,255,255,0.7)", marginBottom:"1.25rem", fontSize:"0.82rem" }}>Escribinos por WhatsApp sin compromiso.</p>
                <a href={buildDirectWA()} target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"#25D366", color:C.white, borderRadius:"8px", padding:"0.8rem 1.5rem", fontSize:"0.88rem", fontWeight:"700", textDecoration:"none" }}>
                  <WAIcon size={16}/> Consultar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

        {/* QUIÉNES SOMOS */}
        {page === "about" && (
          <div>
            <div style={{ background:`linear-gradient(135deg, ${C.navy} 0%, #1D5070 60%, ${C.tealDark} 100%)`, padding:"3rem 1.25rem 2.5rem", textAlign:"center" }}>
              <h1 style={{ color:C.white, fontSize:"1.6rem", fontWeight:"800", lineHeight:1.2, marginBottom:"0.75rem" }}>
                Nacimos en Santa Cruz<br/><span style={{ color:C.teal }}>para cuidar a los que queremos</span>
              </h1>
              <p style={{ color:"rgba(255,255,255,0.72)", fontSize:"0.85rem", maxWidth:"500px", margin:"0 auto", lineHeight:1.7 }}>
                CuidaMed nació de una necesidad real: encontrar atención de enfermería confiable en casa, sin complicaciones.
              </p>
            </div>
            <div className="section">
              <div style={{ display:"flex", flexDirection:"column", gap:"1rem", marginBottom:"2rem" }}>
                {[{ icon:"🎯", title:"Nuestra misión", text:"Conectar a familias cruceñas con enfermeros profesionales verificados, garantizando atención de calidad en el hogar." },{ icon:"🌟", title:"Nuestra visión", text:"Ser la plataforma de salud domiciliaria más confiable de Bolivia." },{ icon:"💙", title:"Nuestros valores", text:"Confianza, profesionalismo y cercanía. La salud en casa es un derecho." }].map(({ icon, title, text }) => (
                  <div key={title} style={{ background:C.white, borderRadius:"14px", padding:"1.5rem", border:`1px solid ${C.border}` }}>
                    <div style={{ fontSize:"1.8rem", marginBottom:"0.75rem" }}>{icon}</div>
                    <h3 style={{ color:C.navy, fontWeight:"800", fontSize:"1rem", marginBottom:"0.5rem" }}>{title}</h3>
                    <p style={{ color:C.muted, fontSize:"0.82rem", lineHeight:1.7 }}>{text}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => go("search")} style={{ background:C.teal, color:C.white, border:"none", borderRadius:"8px", padding:"0.9rem", fontSize:"0.9rem", fontWeight:"700", cursor:"pointer", width:"100%", boxShadow:"0 4px 16px rgba(42,171,176,0.3)" }}>
                Encontrar un enfermero →
              </button>
            </div>
          </div>
        )}

      </div>{/* end page-content */}

      {/* ── MODAL BOOKING ── */}
      {selectedNurse && (
        <div style={{ position:"fixed", inset:0, background:"rgba(27,58,92,0.6)", display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:1000, backdropFilter:"blur(3px)" }} onClick={() => setNurse(null)}>
          <div style={{ background:C.white, borderRadius:"20px 20px 0 0", padding:"1.5rem", width:"100%", maxWidth:"500px", boxShadow:"0 -20px 60px rgba(27,58,92,0.3)", maxHeight:"90vh", overflowY:"auto" }} onClick={e => e.stopPropagation()}>
            {/* Handle bar */}
            <div style={{ width:"40px", height:"4px", background:C.border, borderRadius:"2px", margin:"0 auto 1.25rem" }}/>

            {booked ? (
              <div style={{ textAlign:"center", padding:"1rem 0 1.5rem" }}>
                <div style={{ fontSize:"3rem", marginBottom:"0.75rem" }}>✅</div>
                <h3 style={{ color:C.navy, marginBottom:"0.5rem", fontSize:"1.2rem", fontWeight:"800" }}>¡Solicitud enviada!</h3>
                <p style={{ color:C.muted, fontSize:"0.85rem", lineHeight:1.7, marginBottom:"1.5rem" }}>Tu solicitud fue enviada a CuidaMed por WhatsApp. Te confirmaremos en breve.</p>
                <div style={{ background:C.accent, borderRadius:"10px", padding:"0.9rem", fontSize:"0.82rem", color:C.tealDark, marginBottom:"1.5rem" }}>
                  📱 Revisá tu WhatsApp — CuidaMed te contactará pronto
                </div>
                <button style={{ background:C.teal, color:C.white, border:"none", borderRadius:"8px", padding:"0.85rem", fontSize:"0.9rem", fontWeight:"700", cursor:"pointer", width:"100%" }} onClick={() => setNurse(null)}>Cerrar</button>
              </div>
            ) : (
              <>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1.25rem" }}>
                  <h3 style={{ color:C.navy, fontSize:"1.1rem", fontWeight:"800" }}>Solicitar servicio</h3>
                  <button onClick={() => setNurse(null)} style={{ background:"none", border:"none", fontSize:"1.1rem", cursor:"pointer", color:C.muted, padding:"0.25rem" }}>✕</button>
                </div>
                {/* Nurse summary */}
                <div style={{ display:"flex", alignItems:"center", gap:"0.85rem", marginBottom:"1.25rem", background:C.accent, borderRadius:"10px", padding:"0.9rem" }}>
                  <div style={{ width:"44px", height:"44px", borderRadius:"50%", background:selectedNurse.color, display:"flex", alignItems:"center", justifyContent:"center", color:C.white, fontWeight:"800", fontSize:"0.85rem", flexShrink:0 }}>{selectedNurse.avatar}</div>
                  <div>
                    <div style={{ fontWeight:"700", color:C.navy, fontSize:"0.9rem" }}>{selectedNurse.name}</div>
                    <div style={{ fontSize:"0.78rem", color:C.tealDark }}>{selectedNurse.specialty}</div>
                    <div style={{ fontSize:"0.72rem", color:C.muted }}>{selectedNurse.zone} · Bs. {selectedNurse.price}</div>
                  </div>
                </div>
                {/* Form */}
                {[["Tu nombre *","text","Ej: Ana Rodríguez","nombre"],["Tu teléfono *","tel","Ej: 70012345","telefono"]].map(([lbl,type,ph,key]) => (
                  <div key={key} style={{ marginBottom:"0.85rem" }}>
                    <label style={{ display:"block", fontSize:"0.72rem", color:C.muted, marginBottom:"0.25rem", textTransform:"uppercase", letterSpacing:"0.07em", fontWeight:"600" }}>{lbl}</label>
                    <input type={type} placeholder={ph} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]:e.target.value }))} style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:"8px", padding:"0.7rem 0.9rem", fontSize:"0.9rem", boxSizing:"border-box", color:C.text, outline:"none" }}/>
                  </div>
                ))}
                <div style={{ marginBottom:"0.85rem" }}>
                  <label style={{ display:"block", fontSize:"0.72rem", color:C.muted, marginBottom:"0.25rem", textTransform:"uppercase", letterSpacing:"0.07em", fontWeight:"600" }}>Fecha y hora</label>
                  <input type="datetime-local" value={form.fecha} onChange={e => setForm(f => ({ ...f, fecha:e.target.value }))} style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:"8px", padding:"0.7rem 0.9rem", fontSize:"0.9rem", boxSizing:"border-box", color:C.text, outline:"none" }}/>
                </div>
                <div style={{ marginBottom:"1.25rem" }}>
                  <label style={{ display:"block", fontSize:"0.72rem", color:C.muted, marginBottom:"0.25rem", textTransform:"uppercase", letterSpacing:"0.07em", fontWeight:"600" }}>Descripción</label>
                  <textarea placeholder="Describí qué necesitás..." value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion:e.target.value }))} style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:"8px", padding:"0.7rem 0.9rem", fontSize:"0.9rem", boxSizing:"border-box", color:C.text, outline:"none", height:"72px", resize:"vertical" }}/>
                </div>
                <button style={{ background:"#25D366", color:C.white, border:"none", borderRadius:"10px", padding:"0.95rem", fontSize:"0.95rem", fontWeight:"800", cursor:"pointer", width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", boxShadow:"0 4px 16px rgba(37,211,102,0.35)" }} onClick={handleConfirmar}>
                  <WAIcon size={20}/> Confirmar por WhatsApp · Bs. {selectedNurse.price}
                </button>
                <p style={{ color:C.muted, fontSize:"0.68rem", textAlign:"center", marginTop:"0.6rem" }}>Se abrirá WhatsApp con tu solicitud lista para enviar</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── BOTTOM NAV (mobile) ── */}
      <nav className="bottom-nav">
        {[["home","🏠","Inicio"],["search","🔍","Buscar"],["servicios","🩺","Servicios"],["about","ℹ️","Nosotros"]].map(([p,icon,lbl]) => (
          <button key={p} className={`bottom-nav-btn${page===p?" active":""}`} onClick={() => go(p)} style={{ color: page===p ? C.teal : C.muted }}>
            <span>{icon}</span>
            <span>{lbl}</span>
          </button>
        ))}
      </nav>

      {/* ── FOOTER (desktop) ── */}
      <footer style={{ background:C.navy, color:"rgba(255,255,255,0.5)", textAlign:"center", padding:"1.5rem", fontSize:"0.78rem", display:"none" }} className="desktop-footer">
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:"8px", marginBottom:"0.5rem" }}>
          <LogoIcon size={20} white/>
          <span style={{ color:C.white, fontWeight:"700" }}>CuidaMed</span>
        </div>
        <a href={buildDirectWA()} target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:"5px", background:"#25D366", color:C.white, borderRadius:"5px", padding:"0.3rem 0.75rem", fontSize:"0.72rem", fontWeight:"700", textDecoration:"none", marginBottom:"0.5rem" }}>
          <WAIcon size={12}/> +591 74510892
        </a>
        <div>© 2025 CuidaMed · Santa Cruz de la Sierra, Bolivia</div>
      </footer>
    </div>
  );
}

/* ── NurseCard ── */
function NurseCard({ nurse, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const requisitos = [
    { icon:"🎓", label:"Licenciatura",  value:"UAGRM / Verificada" },
    { icon:"🏛️", label:"Colegiatura",   value:"Colegio de Enfermeras de Bolivia" },
    { icon:"⏱️", label:"Experiencia",   value:nurse.exp },
    { icon:"🏥", label:"Trabajo actual", value:nurse.trabajo || "Independiente" },
  ];
  return (
    <div style={{ background:C.white, borderRadius:"14px", overflow:"hidden", border:`1px solid ${C.border}`, transition:"transform 0.2s, box-shadow 0.2s", transform:hovered?"translateY(-3px)":"none", boxShadow:hovered?"0 12px 32px rgba(27,58,92,0.14)":"0 2px 8px rgba(27,58,92,0.06)" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ height:"5px", background:nurse.color }}/>
      <div style={{ padding:"1.25rem" }}>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", gap:"0.85rem", marginBottom:"0.85rem" }}>
          <div style={{ width:"46px", height:"46px", borderRadius:"50%", background:nurse.color, display:"flex", alignItems:"center", justifyContent:"center", color:C.white, fontWeight:"800", fontSize:"0.85rem", flexShrink:0 }}>{nurse.avatar}</div>
          <div>
            <div style={{ fontWeight:"700", color:C.navy, fontSize:"0.9rem" }}>{nurse.name}</div>
            <div style={{ fontSize:"0.78rem", color:C.tealDark, fontWeight:"600" }}>{nurse.specialty}</div>
          </div>
        </div>
        {/* Badges */}
        <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap", marginBottom:"0.85rem" }}>
          <span style={{ background:C.accent, color:C.tealDark, borderRadius:"100px", padding:"0.22rem 0.65rem", fontSize:"0.7rem", fontWeight:"600" }}>📍 {nurse.zone}</span>
          <span style={{ background:nurse.available?"#E6F7F1":"#FEE8E7", color:nurse.available?"#1A7A50":"#C0392B", borderRadius:"100px", padding:"0.22rem 0.65rem", fontSize:"0.7rem", fontWeight:"700" }}>
            {nurse.available ? "● Disponible" : "○ Ocupado"}
          </span>
        </div>
        {/* Requisitos */}
        <div style={{ background:"#F8FFFE", borderRadius:"10px", padding:"0.75rem", marginBottom:"0.85rem", border:`1px solid ${C.border}` }}>
          <div style={{ fontSize:"0.62rem", fontWeight:"800", color:C.tealDark, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"0.5rem" }}>✅ Requisitos verificados por CuidaMed</div>
          {requisitos.map((r,i) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"0.4rem", marginBottom:i<requisitos.length-1?"0.38rem":0 }}>
              <span style={{ fontSize:"0.75rem", flexShrink:0 }}>{r.icon}</span>
              <div>
                <span style={{ fontSize:"0.68rem", color:C.muted }}>{r.label}: </span>
                <span style={{ fontSize:"0.68rem", color:C.navy, fontWeight:"700" }}>{r.value}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Rating & price */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:"0.65rem", borderTop:`1px solid ${C.border}`, fontSize:"0.8rem", color:C.muted, marginBottom:"0.85rem" }}>
          <span>⭐ <strong style={{ color:C.navy }}>{nurse.rating}</strong> ({nurse.reviews})</span>
          <span style={{ fontWeight:"800", color:C.navy, fontSize:"0.95rem" }}>Bs. {nurse.price}</span>
        </div>
        {/* Button */}
        <button style={{ background:nurse.available?"#25D366":"#CCC", color:C.white, border:"none", borderRadius:"8px", padding:"0.75rem", fontSize:"0.85rem", fontWeight:"700", cursor:nurse.available?"pointer":"not-allowed", width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" }}
          onClick={() => nurse.available && onSelect()} disabled={!nurse.available}>
          {nurse.available ? <><WAIcon size={15}/> Solicitar servicio</> : "No disponible"}
        </button>
      </div>
    </div>
  );
}
