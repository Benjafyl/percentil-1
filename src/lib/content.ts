import type { LucideIcon } from "lucide-react";
import {
  Brain,
  CandlestickChart,
  CheckCircle2,
  ClipboardList,
  Gauge,
  Layers3,
  LineChart,
  ShieldCheck,
  Target,
  Trophy,
} from "lucide-react";

export const instagramUrl = "https://www.instagram.com/bpgtrading/?hl=es-la";

export const applicationOpening = {
  generation: "Cuarta generación",
  status: "Inscripciones cerradas hasta nuevo aviso",
  text: "Las inscripciones para la cuarta generación de Percentil1 están cerradas. Anunciaremos una nueva apertura de cupos más adelante.",
};

export const heroStats = [
  "4 semanas",
  "8 clases",
  "2 clases por semana",
  "Desde lo más básico",
  "Enfoque en cuentas de fondeo",
];

export const audienceCards: Array<{
  title: string;
  text: string;
  icon: LucideIcon;
}> = [
  {
    title: "Desde cero",
    text: "Para personas que quieren aprender trading con una ruta clara antes de operar capital real.",
    icon: Layers3,
  },
  {
    title: "Base sin estructura",
    text: "Para traders que ya conocen conceptos, pero necesitan ordenar criterio, riesgo y ejecución.",
    icon: ClipboardList,
  },
  {
    title: "Cuentas de fondeo",
    text: "Para quienes buscan preparar una operativa seria antes de enfrentar evaluaciones de fondeo.",
    icon: Trophy,
  },
  {
    title: "Riesgo y psicología",
    text: "Para mejorar disciplina, gestión de pérdida y toma de decisiones bajo presión.",
    icon: Brain,
  },
];

export const learningTopics: Array<{
  title: string;
  text: string;
  icon: LucideIcon;
}> = [
  {
    title: "Introducción al trading",
    text: "Conceptos base, lenguaje del mercado y funcionamiento general.",
    icon: LineChart,
  },
  {
    title: "Brokers y plataformas",
    text: "Entorno operativo, herramientas y preparación técnica.",
    icon: Gauge,
  },
  {
    title: "Gestión de riesgo",
    text: "Reglas de exposición, pérdida máxima y control del capital.",
    icon: ShieldCheck,
  },
  {
    title: "Psicología",
    text: "Disciplina, paciencia, sesgos y control emocional.",
    icon: Brain,
  },
  {
    title: "Estrategia",
    text: "Criterios para construir una operativa replicable.",
    icon: Target,
  },
  {
    title: "Acción del precio",
    text: "Lectura del gráfico, estructura y zonas de decisión.",
    icon: CandlestickChart,
  },
  {
    title: "Preparación para fondeo",
    text: "Práctica guiada y enfoque para reglas de evaluación.",
    icon: CheckCircle2,
  },
];

export const programWeeks = [
  {
    week: "Semana 01",
    title: "Fundamentos",
    text: "Trading desde la base, conceptos principales, plataformas y preparación del entorno de trabajo.",
  },
  {
    week: "Semana 02",
    title: "Lectura técnica",
    text: "Acción del precio, estructura de mercado y lectura práctica del gráfico.",
  },
  {
    week: "Semana 03",
    title: "Riesgo y plan",
    text: "Gestión de riesgo, psicología y construcción de un plan operativo propio.",
  },
  {
    week: "Semana 04",
    title: "Práctica y fondeo",
    text: "Estrategia, revisión guiada y preparación responsable para cuentas de fondeo.",
  },
];

export const certificates = [
  {
    title: "Uprofit Program Completado",
    label: "Evaluación completada",
    image: "/assets/certificate-uprofit-program.jpeg",
    format: "portrait",
  },
  {
    title: "Santander Open Academy",
    label: "Certificado de finalización",
    image: "/assets/certificate-santander-open-academy-2026.jpeg",
    format: "wide",
  },
  {
    title: "My Funded Futures Challenge Completion",
    label: "Challenge completion",
    image: "/assets/certificate-my-funded-futures-upright.jpeg",
    format: "wide",
  },
  {
    title: "FundedNext Futures Flex Challenge 50K",
    label: "Rising Trader",
    image: "/assets/certificate-fundednext-futures-rising-trader.jpeg",
    format: "wide",
  },
  {
    title: "Apex Trader Funding 50K Rithmic Account",
    label: "Cuenta fondeada",
    image: "/assets/certificate-apex-rithmic.jpeg",
    format: "portrait",
  },
  {
    title: "Apex Trader Funding WealthCharts",
    label: "Cuenta fondeada",
    image: "/assets/certificate-apex-wealthcharts.jpeg",
    format: "portrait",
  },
  {
    title: "Alpha Futures Achievement",
    label: "Achievement",
    image: "/assets/certificate-alpha-futures.jpeg",
    format: "wide",
  },
  {
    title: "NEOMAAA Funded Trader",
    label: "Funded trader",
    image: "/assets/certificate-neomaaa-funded.jpeg",
    format: "wide",
  },
];

export const studentReviews = [
  {
    name: "Patricio Godoy",
    generation: "1era generación Percentil1",
    rating: 5,
    quote:
      "El contenido de la mentoría entrega las herramientas necesarias para salir a operar y prepararse para buscar una cuenta de fondeo. Además, destaco el profesionalismo, la disposición y la cercanía de Benjamín. Sin duda, ha sido una experiencia de gran valor para mi desarrollo.",
  },
  {
    name: "Felipe Madariaga",
    generation: "1era generación Percentil1",
    rating: 5,
    quote:
      "Las clases son muy claras, prácticas y bien explicadas. Muy recomendado para cualquiera que quiera empezar. Excelente experiencia.",
  },
  {
    name: "Felipe Sanchez",
    generation: "1era generación Percentil1",
    rating: 5,
    quote:
      "Excelente experiencia. Contenido práctico desde el comienzo junto a la experiencia de Benjamín hacen muy interesantes los análisis. Además, el profesor siempre presente para resolver dudas y apoyar el aprendizaje de todos. Totalmente recomendable para quienes buscan adentrarse en este mundo del trading.",
  },
  {
    name: "Jesus Eduardo",
    generation: "2da generación Percentil1",
    rating: 5,
    quote:
      "Bastante claro y eficiente la manera de explicar de Benjamin, identificar los tipos de liquidez, patron ideales para operar.",
  },
  {
    name: "Claudio",
    generation: "2da generación Percentil1",
    rating: 5,
    quote:
      "Curso ordenado, clases puntuales, y el contenido bien explicado. Totalmente recomendado.",
  },
  {
    name: "Renzo",
    generation: "2da generación Percentil1",
    rating: 5,
    quote:
      "Experiencia enriquecedora y positiva, aprendí a entender mejor el mercado, la importancia del orden y de la data.",
  },
];
