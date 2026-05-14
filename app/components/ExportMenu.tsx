"use client";

import { useEffect, useRef, useState } from "react";
import { trip } from "../data/trip";
import { budgets, formatAmount, getCountryTotal, getGrandTotal } from "../data/budget";
import { dateForDay, formatTripDate } from "../lib/dates";

function generateMarkdown(): string {
  let md = `# Itinerario · Inglaterra, Irlanda & Escocia\n\n`;
  md += `_Viaje de 3 semanas por las Islas Británicas · Mayo 2027_\n\n`;
  md += `---\n\n`;

  for (const country of trip) {
    md += `## ${country.flag} ${country.name}\n\n`;
    md += `**${country.subtitle}**\n\n`;
    md += `${country.description}\n\n`;

    if (country.days.length === 0) {
      md += `_Itinerario por definir._\n\n`;
    } else {
      for (const day of country.days) {
        const date = formatTripDate(dateForDay(day.number));
        md += `### Día ${day.number} (${date}) — ${day.title}\n\n`;
        md += `${day.narrative}\n\n`;
        if (day.sleep) {
          md += `**Noche en:** ${day.sleep}\n\n`;
        }
        md += `**Paradas:**\n\n`;
        day.locations.forEach((loc, idx) => {
          md += `${idx + 1}. **${loc.name}**`;
          if (loc.time) md += ` — ${loc.time}`;
          if (loc.duration) md += ` (${loc.duration})`;
          md += `\n`;
          if (loc.notes) md += `   ${loc.notes}\n`;
          md += `   [Ver en Google Maps](https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng})\n\n`;
        });
      }
    }

    // Budget for the country
    const countryBudget = budgets.find((b) => b.countryId === country.id);
    if (countryBudget) {
      md += `### Presupuesto estimado · ${country.name}\n\n`;
      md += `_2 personas · nivel cómodo · hoteles 3-3.5★_\n\n`;
      md += `| Concepto | Estado | MXN | USD |\n`;
      md += `|---|---|---|---|\n`;
      for (const item of countryBudget.items) {
        const status = item.status ?? "pendiente";
        md += `| ${item.label} | ${status} | ${formatAmount(item.amount, "MXN")} | ${formatAmount(item.amount, "USD")} |\n`;
      }
      const total = getCountryTotal(country.id);
      md += `| **TOTAL** | **${formatAmount(total, "MXN")}** | **${formatAmount(total, "USD")}** |\n\n`;
    }

    md += `---\n\n`;
  }

  // Grand total
  const grand = getGrandTotal();
  md += `## Total del viaje\n\n`;
  md += `- **${formatAmount(grand, "MXN")}**\n`;
  md += `- **${formatAmount(grand, "USD")}**\n`;
  md += `- **${formatAmount(grand, "EUR")}**\n`;
  md += `- **${formatAmount(grand, "GBP")}**\n\n`;
  md += `_Estimados basados en precios de mayo 2027. Pueden variar según temporada y anticipación de reserva._\n`;

  return md;
}

function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function ExportMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const exportMarkdown = () => {
    const md = generateMarkdown();
    downloadFile(md, "itinerario-inglaterra-irlanda-escocia.md", "text/markdown");
    setOpen(false);
  };

  const exportPDF = () => {
    setOpen(false);
    // Open all day cards so they print expanded
    document.querySelectorAll('.day-card').forEach((card) => {
      (card as HTMLElement).dataset.open = "true";
    });
    // Small delay for layout to settle, then trigger print
    setTimeout(() => {
      window.print();
    }, 250);
  };

  return (
    <div className="export-menu" ref={menuRef}>
      <button
        className="export-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Exportar itinerario"
        aria-expanded={open}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </button>

      <div className="export-dropdown" data-open={open}>
        <button className="export-option" onClick={exportPDF}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9V2h12v7" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          <div>
            <div className="export-option-title">Imprimir / PDF</div>
            <div className="export-option-desc">Abre diálogo de impresión</div>
          </div>
        </button>
        <button className="export-option" onClick={exportMarkdown}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <div>
            <div className="export-option-title">Descargar Markdown</div>
            <div className="export-option-desc">Para Notion, Obsidian, etc.</div>
          </div>
        </button>
      </div>
    </div>
  );
}
