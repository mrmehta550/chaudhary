import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, MapPin, Phone, Mail, Clock, Sparkles } from "lucide-react";
import { shopConfig, getGeneralWhatsAppUrl } from "../config/shopConfig";
import { categories } from "../data/products";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-deep-charcoal)",
        color: "#FAF7F2",
        borderTop: "2px solid var(--gold-primary)",
        paddingTop: "4.5rem",
        paddingBottom: "2rem",
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3.5rem",
          }}
        >
          {/* Column 1: Brand & Heritage */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "transparent",
                  border: "1.5px solid var(--gold-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--gold-light)",
                  fontWeight: 700,
                  fontFamily: "var(--font-display)",
                }}
              >
                CFM
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    letterSpacing: "0.06em",
                    margin: 0,
                    textTransform: "uppercase",
                  }}
                >
                  Chaudhary
                </h3>
                <span
                  style={{
                    fontSize: "0.68rem",
                    letterSpacing: "0.22em",
                    color: "var(--gold-light)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Fashion Mark • Boutique
                </span>
              </div>
            </div>

            <p style={{ fontSize: "0.88rem", color: "#CFC5BA", lineHeight: 1.65, marginBottom: "1.5rem" }}>
              A distinguished physical Indian clothing boutique presenting handcrafted sarees, women's designer suits, and celebratory boys' and girls' wear.
            </p>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              style={{ display: "inline-flex", textDecoration: "none" }}
            >
              <MessageCircle size={15} />
              <span>WhatsApp Concierge</span>
            </a>
          </div>

          {/* Column 2: Category Navigation */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.15rem",
                color: "var(--gold-light)",
                fontWeight: 600,
                letterSpacing: "0.05em",
                marginBottom: "1.2rem",
                textTransform: "uppercase",
              }}
            >
              Departments
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {categories.map((c) => (
                <li key={c.id} style={{ marginBottom: "0.65rem" }}>
                  <Link
                    to={`/category/${c.id}`}
                    style={{
                      fontSize: "0.88rem",
                      color: "#D6CCC0",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      transition: "var(--transition-smooth)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--gold-light)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#D6CCC0";
                    }}
                  >
                    <span>❖</span>
                    <span>{c.name}</span>
                  </Link>
                </li>
              ))}
              <li style={{ marginBottom: "0.65rem" }}>
                <Link
                  to="/category/all"
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--gold-light)",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  → View Complete Catalogue
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Boutique Pages */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.15rem",
                color: "var(--gold-light)",
                fontWeight: 600,
                letterSpacing: "0.05em",
                marginBottom: "1.2rem",
                textTransform: "uppercase",
              }}
            >
              Boutique Information
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { label: "Home", path: "/" },
                { label: "About Chaudhary Fashion Mark", path: "/about" },
                { label: "Store Location & Timings", path: "/contact" },
                { label: "Bespoke Stitching Inquiry", path: "/contact" },
              ].map((link, idx) => (
                <li key={idx} style={{ marginBottom: "0.65rem" }}>
                  <Link
                    to={link.path}
                    style={{
                      fontSize: "0.88rem",
                      color: "#D6CCC0",
                      textDecoration: "none",
                      transition: "var(--transition-smooth)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--gold-light)";
                    }}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#D6CCC0")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Physical Store Contacts (Placeholders) */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.15rem",
                color: "var(--gold-light)",
                fontWeight: 600,
                letterSpacing: "0.05em",
                marginBottom: "1.2rem",
                textTransform: "uppercase",
              }}
            >
              Store Details (Demo)
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem", color: "#D6CCC0" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <MapPin size={16} style={{ color: "var(--gold-primary)", flexShrink: 0, marginTop: "0.2rem" }} />
                <span>
                  {shopConfig.store.addressLine1}, {shopConfig.store.cityStateZip}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Clock size={16} style={{ color: "var(--gold-primary)", flexShrink: 0 }} />
                <span>Mon–Sat: 10:30 AM – 8:30 PM</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Phone size={16} style={{ color: "var(--gold-primary)", flexShrink: 0 }} />
                <span>{shopConfig.whatsapp.displayNumber} (WhatsApp)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Mail size={16} style={{ color: "var(--gold-primary)", flexShrink: 0 }} />
                <span>{shopConfig.store.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Strip */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px dashed rgba(197, 160, 89, 0.3)",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.78rem",
            color: "#BDB0A3",
            lineHeight: 1.6,
            marginBottom: "2rem",
          }}
        >
          <strong style={{ color: "var(--gold-light)" }}>Catalogue Notice: </strong>
          {shopConfig.disclaimer.notice}
        </div>

        {/* Copyright & Sub-footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "1.5rem",
            fontSize: "0.8rem",
            color: "#9C8E80",
          }}
        >
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} {shopConfig.shopName}. All rights reserved. Premium Indian Clothing Boutique Catalogue.
          </p>
          <p style={{ margin: 0, color: "var(--gold-light)", fontSize: "0.76rem" }}>
            Handcrafted with Elegance & Tradition
          </p>
        </div>
      </div>
    </footer>
  );
}
