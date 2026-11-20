import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/utils/api";

export interface Branding {
  nombre_negocio: string;
  logo_url: string;
  color_primario: string;
  color_primario_dark: string;
  telefono: string | null;
  whatsapp: string | null;
  direccion: string | null;
}

const DEFAULTS: Branding = {
  nombre_negocio: "Mi Negocio",
  logo_url: "/images/logo-galana.jpeg",
  color_primario: "#A8802E",
  color_primario_dark: "#8A6720",
  telefono: null,
  whatsapp: null,
  direccion: null,
};

export const useBrandingStore = defineStore("branding", () => {
  const branding = ref<Branding>({ ...DEFAULTS });
  const loaded = ref(false);

  // Escribe las variables CSS que tailwind.config.js referencia para
  // brand-red — así los colores se ven en toda la app sin tocar cada
  // componente que usa las clases bg-brand-red / text-brand-red / etc.
  function applyCssVars(b: Branding) {
    const root = document.documentElement.style;
    root.setProperty("--color-brand-primary", b.color_primario);
    root.setProperty("--color-brand-primary-dark", b.color_primario_dark);
    root.setProperty("--color-brand-primary-rgb", hexToRgb(b.color_primario));
  }

  function hexToRgb(hex: string): string {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    if ([r, g, b].some((n) => Number.isNaN(n))) return "168, 128, 46";
    return `${r}, ${g}, ${b}`;
  }

  async function fetch() {
    try {
      const { data } = await api.get("/branding");
      branding.value = { ...DEFAULTS, ...data.data };
    } catch {
      branding.value = { ...DEFAULTS };
    } finally {
      applyCssVars(branding.value);
      loaded.value = true;
    }
  }

  return { branding, loaded, fetch, applyCssVars };
});
