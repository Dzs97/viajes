import { trip } from "./data/trip";
import DayCard from "./components/DayCard";
import ThemeToggle from "./components/ThemeToggle";
import ScrollToTop from "./components/ScrollToTop";
import ExportMenu from "./components/ExportMenu";
import BudgetSection, { GrandTotalBanner } from "./components/BudgetSection";

export default function Home() {
  const totalDays = trip.reduce((sum, c) => sum + c.days.length, 0);
  const totalStops = trip.reduce(
    (sum, c) => sum + c.days.reduce((s, d) => s + d.locations.length, 0),
    0
  );

  return (
    <>
      <header className="header" id="top">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-mark">3W</span>
            <span>Three Weeks</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <section className="hero">
        <div className="hero-eyebrow">Itinerario · 3 semanas</div>
        <h1 className="hero-title">
          Irlanda, Escocia <em>&</em> Inglaterra
        </h1>
        <p className="hero-subtitle">
          Un loop por las islas británicas: del Atlántico salvaje irlandés a los castillos de Edimburgo, terminando en los pubs históricos de Londres.
        </p>

        <div className="hero-meta">
          <div className="hero-meta-item">
            <span className="hero-meta-label">Países</span>
            <span className="hero-meta-value">3</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Días planeados</span>
            <span className="hero-meta-value">{totalDays}</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Paradas</span>
            <span className="hero-meta-value">{totalStops}</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">Mejor época</span>
            <span className="hero-meta-value">May–Sep</span>
          </div>
        </div>
      </section>

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
