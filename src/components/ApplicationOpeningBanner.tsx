"use client";

import { useEffect, useState } from "react";

export function ApplicationOpeningBanner({
  generation,
  deadlineIso,
  status,
  text,
}: {
  generation: string;
  deadlineIso: string;
  status: string;
  text: string;
}) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setNow(Date.now());
    const initialUpdate = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 1_000);

    return () => {
      window.clearTimeout(initialUpdate);
      window.clearInterval(interval);
    };
  }, []);

  const deadline = Date.parse(deadlineIso);
  const isClosed = now !== null && now >= deadline;
  const remainingMinutes =
    now === null ? null : Math.max(0, Math.ceil((deadline - now) / 60_000));
  const countdown = [
    ["Días", remainingMinutes === null ? null : Math.floor(remainingMinutes / 1_440)],
    ["Horas", remainingMinutes === null ? null : Math.floor((remainingMinutes % 1_440) / 60)],
    ["Minutos", remainingMinutes === null ? null : remainingMinutes % 60],
  ] as const;

  return (
    <div
      id="tercera-generacion"
      className="premium-card mt-8 max-w-4xl scroll-mt-28 p-4 md:p-5"
    >
      <div>
        <p className="eyebrow mb-2">{generation}</p>
        <h2 className="font-display text-[clamp(1.35rem,2.8vw,2.2rem)] leading-tight text-[#F5F7FA]">
          <span className="text-[#36D9FF]">
            {isClosed ? "Inscripciones cerradas" : status}
          </span>
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-[#A0A6B0]">
          {isClosed
            ? "El plazo de inscripción para esta generación ha finalizado."
            : text}
        </p>
        <div
          role="timer"
          aria-label="Tiempo restante para el cierre de inscripciones"
          aria-live="off"
          className="mt-5 grid max-w-md grid-cols-3 gap-3"
        >
          {countdown.map(([label, value]) => (
            <div
              key={label}
              className="border border-[#36D9FF]/20 bg-[#36D9FF]/[0.04] px-2 py-3 text-center md:py-4"
            >
              <p className="font-display text-3xl leading-none tabular-nums text-[#36D9FF] md:text-4xl">
                {value === null ? "--" : String(value).padStart(2, "0")}
              </p>
              <p className="mt-2 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-[#A0A6B0]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
