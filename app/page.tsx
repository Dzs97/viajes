import dynamic from "next/dynamic";
import { trip, totalTripDays } from "./data/trip";
import DayCard from "./components/DayCard";
import SiteHeader from "./components/SiteHeader";
import ScrollToTop from "./components/ScrollToTop";
import ExportMenu from "./components/ExportMenu";
import BudgetSection, { GrandTotalBanner } from "./components/BudgetSection";
import Countdown from "./components/Countdown";

const OverviewMap = dynamic(() => import("./components/OverviewMap"), {
  ssr: false,
  loading: () => (
    <section className="overview-map-section">
      <div className="overview-map-wrapper">
        <div className="map-loading">Cargando mapa…</div>
      </div>
    </section>
  ),
});

export default function Home() {
  const plannedDays = trip.reduce((sum, c) => sum + c.days.length, 0);
  const totalStops = trip.reduce(
    (sum, c) => sum + c.days.reduce((s, d) => s + d.locations.length, 0),
    0
  );

  return (
    <>
      <SiteHeader />

      <section className="hero">
        <div className="hero-eyebrow">Itinerario · 3 semanas</div>
        <h1 className="hero-title">
          Inglaterra, Irlanda <em>&</em> Escocia
        </h1>
        <p className="hero-subtitle">
          Tres semanas atravesando las Islas Británicas: arrancamos en los pubs y museos de Londres, cruzamos al Atlántico salvaje de Irlanda, y terminamos entre castillos y Highlands en Escocia.
        </p>

        <Countdown />

        <div className="hero-meta">
          <div className="hero-meta-item">
            <span className="hero-meta-label">Países</span>
            <span className="hero-meta-value">3</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Días planeados</span>
            <span className="hero-meta-value">
              {plannedDays}<span className="hero-meta-fraction"> / {totalTripDays}</span>
            </span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Paradas</span>
            <span className="hero-meta-value">{totalStops}</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Fechas</span>
            <span className="hero-meta-value">May 2027</span>
          </div>
        </div>
      </section>

      <OverviewMap />

      <GrandTotalBanner />

      <nav className="country-nav">
        {trip.map((c) => (
          <a key={c.id} href={`#${c.id}`} className="country-pill">
            <span>{c.flag}</span>
            <span>{c.name}</span>
          </a>
        ))}
      </nav>

      {trip.map((country) => (
        <section key={country.id} id={country.id} className="country-section">
          <div className="country-header">
            <div className="country-flag">{country.flag}</div>
            <div className="country-subtitle">{country.subtitle}</div>
            <h2 className="country-name">{country.name}</h2>
            <p className="country-description">{country.description}</p>
          </div>

          {country.days.length === 0 ? (
            <div className="empty-state">
              Itinerario por definir — esta sección se completará pronto.
            </div>
          ) : (
            <div className="days-grid">
              {country.days.map((day) => (
                <DayCard key={day.number} day={day} />
              ))}
            </div>
          )}

          <BudgetSection countryId={country.id} />
        </section>
      ))}

      <footer className="footer">
        <p className="footer-text">Buen viaje. ✦</p>
      </footer>

      <ExportMenu />
      <ScrollToTop />
    </>
  );
}
