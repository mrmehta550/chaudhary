import React from "react";
import { MapPin, Clock, Phone, Mail, Navigation, MessageCircle, Sparkles } from "lucide-react";
import { shopConfig, getGeneralWhatsAppUrl } from "../config/shopConfig";

export default function StoreLocation() {
  return (
    <section
      style={{
        padding: "5rem 0",
        background: "var(--bg-cream)",
        borderTop: "1px solid var(--border-delicate)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">
            <Sparkles size={14} />
            Physical Boutique
          </span>
          <h2 className="section-title">Visit Our Store</h2>
          <p className="section-subtitle">
            Experience our rich textile textures, try on our festive silhouettes in comfortable trial rooms, and receive personalized assistance from our boutique drapery experts.
          </p>
          <div className="ornament-divider">✦ ❖ ✦</div>
        </div>

        {/* Store Information Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "2rem",
            alignItems: "stretch",
          }}
        >
          {/* Card 1: Address & Contacts (Placeholders) */}
          <div
            className="boutique-card"
            style={{
              padding: "2rem",
              borderRadius: "var(--radius-md)",
              background: "#FFFFFF",
              border: "1px solid var(--border-card)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <span className="badge-luxury">Boutique Flagship</span>
                <span className="badge-demo">Store Placeholder</span>
              </div>

              {/* Address Section */}
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "rgba(197, 160, 89, 0.12)",
                    color: "var(--gold-dark)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                    Boutique Address
                  </h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                    {shopConfig.store.addressLine1}
                    <br />
                    {shopConfig.store.addressLine2}
                    <br />
                    {shopConfig.store.cityStateZip}
                  </p>
                  <span style={{ display: "inline-block", fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
                    Landmark: {shopConfig.store.landmark}
                  </span>
                </div>
              </div>

              {/* Timings */}
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "rgba(197, 160, 89, 0.12)",
                    color: "var(--gold-dark)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Clock size={20} />
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                    Store Hours
                  </h4>
                  {shopConfig.store.timings.map((t, idx) => (
                    <p key={idx} style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
                      <strong>{t.days}:</strong> {t.hours}
                    </p>
                  ))}
                </div>
              </div>

              {/* Phone & Direct Contacts */}
              <div style={{ display: "flex", gap: "1rem" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "rgba(197, 160, 89, 0.12)",
                    color: "var(--gold-dark)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Phone size={20} />
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                    Phone & Inquiries
                  </h4>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0 }}>
                    Primary: {shopConfig.store.phonePrimary} (WhatsApp enabled)
                  </p>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0 }}>
                    Landline: {shopConfig.store.phoneSecondary}
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a
                href={getGeneralWhatsAppUrl("Store Visit & Trial Appointment")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ flex: 1, textDecoration: "none" }}
              >
                <MessageCircle size={16} />
                <span>Notify Visit on WhatsApp</span>
              </a>
              <a
                href={shopConfig.store.mapQueryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ textDecoration: "none" }}
              >
                <Navigation size={15} />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Card 2: Interactive Boutique Map & In-Store Experience Preview */}
          <div
            className="boutique-card"
            style={{
              padding: "2rem",
              borderRadius: "var(--radius-md)",
              background: "#FFFFFF",
              border: "1px solid var(--border-card)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>
                  Store Experience & Amenities
                </h4>
                <span className="badge-luxury">In-Store</span>
              </div>

              {/* Map Preview Frame */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "210px",
                  borderRadius: "var(--radius-sm)",
                  overflow: "hidden",
                  border: "1px solid var(--border-delicate)",
                  background: "var(--bg-cream)",
                  marginBottom: "1.5rem",
                }}
              >
                {/* Styled Map Graphic Illustration */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(circle at 50% 50%, #FAF6EE 0%, #EFE8DA 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "var(--bg-deep-charcoal)",
                      color: "var(--gold-light)",
                      border: "2px solid var(--gold-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "0.5rem",
                      boxShadow: "var(--shadow-md)",
                    }}
                  >
                    <MapPin size={24} />
                  </div>
                  <strong style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--text-primary)" }}>
                    {shopConfig.shopName} Flagship
                  </strong>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: "0.2rem 0 0.5rem" }}>
                    janag chowk • Muzaffarpur  (Configurable Coordinates)
                  </p>
                  <a
                    href={shopConfig.store.mapQueryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--gold-dark)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <span>Open in Google Maps</span>
                    <Navigation size={12} />
                  </a>
                </div>
              </div>

              {/* In-Store Services List */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {shopConfig.store.amenities.map((amenity, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      padding: "0.45rem 0",
                      borderBottom: "1px solid rgba(0,0,0,0.04)",
                    }}
                  >
                    <span style={{ color: "var(--gold-dark)" }}>❖</span>
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                marginTop: "1.5rem",
                padding: "0.85rem 1rem",
                background: "var(--bg-cream)",
                borderRadius: "var(--radius-sm)",
                border: "1px dashed var(--border-delicate)",
                fontSize: "0.75rem",
                color: "var(--text-muted)",
              }}
            >
              Note: Address and telephone shown above are representative boutique placeholders. Update in <code>src/config/shopConfig.js</code> when live physical shop details are ready.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
