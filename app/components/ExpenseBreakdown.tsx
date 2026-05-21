"use client";

import { useState } from "react";
import { budgets, formatAmount, getCountryTotal, type Currency } from "../data/budget";
import { trip } from "../data/trip";

const CURRENCIES: Currency[] = ["MXN", "USD", "EUR", "GBP"];

export default function ExpenseBreakdown() {
  const [currency, setCurrency] = useState<Currency>("MXN");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    const all = trip.map((c) => c.id).filter((id) => budgets.some((b) => b.countryId === id));
    setExpanded(new Set(all));
  };

  const collapseAll = () => {
    setExpanded(new Set());
  };

  const allExpanded = expanded.size > 0 && trip.every((c) => !budgets.find((b) => b.countryId === c.id) || expanded.has(c.id));

  return (
    <section className="expense-breakdown" aria-label="Desglose de gastos por país">
      <div className="expense-breakdown-header">
        <div>
          <div className="hero-eyebrow">Desglose por país</div>
          <h2 className="expense-breakdown-title">Gastos detallados</h2>
        </div>
        <div className="expense-breakdown-toolbar">
          <button
            className="expense-expand-btn"
            onClick={allExpanded ? collapseAll : expandAll}
          >
            {allExpanded ? "Colapsar todo" : "Expandir todo"}
          </button>
          <div className="currency-toggle" role="group" aria-label="Cambiar moneda desglose">
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
      </div>

      <div className="expense-breakdown-list">
        {trip.map((country) => {
          const budget = budgets.find((b) => b.countryId === country.id);
          if (!budget || budget.items.length === 0) return null;
          const total = getCountryTotal(country.id);
          const isOpen = expanded.has(country.id);
          const nightCount = country.days.filter((d) => d.sleep).length;

          return (
            <div
              key={country.id}
              className="expense-country"
              data-open={isOpen}
            >
              <button
                className="expense-country-header"
                onClick={() => toggle(country.id)}
                aria-expanded={isOpen}
                aria-controls={`breakdown-${country.id}`}
              >
                <span className="expense-country-flag">{country.flag}</span>
                <div className="expense-country-info">
                  <span className="expense-country-name">{country.name}</span>
                  <span className="expense-country-meta">
                    {country.days.length} días{nightCount > 0 ? ` · ${nightCount} noches` : ""}
                  </span>
                </div>
                <span className="expense-country-total">{formatAmount(total, currency)}</span>
                <span className="expense-country-toggle" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              <ul className="expense-items-list" id={`breakdown-${country.id}`}>
                {budget.items.map((item, idx) => {
                  const status = item.status ?? "pendiente";
                  return (
                    <li className="expense-item" key={idx}>
                      <div className="expense-item-row">
                        <span className="expense-item-label">{item.label}</span>
                        <span className="expense-item-amount">
                          {formatAmount(item.amount, currency)}
                        </span>
                      </div>
                      <div className="expense-item-bottom">
                        <span className={`status-pill status-${status}`}>
                          {status}
                        </span>
                        {item.detail && (
                          <p className="expense-item-detail">{item.detail}</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
