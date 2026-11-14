"use client";

import Script from "next/script";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Mail, Send } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/contact";

type FormState = {
  name: string;
  email: string;
  phone: string;
  tradingExperience: string;
  investmentBudget: string;
  message: string;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  tradingExperience: "Básico",
  investmentBudget: "Sí, cuento con 150-300 USD",
  message: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[()\d\s-]{7,20}$/;
const recaptchaAction = "contact_form";

function buildMessage(form: FormState) {
  return [
    "Nueva postulación Mentoría Percentil1",
    "",
    `Nombre: ${form.name}`,
    `Teléfono: ${form.phone}`,
    `Correo: ${form.email}`,
    `Experiencia en trading: ${form.tradingExperience}`,
    `Presupuesto: ${form.investmentBudget}`,
    `Mensaje: ${form.message.trim() || "Sin mensaje adicional"}`,
  ].join("\n");
}

function validateForm(form: FormState) {
  if (
    !form.name.trim() ||
    !form.phone.trim() ||
    !form.email.trim() ||
    !form.tradingExperience ||
    !form.investmentBudget
  ) {
    return "Completa todos los campos obligatorios.";
  }

  if (!emailRegex.test(form.email.trim())) {
    return "Ingresa un correo válido.";
  }

  if (
    !phoneRegex.test(form.phone.trim()) ||
    form.phone.replace(/\D/g, "").length < 7
  ) {
    return "Ingresa un teléfono válido.";
  }

  return null;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [recaptchaSiteKey, setRecaptchaSiteKey] = useState("");

  const mailtoHref = useMemo(() => {
    const subject = "Nueva postulación Mentoría Percentil1";

    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(buildMessage(form))}`;
  }, [form]);

  useEffect(() => {
    let active = true;

    async function loadRecaptchaConfig() {
      try {
        const response = await fetch("/api/recaptcha/config");

        if (!response.ok) {
          throw new Error("Failed to load reCAPTCHA config");
        }

        const data = (await response.json()) as { siteKey?: string };

        if (active) {
          setRecaptchaSiteKey(data.siteKey ?? "");
        }
      } catch {
        if (active) {
          setRecaptchaSiteKey("");
        }
      }
    }

    loadRecaptchaConfig();

    return () => {
      active = false;
    };
  }, []);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));

    if (status !== "loading") {
      setStatus("idle");
      setFeedback("");
    }
  }

  function getRecaptchaToken() {
    return new Promise<string>((resolve, reject) => {
      if (!recaptchaSiteKey || !window.grecaptcha) {
        reject(new Error("reCAPTCHA no está disponible."));
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha
          ?.execute(recaptchaSiteKey, { action: recaptchaAction })
          .then(resolve)
          .catch(reject);
      });
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateForm(form);

    if (validationError) {
      setStatus("error");
      setFeedback(validationError);
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const recaptchaToken = await getRecaptchaToken();
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          experience: form.tradingExperience,
          budget: form.investmentBudget,
          message: form.message.trim(),
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setForm(initialState);
      setStatus("success");
      window.dispatchEvent(new Event("site:lead"));
      setFeedback("Postulación enviada correctamente");
    } catch {
      setStatus("error");
      setFeedback("Hubo un error al enviar. Intenta nuevamente.");
    }
  }

  return (
    <>
      {recaptchaSiteKey ? (
        <Script
          id="google-recaptcha-v3"
          src={`https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(
            recaptchaSiteKey,
          )}`}
          strategy="afterInteractive"
        />
      ) : null}
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="field-label">
            Nombre y apellido
            <input
              required
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="field-control"
              placeholder="Tu nombre completo"
            />
          </label>
          <label className="field-label">
            Número de teléfono
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className="field-control"
              placeholder="+56 9..."
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="field-label">
            Correo
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="field-control"
              placeholder="tu@email.com"
            />
          </label>
          <label className="field-label">
            Experiencia en trading
            <select
              required
              value={form.tradingExperience}
              onChange={(event) =>
                updateField("tradingExperience", event.target.value)
              }
              className="field-control"
            >
              <option>Básico</option>
              <option>Medio</option>
              <option>Avanzado</option>
            </select>
          </label>
        </div>

        <label className="field-label">
          Presupuesto
          <span className="max-w-2xl text-xs font-semibold normal-case leading-6 tracking-normal text-[#A0A6B0]">
            ¿Cuentas con un presupuesto entre 150 y 300 USD para tu formación y
            proceso inicial?
          </span>
          <select
            required
            value={form.investmentBudget}
            onChange={(event) =>
              updateField("investmentBudget", event.target.value)
            }
            className="field-control"
          >
            <option>Sí, cuento con 150-300 USD</option>
            <option>No por ahora</option>
            <option>No por ahora, quiero más información</option>
          </select>
        </label>

        <label className="field-label">
          Mensaje
          <textarea
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            className="field-control min-h-32 resize-y"
            placeholder="Cuéntanos qué buscas aprender o qué experiencia tienes."
          />
        </label>

        {feedback ? (
          <p
            className={`text-sm font-bold ${
              status === "success" ? "text-[#36D9FF]" : "text-red-300"
            }`}
          >
            {feedback}
          </p>
        ) : null}

        <div className="flex flex-col gap-4 pt-2 sm:flex-row">
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary group sm:min-w-60 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            {status === "loading" ? "Enviando..." : "Enviar postulación"}
          </button>
          <a href={mailtoHref} className="btn-secondary sm:min-w-44">
            <Mail className="h-4 w-4" />
            Usar correo
          </a>
        </div>
      </form>
    </>
  );
}
