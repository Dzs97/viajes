import { bookings, bookingPhases, getPhaseTotal, type BookingCategory } from "../data/bookings";
import { trip } from "../data/trip";
import { exchangeRates } from "../data/budget";

const categoryIcons: Record<BookingCategory, string> = {
  vuelo: "✈︎",
  hotel: "⌂",
  coche: "◉",
  entrada: "◈",
  tour: "✦",
  restaurante: "✱",
  transporte: "⇄",
  tramite: "§",
};

const countryFlags: Record<string, string> = {
  ...Object.fromEntries(trip.map((c) => [c.id, c.flag])),
  general: "🌐",
};

function formatUSD(amount: number): string {
  return `$${amount.toLocaleString("en-US")} USD`;
}

function formatMXN(amount: number): string {
  return `$${Math.round(amount * exchangeRates.MXN).toLocaleString("en-US")} MXN`;
}

export default function BookingsSection() {
  return (
    <section className="bookings-section">
      {bookingPhases.map((phase) => {
        const items = bookings.filter((b) => b.phase === phase.id);
        if (items.length === 0) return null;
        const total = getPhaseTotal(phase.id);

        return (
          <div key={phase.id} className="booking-phase" id={`fase-${phase.id}`}>
            <div className="booking-phase-header">
              <div>
                <div className="booking-phase-when">{phase.when}</div>
                <h2 className="booking-phase-title">{phase.title}</h2>
                <p className="booking-phase-description">{phase.description}</p>
              </div>
              <div className="booking-phase-total">
                <span className="booking-phase-total-label">Subtotal (2 personas)</span>
                <span className="booking-phase-total-amount">{formatUSD(total)}</span>
                <span className="booking-phase-total-mxn">≈ {formatMXN(total)}</span>
              </div>
            </div>

            <ul className="booking-list">
              {items.map((b) => {
                const status = b.status ?? "pendiente";
                return (
                  <li key={b.name} className="booking-card">
                    <div className="booking-card-top">
                      <span className="booking-card-icon" aria-hidden="true">
                        {categoryIcons[b.category]}
                      </span>
                      <div className="booking-card-heading">
                        <h3 className="booking-card-name">
                          {b.name}
                          <span className={`status-pill status-${status}`}>{status}</span>
                        </h3>
                        <div className="booking-card-meta">
                          <span>{countryFlags[b.countryId]}</span>
                          {b.day && <span>{b.day}</span>}
                          <span className="booking-card-category">{b.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="booking-card-price">
                      <span className="booking-card-price-local">{b.price}</span>
                      {b.totalUSD > 0 && (
                        <span className="booking-card-price-total">2 pers. ≈ {formatUSD(b.totalUSD)}</span>
                      )}
                      <span className={`booking-source booking-source-${b.priceSource}`}>
                        {b.priceSource === "oficial" ? "precio oficial" : "estimado"}
                      </span>
                    </div>

                    {b.notes && <p className="booking-card-notes">{b.notes}</p>}

                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="booking-card-link"
                    >
                      Reservar en {b.linkLabel ?? "sitio oficial"} ↗
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      <p className="budget-disclaimer">
        Precios investigados en oct 2026 (los de 2027 pueden subir 3-8%). &quot;Precio oficial&quot; = tomado del
        sitio del lugar; &quot;estimado&quot; = de agencias o reseñas, confirmar al reservar. Los links de hoteles
        y vuelos ya llevan las fechas del viaje. Para marcar algo como reservado, cambia su{" "}
        <code>status</code> en <code>app/data/bookings.ts</code>.
      </p>
    </section>
  );
}
