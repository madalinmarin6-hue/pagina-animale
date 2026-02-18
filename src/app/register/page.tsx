"use client";

import { useMemo, useState } from "react";

type Mode = "login" | "register";
type Role = "user" | "breeder" | "services";

export default function RegisterPage() {
  const [mode, setMode] = useState<Mode>("register");
  const [lang, setLang] = useState<"ro" | "en">("ro");

  // form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("user");

  const t = useMemo(() => {
    const ro = {
      brand: "TopBreeders",
      tagline:
        "Locul unde comunitatea iubitorilor de animale se întâlnește. Găsește, adoptă și îngrijește prietenul tău.",
      login: "Autentificare",
      register: "Înregistrare",
      fullName: "Nume Complet",
      email: "Adresa de Email",
      pass: "Parola",
      selectRole: "SELECTEAZĂ ROLUL",
      user: "Utilizator",
      breeder: "Breeder",
      services: "Servicii",
      createAccount: "Creează cont",
      signIn: "Intră în cont",
      terms: "Prin continuarea navigării, ești de acord cu Termeni și Condițiile noastre.",
      hint: "Platformă modernă pentru crescători și servicii.",
      hint2: "Verificare documente pentru Breeder",
      missing: "Completează câmpurile necesare.",
    };
    const en = {
      brand: "TopBreeders",
      tagline:
        "Where animal lovers meet. Find, adopt and care for your best friend.",
      login: "Login",
      register: "Register",
      fullName: "Full name",
      email: "Email address",
      pass: "Password",
      selectRole: "SELECT ROLE",
      user: "User",
      breeder: "Breeder",
      services: "Services",
      createAccount: "Create account",
      signIn: "Sign in",
      terms: "By continuing, you agree to our Terms and Conditions.",
      hint: "Modern platform for breeders and services.",
      hint2: "Document verification for Breeders",
      missing: "Please fill required fields.",
    };

    return lang === "ro" ? ro : en;
  }, [lang]);

  const isEmailValid = email.includes("@") && email.includes(".");
  const isPasswordValid = password.length >= 6;

  const canSubmit =
    mode === "login"
      ? isEmailValid && isPasswordValid
      : fullName.trim().length >= 2 && isEmailValid && isPasswordValid;

  function onSubmit() {
    if (!canSubmit) {
      alert(t.missing);
      return;
    }

    // momentan doar demonstrăm că butoanele funcționează.
    // următorul pas: legăm Supabase Auth + roluri.
    alert(
      mode === "register"
        ? `REGISTER OK ✅\nname=${fullName}\nemail=${email}\nrole=${role}\nlang=${lang}`
        : `LOGIN OK ✅\nemail=${email}\nlang=${lang}`
    );
  }

  return (
    <main style={page}>
      <div style={shell}>
        {/* LEFT */}
        <section style={left}>
          <div>
            <h1 style={brand}>{t.brand}</h1>
            <p style={tagline}>{t.tagline}</p>
          </div>

          <div style={leftBottom}>
            <div style={leftHintTitle}>{t.hint}</div>
            <div style={leftHintSub}>📄 {t.hint2}</div>
            <div style={{ opacity: 0.6, marginTop: 8 }}>© 2026 TopBreeders Inc.</div>
          </div>
        </section>

        {/* RIGHT */}
        <section style={right}>
          {/* Top row: lang */}
          <div style={topRow}>
            <div style={langWrap}>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as any)}
                style={langSelect}
                aria-label="Language"
              >
                <option value="ro">🇷🇴</option>
                <option value="en">🇬🇧</option>
              </select>
            </div>
          </div>

          {/* Tabs */}
          <div style={tabs}>
            <button
              onClick={() => setMode("login")}
              style={{ ...tabBtn, ...(mode === "login" ? tabActive : {}) }}
            >
              {t.login}
            </button>
            <button
              onClick={() => setMode("register")}
              style={{ ...tabBtn, ...(mode === "register" ? tabActive : {}) }}
            >
              {t.register}
            </button>
          </div>

          {/* Form */}
          <div style={form}>
            {mode === "register" && (
              <Field
                icon="👤"
                placeholder={t.fullName}
                value={fullName}
                onChange={setFullName}
                type="text"
              />
            )}

            <Field
              icon="✉️"
              placeholder={t.email}
              value={email}
              onChange={setEmail}
              type="email"
            />

            <Field
              icon="🔒"
              placeholder={t.pass}
              value={password}
              onChange={setPassword}
              type="password"
            />

            {/* Role selector (only on register) */}
            {mode === "register" && (
              <>
                <div style={roleLabel}>{t.selectRole}</div>
                <div style={roleRow}>
                  <RoleBtn
                    active={role === "user"}
                    onClick={() => setRole("user")}
                    label={t.user}
                    icon="👤"
                  />
                  <RoleBtn
                    active={role === "breeder"}
                    onClick={() => setRole("breeder")}
                    label={t.breeder}
                    icon="🐾"
                  />
                  <RoleBtn
                    active={role === "services"}
                    onClick={() => setRole("services")}
                    label={t.services}
                    icon="🩺"
                  />
                </div>
              </>
            )}

            <button
              onClick={onSubmit}
              style={{
                ...submitBtn,
                opacity: canSubmit ? 1 : 0.55,
                cursor: canSubmit ? "pointer" : "not-allowed",
              }}
            >
              {mode === "register" ? t.createAccount : t.signIn} →
            </button>

            <div style={terms}>{t.terms}</div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ---------- components ---------- */

function Field({
  icon,
  placeholder,
  value,
  onChange,
  type,
}: {
  icon: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
}) {
  return (
    <div style={fieldWrap}>
      <div style={fieldIcon}>{icon}</div>
      <input
        style={input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
      />
    </div>
  );
}

function RoleBtn({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        ...roleBtn,
        ...(active ? roleBtnActive : {}),
      }}
    >
      <div style={{ fontSize: 18 }}>{icon}</div>
      <div style={{ fontSize: 12, fontWeight: 700, marginTop: 6 }}>{label}</div>
    </button>
  );
}

/* ---------- styles ---------- */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#0b1220",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
};

const shell: React.CSSProperties = {
  width: "min(980px, 100%)",
  minHeight: 520,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 18,
  overflow: "hidden",
  display: "grid",
  gridTemplateColumns: "1.05fr 1fr",
  boxShadow: "0 20px 70px rgba(0,0,0,0.45)",
};

const left: React.CSSProperties = {
  padding: 28,
  background:
    "linear-gradient(160deg, rgba(37,99,235,0.95), rgba(17,24,39,0.92))",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const brand: React.CSSProperties = {
  margin: 0,
  fontSize: 38,
  letterSpacing: 0.2,
};

const tagline: React.CSSProperties = {
  marginTop: 10,
  opacity: 0.85,
  lineHeight: 1.5,
  maxWidth: 360,
};

const leftBottom: React.CSSProperties = {
  background: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: 14,
  padding: 14,
};

const leftHintTitle: React.CSSProperties = { fontWeight: 800 };
const leftHintSub: React.CSSProperties = { opacity: 0.85, marginTop: 6 };

const right: React.CSSProperties = {
  padding: 24,
  background: "rgba(255,255,255,0.03)",
  color: "white",
};

const topRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: 10,
};

const langWrap: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 999,
  padding: "6px 10px",
};

const langSelect: React.CSSProperties = {
  background: "transparent",
  color: "white",
  border: "none",
  outline: "none",
  cursor: "pointer",
  fontSize: 16,
};

const tabs: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 999,
  padding: 6,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 6,
};

const tabBtn: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 999,
  border: "none",
  background: "transparent",
  color: "white",
  cursor: "pointer",
  fontWeight: 700,
  opacity: 0.75,
};

const tabActive: React.CSSProperties = {
  background: "rgba(255,255,255,0.16)",
  opacity: 1,
};

const form: React.CSSProperties = {
  marginTop: 18,
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const fieldWrap: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: 12,
  padding: "10px 12px",
};

const fieldIcon: React.CSSProperties = { opacity: 0.8 };

const input: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  outline: "none",
  color: "white",
  fontSize: 14,
};

const roleLabel: React.CSSProperties = {
  marginTop: 8,
  fontSize: 12,
  opacity: 0.8,
  letterSpacing: 0.6,
  fontWeight: 800,
};

const roleRow: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: 10,
};

const roleBtn: React.CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  cursor: "pointer",
  textAlign: "center",
};

const roleBtnActive: React.CSSProperties = {
  border: "1px solid rgba(37,99,235,0.8)",
  background: "rgba(37,99,235,0.22)",
};

const submitBtn: React.CSSProperties = {
  marginTop: 6,
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "none",
  background: "#0b0f1a",
  color: "white",
  fontWeight: 800,
};

const terms: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.6,
  lineHeight: 1.4,
  textAlign: "center",
};
