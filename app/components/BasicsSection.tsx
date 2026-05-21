"use client";

import { basics, basicsCategories, groupByCategory, totalCostUSD, type BasicItem } from "../data/basics";
import { exchangeRates, formatAmount, type Currency } from "../data/budget";
import { useState } from "react";

const CURRENCIES: Currency[] = ["MXN", "USD", "EUR", "GBP"];

export default function BasicsSection() {
  const [currency, setCurrency] = useState<Currency>("MXN");
  const grouped = groupByCategory(basics);
  const total = totalCostUSD(basics);

  if (basics.length === 0) return null;

  return (
    <section className="basics-section" id="basics">
      <div className="basics-header">
        <div className="hero-eyebrow">Antes del viaje</div>
        <h2 className="basics-title">Basics</h2>
        <p className="basics-subtitle">
          Cosas que comprar / preparar / empacar antes de salir. Actualizar el status cuando se vaya comprando.
        </p>
        <div className="currency-toggle" role="group" aria-label="Cambiar moneda basics">
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

      <div className="basics-grid">
        {basicsCategories.map((cat) => {
          const items = grouped[cat.id];
          if (!items || items.length === 0) return null;
          return (
            <div key={cat.id} className="basics-category">
              <h3 className="basics-category-title">
                <span className="basics-category-icon">{cat.icon}</span>
                {cat.label}
                <span className="basics-category-count">{items.length}</span>
              </h3>
              <ul className="basics-items">
                {items.map((item, idx) => (
                  <BasicItemCard key={`${cat.id}-${idx}`} item={item} currency={currency} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {total > 0 && (
        <div className="basics-footer">
          <span className="basics-footer-label">Costo total estimado de compras</span>
          <span className="basics-footer-amount">{formatAmount(total, currency)}</span>
        </div>
      )}
    </section>
  );
}

function BasicItemCard({ item, currency }: { item: BasicItem; currency: Currency }) {
  const status = item.status ?? "pendiente";

  return (
    <li className="basic-item">
      <div className="basic-item-main">
        <div className="basic-item-header">
          <span className="basic-item-name">
            {item.brand && <span className="basic-item-brand">{item.brand}</span>}
            {item.name}
          </span>
          <span className={`status-pill status-${status}`} aria-label={`Estado: ${status}`}>
            {status}
          </span>
        </div>
        {item.priceUSD !== undefined && item.priceUSD > 0 && (
          <span className="basic-item-price">{formatAmount(item.priceUSD, currency)}</span>
        )}
      </div>
      <p className="basic-item-description">{item.description}</p>
      {item.notes && <p className="basic-item-notes">{item.notes}</p>}
      <div className="basic-item-meta">
        {item.forUser && <span className="basic-item-tag">Para: {item.forUser}</span>}
        {item.url && (
          <a className="basic-item-link" href={item.url} target="_blank" rel="noopener noreferrer">
            Ver producto →
          </a>
        )}
      </div>
    </li>
  );
}
