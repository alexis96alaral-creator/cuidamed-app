import { useState } from "react";

/* ─── DESIGN TOKENS ─────────────────────────────────────────── */
const T = {
  navy:      "#0D2137",
  navyMid:   "#1B3A5C",
  teal:      "#2AABB0",
  tealLight: "#3DCDD3",
  tealGlow:  "rgba(42,171,176,0.18)",
  tealBorder:"rgba(42,171,176,0.30)",
  gold:      "#C9A84C",
  goldLight: "#F0C96A",
  white:     "#FFFFFF",
  offwhite:  "#F0F5F7",
  surface:   "#FFFFFF",
  surfaceAlt:"#F6FAFB",
  border:    "#DDE8EB",
  muted:     "#7A8F9C",
  text:      "#0D2137",
};

/* ─── NURSE DATA ─────────────────────────────────────────────── */
const nurses = [
  {
    id: 1,
    name: "Lic. María Fernández Salinas",
    gender: "f",
    initials: "MF",
    color: T.teal,
    experience: 8,
    rating: 4.9,
    reviews: 38,
    completedServices: 214,
    specialties: ["Cuidado de adulto mayor", "Enfermedades crónicas", "Cuidados paliativos"],
    services: [
      "Control de signos vitales",
      "Administración de medicamentos",
      "Curación y cambio de vendajes",
      "Colocación de sueros",
      "Higiene y movilización de pacientes",
      "Acompañamiento hospitalario",
    ],
    zones: ["Equipetrol", "Norte", "Urubichá", "Las Palmas"],
    schedule: {
      "Lun – Vie": "06:00 – 20:00",
      "Sábados":   "07:00 – 14:00",
      "Domingos":  "Previa coordinación",
    },
    bio: "Licenciada en Enfermería por la UAGRM con especialización en geriatría. Ocho años acompañando a familias cruceñas con dedicación, empatía y profesionalismo.",
  },
  {
    id: 2,
    name: "Lic. Carlos Suárez Méndez",
    gender: "m",
    initials: "CS",
    color: T.navyMid,
    experience: 5,
    rating: 4.8,
    reviews: 21,
    completedServices: 130,
    specialties: ["Enfermería general", "Post-operatorio", "Urgencias domiciliarias"],
    services: [
      "Inyecciones intramusculares y subcutáneas",
      "Colocación y mantenimiento de catéteres",
      "Curación de heridas quirúrgicas",
      "Control glicémico",
      "Administración de insulina",
      "Toma de muestras para laboratorio",
    ],
    zones: ["Norte", "Radial 26", "Plan 3000", "Villa Primero de Mayo"],
    schedule: {
      "Lun – Sáb": "07:00 – 19:00",
      "Domingos":  "08:00 – 12:00",
      "Urgencias": "24 horas (coordinación previa)",
    },
    bio: "Enfermero egresado de la UTEPSA con amplia experiencia en atención post-quirúrgica y manejo de pacientes diabéticos. Comprometido con la atención oportuna y de calidad.",
  },
  {
    id: 3,
    name: "Lic. Valeria Torrico Vaca",
    gender: "f",
    initials: "VT",
    color: "#1D6E6B",
    experience: 10,
    rating: 5.0,
    reviews: 54,
    completedServices: 310,
    specialties: ["Pediatría domiciliaria", "Neonatología", "Lactancia y cuidado neonatal"],
    services: [
      "Cuidado integral de recién nacidos",
      "Control de peso y talla pediátrico",
      "Nebulizaciones y fisioterapia respiratoria",
      "Aplicación de vacunas",
      "Orientación en lactancia materna",
      "Seguimiento de pacientes pediátricos crónicos",
    ],
    zones: ["Equipetrol", "Sirari", "Urubo", "Jardín Botánico"],
    schedule: {
      "Lun – Vie": "07:00 – 18:00",
      "Sábados":   "08:00 – 13:00",
      "Domingos":  "No disponible",
    },
    bio: "Diez años dedicados exclusivamente a la salud infantil. Especialista en neonatología con formación complementaria en Argentina. La profesional de mayor calificación en la plataforma CuidaMed.",
  },
];

const verifications = [
  { label: "Identidad verificada",                icon: "🪪" },
  { label: "Título profesional verificado",        icon: "🎓" },
  { label: "Matrícula profesional verificada",     icon: "📋" },
  { label: "Antecedentes penales verificados",     icon: "⚖️" },
  { label: "Antecedentes policiales verificados",  icon: "🛡️" },
  { label: "Contrato firmado con CuidaMed",        icon: "📝" },
];

/* ─── LOGO MARK ─────────────────────────────────────────────── */
function LogoMark({ size = 28, white = true }) {
  const f  = white ? "#FFFFFF" : T.teal;
  const f2 = white ? "rgba(255,255,255,0.55)" : T.navy;
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="10" r="7" fill={f} />
      <path d="M10 28C10 18 20 14 30 22C40 14 50 18 50 28C50 40 30 52 30 52C30 52 10 40 10 28Z" fill={f} opacity=".85"/>
      <rect x="24" y="30" width="12" height="10" rx="1" fill={f2} opacity=".9"/>
      <path d="M22 31L30 24L38 31" stroke={f2} strokeWidth="2" fill="none" strokeLinejoin="round"/>
      <rect x="27.5" y="34" width="5" height="6" rx=".5" fill={white?"rgba(255,255,255,.3)":"#E8F6F7"}/>
    </svg>
  );
}

/* ─── STAR RATING ────────────────────────────────────────────── */
function Stars({ rating }) {
  return (
    <span style={{ display:"inline-flex", gap:"2px" }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? T.gold : "#DDE8EB"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </span>
  );
}

/* ─── AVATAR ─────────────────────────────────────────────────── */
function Avatar({ nurse, size = 110 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${nurse.color}, ${T.tealLight})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: T.white, fontWeight: "800",
      fontSize: size * 0.28,
      fontFamily: "'Georgia', serif",
      boxShadow: `0 0 0 4px ${T.white}, 0 0 0 7px ${T.tealBorder}, 0 12px 40px rgba(42,171,176,0.25)`,
      flexShrink: 0,
      letterSpacing: "0.02em",
    }}>
      {nurse.initials}
    </div>
  );
}

/* ─── VERIFIED BADGE ─────────────────────────────────────────── */
function VerifiedBadge() {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      background: `linear-gradient(135deg, ${T.teal}, ${T.tealLight})`,
      borderRadius: "100px", padding: "5px 14px",
      boxShadow: `0 4px 14px ${T.tealGlow}`,
    }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span style={{ color: T.white, fontSize: "0.72rem", fontWeight: "800", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        Verificado por CuidaMed
      </span>
    </div>
  );
}

/* ─── TAG CHIP ───────────────────────────────────────────────── */
function Chip({ children, variant = "teal" }) {
  const styles = {
    teal:  { bg: "rgba(42,171,176,0.10)", color: T.tealDark || "#1D8A8F", border: T.tealBorder },
    navy:  { bg: "rgba(13,33,55,0.07)",  color: T.navyMid,               border: "rgba(27,58,92,0.18)" },
    gold:  { bg: "rgba(201,168,76,0.12)", color: "#9A6F1A",               border: "rgba(201,168,76,0.30)" },
  };
  const s = styles[variant];
  return (
    <span style={{
      display: "inline-block", padding: "4px 12px", borderRadius: "100px",
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      fontSize: "0.75rem", fontWeight: "700", lineHeight: 1,
    }}>
      {children}
    </span>
  );
}

/* ─── SECTION LABEL ──────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px",
      marginBottom: "1rem",
    }}>
      <div style={{ width: "3px", height: "18px", borderRadius: "2px", background: `linear-gradient(180deg, ${T.teal}, ${T.tealLight})` }} />
      <span style={{ fontSize: "0.72rem", fontWeight: "800", letterSpacing: "0.14em", textTransform: "uppercase", color: T.muted }}>
        {children}
      </span>
    </div>
  );
}

/* ─── VERIFICATION SECTION ───────────────────────────────────── */
function VerificationSection() {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${T.navy} 0%, #0F2A45 100%)`,
      borderRadius: "16px", padding: "1.75rem",
      border: `1px solid rgba(42,171,176,0.20)`,
      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(13,33,55,0.25)`,
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
        <div style={{
          width: "40px", height: "40px", borderRadius: "10px",
          background: T.tealGlow, border: `1px solid ${T.tealBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke={T.tealLight} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <div style={{ color: T.white, fontWeight: "800", fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
            Verificaciones realizadas por CuidaMed
          </div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.72rem", marginTop: "2px" }}>
            Proceso de validación completado · 2025
          </div>
        </div>
      </div>

      {/* Checks */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {verifications.map((v, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "12px",
            background: "rgba(255,255,255,0.04)", borderRadius: "10px",
            padding: "0.7rem 1rem",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            {/* Check icon */}
            <div style={{
              width: "26px", height: "26px", borderRadius: "50%",
              background: `linear-gradient(135deg, ${T.teal}, ${T.tealLight})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              boxShadow: `0 3px 10px ${T.tealGlow}`,
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize: "0.7rem", marginRight: "auto" }}>{v.icon}</span>
            <span style={{ color: "rgba(255,255,255,0.88)", fontSize: "0.82rem", fontWeight: "600", flex: 1 }}>
              {v.label}
            </span>
            <span style={{
              fontSize: "0.65rem", color: T.tealLight, fontWeight: "700",
              background: "rgba(42,171,176,0.12)", borderRadius: "100px",
              padding: "2px 8px", letterSpacing: "0.05em",
            }}>
              ✓ OK
            </span>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div style={{
        marginTop: "1.25rem", paddingTop: "1.25rem",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", gap: "8px",
      }}>
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: T.teal, flexShrink: 0 }} />
        <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.68rem", margin: 0, lineHeight: 1.5 }}>
          El proceso de verificación de CuidaMed incluye validación documental, consulta a registros del Colegio de Enfermeras de Bolivia y entrevista personal con el profesional.
        </p>
      </div>
    </div>
  );
}

/* ─── FULL PROFILE ───────────────────────────────────────────── */
function NurseProfile({ nurse }) {
  const [tab, setTab] = useState("servicios");

  return (
    <div style={{
      background: T.surface, borderRadius: "20px",
      border: `1px solid ${T.border}`,
      overflow: "hidden",
      boxShadow: "0 4px 24px rgba(13,33,55,0.08)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
    }}>

      {/* ── HERO HEADER ── */}
      <div style={{
        background: `linear-gradient(135deg, ${T.navy} 0%, #153352 60%, #0F2E48 100%)`,
        padding: "2rem 2rem 0",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background pattern */}
        <div style={{ position:"absolute", top:"-80px", right:"-80px", width:"260px", height:"260px", borderRadius:"50%", background:"rgba(42,171,176,0.07)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"0", left:"30%", width:"180px", height:"180px", borderRadius:"50%", background:"rgba(42,171,176,0.04)", pointerEvents:"none" }} />

        {/* Top bar */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1.5rem", position:"relative", zIndex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <LogoMark size={24} white />
            <span style={{ color:"rgba(255,255,255,0.6)", fontSize:"0.75rem", fontWeight:"700", letterSpacing:"0.1em", textTransform:"uppercase" }}>CuidaMed</span>
          </div>
          <VerifiedBadge />
        </div>

        {/* Profile info row */}
        <div style={{ display:"flex", gap:"1.5rem", alignItems:"flex-end", position:"relative", zIndex:1 }}>
          <div style={{ paddingBottom:"2rem" }}>
            <Avatar nurse={nurse} size={100} />
          </div>
          <div style={{ paddingBottom:"1.5rem", flex:1 }}>
            <h2 style={{ color:T.white, fontSize:"1.3rem", fontWeight:"700", margin:"0 0 0.25rem", lineHeight:1.2, fontFamily:"'Georgia',serif", letterSpacing:"-0.01em" }}>
              {nurse.name}
            </h2>
            <p style={{ color:T.tealLight, fontSize:"0.78rem", fontWeight:"600", margin:"0 0 0.75rem", letterSpacing:"0.02em" }}>
              Enfermero{nurse.gender==="f"?"a":""} Profesional Verificado{nurse.gender==="f"?"a":""} por CuidaMed
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem", alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                <Stars rating={nurse.rating} />
                <span style={{ color:T.goldLight, fontWeight:"800", fontSize:"0.82rem" }}>{nurse.rating}</span>
                <span style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.75rem" }}>({nurse.reviews} reseñas)</span>
              </div>
              <span style={{ color:"rgba(255,255,255,0.2)", fontSize:"0.8rem" }}>·</span>
              <span style={{ color:"rgba(255,255,255,0.55)", fontSize:"0.75rem" }}>
                {nurse.completedServices} servicios completados
              </span>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{
          display:"grid", gridTemplateColumns:"repeat(3,1fr)",
          background:"rgba(0,0,0,0.25)",
          borderTop:"1px solid rgba(255,255,255,0.07)",
          position:"relative", zIndex:1,
          marginLeft:"-2rem", marginRight:"-2rem",
        }}>
          {[
            ["Experiencia", `${nurse.experience} años`],
            ["Servicios",   `${nurse.completedServices}`],
            ["Calificación", `${nurse.rating} / 5.0`],
          ].map(([label, value], i) => (
            <div key={i} style={{
              textAlign:"center", padding:"0.9rem 0.5rem",
              borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <div style={{ color:T.tealLight, fontWeight:"800", fontSize:"1rem", fontFamily:"'Georgia',serif" }}>{value}</div>
              <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.65rem", textTransform:"uppercase", letterSpacing:"0.1em", marginTop:"2px" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ padding:"1.75rem 2rem" }}>

        {/* Bio */}
        <p style={{ color:T.muted, fontSize:"0.88rem", lineHeight:1.8, margin:"0 0 1.75rem", fontStyle:"italic", borderLeft:`3px solid ${T.border}`, paddingLeft:"1rem" }}>
          {nurse.bio}
        </p>

        {/* Specialties */}
        <div style={{ marginBottom:"1.75rem" }}>
          <SectionLabel>Especialidades</SectionLabel>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
            {nurse.specialties.map((s, i) => <Chip key={i} variant="teal">{s}</Chip>)}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ marginBottom:"1.5rem" }}>
          <div style={{ display:"flex", borderBottom:`2px solid ${T.border}`, marginBottom:"1.25rem", gap:"0" }}>
            {["servicios","zonas","horarios"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                background:"none", border:"none", cursor:"pointer",
                padding:"0.6rem 1.25rem",
                fontSize:"0.75rem", fontWeight:"700",
                textTransform:"uppercase", letterSpacing:"0.1em",
                color: tab===t ? T.teal : T.muted,
                borderBottom: tab===t ? `2px solid ${T.teal}` : "2px solid transparent",
                marginBottom:"-2px", transition:"all 0.2s",
                fontFamily:"'Georgia',serif",
              }}>
                {{ servicios:"Servicios", zonas:"Zonas", horarios:"Horarios" }[t]}
              </button>
            ))}
          </div>

          {tab === "servicios" && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem" }}>
              {nurse.services.map((s, i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"8px", padding:"0.6rem 0.75rem", background:T.surfaceAlt, borderRadius:"8px", border:`1px solid ${T.border}` }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink:0, marginTop:"1px" }}>
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke={T.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize:"0.78rem", color:T.text, lineHeight:1.4 }}>{s}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "zonas" && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
              {nurse.zones.map((z, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"6px", padding:"0.55rem 1rem", background:T.surfaceAlt, borderRadius:"100px", border:`1px solid ${T.border}` }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke={T.teal} strokeWidth="2"/>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke={T.teal} strokeWidth="2"/>
                  </svg>
                  <span style={{ fontSize:"0.8rem", color:T.text, fontWeight:"600" }}>{z}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "horarios" && (
            <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
              {Object.entries(nurse.schedule).map(([day, hours], i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0.75rem 1rem", background:T.surfaceAlt, borderRadius:"10px", border:`1px solid ${T.border}` }}>
                  <span style={{ fontSize:"0.8rem", color:T.muted, fontWeight:"700", textTransform:"uppercase", letterSpacing:"0.06em" }}>{day}</span>
                  <span style={{ fontSize:"0.82rem", color:T.text, fontWeight:"700" }}>{hours}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Verification */}
        <VerificationSection />

        {/* CTA */}
        <div style={{ marginTop:"1.5rem", display:"flex", gap:"0.75rem" }}>
          <button style={{
            flex:1, background:`linear-gradient(135deg, ${T.teal}, ${T.tealLight})`,
            color:T.white, border:"none", borderRadius:"10px",
            padding:"0.9rem", fontSize:"0.88rem", fontWeight:"800",
            cursor:"pointer", fontFamily:"'Georgia',serif",
            boxShadow:`0 6px 20px ${T.tealGlow}`, letterSpacing:"0.02em",
          }}>
            Solicitar servicio
          </button>
          <button style={{
            width:"48px", height:"48px", background:T.surfaceAlt,
            border:`1.5px solid ${T.border}`, borderRadius:"10px",
            display:"flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer", flexShrink:0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke={T.muted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── NURSE CARD (list view) ─────────────────────────────────── */
function NurseCard({ nurse, active, onClick }) {
  return (
    <div onClick={onClick} style={{
      display:"flex", gap:"0.85rem", alignItems:"center",
      padding:"0.9rem 1rem", borderRadius:"12px", cursor:"pointer",
      background: active ? `linear-gradient(135deg, rgba(42,171,176,0.10), rgba(42,171,176,0.05))` : "transparent",
      border: active ? `1.5px solid ${T.tealBorder}` : `1.5px solid transparent`,
      transition:"all 0.2s",
    }}>
      <Avatar nurse={nurse} size={46} />
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontWeight:"700", color:T.navy, fontSize:"0.85rem", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{nurse.name}</div>
        <div style={{ color:T.muted, fontSize:"0.73rem", marginTop:"2px" }}>{nurse.specialties[0]}</div>
        <div style={{ display:"flex", alignItems:"center", gap:"4px", marginTop:"3px" }}>
          <Stars rating={nurse.rating} />
          <span style={{ color:T.gold, fontSize:"0.72rem", fontWeight:"700" }}>{nurse.rating}</span>
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink:0, opacity: active ? 1 : 0.3 }}>
        <path d="M9 18l6-6-6-6" stroke={T.teal} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

/* ─── APP ROOT ───────────────────────────────────────────────── */
export default function App() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{
      minHeight:"100vh", background:`linear-gradient(160deg, #EDF4F6 0%, #F4F8F9 50%, #E8F2F5 100%)`,
      fontFamily:"'Georgia','Times New Roman',serif",
    }}>
      {/* Top Nav */}
      <nav style={{
        background:T.navy, height:"60px", display:"flex", alignItems:"center",
        padding:"0 2rem", justifyContent:"space-between",
        boxShadow:"0 2px 16px rgba(13,33,55,0.3)", position:"sticky", top:0, zIndex:100,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:"9px" }}>
          <LogoMark size={30} white />
          <span style={{ color:T.white, fontWeight:"700", fontSize:"1.15rem", letterSpacing:"-0.01em" }}>
            Cuida<span style={{ color:T.tealLight }}>Med</span>
          </span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"6px", background:"rgba(42,171,176,0.15)", borderRadius:"100px", padding:"5px 14px", border:`1px solid ${T.tealBorder}` }}>
          <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:T.tealLight }} />
          <span style={{ color:T.tealLight, fontSize:"0.72rem", fontWeight:"700", letterSpacing:"0.1em", textTransform:"uppercase" }}>Perfiles Verificados</span>
        </div>
      </nav>

      {/* Layout */}
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"2rem 1.5rem", display:"grid", gridTemplateColumns:"300px 1fr", gap:"1.5rem", alignItems:"start" }}>

        {/* Sidebar */}
        <div style={{ background:T.white, borderRadius:"16px", padding:"1.25rem", border:`1px solid ${T.border}`, boxShadow:"0 2px 12px rgba(13,33,55,0.06)", position:"sticky", top:"80px" }}>
          <div style={{ marginBottom:"1rem" }}>
            <div style={{ fontSize:"0.65rem", fontWeight:"800", letterSpacing:"0.15em", textTransform:"uppercase", color:T.muted, marginBottom:"0.75rem" }}>
              Enfermeros disponibles
            </div>
            {nurses.map((n, i) => (
              <NurseCard key={n.id} nurse={n} active={i===selected} onClick={() => setSelected(i)} />
            ))}
          </div>
          <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:"1rem", display:"flex", alignItems:"center", gap:"8px" }}>
            <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:T.teal, flexShrink:0 }} />
            <span style={{ fontSize:"0.7rem", color:T.muted }}>Todos los perfiles han pasado el proceso de verificación CuidaMed.</span>
          </div>
        </div>

        {/* Profile */}
        <NurseProfile nurse={nurses[selected]} />
      </div>
    </div>
  );
}
