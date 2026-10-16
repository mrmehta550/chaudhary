import React, { useState } from "react";
import { X, MessageCircle, Check, ArrowRight, ShieldCheck, Sparkles, MapPin } from "lucide-react";
import { getProductWhatsAppUrl, shopConfig } from "../config/shopConfig";
import { Link } from "react-router-dom";

export default function QuickViewModal({ product, onClose }) {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || "");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(20, 18, 17, 0.78)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        animation: "fadeIn 0.25s ease-out",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "920px",
          maxHeight: "90vh",
          background: "#FFFFFF",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-lg)",
          border: "1px solid var(--border-delicate)",
          overflowY: "auto",
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            zIndex: 10,
            background: "rgba(255, 255, 255, 0.9)",
            border: "1px solid var(--border-delicate)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--text-primary)",
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Left: Gallery Column */}
        <div
          style={{
            background: "var(--bg-cream)",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {/* Main Large Image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "3 / 4",
              borderRadius: "var(--radius-sm)",
              overflow: "hidden",
              border: "1px solid var(--border-delicate)",
              background: "#FFFFFF",
            }}
          >
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto" }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  style={{
                    width: "60px",
                    height: "75px",
                    borderRadius: "var(--radius-sm)",
                    overflow: "hidden",
                    border:
                      selectedImage === idx
                        ? "2px solid var(--gold-primary)"
                        : "1px solid var(--border-delicate)",
                    opacity: selectedImage === idx ? 1 : 0.65,
                    padding: 0,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <img src={img} alt="Thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Inquiry Column */}
        <div style={{ padding: "2rem 1.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            {/* Header / Badges */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span className="badge-luxury">{product.categoryLabel}</span>
              <span className="badge-demo">Demo Item #{product.id}</span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.65rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                lineHeight: 1.25,
                marginBottom: "0.75rem",
              }}
            >
              {product.name}
            </h3>

            {/* Price Row */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)" }}>
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: "0.95rem", color: "var(--text-muted)", textDecoration: "line-through" }}>
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              <span style={{ fontSize: "0.75rem", color: "#186E37", fontWeight: 600 }}>
                • {product.availabilityStatus}
              </span>
            </div>

            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              {product.description}
            </p>

            {/* Fabric & Craft Specification */}
            <div
              style={{
                background: "var(--bg-cream)",
                padding: "0.85rem 1rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-delicate)",
                marginBottom: "1.25rem",
                fontSize: "0.82rem",
              }}
            >
              {product.fabric && (
                <div style={{ marginBottom: "0.25rem" }}>
                  <strong style={{ color: "var(--text-primary)" }}>Fabric:</strong> {product.fabric}
                </div>
              )}
              {product.craft && (
                <div>
                  <strong style={{ color: "var(--text-primary)" }}>Workmanship:</strong> {product.craft}
                </div>
              )}
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: "1rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)", display: "block", marginBottom: "0.4rem" }}>
                  Color Option: <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>{selectedColor}</span>
                </span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      style={{
                        padding: "0.35rem 0.65rem",
                        borderRadius: "var(--radius-sm)",
                        border:
                          selectedColor === c.name
                            ? "1.5px solid var(--gold-primary)"
                            : "1px solid var(--border-delicate)",
                        background: selectedColor === c.name ? "rgba(197, 160, 89, 0.1)" : "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        fontSize: "0.78rem",
                      }}
                    >
                      <span
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          background: c.hex,
                          border: "1px solid #CCC",
                        }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)", display: "block", marginBottom: "0.4rem" }}>
                  Available Size / Sizing:
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: "0.4rem 0.75rem",
                        borderRadius: "var(--radius-sm)",
                        border:
                          selectedSize === s
                            ? "1.5px solid var(--gold-primary)"
                            : "1px solid var(--border-delicate)",
                        background: selectedSize === s ? "var(--bg-deep-charcoal)" : "#FFFFFF",
                        color: selectedSize === s ? "#FFFFFF" : "var(--text-primary)",
                        fontSize: "0.78rem",
                        fontWeight: 500,
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row: WhatsApp Inquiry Button & Full Page Link */}
          <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border-delicate)" }}>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <a
                href={getProductWhatsAppUrl(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ flex: 1, textDecoration: "none" }}
              >
                <MessageCircle size={17} />
                <span>Inquire on WhatsApp</span>
              </a>

              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="btn btn-outline"
                style={{ textDecoration: "none" }}
              >
                <span>Full Page</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            <p style={{ fontSize: "0.74rem", color: "var(--text-muted)", textAlign: "center", margin: 0 }}>
              Physical store visit & custom stitching inquiry available on WhatsApp: {shopConfig.whatsapp.displayNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
