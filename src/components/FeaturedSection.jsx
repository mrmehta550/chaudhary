import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import ProductGrid from "./ProductGrid";
import { getFeaturedProducts } from "../data/products";

export default function FeaturedSection() {
  const featured = getFeaturedProducts();

  return (
    <section
      style={{
        padding: "5rem 0",
        background: "var(--bg-body)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">
            <Sparkles size={14} />
            Handpicked Signatures
          </span>
          <h2 className="section-title">Featured Creations</h2>
          <p className="section-subtitle">
            Our most celebrated festive drapes and formal ensembles, chosen for exceptional zari craftsmanship, rich textures, and timeless allure.
          </p>
          <div className="ornament-divider">✦ ❖ ✦</div>
        </div>

        {/* Featured Products Grid */}
        <ProductGrid products={featured.slice(0, 4)} />

        {/* Bottom CTA to view all */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link
            to="/category/sarees"
            className="btn btn-primary"
            style={{ textDecoration: "none" }}
          >
            <span>View All Curated Collections</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
