"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";

type Lang = "ro" | "en";

export default function LoginPage() {
  const [lang, setLang] = useState<Lang>("ro");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const saved = (localStorage.getItem("tb_lang") as Lang | null) ?? null;
    const browser = navigator.language?.toLowerCase().startsWith("en") ? "en" : "ro";
    setLang(saved ?? (browser as Lang));
  }, []);

  const t = useMemo(() => {
    const ro = {
      brand: "TOP-BREEDERS",
      kicker: "Crește-ți reputația alături de cei mai buni.",
      title: "Autentificare",
      email: "Adresa de email",
      pass: "Parola",
      btn: "Conectează-te",
      forgot: "Ai uitat parola?",
      signup: "Înregistrează-te",
      langRO: "RO",
      langEN: "EN",
    };

    const en = {
      brand: "TOP-BREEDERS",
      kicker: "Build your reputation among the best.",
      title: "Log in",
      email: "Email address",
      pass: "Password",
      btn: "Sign in",
      forgot: "Forgot password?",
      signup: "Create an account",
      langRO: "RO",
      langEN: "EN",
    };

    return lang === "ro" ? ro : en;
  }, [lang]);

  const setLanguage = (next: Lang) => {
    setLang(next);
    localStorage.setItem("tb_lang", next);
  };

  // /public/animals/1.jpg ... 18.jpg
  const photos = Array.from({ length: 18 }, (_, i) => `/animals/${i + 1}.jpg`);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: aici legăm autentificarea reală (Supabase / API).
    console.log({ email, password });
  };

  return (
    <div className="tb-root">
      {/* background photos */}
      <div className="tb-photos" aria-hidden="true">
        {photos.map((src, idx) => (
          <div key={src} className={`tb-photo tb-photo-${idx + 1}`}>
            <Image src={src} alt="" fill className="tb-photoImg" sizes="240px" priority={idx < 8} />
          </div>
        ))}
        <div className="tb-vignette" />
      </div>

      <main className="tb-center">
        <section className="tb-card tb-card--auth" aria-label="Login card">
          {/* language */}
          <div className="tb-lang" aria-label="Language">
            <button
              type="button"
              className={`tb-langBtn ${lang === "ro" ? "isActive" : ""}`}
              onClick={() => setLanguage("ro")}
            >
              {t.langRO}
            </button>
            <button
              type="button"
              className={`tb-langBtn ${lang === "en" ? "isActive" : ""}`}
              onClick={() => setLanguage("en")}
            >
              {t.langEN}
            </button>
          </div>

          {/* glows */}
          <div className="tb-glow tb-glowA" aria-hidden="true" />
          <div className="tb-glow tb-glowB" aria-hidden="true" />

          {/* header: logo + brand */}
          <div className="tb-header tb-header--auth">
            <div className="tb-logoCircle" aria-label="Logo">
              <Image src="/logo.png" alt="TOP-BREEDERS logo" fill className="tb-logoImg" priority />
            </div>

            <div className="tb-brandWrap">
              <div className="tb-brand">{t.brand}</div>
              <div className="tb-kicker">{t.kicker}</div>
            </div>
          </div>

          {/* title */}
          <h1 className="tb-authTitle">{t.title}</h1>

          {/* form */}
          <form className="tb-form" onSubmit={onSubmit}>
            <label className="tb-field">
              <span className="tb-label">{t.email}</span>
              <input
                className="tb-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                autoComplete="email"
                required
              />
            </label>

            <label className="tb-field">
              <span className="tb-label">{t.pass}</span>
              <input
                className="tb-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </label>

            <button className="tb-btn tb-primary tb-btnFull" type="submit">
              {t.btn}
            </button>

            <div className="tb-authLinks">
              <Link className="tb-link" href="/forgot">
                {t.forgot}
              </Link>
              <span className="tb-dot">•</span>
              <Link className="tb-link tb-linkAccent" href="/register?mode=signup">
                {t.signup}
              </Link>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
