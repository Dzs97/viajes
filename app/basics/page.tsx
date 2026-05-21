import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import ScrollToTop from "../components/ScrollToTop";
import BasicsSection from "../components/BasicsSection";

export const metadata: Metadata = {
  title: "Basics · Three Weeks",
  description: "Items para comprar y empacar antes del viaje a Inglaterra, Irlanda y Escocia.",
};

export default function BasicsPage() {
  return (
    <>
      <SiteHeader />

      <section className="hero hero-compact">
        <div className="hero-eyebrow">Antes del viaje</div>
        <h1 className="hero-title">
          Basics <em>&</em> preparación
        </h1>
        <p className="hero-subtitle">
          Lista de cosas para comprar, empacar y dejar listo antes de salir el sáb 15 may 2027.
          Click en cada status para cambiar. Edita libremente.
        </p>
      </section>

      <BasicsSection />

      <footer className="footer">
        <p className="footer-text">Buen viaje. ✦</p>
      </footer>

      <ScrollToTop />
    </>
  );
}
