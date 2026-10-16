import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Eye, Sparkles, CheckCircle2 } from "lucide-react";
import { getProductWhatsAppUrl } from "../config/shopConfig";

export default function ProductCard({ product, onQuickView }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const primaryImage = product.images?.[currentImgIndex] || product.images?.[0] || "/hero-banner.jpg";
  const secondaryImage = product.images?.[1] || primaryImage;

  return (
    <div
      className="boutique-card"
      style={{
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        border: "1px solid var(--border-card)",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "var(--transition-smooth)",
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images?.length > 1) setCurrentImgIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImgIndex(0);
      }}
    >
      {/* Product Image Frame */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "128%", // High-end portrait aspect ratio
          overflow: "hidden",
          background: "var(--bg-subtle)",
        }}
      >
        <Link to={`/product/${product.id}`} style={{ display: "block" }}>
          <img
            src={primaryImage}
            alt={product.name}
            loading="lazy"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: isHovered ? "scale(1.06)" : "scale(1.0)",
              transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          />
        </Link>

        {/* Top Badges */}
        <div
          style={{
            position: "absolute",
            top: "0.75rem",
            left: "0.75rem",
            right: "0.75rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            pointerEvents: "none",
          }}
        >
          {product.badge ? (
            <span
              style={{
                padding: "0.3rem 0.65rem",
                background: "rgba(255, 253, 249, 0.95)",
                color: "var(--gold-dark)",
                border: "1px solid var(--gold-border)",
                fontSize: "0.68rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                borderRadius: "var(--radius-sm)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {product.badge}
            </span>
          ) : <span />}

          <span
            style={{
              padding: "0.25rem 0.55rem",
              background: "rgba(33, 29, 28, 0.78)",
              backdropFilter: "blur(4px)",
              color: "#FFFFFF",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              borderRadius: "var(--radius-sm)",
            }}
          >
            {product.id}
          </span>
        </div>

        {/* Quick View Button on Hover */}
        <div
          style={{
            position: "absolute",
            bottom: "0.85rem",
            left: "0.85rem",
            right: "0.85rem",
            display: "flex",
            justifyContent: "center",
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.25s ease",
          }}
        >
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              style={{
                width: "100%",
                padding: "0.55rem 1rem",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(6px)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-delicate)",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.45rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#FFFFFF")}
            >
              <Eye size={15} />
              <span>Quick Preview</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Details Section */}
      <div
        style={{
          padding: "1.15rem 1.15rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <div>
          {/* Category & Status */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0.35rem",
              fontSize: "0.72rem",
            }}
          >
            <span
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--gold-dark)",
                fontWeight: 600,
              }}
            >
              {product.categoryLabel}
            </span>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                color: "#186E37",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#25D366",
                  display: "inline-block",
                }}
              />
              {product.availabilityStatus || "In Stock"}
            </span>
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                lineHeight: 1.35,
                marginBottom: "0.4rem",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: "2.7em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--gold-dark)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-primary)";
              }}
            >
              {product.name}
            </h3>
          </Link>

          {/* Fabric / Craft Highlights */}
          {product.fabric && (
            <p
              style={{
                fontSize: "0.78rem",
                color: "var(--text-muted)",
                marginBottom: "0.75rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {product.fabric}
            </p>
          )}

          {/* Available Color Swatches Preview */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.85rem" }}>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginRight: "0.2rem" }}>
                Colors:
              </span>
              {product.colors.map((c, i) => (
                <span
                  key={i}
                  title={c.name}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: c.hex,
                    border: "1.5px solid #FFFFFF",
                    boxShadow: "0 0 0 1px var(--border-delicate)",
                    display: "inline-block",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Price & Action Section */}
        <div
          style={{
            paddingTop: "0.85rem",
            borderTop: "1px solid var(--border-delicate)",
          }}
        >
          {/* Price display with Demo indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: "0.75rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text-muted)",
                    textDecoration: "line-through",
                  }}
                >
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <span
              style={{
                fontSize: "0.68rem",
                color: "var(--text-muted)",
                letterSpacing: "0.04em",
              }}
            >
              Demo Price
            </span>
          </div>

          {/* Action Buttons: WhatsApp Inquiry CTA */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <a
              href={getProductWhatsAppUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{
                flex: 1,
                padding: "0.65rem 0.85rem",
                fontSize: "0.8rem",
                textDecoration: "none",
              }}
              title="Open WhatsApp chat with product inquiry details"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Inquiry</span>
            </a>

            <Link
              to={`/product/${product.id}`}
              className="btn btn-outline"
              style={{
                padding: "0.65rem 0.85rem",
                fontSize: "0.8rem",
              }}
              title="View full product specifications"
            >
              <span>View</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
