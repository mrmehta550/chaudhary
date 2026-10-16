import React, { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, MessageCircle } from "lucide-react";
import { products } from "../data/products";
import { getProductWhatsAppUrl } from "../config/shopConfig";
import { Link } from "react-router-dom";

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = products.filter((item) => {
    if (!searchTerm.trim()) return false;
    const term = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.categoryLabel.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      (item.fabric && item.fabric.toLowerCase().includes(term)) ||
      (item.craft && item.craft.toLowerCase().includes(term)) ||
      item.id.toLowerCase().includes(term)
    );
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(20, 18, 17, 0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "5rem 1.5rem 2rem",
        animation: "fadeIn 0.25s ease-out",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          background: "#FFFFFF",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-lg)",
          border: "1px solid var(--border-delicate)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--border-delicate)",
            background: "var(--bg-cream)",
            gap: "1rem",
          }}
        >
          <Search size={22} style={{ color: "var(--gold-dark)" }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search sarees, silk suits, boys' sherwanis, girls' lehengas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              fontSize: "1.05rem",
              fontFamily: "var(--font-sans)",
              color: "var(--text-primary)",
              outline: "none",
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              style={{
                color: "var(--text-muted)",
                padding: "0.2rem",
              }}
              title="Clear search"
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              background: "rgba(0,0,0,0.05)",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-secondary)",
            }}
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Suggested Keywords */}
        {!searchTerm && (
          <div style={{ padding: "1.5rem", background: "#FFFFFF" }}>
            <p
              style={{
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                marginBottom: "0.75rem",
                fontWeight: 600,
              }}
            >
              Popular Catalogue Searches
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["Banarasi Silk", "Anarkali Suit", "Boys Sherwani", "Girls Lehenga", "Organza Saree", "Velvet Suit"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    style={{
                      padding: "0.4rem 0.85rem",
                      borderRadius: "var(--radius-full)",
                      background: "var(--bg-cream)",
                      border: "1px solid var(--border-delicate)",
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      transition: "var(--transition-smooth)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--gold-primary)";
                      e.currentTarget.style.color = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-delicate)";
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Results Area */}
        <div
          style={{
            maxHeight: "380px",
            overflowY: "auto",
            padding: "0.5rem 1.25rem",
          }}
        >
          {searchTerm && filteredProducts.length === 0 && (
            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--text-primary)" }}>
                No designs found matching "{searchTerm}"
              </p>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
                Try searching for broader terms like "silk", "saree", "suit", or "sherwani".
              </p>
            </div>
          )}

          {filteredProducts.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.85rem 0",
                borderBottom: "1px solid var(--border-delicate)",
                gap: "1rem",
              }}
            >
              <Link
                to={`/product/${item.id}`}
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  flex: 1,
                  textDecoration: "none",
                }}
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  style={{
                    width: "56px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-delicate)",
                  }}
                />
                <div>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--gold-dark)",
                      fontWeight: 600,
                    }}
                  >
                    {item.categoryLabel} • {item.id}
                  </span>
                  <h4
                    style={{
                      fontSize: "0.95rem",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginTop: "0.15rem",
                    }}
                  >
                    {item.name}
                  </h4>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
                    <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        textDecoration: "line-through",
                      }}
                    >
                      ₹{item.originalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </Link>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <a
                  href={getProductWhatsAppUrl(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                  title="Inquire about this piece on WhatsApp"
                  style={{ padding: "0.45rem 0.8rem" }}
                >
                  <MessageCircle size={14} />
                  <span>Inquire</span>
                </a>
                <Link
                  to={`/product/${item.id}`}
                  onClick={onClose}
                  className="btn btn-outline btn-sm"
                  style={{ padding: "0.45rem 0.75rem" }}
                  title="View details"
                >
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
