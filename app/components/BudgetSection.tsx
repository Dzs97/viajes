"use client";

import { useState } from "react";
import {
  budgets,
  exchangeRates,
  formatAmount,
  getCountryTotal,
  getGrandTotal,
  type Currency,
} from "../data/budget";

const CURRENCIES: Currency[] = ["MXN", "USD", "EUR", "GBP"];

export default function BudgetSection({ countryId }: { countryId: string }) {
  const [currency, setCurrency] = useState<Currency>("MXN");

  const budget = budgets.find((b) => b.countryId === countryId);
  if (!budget || budget.items.length === 0) return null;

  const total = getCountryTotal(countryId);

  return (
    <section className="budget-section">
      <div className="budget-header">
        <div>
          <div className="budget-eyebrow">Presupuesto estimado</div>
          <h3 className="budget-title">Costo del país</h3>
          <p className="budget-subtitle">
            2 personas · nivel cómodo · hoteles 4★ · restaurantes mejores
          </p>
        </div>
        <div className="currency-toggle" role="group" aria-label="Cambiar moneda">
          {CURRENCIES.map((c) => (
            <button
              key={c}
              className="currency-btn"
              data-active={currency === c}
              onClick={() => setCurrency(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <ul className="budget-items">
        {budget.items.map((item, idx) => (
          <li className="budget-item" key={idx}>
            <div className="budget-item-main">
              <span className="budget-item-label">{item.label}</span>
              <span className="budget-item-amount">{formatAmount(item.amount, currency)}</span>
            </div>
            {item.detail && <p className="budget-item-detail">{item.detail}</p>}
          </li>
        ))}
      </ul>

      <div className="budget-total">
        <span className="budget-total-label">Total {budget.countryId}</span>
        <span className="budget-total-amount">{formatAmount(total, currency)}</span>
      </div>

      <p className="budget-disclaimer">
        Estimados aproximados basados en precios de mayo 2026. Tipos de cambio: 1 USD ≈ {exchangeRates.MXN} MXN ·{" "}
        {(1 / exchangeRates.EUR).toFixed(2)} USD/EUR · {(1 / exchangeRates.GBP).toFixed(2)} USD/GBP.
        Precios pueden variar significativamente según temporada, anticipación de reserva y disponibilidad.
      </p>
    </section>
  );
}

export function GrandTotalBanner() {
  const [currency, setCurrency] = useState<Currency>("MXN");
  const total = getGrandTotal();

  return (
    <section className="grand-total">
      <div className="grand-total-inner">
        <div>
          <div className="budget-eyebrow">Total del viaje</div>
          <h2 className="grand-total-amount">{formatAmount(total, currency)}</h2>
          <p className="grand-total-detail">3 países · 21 días · 2 personas</p>
        </div>
        <div className="currency-toggle" role="group" aria-label="Cambiar moneda total">
          {CURRENCIES.map((c) => (
            <button
              key={c}
              className="currency-btn"
              data-active={currency === c}
              onClick={() => setCurrency(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
