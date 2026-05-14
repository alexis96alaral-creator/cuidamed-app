import { useState } from "react";

// Colors extracted from CuidaMed logo
const C = {
  navy: "#1B3A5C",
  teal: "#2AABB0",
  tealLight: "#3BBFC4",
  tealDark: "#1D8A8F",
  bg: "#F4F8F9",
  bgAlt: "#EAF4F5",
  white: "#FFFFFF",
  text: "#1A1A2E",
  muted: "#6B7E8F",
  border: "#C8DDE0",
  accent: "#E8F6F7",
};

const nurses = [
  { id: 1, name: "Lic. María Fernández", specialty: "Cuidado adulto mayor", zone: "Equipetrol", rating: 4.9, reviews: 38, price: 150, available: true, exp: "8 años", avatar: "MF", color: C.teal },
  { id: 2, name: "Lic. Carlos Suárez", specialty: "Enfermería general", zone: "Norte", rating: 4.8, reviews: 21, price: 130, available: true, exp: "5 años", avatar: "CS", color: C.navy },
  { id: 3, name: "Lic. Valeria Torrico", specialty: "Pediatría domiciliaria", zone: "Plan 3000", rating: 5.0, reviews: 54, price: 170, available: false, exp: "10 años", avatar: "VT", color: C.tealDark },
  { id: 4, name: "Lic. Jorge Méndez", specialty: "Post-operatorio", zone: "Radial 26", rating: 4.7, reviews: 17, price: 160, available: true, exp: "6 años", avatar: "JM", color: "#2D6A8A" },
];

const zones = ["Todas las zonas", "Equipetrol", "Norte", "Plan 3000", "Radial 26"];
const services = ["Todos los servicios", "Cuidado adulto mayor", "Enfermería general", "Pediatría domiciliaria", "Post-operatorio"];

// CuidaMed SVG Logo Icon (heart + person + house)
function LogoIcon({ size = 36, white = false }) {
  const fill = white ? "#FFFFFF" : C.teal;
  const fill2 = white ? "rgba(255,255,255,0.7)" : C.navy;
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      {/* Person head */}
      <circle cx="30" cy="10" r="7" fill={fill} />
      {/* Heart/arms shape */}
      <path d="M10 28 C10 18 20 14 30 22 C40 14 50 18 50 28 C50 40 30 52 30 52 C30 52 10 40 10 28Z" fill={fill} opacity="0.85" />
      {/* House inside heart */}
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
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = nurses.filter(n => {
    const zoneOk = selectedZone === "Todas las zonas" || n.zone === selectedZone;
    const svcOk = selectedService === "Todos los servicios" || n.specialty === selectedService;
    return zoneOk && svcOk;
  });

  return (
    <div style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif", background: C.bg, minHeight: "100vh", color: C.text }}>

      {/* NAV */}
      <nav style={{ background: C.navy, padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(27,58,92,0.25)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => setPage("home")}>
          <LogoIcon size={38} white />
          <div>
            <span style={{ color: C.white, fontSize: "1.3rem", fontWeight: "800", letterSpacing: "-0.02em" }}>Cuida</span>
            <span style={{ color: C.teal, fontSize: "1.3rem", fontWeight: "800", letterSpacing: "-0.02em" }}>Med</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <span style={{ color: page === "home" ? C.white : "rgba(255,255,255,0.7)", fontSize: "0.875rem", cursor: "pointer", fontWeight: page === "home" ? "700" : "400" }} onClick={() => setPage("home")}>Inicio</span>
          <span style={{ color: page === "search" ? C.white : "rgba(255,255,255,0.7)", fontSize: "0.875rem", cursor: "pointer", fontWeight: page === "search" ? "700" : "400" }} onClick={() => setPage("search")}>Buscar</span>
          <span style={{ color: page === "about" ? C.white : "rgba(255,255,255,0.7)", fontSize: "0.875rem", cursor: "pointer", fontWeight: page === "about" ? "700" : "400" }} onClick={() => setPage("about")}>Quiénes somos</span>
          <button style={{ background: C.teal, color: C.white, border: "none", borderRadius: "6px", padding: "0.5rem 1.1rem", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer", fontFamily: "inherit" }}>
            Soy Enfermero/a
          </button>
        </div>
      </nav>

      {page === "home" && (
        <>
          {/* HERO */}
          <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1D5070 50%, ${C.tealDark} 100%)`, padding: "5.5rem 2rem 4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
            {/* Decorative circles */}
            <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(42,171,176,0.1)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(42,171,176,0.08)", pointerEvents: "none" }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              {/* Logo grande en hero */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                <LogoIcon size={72} white />
              </div>
              <div style={{ display: "inline-block", background: "rgba(42,171,176,0.2)", color: C.tealLight, border: `1px solid rgba(42,171,176,0.35)`, borderRadius: "100px", padding: "0.35rem 1.1rem", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                Santa Cruz de la Sierra · Bolivia
              </div>
              <h1 style={{ color: C.white, fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: "800", lineHeight: 1.15, margin: "0 0 1rem", letterSpacing: "-0.02em" }}>
                Enfermería profesional<br />
                <span style={{ color: C.teal }}>en tu hogar, cuando lo necesitas</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "1.05rem", maxWidth: "500px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
                Conectamos familias con enfermeros certificados y verificados en Santa Cruz. Rápido, seguro y con calificaciones reales.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <button style={{ background: C.teal, color: C.white, border: "none", borderRadius: "8px", padding: "1rem 2.2rem", fontSize: "1rem", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 20px rgba(42,171,176,0.4)" }} onClick={() => setPage("search")}>
                  Encontrar un enfermero →
                </button>
                <button style={{ background: "transparent", color: C.white, border: `2px solid rgba(255,255,255,0.3)`, borderRadius: "8px", padding: "1rem 2rem", fontSize: "1rem", fontWeight: "600", cursor: "pointer", fontFamily: "inherit" }}>
                  Registrarme como enfermero
                </button>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "center", gap: "0", flexWrap: "wrap" }}>
            {[["48+", "Enfermeros activos", "🩺"], ["500+", "Servicios completados", "✅"], ["4.9★", "Calificación promedio", "⭐"], ["< 2h", "Tiempo de respuesta", "⚡"]].map(([n, l, icon], i) => (
              <div key={l} style={{ textAlign: "center", padding: "1.5rem 2.5rem", borderRight: i < 3 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ fontSize: "0.9rem", marginBottom: "0.3rem" }}>{icon}</div>
                <div style={{ fontSize: "1.6rem", fontWeight: "800", color: C.teal }}>{n}</div>
                <div style={{ fontSize: "0.72rem", color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</div>
              </div>
            ))}
          </div>

          {/* HOW IT WORKS */}
          <div style={{ background: C.bgAlt, padding: "4rem 2rem", textAlign: "center", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "inline-block", background: C.accent, color: C.tealDark, borderRadius: "100px", padding: "0.3rem 1rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: "700", marginBottom: "1rem" }}>¿Cómo funciona?</div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: C.navy, marginBottom: "0.5rem" }}>Tres pasos simples</h2>
            <p style={{ color: C.muted, marginBottom: "3rem", fontSize: "0.95rem" }}>Para recibir atención profesional en la comodidad de tu hogar</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", maxWidth: "850px", margin: "0 auto" }}>
              {[
                ["🔍", "Buscá un enfermero", "Filtrá por zona, especialidad y disponibilidad en Santa Cruz."],
                ["📋", "Solicitá el servicio", "Elegí horario y describí lo que necesitás. Sin llamadas."],
                ["🏠", "Recibí atención", "El enfermero verificado llega a tu domicilio. Pagá vía QR."],
              ].map(([icon, t, d], i) => (
                <div key={i} style={{ maxWidth: "230px", background: C.white, borderRadius: "12px", padding: "2rem 1.5rem", border: `1px solid ${C.border}`, boxShadow: "0 2px 12px rgba(27,58,92,0.06)" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{icon}</div>
                  <div style={{ width: "28px", height: "28px", background: C.teal, color: C.white, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: "800", margin: "0 auto 0.75rem" }}>{i + 1}</div>
                  <div style={{ fontWeight: "700", color: C.navy, marginBottom: "0.5rem" }}>{t}</div>
                  <div style={{ color: C.muted, fontSize: "0.85rem", lineHeight: 1.6 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* NURSE PREVIEW */}
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3.5rem 2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h2 style={{ fontSize: "1.6rem", fontWeight: "800", color: C.navy, margin: "0 0 0.3rem" }}>Enfermeros disponibles ahora</h2>
                <p style={{ color: C.muted, fontSize: "0.9rem", margin: 0 }}>Todos verificados con el Colegio de Enfermeras de Bolivia</p>
              </div>
              <button style={{ background: "transparent", color: C.teal, border: `2px solid ${C.teal}`, borderRadius: "6px", padding: "0.6rem 1.2rem", fontSize: "0.875rem", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }} onClick={() => setPage("search")}>
                Ver todos →
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "1.5rem" }}>
              {nurses.slice(0, 3).map(n => (
                <NurseCard key={n.id} nurse={n} onSelect={() => { setSelectedNurse(n); setBooked(false); }} />
              ))}
            </div>
          </div>

          {/* CTA BANNER */}
          <div style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, padding: "3rem 2rem", textAlign: "center" }}>
            <h2 style={{ color: C.white, fontSize: "1.6rem", fontWeight: "800", margin: "0 0 0.75rem" }}>¿Sos enfermero/a en Santa Cruz?</h2>
            <p style={{ color: "rgba(255,255,255,0.82)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>Unite a CuidaMed y conseguí clientes de forma constante. Verificación gratuita el primer mes.</p>
            <button style={{ background: C.white, color: C.tealDark, border: "none", borderRadius: "8px", padding: "0.9rem 2rem", fontSize: "0.95rem", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>
              Registrarme como enfermero/a
            </button>
          </div>
        </>
      )}

      {page === "search" && (
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2rem" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: "800", color: C.navy, marginBottom: "0.4rem" }}>Encontrá tu enfermero</h2>
          <p style={{ color: C.muted, fontSize: "0.9rem", marginBottom: "1.5rem" }}>Filtrá por zona y tipo de servicio en Santa Cruz</p>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            {[
              [zones, selectedZone, setSelectedZone, "📍 Zona"],
              [services, selectedService, setSelectedService, "🩺 Servicio"],
            ].map(([opts, val, setter, placeholder], i) => (
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
                <NurseCard key={n.id} nurse={n} onSelect={() => { setSelectedNurse(n); setBooked(false); }} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* QUIÉNES SOMOS */}
      {page === "about" && (
        <div>
          <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1D5070 60%, ${C.tealDark} 100%)`, padding: "5rem 2rem 4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "250px", height: "250px", borderRadius: "50%", background: "rgba(42,171,176,0.1)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "inline-block", background: "rgba(42,171,176,0.2)", color: C.tealLight, border: `1px solid rgba(42,171,176,0.35)`, borderRadius: "100px", padding: "0.35rem 1.1rem", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Nuestra historia</div>
              <h1 style={{ color: C.white, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: "800", lineHeight: 1.15, margin: "0 0 1.25rem", letterSpacing: "-0.02em" }}>
                Nacimos en Santa Cruz<br /><span style={{ color: C.teal }}>para cuidar a los que queremos</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "1.05rem", maxWidth: "560px", margin: "0 auto", lineHeight: 1.8 }}>
                CuidaMed nació de una necesidad real: encontrar atención de enfermería confiable en casa, sin complicaciones y con total transparencia.
              </p>
            </div>
          </div>

          <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "4rem 2rem" }}>
            {/* Misión Visión Valores */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
              {[
                { icon: "🎯", title: "Nuestra misión", text: "Conectar a familias cruceñas con enfermeros profesionales verificados, garantizando atención de calidad en el hogar con rapidez, transparencia y calidez humana." },
                { icon: "🌟", title: "Nuestra visión", text: "Ser la plataforma de salud domiciliaria más confiable de Bolivia, expandiendo el acceso a atención profesional a todos los hogares que lo necesitan." },
                { icon: "💙", title: "Nuestros valores", text: "Confianza, profesionalismo y cercanía. Creemos que recibir buena atención médica en casa no debería ser un privilegio, sino un derecho de todas las familias." },
              ].map(({ icon, title, text }) => (
                <div key={title} style={{ background: C.white, borderRadius: "16px", padding: "2rem", border: `1px solid ${C.border}`, boxShadow: "0 2px 12px rgba(27,58,92,0.06)" }}>
                  <div style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{icon}</div>
                  <h3 style={{ color: C.navy, fontWeight: "800", fontSize: "1.1rem", marginBottom: "0.75rem" }}>{title}</h3>
                  <p style={{ color: C.muted, fontSize: "0.9rem", lineHeight: 1.75, margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>

            {/* Historia */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "center", marginBottom: "4rem" }}>
              <div>
                <div style={{ display: "inline-block", background: C.accent, color: C.tealDark, borderRadius: "100px", padding: "0.3rem 1rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: "700", marginBottom: "1rem" }}>Nuestra historia</div>
                <h2 style={{ color: C.navy, fontSize: "1.6rem", fontWeight: "800", marginBottom: "1rem", lineHeight: 1.3 }}>Todo empezó con una familia que necesitaba ayuda</h2>
                <p style={{ color: C.muted, lineHeight: 1.8, marginBottom: "1rem", fontSize: "0.95rem" }}>
                  En 2024, los fundadores de CuidaMed vivieron en carne propia la dificultad de encontrar un enfermero confiable para un familiar en Santa Cruz. Llamadas sin respuesta, recomendaciones de boca a boca y mucha incertidumbre.
                </p>
                <p style={{ color: C.muted, lineHeight: 1.8, fontSize: "0.95rem" }}>
                  De esa experiencia nació CuidaMed: una plataforma donde cualquier familia puede encontrar un enfermero verificado, ver sus calificaciones y solicitar el servicio en minutos.
                </p>
              </div>
              <div style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.bgAlt})`, borderRadius: "20px", padding: "2.5rem", border: `1px solid ${C.border}`, textAlign: "center" }}>
                <LogoIcon size={72} />
                <div style={{ marginTop: "1.5rem" }}>
                  {[["2024", "Fundación de CuidaMed"], ["10+", "Enfermeros en el primer mes"], ["100%", "Verificados y certificados"]].map(([n, l]) => (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: `1px solid ${C.border}` }}>
                      <span style={{ color: C.muted, fontSize: "0.85rem" }}>{l}</span>
                      <span style={{ color: C.navy, fontWeight: "800", fontSize: "1.1rem" }}>{n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Equipo */}
            <div style={{ marginBottom: "4rem" }}>
              <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                <div style={{ display: "inline-block", background: C.accent, color: C.tealDark, borderRadius: "100px", padding: "0.3rem 1rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: "700", marginBottom: "0.75rem" }}>El equipo</div>
                <h2 style={{ color: C.navy, fontSize: "1.6rem", fontWeight: "800", margin: 0 }}>Las personas detrás de CuidaMed</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
                {[
                  { initials: "RA", name: "Rodrigo Antezana", role: "CEO & Co-fundador", color: C.navy, desc: "Emprendedor cruceño con experiencia en tecnología y salud." },
                  { initials: "LP", name: "Laura Pedraza", role: "Directora de Operaciones", color: C.teal, desc: "Licenciada en enfermería con 12 años en el sector salud boliviano." },
                  { initials: "FM", name: "Felipe Méndez", role: "Tech Lead", color: C.tealDark, desc: "Desarrollador full-stack especializado en plataformas de servicios." },
                ].map(({ initials, name, role, color, desc }) => (
                  <div key={name} style={{ background: C.white, borderRadius: "16px", padding: "2rem 1.5rem", border: `1px solid ${C.border}`, textAlign: "center", boxShadow: "0 2px 12px rgba(27,58,92,0.06)" }}>
                    <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: "800", fontSize: "1.1rem", margin: "0 auto 1rem" }}>{initials}</div>
                    <div style={{ fontWeight: "800", color: C.navy, fontSize: "1rem", marginBottom: "0.25rem" }}>{name}</div>
                    <div style={{ color: C.tealDark, fontSize: "0.8rem", fontWeight: "600", marginBottom: "0.75rem" }}>{role}</div>
                    <div style={{ color: C.muted, fontSize: "0.82rem", lineHeight: 1.6 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Por qué elegirnos */}
            <div style={{ background: `linear-gradient(135deg, ${C.navy}, #1D5070)`, borderRadius: "20px", padding: "3rem 2rem", textAlign: "center", marginBottom: "2rem" }}>
              <h2 style={{ color: C.white, fontSize: "1.5rem", fontWeight: "800", marginBottom: "0.5rem" }}>¿Por qué elegir CuidaMed?</h2>
              <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2.5rem", fontSize: "0.9rem" }}>Nos diferenciamos en cada detalle</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "1.25rem" }}>
                {[
                  ["✅", "100% verificados", "Credenciales del Colegio de Enfermeras de Bolivia."],
                  ["⚡", "Respuesta rápida", "Confirmación en menos de 2 horas."],
                  ["⭐", "Calificaciones reales", "Solo pacientes reales pueden calificar."],
                  ["🔒", "Pago seguro", "Pagá vía QR o transferencia protegida."],
                ].map(([icon, title, desc]) => (
                  <div key={title} style={{ background: "rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.5rem 1rem", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{icon}</div>
                    <div style={{ color: C.tealLight, fontWeight: "700", fontSize: "0.9rem", marginBottom: "0.5rem" }}>{title}</div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", lineHeight: 1.6 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <button style={{ background: C.teal, color: C.white, border: "none", borderRadius: "8px", padding: "1rem 2.5rem", fontSize: "1rem", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 20px rgba(42,171,176,0.35)" }} onClick={() => setPage("search")}>
                Encontrar un enfermero →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {selectedNurse && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(27,58,92,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem", backdropFilter: "blur(3px)" }} onClick={() => setSelectedNurse(null)}>
          <div style={{ background: C.white, borderRadius: "16px", padding: "2rem", maxWidth: "430px", width: "100%", boxShadow: "0 30px 70px rgba(27,58,92,0.25)" }} onClick={e => e.stopPropagation()}>
            <button style={{ background: "none", border: "none", fontSize: "1.1rem", cursor: "pointer", float: "right", color: C.muted }} onClick={() => setSelectedNurse(null)}>✕</button>
            {booked ? (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ color: C.navy, marginBottom: "0.5rem", fontSize: "1.3rem" }}>¡Solicitud enviada!</h3>
                <p style={{ color: C.muted, fontSize: "0.9rem", lineHeight: 1.7 }}>
                  <strong>{selectedNurse.name}</strong> recibirá tu solicitud y te confirmará en breve por WhatsApp.
                </p>
                <div style={{ background: C.accent, borderRadius: "8px", padding: "1rem", margin: "1.5rem 0", fontSize: "0.85rem", color: C.tealDark }}>
                  📱 Revisá tu WhatsApp en los próximos minutos
                </div>
                <button style={{ background: C.teal, color: C.white, border: "none", borderRadius: "8px", padding: "0.85rem 2rem", fontSize: "0.9rem", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", width: "100%" }} onClick={() => setSelectedNurse(null)}>
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ color: C.navy, fontSize: "1.2rem", fontWeight: "800", marginBottom: "1.5rem", marginTop: "0.5rem" }}>Solicitar servicio</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", background: C.accent, borderRadius: "10px", padding: "1rem" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: selectedNurse.color, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: "800", fontSize: "0.95rem", flexShrink: 0 }}>{selectedNurse.avatar}</div>
                  <div>
                    <div style={{ fontWeight: "700", color: C.navy, fontSize: "0.95rem" }}>{selectedNurse.name}</div>
                    <div style={{ fontSize: "0.82rem", color: C.tealDark }}>{selectedNurse.specialty}</div>
                    <div style={{ fontSize: "0.78rem", color: C.muted }}>{selectedNurse.zone} · {selectedNurse.exp}</div>
                  </div>
                </div>
                {[["Tu nombre", "text", "Ej: Ana Rodríguez"], ["Tu teléfono", "tel", "Ej: 70012345"]].map(([lbl, type, ph]) => (
                  <div key={lbl} style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontSize: "0.78rem", color: C.muted, marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: "600" }}>{lbl}</label>
                    <input type={type} placeholder={ph} style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: "8px", padding: "0.7rem 1rem", fontSize: "0.9rem", fontFamily: "inherit", boxSizing: "border-box", color: C.text, outline: "none" }} />
                  </div>
                ))}
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", color: C.muted, marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: "600" }}>Fecha y hora</label>
                  <input type="datetime-local" style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: "8px", padding: "0.7rem 1rem", fontSize: "0.9rem", fontFamily: "inherit", boxSizing: "border-box", color: C.text, outline: "none" }} />
                </div>
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", color: C.muted, marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: "600" }}>Descripción</label>
                  <textarea placeholder="Describí brevemente qué necesitás..." style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: "8px", padding: "0.7rem 1rem", fontSize: "0.9rem", fontFamily: "inherit", boxSizing: "border-box", color: C.text, outline: "none", height: "80px", resize: "vertical" }} />
                </div>
                <button style={{ background: C.teal, color: C.white, border: "none", borderRadius: "8px", padding: "0.9rem", fontSize: "0.95rem", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", width: "100%", boxShadow: "0 4px 16px rgba(42,171,176,0.35)" }} onClick={() => setBooked(true)}>
                  Confirmar solicitud · Bs. {selectedNurse.price}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <footer style={{ background: C.navy, color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "2rem", fontSize: "0.82rem" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginBottom: "0.5rem" }}>
          <LogoIcon size={22} white />
          <span style={{ color: C.white, fontWeight: "700" }}>CuidaMed</span>
        </div>
        © 2025 CuidaMed · Santa Cruz de la Sierra, Bolivia · Enfermeros verificados con el Colegio de Enfermeras de Bolivia
      </footer>
    </div>
  );
}

function NurseCard({ nurse, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ background: C.white, borderRadius: "12px", overflow: "hidden", border: `1px solid ${C.border}`, transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer", transform: hovered ? "translateY(-4px)" : "none", boxShadow: hovered ? `0 16px 40px rgba(27,58,92,0.15)` : "0 2px 8px rgba(27,58,92,0.06)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ height: "6px", background: nurse.color }} />
      <div style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
          <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: nurse.color, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: "800", fontSize: "0.9rem", flexShrink: 0 }}>{nurse.avatar}</div>
          <div>
            <div style={{ fontWeight: "700", color: C.navy, fontSize: "0.95rem" }}>{nurse.name}</div>
            <div style={{ fontSize: "0.82rem", color: C.tealDark, fontWeight: "600" }}>{nurse.specialty}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <span style={{ background: C.accent, color: C.tealDark, borderRadius: "100px", padding: "0.25rem 0.7rem", fontSize: "0.75rem", fontWeight: "600" }}>📍 {nurse.zone}</span>
          <span style={{ background: nurse.available ? "#E6F7F1" : "#FEE8E7", color: nurse.available ? "#1A7A50" : "#C0392B", borderRadius: "100px", padding: "0.25rem 0.7rem", fontSize: "0.75rem", fontWeight: "700" }}>
            {nurse.available ? "● Disponible" : "○ Ocupado"}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: `1px solid ${C.border}`, fontSize: "0.85rem", color: C.muted, marginBottom: "1rem" }}>
          <span>⭐ <strong style={{ color: C.navy }}>{nurse.rating}</strong> ({nurse.reviews} reseñas)</span>
          <span>{nurse.exp}</span>
          <span style={{ fontWeight: "800", color: C.navy, fontSize: "1rem" }}>Bs. {nurse.price}</span>
        </div>
        <button
          style={{ background: nurse.available ? C.teal : "#CCC", color: C.white, border: "none", borderRadius: "8px", padding: "0.75rem", fontSize: "0.88rem", fontWeight: "700", cursor: nurse.available ? "pointer" : "not-allowed", fontFamily: "inherit", width: "100%", transition: "background 0.2s" }}
          onClick={() => nurse.available && onSelect()}
          disabled={!nurse.available}
        >
          {nurse.available ? "Solicitar servicio" : "No disponible"}
        </button>
      </div>
    </div>
  );
}
