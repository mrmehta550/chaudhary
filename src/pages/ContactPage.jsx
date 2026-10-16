import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  MessageCircle,
  Sparkles,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import { shopConfig, getGeneralWhatsAppUrl } from "../config/shopConfig";

export default function ContactPage() {
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryCategory, setInquiryCategory] = useState("Sarees");
  const [inquiryDate, setInquiryDate] = useState("");
  const [inquiryNotes, setInquiryNotes] = useState("");

  const handleLaunchWhatsApp = (e) => {
    e.preventDefault();
    const cleanNumber = shopConfig.whatsapp.cleanNumber;
    const parts = [
      `*Store Visit / Catalogue Inquiry for Chaudhary Fashion Mark:*`,
      inquiryName ? `• *Customer Name:* ${inquiryName}` : null,
      `• *Interested Category:* ${inquiryCategory}`,
      inquiryDate ? `• *Preferred Visit Date:* ${inquiryDate}` : null,
      inquiryNotes ? `• *Details / Requirements:* ${inquiryNotes}` : null,
      ``,
      `Hello! I would like to inquire about viewing these collections at your boutique. Please let me know available slots or assistance.`,
    ].filter(Boolean);

    const message = parts.join("\n");
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const faqs = [
    {
      q: "Are the prices shown on this website final?",
      a: "The prices listed on this digital catalogue are sample reference prices for demo presentation. Exact in-store pricing and custom stitching charges can be verified directly via WhatsApp or during your boutique visit.",
    },
    {
      q: "Do you offer in-store trial rooms and fitting assistance?",
      a: "Yes, our physical boutique features spacious, well-lit trial lounges with female drapery specialists available to assist with saree draping and custom suit fittings.",
    },
    {
      q: "Can I get blouse stitching done for sarees purchased from you?",
      a: "Certainly! We have on-premise master tailors who execute custom blouse stitching with customized necklines, pads, lining, falls, and pico finishing.",
    },
    {
      q: "Can you arrange matching outfits for weddings or family events?",
      a: "Yes. We specialize in coordinated family wardrobes across Sarees, Women's Suits, Boys' Sherwanis/Kurtas, and Girls' Lehengas for family functions.",
    },
  ];

  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* Header */}
      <section
        style={{
          background: "linear-gradient(180deg, var(--bg-cream) 0%, var(--bg-body) 100%)",
          padding: "4rem 0 2.5rem",
          borderBottom: "1px solid var(--border-delicate)",
          textAlign: "center",
        }}
      >
        <div className="container-narrow">
          <span className="section-eyebrow">
            <Sparkles size={14} />
            Store Concierge & Location
          </span>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Visit Our Boutique & Contact Us
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            We are a physical Indian clothing shop with a digital catalogue. Connect directly on WhatsApp or plan your in-store consultation.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Info + WhatsApp Appointment Launcher */}
      <section style={{ paddingTop: "3.5rem" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "2.5rem",
              marginBottom: "4rem",
            }}
          >
            {/* Left: Contact Info & Store Address Placeholders */}
            <div
              className="boutique-card"
              style={{
                padding: "2.5rem",
                borderRadius: "var(--radius-md)",
                background: "#FFFFFF",
                border: "1px solid var(--border-delicate)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <span className="badge-luxury">Physical Store</span>
                <span className="badge-demo">Demo Placeholders</span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.75rem",
                  color: "var(--text-primary)",
                  marginBottom: "1.5rem",
                }}
              >
                Store Coordinates
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                {/* Address */}
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
                    <MapPin size={20} />
                  </div>
                  <div>
                    <strong style={{ fontSize: "0.95rem", color: "var(--text-primary)", display: "block", marginBottom: "0.2rem" }}>
                      Boutique Location
                    </strong>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                      {shopConfig.store.addressLine1}
                      <br />
                      {shopConfig.store.addressLine2}
                      <br />
                      {shopConfig.store.cityStateZip}
                    </p>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      Landmark: {shopConfig.store.landmark}
                    </span>
                  </div>
                </div>

                {/* Hours */}
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
                    <Clock size={20} />
                  </div>
                  <div>
                    <strong style={{ fontSize: "0.95rem", color: "var(--text-primary)", display: "block", marginBottom: "0.2rem" }}>
                      Store Hours
                    </strong>
                    {shopConfig.store.timings.map((t, i) => (
                      <p key={i} style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0 }}>
                        {t.days}: <strong>{t.hours}</strong>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Telephone */}
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
                    <strong style={{ fontSize: "0.95rem", color: "var(--text-primary)", display: "block", marginBottom: "0.2rem" }}>
                      Telephone & WhatsApp
                    </strong>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0 }}>
                      WhatsApp Direct: <strong>{shopConfig.whatsapp.displayNumber}</strong>
                    </p>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0 }}>
                      Landline: {shopConfig.store.phoneSecondary}
                    </p>
                  </div>
                </div>

                {/* Email */}
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
                    <Mail size={20} />
                  </div>
                  <div>
                    <strong style={{ fontSize: "0.95rem", color: "var(--text-primary)", display: "block", marginBottom: "0.2rem" }}>
                      Email Inquiries
                    </strong>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0 }}>
                      {shopConfig.store.email}
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "2rem" }}>
                <a
                  href={shopConfig.store.mapQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}
                >
                  <Navigation size={15} />
                  <span>Open Directions in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Right: Plan a Visit / WhatsApp Inquiry Form */}
            <div
              className="boutique-card"
              style={{
                padding: "2.5rem",
                borderRadius: "var(--radius-md)",
                background: "#FFFFFF",
                border: "1.5px solid var(--gold-border)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span className="badge-luxury">WhatsApp Concierge</span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.75rem",
                  color: "var(--text-primary)",
                  marginBottom: "0.5rem",
                }}
              >
                Plan a Store Visit or Inquire
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                Fill out the quick inquiry details below to generate a pre-formatted inquiry directly on WhatsApp with our store concierge.
              </p>

              <form onSubmit={handleLaunchWhatsApp}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="input-luxury"
                      placeholder="e.g. Radhika Sharma"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                      Department of Interest
                    </label>
                    <select
                      className="select-luxury"
                      value={inquiryCategory}
                      onChange={(e) => setInquiryCategory(e.target.value)}
                    >
                      <option value="Sarees">Sarees (Kanjivaram, Banarasi, Organza)</option>
                      <option value="Women's Suits">Women's Suits (Anarkali, Sharara)</option>
                      <option value="Boys' Clothing">Boys' Clothing (Sherwanis, Kurta Sets)</option>
                      <option value="Girls' Clothing">Girls' Clothing (Lehengas, Anarkalis)</option>
                      <option value="Complete Family Wedding Set">Complete Family Wedding Package</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                      Approximate Visit Date (Optional)
                    </label>
                    <input
                      type="date"
                      className="input-luxury"
                      value={inquiryDate}
                      onChange={(e) => setInquiryDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                      Inquiry Notes / Specific Pieces
                    </label>
                    <textarea
                      rows="3"
                      className="input-luxury"
                      placeholder="e.g. Inquiring about Banarasi saree CFM-SAR-01 and matching boys' sherwani..."
                      value={inquiryNotes}
                      onChange={(e) => setInquiryNotes(e.target.value)}
                      style={{ resize: "vertical" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-whatsapp btn-lg"
                    style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
                  >
                    <MessageCircle size={18} />
                    <span>Send Inquiry on WhatsApp</span>
                  </button>

                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center", margin: 0 }}>
                    Clicking opens WhatsApp with your prefilled details to chat directly with our store team.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Boutique Visit FAQs */}
          <div style={{ marginTop: "4rem" }}>
            <div className="section-header">
              <span className="section-eyebrow">
                <HelpCircle size={14} />
                Boutique Assistance
              </span>
              <h3 className="section-title">Frequently Asked Questions</h3>
              <p className="section-subtitle">
                Essential details regarding store visits, trial rooms, and catalogue items.
              </p>
              <div className="ornament-divider">✦ ❖ ✦</div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "1.75rem",
                    background: "#FFFFFF",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-delicate)",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.98rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {faq.q}
                  </h4>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
