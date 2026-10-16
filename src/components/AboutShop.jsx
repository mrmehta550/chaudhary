import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, CheckCircle2, Shield, Heart, ArrowRight } from "lucide-react";
import { shopConfig } from "../config/shopConfig";

export default function AboutShop() {
  const pillars = [
    {
      title: "Generational Weaving Craft",
      desc: "Direct associations with artisan clusters across Varanasi, Kanchipuram, and Chanderi for pure, certified silks.",
    },
    {
      title: "Physical Boutique Warmth",
      desc: "Feel the drape, examine zari under natural light, and enjoy relaxed trial sessions with dedicated style consultants.",
    },
    {
      title: "Tailored In-House Fit",
      desc: "Expert master tailors on-premise for bespoke blouse stitching, falls/pico finishing, and precise sherwani fittings.",
    },
    {
      title: "Coordinated Family Celebrations",
      desc: "Curated harmonious palettes across sarees, suits, boys' wear, and girls' dresses for memorable family occasions.",
    },
  ];

  return (
    <section
      style={{
        padding: "5rem 0",
        background: "#FFFFFF",
        borderTop: "1px solid var(--border-delicate)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "3.5rem",
            alignItems: "center",
          }}
        >
          {/* Left Column: Visual Showcase Frame */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                border: "1.5px solid var(--border-delicate)",
                boxShadow: "var(--shadow-lg)",
                position: "relative",
              }}
            >
              <img
                src="/hero-banner.jpg"
                alt="Chaudhary Fashion Mark Boutique"
                style={{
                  width: "100%",
                  height: "460px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "12px solid rgba(255, 253, 249, 0.4)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Floating Boutique Seal Badge */}
            <div
              style={{
                position: "absolute",
                bottom: "-1.5rem",
                right: "1.5rem",
                background: "var(--bg-deep-charcoal)",
                color: "#FFFFFF",
                padding: "1rem 1.5rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--gold-primary)",
                boxShadow: "var(--shadow-md)",
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "var(--gold-gradient)",
                  color: "#1C1917",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "1rem",
                }}
              >
                ✦
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--gold-light)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Physical Boutique
                </p>
                <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 600, color: "#FFFFFF" }}>
                  Digital Catalogue
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div>
            <span className="section-eyebrow">
              <Sparkles size={14} />
              About Our Store
            </span>

            <h2
              className="section-title"
              style={{ textAlign: "left", marginBottom: "1.25rem" }}
            >
              Where Heritage Indian Textiles Meet Thoughtful Boutique Hospitality
            </h2>

            <p
              style={{
                fontSize: "1.02rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: "1rem",
              }}
            >
              Welcome to <strong>{shopConfig.shopName}</strong>. Founded on the belief that traditional Indian attire is an emotional expression of celebration and family bonds, our physical boutique brings together royal handlooms, fine zari embroidery, and bespoke tailoring under one gracious roof.
            </p>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: "1.75rem",
              }}
            >
              While this digital catalogue presents a window into our ongoing collections, we warmly invite you to visit our store for tactile fabric discovery, bespoke trial rooms, and styling guidance tailored to your family celebrations.
            </p>

            {/* Pillars Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1.25rem",
                marginBottom: "2rem",
              }}
            >
              {pillars.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "1rem",
                    background: "var(--bg-cream)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-delicate)",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "0.35rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <CheckCircle2 size={15} style={{ color: "var(--gold-dark)" }} />
                    {item.title}
                  </h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link to="/about" className="btn btn-primary" style={{ textDecoration: "none" }}>
                <span>Read Full Boutique Story</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/contact" className="btn btn-outline" style={{ textDecoration: "none" }}>
                <span>Plan Store Visit</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
