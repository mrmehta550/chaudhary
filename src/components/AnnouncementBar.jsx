import React from "react";
import { MessageCircle, MapPin, Sparkles, Phone } from "lucide-react";
import { shopConfig, getGeneralWhatsAppUrl } from "../config/shopConfig";

export default function AnnouncementBar() {
  return (
    <div
      style={{
        background: "var(--bg-deep-charcoal)",
        color: "var(--gold-light)",
        borderBottom: "1px solid rgba(197, 160, 89, 0.25)",
        fontSize: "0.78rem",
        letterSpacing: "0.04em",
        padding: "0.55rem 1rem",
        position: "relative",
        zIndex: 50,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        {/* Left: Physical Boutique note */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <MapPin size={13} style={{ color: "var(--gold-primary)" }} />
          <span>
            Physical Boutique: {shopConfig.store.cityStateZip}
          </span>
          <span style={{ color: "rgba(223, 202, 141, 0.4)", margin: "0 0.25rem" }}>•</span>
          <span style={{ color: "var(--text-light)", opacity: 0.85 }}>
            Mon–Sat: 10:30 AM – 8:30 PM
          </span>
        </div>

        {/* Center: Highlight Message */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            fontWeight: 500,
            color: "#FFF",
          }}
        >
          <Sparkles size={13} style={{ color: "var(--gold-primary)" }} />
          <span>
            Festive Edit 2026: Sarees, Suits & Kids' Celebratory Wear
          </span>
        </div>

        {/* Right: WhatsApp Concierge Link */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a
            href={getGeneralWhatsAppUrl("Catalogue Inquiry")}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              color: "#FFF",
              fontWeight: 500,
              transition: "var(--transition-smooth)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-light)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#FFF")}
          >
            <MessageCircle size={13} style={{ color: "#25D366" }} />
            <span>WhatsApp Concierge: {shopConfig.whatsapp.displayNumber}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
