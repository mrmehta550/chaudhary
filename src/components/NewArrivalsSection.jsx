import React, { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import ProductGrid from "./ProductGrid";
import { getNewArrivals } from "../data/products";
import { Link } from "react-router-dom";

export default function NewArrivalsSection() {
  const [activeTab, setActiveTab] = useState("all");
  const allNewArrivals = getNewArrivals();

  const filtered =
    activeTab === "all"
      ? allNewArrivals
      : allNewArrivals.filter((item) => {
          if (activeTab === "kids") {
            return item.category === "boys" || item.category === "girls";
          }
          return item.category === activeTab;
        });

  const tabs = [
    { id: "all", label: "All New Additions" },
    { id: "sarees", label: "New Sarees" },
    { id: "suits", label: "Festive Suits" },
    { id: "kids", label: "Kids' Wear" },
  ];

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
            Fresh From The Weavers
          </span>
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-subtitle">
            Seasonal palettes, freshly woven textiles, and festive ready-to-wear silhouettes just unveiled at our physical boutique.
          </p>
          <div className="ornament-divider">✦ ❖ ✦</div>
        </div>

        {/* Tab Filters */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.6rem",
            marginBottom: "2.75rem",
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "0.55rem 1.35rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.82rem",
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  background: isActive ? "var(--bg-deep-charcoal)" : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                  border: isActive ? "1px solid var(--gold-primary)" : "1px solid var(--border-delicate)",
                  boxShadow: isActive ? "var(--shadow-sm)" : "none",
                  cursor: "pointer",
                  transition: "var(--transition-smooth)",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <ProductGrid products={filtered} />

        {/* View Category Link */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link
            to="/category/all"
            className="btn btn-outline"
            style={{ textDecoration: "none" }}
          >
            <span>Explore Complete Catalogue</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
