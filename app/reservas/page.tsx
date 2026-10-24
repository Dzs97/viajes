import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import ScrollToTop from "../components/ScrollToTop";
import BookingsSection from "../components/BookingsSection";
import { bookingPhases } from "../data/bookings";

export const metadata: Metadata = {
  title: "Reservas · My Travel",
  description: "Qué reservar, cuándo, cuánto cuesta y dónde comprarlo para el viaje a Inglaterra, Irlanda y Escocia.",
};

export default function ReservasPage() {
  return (
    <>
      <SiteHeader />

      <section className="hero hero-compact">
        <div className="hero-eyebrow">Antes del viaje</div>
        <h1 className="hero-title">
          Reservas <em>&</em> precios
        </h1>
        <p className="hero-subtitle">
          Todo lo que hay que comprar, ordenado por cuándo conviene reservarlo, con precios reales y link directo.
        </p>
      </section>

      <nav className="country-nav">
        {bookingPhases.map((p) => (
          <a key={p.id} href={`#fase-${p.id}`} className="country-pill">
            <span>{p.title}</span>
          </a>
        ))}
      </nav>

      <BookingsSection />

      <footer className="footer">
        <p className="footer-text">Buen viaje. ✦</p>
      </footer>

      <ScrollToTop />
    </>
  );
}
