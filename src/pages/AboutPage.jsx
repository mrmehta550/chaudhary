import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Heart, ShieldCheck, CheckCircle2, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import { shopConfig, getGeneralWhatsAppUrl } from "../config/shopConfig";

export default function AboutPage() {
  const heritageValues = [
    {
      title: "Pure Handloom Authenticity",
      desc: "Each silk and tissue saree in our collection is curated directly from trusted weaver cooperatives in Varanasi, Kanchipuram, and Chanderi. We celebrate natural fibers, authentic gold and silver zari, and ancestral craftsmanship.",
    },
    {
      title: "Physical Boutique Atmosphere",
      desc: "We believe buying milestone occasion wear should never be rushed through a digital cart. Our store provides peaceful trial lounges, natural lighting, and dedicated stylists who help you explore textures and drapes with ease.",
    },
    {
      title: "In-House Master Tailoring",
      desc: "From bridal blouse cutwork and tassels to bespoke sherwani sizing and cancan additions for lehengas, our experienced in-store tailors ensure your ensembles fit flawlessly.",
    },
    {
      title: "Multigenerational Festive Family Wardrobes",
      desc: "Whether you need a grand saree for the grandmother, an elegant Anarkali for the mother, a royal sherwani for the son, or a miniature lehenga for the daughter — we coordinate complete family ensembles under one roof.",
    },
  ];

  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* Banner */}
      <section
        style={{
          background: "linear-gradient(180deg, var(--bg-cream) 0%, var(--bg-body) 100%)",
          padding: "4rem 0 3rem",
          borderBottom: "1px solid var(--border-delicate)",
          textAlign: "center",
        }}
      >
        <div className="container-narrow">
          <span className="section-eyebrow">
            <Sparkles size={14} />
            Boutique Heritage & Ethos
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
            About {shopConfig.shopName}
          </h1>
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "720px",
              margin: "0 auto",
            }}
          >
            A premier Indian fashion destination honoring age-old textile heritage, royal weaves, and personalized boutique hospitality.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section style={{ paddingTop: "4rem" }}>
        <div className="container-narrow">
          {/* Hero Image Showcase */}
          <div
            style={{
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              border: "2px solid var(--gold-border)",
              boxShadow: "var(--shadow-lg)",
              marginBottom: "3.5rem",
            }}
          >
            <img
              src="/hero-banner.jpg"
              alt="Chaudhary Fashion Mark Story"
              style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "2.2rem",
                color: "var(--text-primary)",
                borderBottom: "1px solid var(--border-delicate)",
                paddingBottom: "0.75rem",
              }}
            >
              Our Vision: Preserving The Dignity of Indian Celebration
            </h2>

            <p>
              At <strong>{shopConfig.shopName}</strong>, we view festive clothing as an enduring repository of memory. A Kanjivaram saree passed down across generations, a boy’s first bespoke sherwani for his sister’s wedding, or a bride’s carefully chosen sangeet sharara — each garment carries sentiment, heritage, and joy.
            </p>

            <p>
              Our physical boutique was established to serve families seeking authentic ethnic fashion without the anonymity of mass-produced fast retail. By maintaining deep relationships with traditional weaving communities across India, we bring you pure silks, delicate organzas, and exquisite zardozi embroideries crafted by seasoned hands.
            </p>
          </div>

          {/* Core Values Grid */}
          <div style={{ margin: "4rem 0" }}>
            <div className="section-header">
              <span className="section-eyebrow">
                <Sparkles size={14} />
                Boutique Principles
              </span>
              <h3 className="section-title">The Four Pillars of Our Craft</h3>
              <div className="ornament-divider">✦ ❖ ✦</div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.75rem",
              }}
            >
              {heritageValues.map((v, i) => (
                <div
                  key={i}
                  className="boutique-card"
                  style={{
                    padding: "1.75rem",
                    borderRadius: "var(--radius-md)",
                    background: "#FFFFFF",
                    border: "1px solid var(--border-delicate)",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "rgba(197, 160, 89, 0.15)",
                      color: "var(--gold-dark)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                      fontWeight: 700,
                    }}
                  >
                    0{i + 1}
                  </div>
                  <h4
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {v.title}
                  </h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Invitation Banner */}
          <div
            style={{
              padding: "2.5rem",
              background: "var(--bg-cream)",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--gold-border)",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.75rem",
                color: "var(--text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              We Look Forward to Welcoming You
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto 1.75rem" }}>
              Explore our digital catalogue anytime, or contact our team directly on WhatsApp to schedule an in-store trial or consultation.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <a
                href={getGeneralWhatsAppUrl("About Boutique - Store Visit Inquiry")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ textDecoration: "none" }}
              >
                <MessageCircle size={16} />
                <span>Chat on WhatsApp</span>
              </a>
              <Link to="/contact" className="btn btn-primary" style={{ textDecoration: "none" }}>
                <span>Store Location & Hours</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
