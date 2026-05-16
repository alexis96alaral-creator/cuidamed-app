import { useState } from "react";

const C = {
  navy: "#1B3A5C", teal: "#2AABB0", tealLight: "#3BBFC4", tealDark: "#1D8A8F",
  bg: "#F4F8F9", bgAlt: "#EAF4F5", white: "#FFFFFF", text: "#1A1A2E",
  muted: "#6B7E8F", border: "#C8DDE0", accent: "#E8F6F7",
};

const WA_NUMBER = "59174510892";

// ── Servicios de CuidaMed ────────────────────────────────────
const SERVICIOS = [
  { icon: "💉", title: "Inyecciones y sueros", desc: "Aplicación de inyecciones intramusculares, subcutáneas y endovenosas. Colocación y mantenimiento de catéteres y sueros en domicilio." },
  { icon: "🩹", title: "Curación de heridas", desc: "Limpieza, desinfección y cambio de vendajes en heridas quirúrgicas, úlceras por presión y lesiones crónicas. Seguimiento diario si se requiere." },
  { icon: "📊", title: "Control de signos vitales", desc: "Medición de presión arterial, temperatura, frecuencia cardíaca, saturación de oxígeno y glucemia. Reporte detallado al médico tratante." },
  { icon: "💊", title: "Administración de medicamentos", desc: "Suministro correcto y puntual de medicamentos según prescripción médica. Control de dosis y horarios para pacientes que no pueden autoadministrarse." },
  { icon: "🛁", title: "Higiene y movilización", desc: "Baño, aseo personal y cambio de ropa a pacientes encamados. Cambios posturales para prevenir úlceras. Apoyo en traslados dentro del hogar." },
  { icon: "👴", title: "Cuidado de adulto mayor", desc: "Acompañamiento integral a personas mayores: alimentación, medicación, estimulación cognitiva y supervisión continua. Turno diurno o nocturno." },
  { icon: "👶", title: "Cuidado neonatal y pediátrico", desc: "Atención especializada a recién nacidos y niños: control de peso, nebulizaciones, orientación en lactancia materna y seguimiento del desarrollo." },
  { icon: "🏥", title: "Cuidados post-operatorios", desc: "Recuperación en casa tras cirugías: control de la herida operatoria, administración de antibióticos, detección de complicaciones y comunicación con el cirujano." },
  { icon: "🚗", title: "Acompañamiento hospitalario", desc: "Presencia de un enfermero profesional durante internaciones, estudios o consultas. Intermediación con el equipo médico y apoyo emocional al paciente." },
];

function buildWhatsAppURL({ nurse, nombre, telefono, fecha, descripcion }) {
  const lineas = [
    "🏥 *Nueva solicitud CuidaMed*", "",
    `👤 *Paciente:* ${nombre || "No indicado"}`,
    `📱 *Teléfono:* ${telefono || "No indicado"}`, "",
    `🩺 *Enfermero solicitado:* ${nurse.name}`,
    `📋 *Especialidad:* ${nurse.specialty}`,
    `📍 *Zona:* ${nurse.zone}`,
    `💰 *Precio:* Bs. ${nurse.price}`, "",
    `📅 *Fecha y hora:* ${fecha || "A coordinar"}`,
    `📝 *Descripción:* ${descripcion || "Sin descripción"}`, "",
    "_Enviado desde alaralcuidamed.com_",
  ];
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lineas.join("\n"))}`;
}

function buildDirectWA() {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola CuidaMed, necesito información sobre sus servicios de enfermería.")}`;
}

const nurses = [
  { id: 1, name: "Lic. María Fernández", specialty: "Cuidado adulto mayor", zone: "Equipetrol", rating: 4.9, reviews: 38, price: 150, available: true, exp: "8 años", avatar: "MF", color: C.teal, trabajo: "Hospital Percy Boland · Santa Cruz" },
  { id: 2, name: "Lic. Carlos Suárez", specialty: "Enfermería general", zone: "Norte", rating: 4.8, reviews: 21, price: 130, available: true, exp: "5 años", avatar: "CS", color: C.navy, trabajo: "Clínica del Norte · Santa Cruz" },
  { id: 3, name: "Lic. Valeria Torrico", specialty: "Pediatría domiciliaria", zone: "Plan 3000", rating: 5.0, reviews: 54, price: 170, available: false, exp: "10 años", avatar: "VT", color: C.tealDark, trabajo: "Hospital de la Mujer · Santa Cruz" },
  { id: 4, name: "Lic. Jorge Méndez", specialty: "Post-operatorio", zone: "Radial 26", rating: 4.7, reviews: 17, price: 160, available: true, exp: "6 años", avatar: "JM", color: "#2D6A8A", trabajo: "Clínica Los Olivos · Santa Cruz" },
];

const zones    = ["Todas las zonas", "Equipetrol", "Norte", "Plan 3000", "Radial 26"];
const services = ["Todos los servicios", "Cuidado adulto mayor", "Enfermería general", "Pediatría domiciliaria", "Post-operatorio"];

function WAIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function LogoIcon({ size = 36, white = false }) {
  const fill = white ? "#FFFFFF" : C.teal;
  const fill2 = white ? "rgba(255,255,255,0.7)" : C.navy;
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="10" r="7" fill={fill} />
      <path d="M10 28 C10 18 20 14 30 22 C40 14 50 18 50 28 C50 40 30 52 30 52 C30 52 10 40 10 28Z" fill={fill} opacity="0.85" />
      <rect x="24" y="30" width="12" height="10" rx="1" fill={fill2} opacity="0.9" />
      <path d="M22 31 L30 24 L38 31" stroke={fill2} strokeWidth="2" fill="none" strokeLinejoin="round" />
      <rect x="27.5" y="34" width="5" height="6" rx="0.5" fill={white ? "rgba(255,255,255,0.4)" : C.accent} />
    </svg>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedZone, setSelectedZone] = useState("Todas las zonas");
  const [selectedService, setSelectedService] = useState("Todos los servicios");
  const [selectedNurse, setSelectedNurse] = useState(null);
  const [booked, setBooked] = useState(false);
  const [form, setForm] = useState({ nombre: "", telefono: "", fecha: "", descripcion: "" });

  const filtered = nurses.filter(n => {
    const zoneOk = selectedZone === "Todas las zonas" || n.zone === selectedZone;
    const svcOk  = selectedService === "Todos los servicios" || n.specialty === selectedService;
    return zoneOk && svcOk;
  });

  function handleConfirmar() {
    if (!form.nombre || !form.telefono) { alert("Por favor completá tu nombre y teléfono."); return; }
    window.open(buildWhatsAppURL({ nurse: selectedNurse, ...form }), "_blank");
    setBooked(true);
  }

  return (
    <div style={{ fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif", background: C.bg, minHeight: "100vh", color: C.text }}>

      {/* ── NAV ── */}
      <nav style={{ background: C.navy, padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(27,58,92,0.25)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => setPage("home")}>
          <LogoIcon size={38} white />
          <div>
            <span style={{ color: C.white, fontSize: "1.3rem", fontWeight: "800" }}>Cuida</span>
            <span style={{ color: C.teal,  fontSize: "1.3rem", fontWeight: "800" }}>Med</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {[["home","Inicio"],["search","Buscar"],["servicios","Servicios"],["about","Quiénes somos"]].map(([p,label]) => (
            <span key={p} onClick={() => setPage(p)} style={{ color: page===p ? C.white : "rgba(255,255,255,0.7)", fontSize: "0.875rem", cursor: "pointer", fontWeight: page===p ? "700" : "400" }}>{label}</span>
          ))}
          {/* WhatsApp directo en nav */}
          <a href={buildDirectWA()} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", background: "#25D366", color: C.white, border: "none", borderRadius: "6px", padding: "0.5rem 1rem", fontSize: "0.85rem", fontWeight: "700", cursor: "pointer", textDecoration: "none" }}>
            <WAIcon size={16} /> Contactar
          </a>
        </div>
      </nav>

      {/* ── HOME ── */}
      {page === "home" && (
        <>
          {/* Hero — solo botón "Encontrar un enfermero" */}
          <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1D5070 50%, ${C.tealDark} 100%)`, padding: "6rem 2rem 5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(42,171,176,0.1)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(42,171,176,0.08)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}><LogoIcon size={80} white /></div>
              <div style={{ display: "inline-block", background: "rgba(42,171,176,0.2)", color: C.tealLight, border: `1px solid rgba(42,171,176,0.35)`, borderRadius: "100px", padding: "0.35rem 1.1rem", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                Santa Cruz de la Sierra · Bolivia
              </div>
              <h1 style={{ color: C.white, fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: "800", lineHeight: 1.15, margin: "0 0 1rem" }}>
                Enfermería profesional<br /><span style={{ color: C.teal }}>en tu hogar, cuando lo necesitas</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "1.05rem", maxWidth: "500px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
                Conectamos familias con enfermeros certificados y verificados en Santa Cruz. Rápido, seguro y con calificaciones reales.
              </p>
              {/* Solo UN botón principal */}
              <button style={{ background: C.teal, color: C.white, border: "none", borderRadius: "10px", padding: "1.1rem 3rem", fontSize: "1.1rem", fontWeight: "800", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 6px 24px rgba(42,171,176,0.45)", letterSpacing: "0.02em" }} onClick={() => setPage("search")}>
                Encontrar un enfermero →
              </button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            {[["48+","Enfermeros activos","🩺"],["500+","Servicios completados","✅"],["4.9★","Calificación promedio","⭐"],["< 2h","Tiempo de respuesta","⚡"]].map(([n,l,icon],i) => (
              <div key={l} style={{ textAlign: "center", padding: "1.5rem 2.5rem", borderRight: i<3 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>{icon}</div>
                <div style={{ fontSize: "1.6rem", fontWeight: "800", color: C.teal }}>{n}</div>
                <div style={{ fontSize: "0.72rem", color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Servicios preview en home */}
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3.5rem 2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <div style={{ display: "inline-block", background: C.accent, color: C.tealDark, borderRadius: "100px", padding: "0.3rem 1rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: "700", marginBottom: "0.75rem" }}>Nuestros servicios</div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: C.navy, marginBottom: "0.5rem" }}>¿Qué servicios ofrecemos?</h2>
              <p style={{ color: C.muted, fontSize: "0.95rem" }}>Atención profesional de enfermería en la comodidad de tu hogar</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.25rem" }}>
              {SERVICIOS.map((s, i) => (
                <div key={i} style={{ background: C.white, borderRadius: "12px", padding: "1.5rem", border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(27,58,92,0.05)" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                  <div style={{ fontWeight: "700", color: C.navy, fontSize: "0.95rem", marginBottom: "0.5rem" }}>{s.title}</div>
                  <div style={{ color: C.muted, fontSize: "0.8rem", lineHeight: 1.65 }}>{s.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <button onClick={() => setPage("search")} style={{ background: C.teal, color: C.white, border: "none", borderRadius: "8px", padding: "0.9rem 2.5rem", fontSize: "0.95rem", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 16px rgba(42,171,176,0.3)" }}>
                Solicitar un enfermero ahora →
              </button>
            </div>
          </div>

          {/* Cómo funciona */}
          <div style={{ background: C.bgAlt, padding: "4rem 2rem", textAlign: "center", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: C.navy, marginBottom: "0.5rem" }}>¿Cómo funciona?</h2>
            <p style={{ color: C.muted, marginBottom: "3rem", fontSize: "0.95rem" }}>Tres pasos simples para recibir atención en casa</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", maxWidth: "850px", margin: "0 auto" }}>
              {[["🔍","Buscá un enfermero","Filtrá por zona y especialidad en Santa Cruz."],["📋","Completá el formulario","Ingresá tus datos y describí lo que necesitás."],["💬","Confirmá por WhatsApp","Se abre WhatsApp directo con CuidaMed. Coordinamos todo."]].map(([icon,t,d],i) => (
                <div key={i} style={{ maxWidth: "230px", background: C.white, borderRadius: "12px", padding: "2rem 1.5rem", border: `1px solid ${C.border}`, boxShadow: "0 2px 12px rgba(27,58,92,0.06)" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{icon}</div>
                  <div style={{ width: "28px", height: "28px", background: C.teal, color: C.white, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: "800", margin: "0 auto 0.75rem" }}>{i+1}</div>
                  <div style={{ fontWeight: "700", color: C.navy, marginBottom: "0.5rem" }}>{t}</div>
                  <div style={{ color: C.muted, fontSize: "0.85rem", lineHeight: 1.6 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Banner enfermeros */}
          <div style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, padding: "3rem 2rem", textAlign: "center" }}>
            <h2 style={{ color: C.white, fontSize: "1.6rem", fontWeight: "800", margin: "0 0 0.75rem" }}>¿Sos enfermero/a en Santa Cruz?</h2>
            <p style={{ color: "rgba(255,255,255,0.82)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>Unite a CuidaMed y conseguí clientes de forma constante.</p>
            <a href={buildDirectWA()} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: C.white, color: C.tealDark, border: "none", borderRadius: "8px", padding: "0.9rem 2rem", fontSize: "0.95rem", fontWeight: "700", cursor: "pointer", textDecoration: "none" }}>
              <WAIcon size={18} /> <span style={{ color: C.tealDark }}>Registrarme por WhatsApp</span>
            </a>
          </div>
        </>
      )}

      {/* ── SERVICIOS ── */}
      {page === "servicios" && (
        <div>
          <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1D5070 60%, ${C.tealDark} 100%)`, padding: "5rem 2rem 4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "inline-block", background: "rgba(42,171,176,0.2)", color: C.tealLight, border: `1px solid rgba(42,171,176,0.35)`, borderRadius: "100px", padding: "0.35rem 1.1rem", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Lo que hacemos</div>
              <h1 style={{ color: C.white, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: "800", lineHeight: 1.15, margin: "0 0 1rem" }}>
                Nuestros servicios de<br /><span style={{ color: C.teal }}>enfermería a domicilio</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "1.05rem", maxWidth: "560px", margin: "0 auto", lineHeight: 1.8 }}>
                Todos los servicios son realizados por enfermeros licenciados, verificados y con experiencia comprobada en Santa Cruz.
              </p>
            </div>
          </div>

          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3.5rem 2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
              {SERVICIOS.map((s, i) => (
                <div key={i} style={{ background: C.white, borderRadius: "16px", padding: "2rem", border: `1px solid ${C.border}`, boxShadow: "0 2px 12px rgba(27,58,92,0.06)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>{s.icon}</div>
                    <div style={{ fontWeight: "800", color: C.navy, fontSize: "1rem", lineHeight: 1.3 }}>{s.title}</div>
                  </div>
                  <p style={{ color: C.muted, fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
                  <a href={buildDirectWA()} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#25D366", color: C.white, borderRadius: "8px", padding: "0.6rem 1rem", fontSize: "0.8rem", fontWeight: "700", cursor: "pointer", textDecoration: "none", marginTop: "auto" }}>
                    <WAIcon size={14} /> Consultar este servicio
                  </a>
                </div>
              ))}
            </div>

            <div style={{ background: `linear-gradient(135deg, ${C.navy}, #1D5070)`, borderRadius: "20px", padding: "2.5rem", textAlign: "center" }}>
              <h2 style={{ color: C.white, fontSize: "1.4rem", fontWeight: "800", marginBottom: "0.75rem" }}>¿No encontrás lo que buscás?</h2>
              <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>Escribinos por WhatsApp y te asesoramos sin compromiso.</p>
              <a href={buildDirectWA()} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#25D366", color: C.white, border: "none", borderRadius: "10px", padding: "0.9rem 2rem", fontSize: "0.95rem", fontWeight: "700", cursor: "pointer", textDecoration: "none", boxShadow: "0 4px 16px rgba(37,211,102,0.35)" }}>
                <WAIcon size={18} /> Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── BUSCAR ── */}
      {page === "search" && (
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2rem" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: "800", color: C.navy, marginBottom: "0.4rem" }}>Encontrá tu enfermero</h2>
          <p style={{ color: C.muted, fontSize: "0.9rem", marginBottom: "1.5rem" }}>Filtrá por zona y tipo de servicio en Santa Cruz</p>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            {[[zones, selectedZone, setSelectedZone],[services, selectedService, setSelectedService]].map(([opts,val,setter],i) => (
              <select key={i} value={val} onChange={e => setter(e.target.value)} style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: "8px", padding: "0.7rem 1.2rem", fontSize: "0.9rem", color: C.text, cursor: "pointer", fontFamily: "inherit", minWidth: "200px", outline: "none" }}>
                {opts.map(o => <option key={o}>{o}</option>)}
              </select>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", color: C.muted, padding: "4rem 0" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
              No hay enfermeros disponibles con esos filtros.
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "1.5rem" }}>
              {filtered.map(n => (
                <NurseCard key={n.id} nurse={n} onSelect={() => { setSelectedNurse(n); setBooked(false); setForm({ nombre:"", telefono:"", fecha:"", descripcion:"" }); }} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── QUIÉNES SOMOS ── */}
      {page === "about" && (
        <div>
          <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1D5070 60%, ${C.tealDark} 100%)`, padding: "5rem 2rem 4rem", textAlign: "center" }}>
            <h1 style={{ color: C.white, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: "800", lineHeight: 1.15, margin: "0 0 1.25rem" }}>
              Nacimos en Santa Cruz<br /><span style={{ color: C.teal }}>para cuidar a los que queremos</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "1.05rem", maxWidth: "560px", margin: "0 auto", lineHeight: 1.8 }}>
              CuidaMed nació de una necesidad real: encontrar atención de enfermería confiable en casa, sin complicaciones y con total transparencia.
            </p>
          </div>
          <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "4rem 2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
              {[{ icon:"🎯", title:"Nuestra misión", text:"Conectar a familias cruceñas con enfermeros profesionales verificados, garantizando atención de calidad en el hogar con rapidez, transparencia y calidez humana." },{ icon:"🌟", title:"Nuestra visión", text:"Ser la plataforma de salud domiciliaria más confiable de Bolivia, expandiendo el acceso a atención profesional a todos los hogares que lo necesitan." },{ icon:"💙", title:"Nuestros valores", text:"Confianza, profesionalismo y cercanía. Creemos que recibir buena atención médica en casa no debería ser un privilegio sino un derecho de todas las familias." }].map(({ icon, title, text }) => (
                <div key={title} style={{ background: C.white, borderRadius: "16px", padding: "2rem", border: `1px solid ${C.border}`, boxShadow: "0 2px 12px rgba(27,58,92,0.06)" }}>
                  <div style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{icon}</div>
                  <h3 style={{ color: C.navy, fontWeight: "800", fontSize: "1.1rem", marginBottom: "0.75rem" }}>{title}</h3>
                  <p style={{ color: C.muted, fontSize: "0.9rem", lineHeight: 1.75, margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <button style={{ background: C.teal, color: C.white, border: "none", borderRadius: "8px", padding: "1rem 2.5rem", fontSize: "1rem", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }} onClick={() => setPage("search")}>
                Encontrar un enfermero →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL BOOKING ── */}
      {selectedNurse && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(27,58,92,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem", backdropFilter: "blur(3px)" }} onClick={() => setSelectedNurse(null)}>
          <div style={{ background: C.white, borderRadius: "16px", padding: "2rem", maxWidth: "430px", width: "100%", boxShadow: "0 30px 70px rgba(27,58,92,0.25)" }} onClick={e => e.stopPropagation()}>
            <button style={{ background: "none", border: "none", fontSize: "1.1rem", cursor: "pointer", float: "right", color: C.muted }} onClick={() => setSelectedNurse(null)}>✕</button>
            {booked ? (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ color: C.navy, marginBottom: "0.5rem", fontSize: "1.3rem" }}>¡Solicitud enviada!</h3>
                <p style={{ color: C.muted, fontSize: "0.9rem", lineHeight: 1.7 }}>Tu solicitud fue enviada a CuidaMed por WhatsApp. Te confirmaremos en breve.</p>
                <div style={{ background: C.accent, borderRadius: "8px", padding: "1rem", margin: "1.5rem 0", fontSize: "0.85rem", color: C.tealDark }}>
                  📱 Revisá tu WhatsApp — CuidaMed te contactará pronto
                </div>
                <button style={{ background: C.teal, color: C.white, border: "none", borderRadius: "8px", padding: "0.85rem 2rem", fontSize: "0.9rem", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", width: "100%" }} onClick={() => setSelectedNurse(null)}>Cerrar</button>
              </div>
            ) : (
              <>
                <h3 style={{ color: C.navy, fontSize: "1.2rem", fontWeight: "800", marginBottom: "1.5rem", marginTop: "0.5rem" }}>Solicitar servicio</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", background: C.accent, borderRadius: "10px", padding: "1rem" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: selectedNurse.color, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: "800", fontSize: "0.95rem", flexShrink: 0 }}>{selectedNurse.avatar}</div>
                  <div>
                    <div style={{ fontWeight: "700", color: C.navy, fontSize: "0.95rem" }}>{selectedNurse.name}</div>
                    <div style={{ fontSize: "0.82rem", color: C.tealDark }}>{selectedNurse.specialty}</div>
                    <div style={{ fontSize: "0.78rem", color: C.muted }}>{selectedNurse.zone} · Bs. {selectedNurse.price}</div>
                  </div>
                </div>
                {[["Tu nombre *","text","Ej: Ana Rodríguez","nombre"],["Tu teléfono *","tel","Ej: 70012345","telefono"]].map(([lbl,type,ph,key]) => (
                  <div key={key} style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontSize: "0.78rem", color: C.muted, marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: "600" }}>{lbl}</label>
                    <input type={type} placeholder={ph} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: "8px", padding: "0.7rem 1rem", fontSize: "0.9rem", fontFamily: "inherit", boxSizing: "border-box", color: C.text, outline: "none" }} />
                  </div>
                ))}
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", color: C.muted, marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: "600" }}>Fecha y hora</label>
                  <input type="datetime-local" value={form.fecha} onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))} style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: "8px", padding: "0.7rem 1rem", fontSize: "0.9rem", fontFamily: "inherit", boxSizing: "border-box", color: C.text, outline: "none" }} />
                </div>
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", color: C.muted, marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: "600" }}>Descripción</label>
                  <textarea placeholder="Describí brevemente qué necesitás..." value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: "8px", padding: "0.7rem 1rem", fontSize: "0.9rem", fontFamily: "inherit", boxSizing: "border-box", color: C.text, outline: "none", height: "80px", resize: "vertical" }} />
                </div>
                <button style={{ background: "#25D366", color: C.white, border: "none", borderRadius: "8px", padding: "0.9rem", fontSize: "0.95rem", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", boxShadow: "0 4px 16px rgba(37,211,102,0.35)" }} onClick={handleConfirmar}>
                  <WAIcon size={20} /> Confirmar por WhatsApp · Bs. {selectedNurse.price}
                </button>
                <p style={{ color: C.muted, fontSize: "0.72rem", textAlign: "center", marginTop: "0.75rem" }}>Se abrirá WhatsApp con tu solicitud lista para enviar a CuidaMed</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ background: C.navy, color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "2rem", fontSize: "0.82rem" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginBottom: "0.75rem" }}>
          <LogoIcon size={22} white />
          <span style={{ color: C.white, fontWeight: "700" }}>CuidaMed</span>
        </div>
        <a href={buildDirectWA()} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#25D366", color: C.white, borderRadius: "6px", padding: "0.4rem 0.9rem", fontSize: "0.78rem", fontWeight: "700", textDecoration: "none", marginBottom: "1rem" }}>
          <WAIcon size={14} /> +591 74510892
        </a>
        <div>© 2025 CuidaMed · Santa Cruz de la Sierra, Bolivia · Enfermeros verificados con el Colegio de Enfermeras de Bolivia</div>
      </footer>
    </div>
  );
}

function NurseCard({ nurse, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const requisitos = [
    { icon: "🎓", label: "Licenciatura en Enfermería", value: "UAGRM / Verificada" },
    { icon: "🏛️", label: "Colegiatura de Enfermería", value: "Colegio de Enfermeras de Bolivia" },
    { icon: "⏱️", label: "Años de experiencia", value: nurse.exp },
    { icon: "🏥", label: "Trabajo actual", value: nurse.trabajo || "Independiente" },
  ];
  return (
    <div style={{ background: C.white, borderRadius: "12px", overflow: "hidden", border: `1px solid ${C.border}`, transition: "transform 0.2s, box-shadow 0.2s", transform: hovered ? "translateY(-4px)" : "none", boxShadow: hovered ? "0 16px 40px rgba(27,58,92,0.15)" : "0 2px 8px rgba(27,58,92,0.06)" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ height: "6px", background: nurse.color }} />
      <div style={{ padding: "1.5rem" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
          <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: nurse.color, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: "800", fontSize: "0.9rem", flexShrink: 0 }}>{nurse.avatar}</div>
          <div>
            <div style={{ fontWeight: "700", color: C.navy, fontSize: "0.95rem" }}>{nurse.name}</div>
            <div style={{ fontSize: "0.82rem", color: C.tealDark, fontWeight: "600" }}>{nurse.specialty}</div>
          </div>
        </div>

        {/* Zona y disponibilidad */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <span style={{ background: C.accent, color: C.tealDark, borderRadius: "100px", padding: "0.25rem 0.7rem", fontSize: "0.75rem", fontWeight: "600" }}>📍 {nurse.zone}</span>
          <span style={{ background: nurse.available ? "#E6F7F1" : "#FEE8E7", color: nurse.available ? "#1A7A50" : "#C0392B", borderRadius: "100px", padding: "0.25rem 0.7rem", fontSize: "0.75rem", fontWeight: "700" }}>
            {nurse.available ? "● Disponible" : "○ Ocupado"}
          </span>
        </div>

        {/* Requisitos verificados */}
        <div style={{ background: "#F8FFFE", borderRadius: "10px", padding: "0.75rem", marginBottom: "1rem", border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: "0.65rem", fontWeight: "800", color: C.tealDark, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>
            ✅ Requisitos verificados por CuidaMed
          </div>
          {requisitos.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: i < requisitos.length - 1 ? "0.45rem" : 0 }}>
              <span style={{ fontSize: "0.8rem", flexShrink: 0, marginTop: "1px" }}>{r.icon}</span>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: "0.72rem", color: C.muted }}>{r.label}: </span>
                <span style={{ fontSize: "0.72rem", color: C.navy, fontWeight: "700" }}>{r.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Rating y precio */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: `1px solid ${C.border}`, fontSize: "0.85rem", color: C.muted, marginBottom: "1rem" }}>
          <span>⭐ <strong style={{ color: C.navy }}>{nurse.rating}</strong> ({nurse.reviews})</span>
          <span style={{ fontWeight: "800", color: C.navy, fontSize: "1rem" }}>Bs. {nurse.price}</span>
        </div>

        {/* Botón */}
        <button style={{ background: nurse.available ? "#25D366" : "#CCC", color: C.white, border: "none", borderRadius: "8px", padding: "0.75rem", fontSize: "0.88rem", fontWeight: "700", cursor: nurse.available ? "pointer" : "not-allowed", fontFamily: "inherit", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
          onClick={() => nurse.available && onSelect()} disabled={!nurse.available}>
          {nurse.available ? <><WAIcon size={16}/> Solicitar servicio</> : "No disponible"}
        </button>
      </div>
    </div>
  );
}

// Kept for future use
