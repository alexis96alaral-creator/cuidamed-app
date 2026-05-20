import { useState, useEffect } from "react";

const SUPABASE_URL = "https://jhmlpiimhlhpgvrqwepp.supabase.co";
const SUPABASE_KEY = "sb_publishable_yS9NILyxhmUDAdQTisR0tw_zEF-4di0";

const C = {
  navy: "#1B3A5C", teal: "#2AABB0", tealLight: "#3BBFC4", tealDark: "#1D8A8F",
  bg: "#F4F8F9", white: "#FFFFFF", text: "#1A1A2E", muted: "#6B7E8F",
  border: "#C8DDE0", accent: "#E8F6F7", green: "#25D366", red: "#E74C3C",
};

const ESPECIALIDADES = [
  "Enfermería general", "Cuidado adulto mayor", "Pediatría domiciliaria",
  "Post-operatorio", "Urgencias domiciliarias", "Cuidados paliativos",
  "Neonatología", "Enfermedades crónicas",
];

const ZONAS = [
  "Equipetrol", "Norte", "Plan 3000", "Radial 26", "Sirari",
  "Las Palmas", "Urubo", "Jardín Botánico", "Hamacas", "Villa Primero de Mayo",
];

/* ── Supabase helpers ── */
async function sbFetch(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${options.token || SUPABASE_KEY}`,
      ...options.headers,
    },
  });
  const data = await res.json();
  return { data, ok: res.ok, status: res.status };
}

async function signUp(email, password, nombre) {
  return sbFetch("/auth/v1/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, data: { nombre_completo: nombre } }),
  });
}

async function signIn(email, password) {
  return sbFetch("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

async function signOut(token) {
  return sbFetch("/auth/v1/logout", { method: "POST", token });
}

async function getProfile(userId, token) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/enfermeros?id=eq.${userId}&select=*`, {
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return { data, ok: res.ok };
}

async function updateProfile(userId, token, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/enfermeros?id=eq.${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${token}`,
      "Prefer": "return=representation",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return { data: result, ok: res.ok, status: res.status };
}

async function getServicios(enfermeroId, token) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/servicios?enfermero_id=eq.${enfermeroId}&order=created_at.desc&select=*`, {
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return { data, ok: res.ok };
}

/* ── Icons ── */
function Icon({ d, size = 20, color = "currentColor", fill = "none" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function LogoIcon({ size = 28, white = true }) {
  const f = white ? "#fff" : C.teal;
  const f2 = white ? "rgba(255,255,255,0.6)" : C.navy;
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="10" r="7" fill={f}/>
      <path d="M10 28C10 18 20 14 30 22C40 14 50 18 50 28C50 40 30 52 30 52C30 52 10 40 10 28Z" fill={f} opacity=".85"/>
      <rect x="24" y="30" width="12" height="10" rx="1" fill={f2} opacity=".9"/>
      <path d="M22 31L30 24L38 31" stroke={f2} strokeWidth="2" fill="none" strokeLinejoin="round"/>
      <rect x="27.5" y="34" width="5" height="6" rx=".5" fill={white?"rgba(255,255,255,.3)":"#E8F6F7"}/>
    </svg>
  );
}

/* ── Auth Form ── */
function AuthForm({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ nombre: "", email: "", password: "", confirm: "" });

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); setError(""); }

  async function handleSubmit() {
    setError(""); setLoading(true);
    try {
      if (mode === "register") {
        if (!form.nombre.trim()) { setError("Ingresá tu nombre completo."); return; }
        if (form.password !== form.confirm) { setError("Las contraseñas no coinciden."); return; }
        if (form.password.length < 6) { setError("La contraseña debe tener al menos 6 caracteres."); return; }
        const { data, ok } = await signUp(form.email, form.password, form.nombre);
        if (!ok) { setError(data.msg || data.error_description || "Error al registrarse."); return; }
        if (data.access_token) { onLogin(data); return; }
        setError("Revisá tu email para confirmar tu cuenta, luego ingresá.");
        setMode("login");
      } else {
        const { data, ok } = await signIn(form.email, form.password);
        if (!ok) { setError("Email o contraseña incorrectos."); return; }
        onLogin(data);
      }
    } finally { setLoading(false); }
  }

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(145deg, #0D2137, ${C.navy}, ${C.tealDark})`, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: C.white, borderRadius: "20px", padding: "2.5rem 2rem", width: "100%", maxWidth: "420px", boxShadow: "0 30px 80px rgba(13,33,55,0.3)" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "56px", height: "56px", background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, borderRadius: "16px", marginBottom: "1rem", boxShadow: `0 8px 24px rgba(42,171,176,0.3)` }}>
            <LogoIcon size={32} white />
          </div>
          <h1 style={{ color: C.navy, fontSize: "1.4rem", fontWeight: "800", marginBottom: "0.25rem" }}>CuidaMed</h1>
          <p style={{ color: C.muted, fontSize: "0.85rem" }}>Portal de Enfermeros</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: C.bg, borderRadius: "10px", padding: "4px", marginBottom: "1.5rem" }}>
          {[["login","Ingresar"],["register","Registrarse"]].map(([m,lbl]) => (
            <button key={m} onClick={() => { setMode(m); setError(""); }} style={{ flex:1, padding:"0.6rem", borderRadius:"8px", border:"none", cursor:"pointer", fontWeight:"700", fontSize:"0.85rem", background: mode===m ? C.white : "transparent", color: mode===m ? C.navy : C.muted, boxShadow: mode===m ? "0 2px 8px rgba(27,58,92,0.1)" : "none", transition:"all 0.2s", fontFamily:"inherit" }}>
              {lbl}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {mode === "register" && (
            <div>
              <label style={{ display:"block", fontSize:"0.72rem", color:C.muted, marginBottom:"0.3rem", textTransform:"uppercase", letterSpacing:"0.07em", fontWeight:"600" }}>Nombre completo</label>
              <input placeholder="Lic. Ana Rodríguez" value={form.nombre} onChange={e => set("nombre", e.target.value)} style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:"8px", padding:"0.75rem 1rem", fontSize:"0.9rem", boxSizing:"border-box", outline:"none", color:C.text }} />
            </div>
          )}
          <div>
            <label style={{ display:"block", fontSize:"0.72rem", color:C.muted, marginBottom:"0.3rem", textTransform:"uppercase", letterSpacing:"0.07em", fontWeight:"600" }}>Email</label>
            <input type="email" placeholder="tu@email.com" value={form.email} onChange={e => set("email", e.target.value)} style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:"8px", padding:"0.75rem 1rem", fontSize:"0.9rem", boxSizing:"border-box", outline:"none", color:C.text }} />
          </div>
          <div>
            <label style={{ display:"block", fontSize:"0.72rem", color:C.muted, marginBottom:"0.3rem", textTransform:"uppercase", letterSpacing:"0.07em", fontWeight:"600" }}>Contraseña</label>
            <input type="password" placeholder="••••••••" value={form.password} onChange={e => set("password", e.target.value)} style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:"8px", padding:"0.75rem 1rem", fontSize:"0.9rem", boxSizing:"border-box", outline:"none", color:C.text }} />
          </div>
          {mode === "register" && (
            <div>
              <label style={{ display:"block", fontSize:"0.72rem", color:C.muted, marginBottom:"0.3rem", textTransform:"uppercase", letterSpacing:"0.07em", fontWeight:"600" }}>Confirmar contraseña</label>
              <input type="password" placeholder="••••••••" value={form.confirm} onChange={e => set("confirm", e.target.value)} style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:"8px", padding:"0.75rem 1rem", fontSize:"0.9rem", boxSizing:"border-box", outline:"none", color:C.text }} />
            </div>
          )}
        </div>

        {error && (
          <div style={{ background: "#FEE8E7", borderRadius: "8px", padding: "0.75rem 1rem", marginTop: "1rem", color: C.red, fontSize: "0.82rem", fontWeight: "600" }}>
            ⚠️ {error}
          </div>
        )}

        <button onClick={handleSubmit} disabled={loading} style={{ width:"100%", background:`linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, color:C.white, border:"none", borderRadius:"10px", padding:"0.9rem", fontSize:"0.95rem", fontWeight:"800", cursor:loading?"not-allowed":"pointer", marginTop:"1.25rem", boxShadow:`0 6px 20px rgba(42,171,176,0.35)`, fontFamily:"inherit", opacity:loading?0.7:1 }}>
          {loading ? "Cargando..." : mode === "login" ? "Ingresar" : "Crear cuenta"}
        </button>

        {mode === "register" && (
          <p style={{ color: C.muted, fontSize: "0.72rem", textAlign: "center", marginTop: "1rem", lineHeight: 1.5 }}>
            Al registrarte aceptás que CuidaMed verificará tus credenciales profesionales antes de activar tu perfil público.
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Dashboard ── */
function Dashboard({ session, onLogout }) {
  const [tab, setTab] = useState("perfil");
  const [profile, setProfile] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const token = session.access_token;
  const userId = session.user.id;

  useEffect(() => {
    async function load() {
      setLoadingData(true);
      const [prof, svcs] = await Promise.all([
        getProfile(userId, token),
        getServicios(userId, token),
      ]);
      if (prof.ok && prof.data[0]) setProfile(prof.data[0]);
      if (svcs.ok) setServicios(svcs.data);
      setLoadingData(false);
    }
    load();
  }, [userId, token]);

  function setP(k, v) { setProfile(p => ({ ...p, [k]: v })); setSaved(false); }

  async function handleSave() {
    setSaving(true);
    const { ok } = await updateProfile(userId, token, {
      nombre_completo: profile.nombre_completo,
      telefono: profile.telefono,
      especialidad: profile.especialidad,
      zona: profile.zona,
      experiencia_anos: profile.experiencia_anos,
      trabajo_actual: profile.trabajo_actual,
      bio: profile.bio,
      disponible: profile.disponible,
    });
    setSaving(false);
    if (ok) setSaved(true);
  }

  async function toggleDisponible() {
    const nuevo = !profile.disponible;
    setP("disponible", nuevo);
    await updateProfile(userId, token, { disponible: nuevo });
  }

  async function handleLogout() {
    await signOut(token);
    onLogout();
  }

  const completados = servicios.filter(s => s.estado === "completado").length;
  const pendientes  = servicios.filter(s => s.estado === "pendiente").length;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif" }}>

      {/* Nav */}
      <nav style={{ background: C.navy, height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", boxShadow: "0 2px 12px rgba(27,58,92,0.25)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <LogoIcon size={28} white />
          <div>
            <span style={{ color: C.white, fontWeight: "800", fontSize: "1rem" }}>Cuida</span>
            <span style={{ color: C.teal,  fontWeight: "800", fontSize: "1rem" }}>Med</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", marginLeft: "6px" }}>Portal Enfermero</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {profile && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: "800", fontSize: "0.75rem" }}>
                {(profile.nombre_completo || "?")[0].toUpperCase()}
              </div>
              <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.82rem" }}>{(profile.nombre_completo || "").split(" ")[0]}</span>
            </div>
          )}
          <button onClick={handleLogout} style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px", padding: "0.35rem 0.85rem", fontSize: "0.78rem", cursor: "pointer", fontFamily: "inherit" }}>
            Salir
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "1.5rem 1rem 4rem" }}>

        {loadingData ? (
          <div style={{ textAlign: "center", padding: "4rem", color: C.muted }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
            Cargando tu perfil...
          </div>
        ) : (
          <>
            {/* Stats cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
              {[
                { label: "Servicios completados", value: completados, icon: "✅", color: "#1A7A50", bg: "#E6F7F1" },
                { label: "Solicitudes pendientes", value: pendientes,  icon: "⏳", color: "#B7791F", bg: "#FEF3C7" },
                { label: "Estado actual",  value: profile?.disponible ? "Disponible" : "No disponible", icon: profile?.disponible ? "🟢" : "🔴", color: profile?.disponible ? "#1A7A50" : C.red, bg: profile?.disponible ? "#E6F7F1" : "#FEE8E7" },
              ].map(({ label, value, icon, color, bg }) => (
                <div key={label} style={{ background: C.white, borderRadius: "12px", padding: "1.25rem", border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(27,58,92,0.05)" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{icon}</div>
                  <div style={{ fontWeight: "800", color, fontSize: "1.2rem" }}>{value}</div>
                  <div style={{ color: C.muted, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: "0.2rem" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", borderBottom: `2px solid ${C.border}` }}>
              {[["perfil","👤 Mi perfil"],["disponibilidad","📅 Disponibilidad"],["servicios","📋 Mis servicios"]].map(([t,lbl]) => (
                <button key={t} onClick={() => setTab(t)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.7rem 1.25rem", fontWeight: "700", fontSize: "0.82rem", color: tab===t ? C.teal : C.muted, borderBottom: tab===t ? `2px solid ${C.teal}` : "2px solid transparent", marginBottom: "-2px", fontFamily: "inherit", transition: "all 0.2s" }}>
                  {lbl}
                </button>
              ))}
            </div>

            {/* PERFIL TAB */}
            {tab === "perfil" && profile && (
              <div style={{ background: C.white, borderRadius: "16px", padding: "2rem", border: `1px solid ${C.border}`, boxShadow: "0 2px 12px rgba(27,58,92,0.06)" }}>
                <h2 style={{ color: C.navy, fontSize: "1.1rem", fontWeight: "800", marginBottom: "1.5rem" }}>Información profesional</h2>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[
                    ["Nombre completo", "nombre_completo", "text", "Lic. Ana Rodríguez"],
                    ["Teléfono", "telefono", "tel", "70012345"],
                    ["Años de experiencia", "experiencia_anos", "number", "5"],
                    ["Trabajo actual", "trabajo_actual", "text", "Hospital Percy Boland"],
                  ].map(([lbl, key, type, ph]) => (
                    <div key={key}>
                      <label style={{ display:"block", fontSize:"0.72rem", color:C.muted, marginBottom:"0.3rem", textTransform:"uppercase", letterSpacing:"0.07em", fontWeight:"600" }}>{lbl}</label>
                      <input type={type} placeholder={ph} value={profile[key]||""} onChange={e => setP(key, e.target.value)} style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:"8px", padding:"0.7rem 1rem", fontSize:"0.88rem", boxSizing:"border-box", color:C.text, outline:"none" }} />
                    </div>
                  ))}

                  <div>
                    <label style={{ display:"block", fontSize:"0.72rem", color:C.muted, marginBottom:"0.3rem", textTransform:"uppercase", letterSpacing:"0.07em", fontWeight:"600" }}>Especialidad</label>
                    <select value={profile.especialidad||""} onChange={e => setP("especialidad", e.target.value)} style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:"8px", padding:"0.7rem 1rem", fontSize:"0.88rem", boxSizing:"border-box", color:C.text, outline:"none", background:C.white }}>
                      <option value="">Seleccioná una especialidad</option>
                      {ESPECIALIDADES.map(e => <option key={e}>{e}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={{ display:"block", fontSize:"0.72rem", color:C.muted, marginBottom:"0.3rem", textTransform:"uppercase", letterSpacing:"0.07em", fontWeight:"600" }}>Zona de atención</label>
                    <select value={profile.zona||""} onChange={e => setP("zona", e.target.value)} style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:"8px", padding:"0.7rem 1rem", fontSize:"0.88rem", boxSizing:"border-box", color:C.text, outline:"none", background:C.white }}>
                      <option value="">Seleccioná una zona</option>
                      {ZONAS.map(z => <option key={z}>{z}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <label style={{ display:"block", fontSize:"0.72rem", color:C.muted, marginBottom:"0.3rem", textTransform:"uppercase", letterSpacing:"0.07em", fontWeight:"600" }}>Presentación profesional</label>
                  <textarea placeholder="Contá brevemente tu experiencia y enfoque profesional..." value={profile.bio||""} onChange={e => setP("bio", e.target.value)} style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:"8px", padding:"0.7rem 1rem", fontSize:"0.88rem", boxSizing:"border-box", color:C.text, outline:"none", height:"90px", resize:"vertical" }} />
                </div>

                {!profile.verificado && (
                  <div style={{ background: "#FEF3C7", borderRadius: "10px", padding: "0.9rem 1rem", marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1.25rem" }}>⏳</span>
                    <div>
                      <div style={{ fontWeight: "700", color: "#92400E", fontSize: "0.85rem" }}>Perfil pendiente de verificación</div>
                      <div style={{ color: "#92400E", fontSize: "0.78rem", marginTop: "2px" }}>CuidaMed verificará tus credenciales. Recibirás un WhatsApp cuando estés activo.</div>
                    </div>
                  </div>
                )}

                {profile.verificado && (
                  <div style={{ background: "#E6F7F1", borderRadius: "10px", padding: "0.9rem 1rem", marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1.25rem" }}>✅</span>
                    <div style={{ fontWeight: "700", color: "#1A7A50", fontSize: "0.85rem" }}>Perfil verificado por CuidaMed</div>
                  </div>
                )}

                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", alignItems: "center" }}>
                  <button onClick={handleSave} disabled={saving} style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, color: C.white, border: "none", borderRadius: "8px", padding: "0.8rem 2rem", fontSize: "0.9rem", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", boxShadow: `0 4px 16px rgba(42,171,176,0.3)` }}>
                    {saving ? "Guardando..." : "Guardar cambios"}
                  </button>
                  {saved && <span style={{ color: "#1A7A50", fontWeight: "700", fontSize: "0.85rem" }}>✓ Guardado</span>}
                </div>
              </div>
            )}

            {/* DISPONIBILIDAD TAB */}
            {tab === "disponibilidad" && profile && (
              <div style={{ background: C.white, borderRadius: "16px", padding: "2rem", border: `1px solid ${C.border}` }}>
                <h2 style={{ color: C.navy, fontSize: "1.1rem", fontWeight: "800", marginBottom: "1.5rem" }}>Mi disponibilidad</h2>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem", background: profile.disponible ? "#E6F7F1" : "#FEE8E7", borderRadius: "12px", marginBottom: "1.5rem", border: `1px solid ${profile.disponible ? "#A7F3D0" : "#FECACA"}` }}>
                  <div>
                    <div style={{ fontWeight: "800", color: profile.disponible ? "#1A7A50" : C.red, fontSize: "1rem" }}>
                      {profile.disponible ? "🟢 Estás disponible" : "🔴 No disponible"}
                    </div>
                    <div style={{ color: C.muted, fontSize: "0.82rem", marginTop: "0.25rem" }}>
                      {profile.disponible ? "Los pacientes pueden solicitarte servicios." : "Tu perfil no aparece en búsquedas activas."}
                    </div>
                  </div>
                  <button onClick={toggleDisponible} style={{ background: profile.disponible ? C.red : C.green, color: C.white, border: "none", borderRadius: "8px", padding: "0.7rem 1.25rem", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit" }}>
                    {profile.disponible ? "Pausar" : "Activar"}
                  </button>
                </div>

                <div style={{ background: C.accent, borderRadius: "10px", padding: "1rem", fontSize: "0.82rem", color: C.tealDark, lineHeight: 1.6 }}>
                  💡 <strong>Tip:</strong> Actualizá tu disponibilidad cuando salgas de vacaciones, estés en otro trabajo o no puedas atender. Esto evita solicitudes que no podés cumplir.
                </div>
              </div>
            )}

            {/* SERVICIOS TAB */}
            {tab === "servicios" && (
              <div style={{ background: C.white, borderRadius: "16px", padding: "2rem", border: `1px solid ${C.border}` }}>
                <h2 style={{ color: C.navy, fontSize: "1.1rem", fontWeight: "800", marginBottom: "1.5rem" }}>Historial de servicios</h2>

                {servicios.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "3rem 0", color: C.muted }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📋</div>
                    <div style={{ fontWeight: "700", marginBottom: "0.5rem" }}>Todavía no tenés servicios registrados</div>
                    <div style={{ fontSize: "0.85rem" }}>Cuando CuidaMed te asigne un servicio, aparecerá aquí.</div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {servicios.map(s => (
                      <div key={s.id} style={{ border: `1px solid ${C.border}`, borderRadius: "10px", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                            <span style={{ fontWeight: "700", color: C.navy, fontSize: "0.9rem" }}>{s.paciente_nombre}</span>
                            <span style={{ background: s.estado==="completado" ? "#E6F7F1" : s.estado==="cancelado" ? "#FEE8E7" : "#FEF3C7", color: s.estado==="completado" ? "#1A7A50" : s.estado==="cancelado" ? C.red : "#92400E", borderRadius:"100px", padding:"0.15rem 0.6rem", fontSize:"0.68rem", fontWeight:"700" }}>
                              {s.estado}
                            </span>
                          </div>
                          <div style={{ color: C.muted, fontSize: "0.78rem" }}>{s.tipo_servicio} · {s.zona}</div>
                          {s.descripcion && <div style={{ color: C.muted, fontSize: "0.75rem", marginTop: "0.3rem" }}>{s.descripcion}</div>}
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          {s.precio && <div style={{ fontWeight: "800", color: C.navy, fontSize: "0.95rem" }}>Bs. {s.precio}</div>}
                          <div style={{ color: C.muted, fontSize: "0.72rem", marginTop: "0.2rem" }}>
                            {s.fecha ? new Date(s.fecha).toLocaleDateString("es-BO") : new Date(s.created_at).toLocaleDateString("es-BO")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ── Main export ── */
export default function EnfermeroPortal() {
  const [session, setSession] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cuidamed_session")); } catch { return null; }
  });

  function handleLogin(data) {
    localStorage.setItem("cuidamed_session", JSON.stringify(data));
    setSession(data);
  }

  function handleLogout() {
    localStorage.removeItem("cuidamed_session");
    setSession(null);
  }

  if (!session) return <AuthForm onLogin={handleLogin} />;
  return <Dashboard session={session} onLogout={handleLogout} />;
}
