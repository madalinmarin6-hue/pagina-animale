"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Lang = "ro" | "en";

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("ro");

  useEffect(() => {
    const saved = (localStorage.getItem("tb_lang") as Lang | null) ?? null;
    const browser = navigator.language?.toLowerCase().startsWith("en") ? "en" : "ro";
    setLang(saved ?? (browser as Lang));
  }, []);

  const t = useMemo(() => {
    const ro = {
      brand: "TOP-BREEDERS",
      kicker: "",
      headline: "Crește-ți reputația alături de cei mai buni",
      body1:
        "Ești un crescător dedicat sau oferi servicii de top în domeniul pet-care? Locul tău este aici. TOP-BREEDERS oferă vizibilitate celor care fac lucrurile ca la carte.",
      body2:
        "De la crescători care respectă standardele rasei, la experți în dresaj, grooming, pensiuni și clinici veterinare, fiecare partener de pe platforma noastră trece printr-un filtru riguros. Nu suntem doar o listă de contacte, ci o comunitate unde reputația se construiește prin transparență și feedback real.",
      ctaLogin: "Autentificare",
      ctaSignup: "Înregistrare",
      note: "Publicare controlată • Reputație construită pe fapte • Acces rapid",
      langRO: "RO",
      langEN: "EN",
    };

    const en = {
      brand: "TOP-BREEDERS",
      kicker: "",
      headline: "Build your reputation among the best",
      body1:
        "Are you a dedicated breeder or do you offer top-tier pet-care services? You belong here. TOP-BREEDERS gives visibility to professionals who do things the right way.",
      body2:
        "From breeders who respect breed standards to experts in training, grooming, boarding, and veterinary clinics, every partner on our platform goes through a rigorous screening process. We’re not just a list of contacts—we’re a community where reputation is built through transparency and real feedback.",
      ctaLogin: "Log in",
      ctaSignup: "Sign up",
      note: "Moderated listings • Reputation built on facts • Quick access",
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

  return (
    <div className="tb-root">
      {/* background photos */}
      <div className="tb-photos" aria-hidden="true">
        {photos.map((src, idx) => (
          <div key={src} className={`tb-photo tb-photo-${idx + 1}`}>
            <Image
              src={src}
              alt=""
              fill
              className="tb-photoImg"
              sizes="240px"
              priority={idx < 8}
            />
          </div>
        ))}
        <div className="tb-vignette" />
      </div>

      {/* center card */}
      <main className="tb-center">
        <section className="tb-card" aria-label="TOP-BREEDERS main card">
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

          {/* header */}
          <div className="tb-header">
            <div className="tb-logoCircle" aria-label="Logo">
              <Image src="/logo.png" alt="TOP-BREEDERS logo" fill className="tb-logoImg" priority />
            </div>

            <div className="tb-brandWrap">
              <div className="tb-brand">{t.brand}</div>
              <div className="tb-kicker">{t.kicker}</div>
            </div>
          </div>

          {/* content */}
          <div className="tb-content">
          <h1 className="tb-motto">{t.headline}</h1>


            <div className="tb-text">
  <p>
    <span className="tb-accent"></span> {t.body1}
  </p>
  <p>{t.body2}</p>
</div>


            <div className="tb-actions" aria-label="Actions">
            <a className="tb-btn tb-primary" href="/register?mode=login">
  {t.ctaLogin}
</a>

<a className="tb-btn tb-secondary" href="/register?mode=signup">
  {t.ctaSignup}
</a>

            </div>

            <div className="tb-note">{t.note}</div>
          </div>
        </section>
      </main>
    </div>
  );
}
