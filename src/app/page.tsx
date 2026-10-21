import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  Menu,
} from "lucide-react";
import { ApplicationOpeningBanner } from "@/components/ApplicationOpeningBanner";
import { CertificateGallery } from "@/components/CertificateGallery";
import { ContactForm } from "@/components/ContactForm";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { buildWhatsAppUrl, GOOGLE_REVIEW_FORM_URL } from "@/lib/contact";
import {
  applicationOpening,
  audienceCards,
  certificates,
  heroStats,
  instagramUrl,
  learningTopics,
  programWeeks,
  studentReviews,
} from "@/lib/content";

const whatsappIntro =
  "Hola, quiero recibir información sobre la Mentoría Percentil1.";
const profileImage = "/assets/benjamin-page-profile.png"; // Cambia esta ruta si reemplazas la foto oficial.
const percentilLogo = "/assets/percentil1-logo.jpeg"; // Reemplaza este asset si cambia el logo oficial.
const developerIcon = "/assets/byl-icon.svg";
const developerWebsite = "https://byl-software.vercel.app";

const homeNavItems = [
  ["Inicio", "#inicio"],
  ["Cuarta generación", "#tercera-generacion"],
  ["Postulación", "#contacto"],
];

const mentorshipNavItems = [
  ["Para quién es", "#mentoria"],
  ["Qué aprenderás", "#que-aprenderas"],
  ["Programa", "#programa"],
  ["Sobre Benjamín", "#sobre-benjamin"],
  ["Certificaciones", "#certificaciones"],
  ["Reseñas", "#resenas"],
];

const mobileNavItems = [
  ...homeNavItems,
  ...mentorshipNavItems,
  ["Contacto", "#contacto"],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-[#F5F7FA]">
      <Header />
      <Hero />
      <AudienceSection />
      <LearningSection />
      <ProgramSection />
      <AboutSection />
      <CertificatesSection />
      <CommunitySection />
      <FinalCta />
      <ContactSection />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#36D9FF]/10 bg-[#050505]/88 backdrop-blur-xl">
      <div className="container-shell flex min-h-[72px] items-center justify-between gap-4 py-3">
        <BrandLogo />
        <nav className="hidden items-center gap-7 text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-[#A0A6B0] lg:flex">
          <DesktopNavDropdown label="Inicio" href="#inicio" items={homeNavItems} />
          <DesktopNavDropdown label="Mentoría" href="#mentoria" items={mentorshipNavItems} />
          <a className="px-1 py-2 transition hover:text-[#78ECFF]" href="#certificaciones">
            Certificaciones
          </a>
          <a className="px-1 py-2 transition hover:text-[#78ECFF]" href="#contacto">
            Contacto
          </a>
        </nav>
        <a href="#contacto" className="btn-primary header-cta min-h-11 min-w-44 px-5 py-2 text-[0.7rem]">
          Quiero postular
        </a>
        <details className="group relative lg:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-[#36D9FF]/25 bg-[#36D9FF]/[0.04] text-white transition hover:bg-[#36D9FF]/10 [&::-webkit-details-marker]:hidden">
            <Menu className="h-5 w-5" />
          </summary>
          <div className="absolute right-0 mt-3 max-h-[calc(100vh-6rem)] w-64 overflow-y-auto border border-[#36D9FF]/18 bg-[#0D0D0F] p-3 shadow-2xl shadow-black/60">
            {mobileNavItems.map(([label, href]) => (
              <a
                key={`${label}-${href}`}
                href={href}
                className="block border-b border-white/8 px-3 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#A0A6B0] last:border-b-0 hover:text-[#78ECFF]"
              >
                {label}
              </a>
            ))}
            <a href="#contacto" className="btn-primary mt-3 min-h-12 w-full text-[0.72rem]">
              Quiero postular
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}

function DesktopNavDropdown({
  label,
  href,
  items,
}: {
  label: string;
  href: string;
  items: string[][];
}) {
  return (
    <div className="group relative">
      <a
        href={href}
        className="inline-flex items-center gap-1.5 px-1 py-2 transition hover:text-[#78ECFF] group-hover:text-[#78ECFF]"
      >
        {label}
        <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
      </a>
      <div className="pointer-events-none absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-4 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
        <div className="border border-[#36D9FF]/18 bg-[#0D0D0F]/96 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl">
          {items.map(([itemLabel, itemHref]) => (
            <a
              key={`${itemLabel}-${itemHref}`}
              href={itemHref}
              className="block border-b border-white/8 px-4 py-3 text-[0.72rem] font-extrabold uppercase tracking-[0.12em] text-[#A0A6B0] transition last:border-b-0 hover:bg-[#36D9FF]/8 hover:text-[#78ECFF]"
            >
              {itemLabel}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function BrandLogo() {
  return (
    <a href="#inicio" className="flex shrink-0 items-center gap-4">
      <span className="relative h-14 w-24 overflow-hidden rounded-sm border border-[#36D9FF]/10 bg-black sm:h-16 sm:w-28">
        <Image
          src={percentilLogo}
          alt="Percentil1"
          fill
          sizes="(min-width: 640px) 112px, 96px"
          className="object-cover object-center opacity-90"
        />
      </span>
      <span className="hidden text-base font-extrabold uppercase tracking-[0.28em] text-[#F5F7FA] sm:block">
        Percentil<span className="text-[#36D9FF]">1</span>
      </span>
    </a>
  );
}

function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate scroll-mt-28 pt-28 md:pt-36"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_16%,rgba(54,217,255,0.18),transparent_31%),radial-gradient(circle_at_18%_18%,rgba(92,96,104,0.16),transparent_29%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(245,247,250,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(245,247,250,0.022)_1px,transparent_1px)] bg-[size:54px_54px]" />

      <div className="container-shell flex min-h-[calc(100vh-9rem)] items-center pb-24">
        <div className="reveal max-w-5xl">
          <p className="eyebrow mb-6">Mentoría de trading / Benjamín Page</p>
          <h1 className="font-display text-[clamp(3.25rem,10.4vw,7.9rem)] leading-[1.02] text-[#F5F7FA] md:leading-[0.96]">
            MENTORÍA
            <span className="block text-[#A0A6B0]">
              PERCENTIL<span className="text-[#36D9FF] drop-shadow-[0_0_28px_rgba(54,217,255,0.46)]">1</span>
            </span>
          </h1>
          <div className="mt-10 max-w-2xl border-l border-[#36D9FF]/70 pl-5 md:pl-7">
            <p className="text-balance text-[1.55rem] font-semibold leading-[1.22] text-[#F5F7FA] md:text-[2.15rem] md:leading-[1.18]">
              Aprende trading desde cero hasta preparar tu operativa para
              cuentas de fondeo.
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#A0A6B0] md:text-lg md:leading-9">
              Un programa guiado por Benjamín Page para personas que quieren
              aprender estructura, gestión de riesgo, psicología y acción del
              precio de forma práctica.
            </p>
          </div>
          <ApplicationOpeningBanner
            generation={applicationOpening.generation}
            status={applicationOpening.status}
            text={applicationOpening.text}
          />
          <div className="mt-9 flex flex-wrap gap-3">
            {heroStats.map((stat) => (
              <span
                key={stat}
                className="rounded-full border border-[#36D9FF]/16 bg-[#36D9FF]/[0.035] px-4 py-2.5 text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-[#C8D0D8]"
              >
                {stat}
              </span>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <a href="#contacto" className="btn-primary">
              Postular a la mentoría
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#programa" className="btn-secondary">
              Ver programa
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function BellCurve({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 180"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6 154C78 154 104 139 132 104C171 54 190 18 260 18C330 18 349 54 388 104C416 139 442 154 514 154"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M413 154C461 154 486 154 514 154"
        stroke="#36D9FF"
        strokeWidth="8"
        strokeLinecap="round"
        className="drop-shadow-[0_0_12px_rgba(54,217,255,0.78)]"
      />
    </svg>
  );
}

function AudienceSection() {
  return (
    <section id="mentoria" className="section-pad scroll-mt-28 border-y border-[#36D9FF]/10">
      <div className="container-shell">
        <SectionIntro
          eyebrow="Para quién es"
          title="Una ruta para aprender con estructura, no con ruido."
          text="La mentoría está pensada para construir criterio operativo desde fundamentos y avanzar hacia una preparación responsable para evaluaciones de fondeo."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {audienceCards.map(({ title, text, icon: Icon }) => (
            <article key={title} className="premium-card reveal p-7">
              <Icon className="h-6 w-6 text-[#36D9FF]" />
              <h3 className="mt-9 text-xl font-extrabold leading-tight text-[#F5F7FA]">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#A0A6B0]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LearningSection() {
  return (
    <section id="que-aprenderas" className="section-pad scroll-mt-28">
      <div className="container-shell">
        <SectionIntro
          eyebrow="Qué aprenderás"
          title="De los fundamentos a una operativa con reglas."
          text="El contenido cubre las bases técnicas y mentales necesarias para tomar decisiones con mayor claridad."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {learningTopics.map(({ title, text, icon: Icon }, index) => (
            <article
              key={title}
              className={`premium-card reveal min-h-56 p-7 transition hover:border-[#36D9FF]/45 hover:shadow-[0_24px_80px_rgba(54,217,255,0.08)] ${
                index === learningTopics.length - 1
                  ? "sm:col-span-2 lg:col-span-3"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <Icon className="h-6 w-6 text-[#36D9FF]" />
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <h3 className="mt-9 text-xl font-extrabold leading-tight text-[#F5F7FA]">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#A0A6B0]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramSection() {
  return (
    <section id="programa" className="section-pad signal-panel relative scroll-mt-28 overflow-hidden">
      <BellCurve className="pointer-events-none absolute -right-10 top-12 h-44 w-[420px] text-[#1A1C20] opacity-55" />
      <div className="container-shell">
        <SectionIntro
          eyebrow="Programa"
          title="4 semanas para ordenar tu proceso."
          text="Cada semana combina teoría, práctica y criterios de revisión para avanzar sin saltarse la base."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {programWeeks.map((week) => (
            <article
              key={week.week}
              className="reveal border border-[#36D9FF]/12 bg-[#050505]/72 p-7 text-[#F5F7FA] shadow-2xl shadow-black/20 backdrop-blur"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#36D9FF]">
                {week.week}
              </p>
              <h3 className="font-display mt-9 text-[2rem] leading-tight text-[#F5F7FA]">
                {week.title}
              </h3>
              <p className="mt-6 text-sm leading-7 text-[#A0A6B0]">
                {week.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="sobre-benjamin" className="section-pad scroll-mt-28">
      <div className="container-shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="reveal">
          {profileImage ? (
            <div className="relative aspect-[4/5] overflow-hidden border border-[#36D9FF]/14 bg-[#0D0D0F] shadow-2xl shadow-black/40">
              <Image
                src={profileImage}
                alt="Benjamín Page"
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover object-[50%_28%]"
                priority={false}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-5 left-5 border border-[#36D9FF]/16 bg-black/60 px-4 py-3 backdrop-blur">
                <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-[#36D9FF]">
                  BPG Trading
                </p>
                <p className="mt-1 text-sm font-extrabold text-[#F5F7FA]">
                  Benjamín Page
                </p>
              </div>
            </div>
          ) : (
            <div className="premium-card relative aspect-[4/5] overflow-hidden p-8">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(54,217,255,0.12),transparent_28%),radial-gradient(circle_at_78%_16%,rgba(92,96,104,0.22),transparent_28%)]" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <p className="eyebrow">Benjamín Page</p>
                <div>
                  <p className="font-display text-[10rem] leading-[0.78] text-[#F5F7FA]">
                    BP
                  </p>
                  <p className="mt-5 max-w-xs text-sm leading-7 text-[#A0A6B0]">
                    Espacio preparado para insertar la foto oficial del mentor
                    cuando esté disponible en assets.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="reveal">
          <p className="eyebrow mb-5">Sobre Benjamín Page</p>
          <h2 className="font-display text-[clamp(2.75rem,7vw,5rem)] leading-[1.06] text-[#F5F7FA] md:leading-[1]">
            FORMACIÓN CON BASE SÓLIDA
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-9 text-[#A0A6B0]">
            Benjamín Page es trader y mentor enfocado en formar alumnos desde
            una base sólida, combinando gestión de riesgo, psicología y lectura
            técnica del mercado. Después de años de estudio y práctica, logró
            consolidar una operativa rentable y hoy busca entregar una ruta
            clara para quienes quieren aprender trading de forma estructurada.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="btn-primary">
              <InstagramIcon className="h-4 w-4" />
              Ver Instagram
            </a>
            <a href="#certificaciones" className="btn-secondary">
              Ver evidencia
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CertificatesSection() {
  return (
    <section
      id="certificaciones"
      className="section-pad relative scroll-mt-28 overflow-hidden border-y border-[#36D9FF]/10 bg-[radial-gradient(circle_at_78%_18%,rgba(54,217,255,0.13),transparent_30%),radial-gradient(circle_at_20%_70%,rgba(92,96,104,0.13),transparent_24%)]"
    >
      <BellCurve className="pointer-events-none absolute left-1/2 top-10 h-36 w-[420px] -translate-x-1/2 text-[#1A1C20] opacity-55" />
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
          <SectionIntro
            eyebrow="Certificaciones y evidencia"
            title="Procesos completados y experiencia en cuentas de fondeo."
            text="Evidencia visual de certificaciones, desafíos y procesos completados por Benjamín Page."
          />
          <div className="premium-card reveal p-5 md:p-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[
                [String(certificates.length), "Evidencias"],
                ["Fondeo", "Enfoque"],
                ["Riesgo", "Base"],
              ].map(([value, label]) => (
                <div key={label} className="min-w-0 overflow-hidden border border-[#36D9FF]/12 bg-[#36D9FF]/[0.025] p-4">
                  <p className="font-display max-w-full whitespace-nowrap text-[clamp(1.45rem,1.85vw,1.95rem)] leading-none text-[#F5F7FA]">
                    {value}
                  </p>
                  <p className="mt-2 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-[#36D9FF]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-[#A0A6B0]">
              Las imágenes se muestran como respaldo editable de formación,
              evaluaciones y experiencia en cuentas de fondeo.
            </p>
          </div>
        </div>

        <CertificateGallery certificates={certificates} />
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section id="resenas" className="section-pad scroll-mt-28">
      <div className="container-shell">
        <TestimonialsCarousel
          reviews={studentReviews}
          reviewFormUrl={GOOGLE_REVIEW_FORM_URL}
        />
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="signal-panel relative overflow-hidden py-20">
      <BellCurve className="pointer-events-none absolute bottom-2 right-8 h-36 w-[360px] text-[#5C6068] opacity-40" />
      <div className="container-shell flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
        <div>
          <p className="eyebrow">Postulación</p>
          <h2 className="font-display mt-5 max-w-3xl text-[clamp(2.4rem,6.4vw,4.8rem)] leading-[1.08] text-[#F5F7FA] lg:leading-[1]">
            ¿QUIERES APRENDER TRADING CON ESTRUCTURA?
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#A0A6B0]">
            Postula a la mentoría y recibe información sobre cupos, fechas y
            modalidad.
          </p>
        </div>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <a href={buildWhatsAppUrl(whatsappIntro)} className="btn-primary !min-w-56 !px-8">
            <WhatsAppIcon className="h-4 w-4" />
            Hablar por WhatsApp
          </a>
          <a href={instagramUrl} target="_blank" rel="noreferrer" className="btn-secondary !min-w-56 !px-8">
            <InstagramIcon className="h-4 w-4" />
            Contactar por Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contacto" className="section-pad scroll-mt-28">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.74fr_1.26fr] lg:gap-16">
        <SectionIntro
          eyebrow="Contacto"
          title={
            <>
              Postula a la Mentoría Percentil
              <span className="text-[#36D9FF] drop-shadow-[0_0_24px_rgba(54,217,255,0.45)]">
                1
              </span>
              .
            </>
          }
          text="Completa tus datos, experiencia en trading y disponibilidad de inversión. Al enviar, la postulación llegará directamente por correo."
        />
        <div className="premium-card reveal p-5 md:p-8 lg:p-9">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#36D9FF]/10 py-10">
      <div className="container-shell">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <BrandLogo />
            <div className="mt-5 flex gap-4 text-sm font-bold text-[#A0A6B0]">
              <a className="inline-flex items-center gap-2 hover:text-[#78ECFF]" href={instagramUrl} target="_blank" rel="noreferrer">
                <InstagramIcon className="h-4 w-4" />
                Instagram
              </a>
              <a className="hover:text-[#78ECFF]" href="#contacto">
                Contacto
              </a>
            </div>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-[#A0A6B0]">
            El trading implica riesgo y no garantiza resultados. La mentoría
            tiene fines educativos y no constituye asesoría financiera
            personalizada. Los resultados dependen de la experiencia, disciplina y
            gestión de riesgo de cada persona.
          </p>
        </div>
        <div className="mt-9 flex justify-center border-t border-[#36D9FF]/10 pt-8 md:justify-end">
          <a
            href={developerWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="developer-credit"
            aria-label="Desarrollado por BYL — visitar sitio web (abre en una nueva pestaña)"
          >
            <Image
              src={developerIcon}
              alt=""
              width={30}
              height={30}
              className="developer-credit-icon"
            />
            <span>
              Desarrollado por{" "}
              <span className="developer-credit-name">BYL</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: ReactNode;
  text: string;
}) {
  return (
    <div className="reveal max-w-3xl">
      <p className="eyebrow mb-5">{eyebrow}</p>
      <h2
        className="font-display text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.08] text-[#F5F7FA] md:leading-[1]"
      >
        {title}
      </h2>
      <p
        className="mt-7 max-w-2xl text-base leading-8 text-[#A0A6B0] md:text-lg md:leading-9"
      >
        {text}
      </p>
    </div>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.44 0 .06 5.37.06 11.98c0 2.11.55 4.17 1.61 5.99L0 24l6.18-1.62a11.96 11.96 0 0 0 5.87 1.5h.01c6.61 0 11.99-5.37 11.99-11.98a11.86 11.86 0 0 0-3.53-8.42ZM12.06 21.86h-.01a9.93 9.93 0 0 1-5.06-1.38l-.36-.21-3.67.96.98-3.58-.23-.37a9.9 9.9 0 0 1-1.52-5.29c0-5.44 4.43-9.86 9.88-9.86a9.8 9.8 0 0 1 6.98 2.9 9.78 9.78 0 0 1 2.9 6.96c-.01 5.44-4.44 9.86-9.89 9.86Zm5.41-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 8.2A3.8 3.8 0 1 1 12 15.8 3.8 3.8 0 0 1 12 8.2Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M17.4 6.6h.01"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
