import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MessageCircle,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Check,
  Share2,
  ArrowLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import { products, getProductById, getProductsByCategory } from "../data/products";
import { getProductWhatsAppUrl, shopConfig } from "../config/shopConfig";
import ProductCard from "../components/ProductCard";

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = getProductById(productId);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setActiveImageIndex(0);
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0].name);
      }
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [productId, product]);

  if (!product) {
    return (
      <div style={{ padding: "6rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--text-primary)" }}>
          Creation Not Found
        </h2>
        <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
          The requested catalogue piece (ID: {productId}) could not be located.
        </p>
        <Link to="/category/all" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>
          Browse All Collections
        </Link>
      </div>
    );
  }

  // Related products from same category
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* Breadcrumb Bar */}
      <section
        style={{
          background: "var(--bg-cream)",
          borderBottom: "1px solid var(--border-delicate)",
          padding: "1rem 0",
        }}
      >
        <div className="container">
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
              fontSize: "0.82rem",
              color: "var(--text-muted)",
            }}
          >
            <Link to="/" style={{ color: "var(--text-secondary)" }}>
              Home
            </Link>
            <ChevronRight size={13} />
            <Link to={`/category/${product.category}`} style={{ color: "var(--text-secondary)" }}>
              {product.categoryLabel}
            </Link>
            <ChevronRight size={13} />
            <span style={{ color: "var(--gold-dark)", fontWeight: 600 }}>
              {product.name}
            </span>
          </nav>
        </div>
      </section>

      {/* Main Product Showcase Section */}
      <section style={{ paddingTop: "2.5rem" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
              gap: "3.5rem",
              alignItems: "start",
            }}
          >
            {/* Left Column: Image Gallery */}
            <div>
              {/* Primary High-Resolution Display */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "3 / 4",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  border: "1px solid var(--border-delicate)",
                  boxShadow: "var(--shadow-md)",
                  background: "#FFFFFF",
                }}
              >
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Badge Overlay */}
                {product.badge && (
                  <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                    <span className="badge-luxury" style={{ boxShadow: "var(--shadow-sm)" }}>
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Demo Data indicator */}
                <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                  <span
                    style={{
                      padding: "0.3rem 0.65rem",
                      background: "rgba(33, 29, 28, 0.82)",
                      backdropFilter: "blur(4px)",
                      color: "#FFFFFF",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    ID: {product.id}
                  </span>
                </div>
              </div>

              {/* Thumbnails row */}
              {product.images.length > 1 && (
                <div
                  style={{
                    display: "flex",
                    gap: "0.85rem",
                    marginTop: "1.25rem",
                    overflowX: "auto",
                    paddingBottom: "0.5rem",
                  }}
                >
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      style={{
                        width: "80px",
                        height: "100px",
                        borderRadius: "var(--radius-sm)",
                        overflow: "hidden",
                        border:
                          activeImageIndex === idx
                            ? "2px solid var(--gold-primary)"
                            : "1px solid var(--border-delicate)",
                        opacity: activeImageIndex === idx ? 1 : 0.65,
                        cursor: "pointer",
                        flexShrink: 0,
                        padding: 0,
                        background: "#FFFFFF",
                        transition: "var(--transition-smooth)",
                      }}
                    >
                      <img
                        src={img}
                        alt={`View ${idx + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* In-Store Trial Room Notice */}
              <div
                style={{
                  marginTop: "1.75rem",
                  padding: "1.1rem 1.25rem",
                  background: "var(--bg-cream)",
                  border: "1px solid var(--border-delicate)",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  gap: "0.85rem",
                  alignItems: "flex-start",
                }}
              >
                <MapPin size={20} style={{ color: "var(--gold-dark)", flexShrink: 0, marginTop: "0.15rem" }} />
                <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  <strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "0.2rem" }}>
                    Available for Physical Viewing at Boutique
                  </strong>
                  Visit our flagship store in {shopConfig.store.cityStateZip} to feel the pure silk texture and receive expert saree drapery or suit fitting assistance.
                </div>
              </div>
            </div>

            {/* Right Column: Information, Pricing, Selectors & WhatsApp Inquiry */}
            <div>
              {/* Category & Availability */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.75rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--gold-dark)",
                    fontWeight: 600,
                  }}
                >
                  {product.categoryLabel}
                </span>

                <span className="badge-stock">
                  <Check size={14} />
                  {product.availabilityStatus}
                </span>
              </div>

              {/* Product Title */}
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 3.2vw, 2.75rem)",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  lineHeight: 1.2,
                  marginBottom: "1rem",
                }}
              >
                {product.name}
              </h1>

              {/* Price Block */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  paddingBottom: "1.25rem",
                  borderBottom: "1px solid var(--border-delicate)",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  ₹{product.price.toLocaleString("en-IN")}
                </span>

                {product.originalPrice && (
                  <span
                    style={{
                      fontSize: "1.1rem",
                      color: "var(--text-muted)",
                      textDecoration: "line-through",
                    }}
                  >
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}

                <span className="badge-demo">
                  Demo Catalogue Pricing
                </span>
              </div>

              {/* Narrative Description */}
              <p
                style={{
                  fontSize: "0.98rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  marginBottom: "1.75rem",
                }}
              >
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Available Colorways:{" "}
                    <span style={{ fontWeight: 400, color: "var(--text-muted)", textTransform: "none" }}>
                      {selectedColor}
                    </span>
                  </label>
                  <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                    {product.colors.map((c) => {
                      const isSelected = selectedColor === c.name;
                      return (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          style={{
                            padding: "0.45rem 0.85rem",
                            borderRadius: "var(--radius-sm)",
                            border: isSelected
                              ? "1.5px solid var(--gold-primary)"
                              : "1px solid var(--border-delicate)",
                            background: isSelected ? "rgba(197, 160, 89, 0.12)" : "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.82rem",
                            cursor: "pointer",
                            transition: "var(--transition-smooth)",
                          }}
                        >
                          <span
                            style={{
                              width: "14px",
                              height: "14px",
                              borderRadius: "50%",
                              background: c.hex,
                              border: "1px solid #CCC",
                            }}
                          />
                          <span>{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size / Sizing Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div style={{ marginBottom: "2rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Available Sizes / Specifications:
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {product.sizes.map((sz) => {
                      const isSelected = selectedSize === sz;
                      return (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          style={{
                            padding: "0.55rem 1rem",
                            borderRadius: "var(--radius-sm)",
                            border: isSelected
                              ? "1px solid var(--gold-primary)"
                              : "1px solid var(--border-delicate)",
                            background: isSelected ? "var(--bg-deep-charcoal)" : "#FFFFFF",
                            color: isSelected ? "#FFFFFF" : "var(--text-primary)",
                            fontSize: "0.85rem",
                            fontWeight: isSelected ? 600 : 500,
                            cursor: "pointer",
                            transition: "var(--transition-smooth)",
                          }}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Primary Call to Action: WhatsApp Inquiry */}
              <div
                style={{
                  background: "#FFFFFF",
                  padding: "1.5rem",
                  borderRadius: "var(--radius-md)",
                  border: "1.5px solid var(--gold-border)",
                  boxShadow: "var(--shadow-sm)",
                  marginBottom: "2rem",
                }}
              >
                <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.85rem" }}>
                  <a
                    href={getProductWhatsAppUrl(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-lg"
                    style={{
                      flex: 1,
                      textDecoration: "none",
                      justifyContent: "center",
                      boxShadow: "0 4px 16px rgba(37, 211, 102, 0.35)",
                    }}
                  >
                    <MessageCircle size={20} />
                    <span>Inquire on WhatsApp</span>
                  </a>

                  <button
                    onClick={handleShare}
                    className="btn btn-outline"
                    style={{ padding: "0 1.25rem" }}
                    title="Copy catalogue share link"
                  >
                    <Share2 size={18} />
                  </button>
                </div>

                {copiedLink && (
                  <p style={{ fontSize: "0.78rem", color: "#186E37", textAlign: "center", margin: "0.25rem 0" }}>
                    ✓ Link copied to clipboard!
                  </p>
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "0.78rem",
                    color: "var(--text-muted)",
                    paddingTop: "0.5rem",
                  }}
                >
                  <span>Direct response from store representative</span>
                  <span>WhatsApp: {shopConfig.whatsapp.displayNumber}</span>
                </div>
              </div>

              {/* Detailed Technical Fabric & Craft Specifications */}
              <div
                style={{
                  background: "var(--bg-cream)",
                  border: "1px solid var(--border-delicate)",
                  borderRadius: "var(--radius-md)",
                  padding: "1.5rem",
                  marginBottom: "2rem",
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: "1rem",
                    borderBottom: "1px solid var(--border-delicate)",
                    paddingBottom: "0.5rem",
                  }}
                >
                  Boutique Craft Specifications
                </h4>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.6rem", fontSize: "0.85rem" }}>
                  {product.fabric && (
                    <div style={{ display: "flex" }}>
                      <span style={{ width: "130px", color: "var(--text-muted)", fontWeight: 500 }}>
                        Fabric Material:
                      </span>
                      <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                        {product.fabric}
                      </span>
                    </div>
                  )}

                  {product.craft && (
                    <div style={{ display: "flex" }}>
                      <span style={{ width: "130px", color: "var(--text-muted)", fontWeight: 500 }}>
                        Work / Craft:
                      </span>
                      <span style={{ color: "var(--text-primary)" }}>
                        {product.craft}
                      </span>
                    </div>
                  )}

                  {product.includes && (
                    <div style={{ display: "flex" }}>
                      <span style={{ width: "130px", color: "var(--text-muted)", fontWeight: 500 }}>
                        Inclusions:
                      </span>
                      <span style={{ color: "var(--text-primary)" }}>
                        {product.includes}
                      </span>
                    </div>
                  )}

                  {product.careInstructions && (
                    <div style={{ display: "flex" }}>
                      <span style={{ width: "130px", color: "var(--text-muted)", fontWeight: 500 }}>
                        Care Advisory:
                      </span>
                      <span style={{ color: "var(--text-primary)" }}>
                        {product.careInstructions}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div style={{ marginTop: "5rem", paddingTop: "3rem", borderTop: "1px solid var(--border-delicate)" }}>
              <div className="section-header" style={{ marginBottom: "2.5rem" }}>
                <span className="section-eyebrow">
                  <Sparkles size={14} />
                  Coordinated Designs
                </span>
                <h2 className="section-title">Similar {product.categoryLabel}</h2>
                <p className="section-subtitle">
                  More curated options from our physical boutique collection.
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "1.75rem",
                }}
              >
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
