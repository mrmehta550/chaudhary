import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Gem } from "lucide-react";
import { getGeneralWhatsAppUrl, shopConfig } from "../config/shopConfig";

export default function FestiveBanner() {
  return (
    <section
      style={{
        padding: "4.5rem 0",
        background: "var(--bg-body)",
      }}
    >
      <div className="container">
        <div
          style={{
            position: "relative",
            background: "linear-gradient(135deg, #1C1917 0%, #2A2420 50%, #171514 100%)",
            color: "#FAF7F2",
            borderRadius: "var(--radius-lg)",
            border: "1.5px solid rgba(197, 160, 89, 0.45)",
            boxShadow: "var(--shadow-lg)",
            overflow: "hidden",
            padding: "3.5rem 2.5rem",
          }}
        >
          {/* Subtle gold ornamental corner borders */}
          <div
            style={{
              position: "absolute",
              top: "14px",
              left: "14px",
              right: "14px",
              bottom: "14px",
              border: "1px solid rgba(223, 202, 141, 0.22)",
              pointerEvents: "none",
              borderRadius: "8px",
            }}
          />

          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 1rem",
                borderRadius: "var(--radius-full)",
                background: "rgba(197, 160, 89, 0.15)",
                border: "1px solid rgba(197, 160, 89, 0.4)",
                color: "var(--gold-light)",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              <Gem size={14} style={{ color: "var(--gold-light)" }} />
              <span>Festive & Wedding Season Trunk Edit</span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 3.8vw, 3rem)",
                fontWeight: 600,
                color: "#FFFFFF",
                lineHeight: 1.2,
                marginBottom: "1.2rem",
                letterSpacing: "-0.01em",
              }}
            >
              Curated Grandeur for Weddings, Celebrations & Milestones
            </h2>

            <p
              style={{
                fontSize: "1.05rem",
                color: "#E2D9CE",
                lineHeight: 1.7,
                maxWidth: "680px",
                margin: "0 auto 2.25rem",
                fontWeight: 300,
              }}
            >
              From royal Kanjivaram heirlooms and bespoke Anarkalis to handsome coordinated boys' sherwanis and girls' festive lehengas — enjoy personalized in-store styling and custom blouse stitching at our physical boutique.
            </p>

            {/* Feature Pills */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "1.25rem",
                marginBottom: "2.5rem",
                fontSize: "0.85rem",
                color: "var(--gold-light)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <Sparkles size={15} />
                <span>Handloom Authenticity</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <Sparkles size={15} />
                <span>Custom In-Store Sizing</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <Sparkles size={15} />
                <span>Family Matching Ensembles</span>
              </div>
            </div>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <a
                href={getGeneralWhatsAppUrl("Festive Wedding Trouseau Consultation")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
                style={{ textDecoration: "none" }}
              >
                <MessageCircle size={18} />
                <span>Book Boutique Consultation on WhatsApp</span>
              </a>

              <Link
                to="/category/all"
                className="btn btn-gold btn-lg"
                style={{ textDecoration: "none" }}
              >
                <span>Browse Festive Catalogue</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
