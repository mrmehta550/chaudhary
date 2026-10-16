import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { categories } from "../data/products";

export default function CategorySection() {
  return (
    <section
      style={{
        padding: "4.5rem 0",
        background: "var(--bg-cream)",
        borderTop: "1px solid var(--border-delicate)",
        borderBottom: "1px solid var(--border-delicate)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">
            <Sparkles size={14} />
            Boutique Taxonomy
          </span>
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">
            Explore our curated departments spanning regal handloom sarees, bespoke women's suits, and festive ethnic wardrobes for boys and girls.
          </p>
          <div className="ornament-divider">✦ ❖ ✦</div>
        </div>

        {/* Four Category Image-led Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              style={{
                textDecoration: "none",
                display: "block",
                group: "category-card",
              }}
            >
              <div
                className="boutique-card"
                style={{
                  overflow: "hidden",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-card)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  background: "#FFFFFF",
                  transition: "var(--transition-smooth)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                  e.currentTarget.style.borderColor = "var(--gold-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                  e.currentTarget.style.borderColor = "var(--border-card)";
                }}
              >
                {/* Image Container with Zoom effect */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "320px",
                    overflow: "hidden",
                    background: "var(--bg-subtle)",
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
                  />

                  {/* Gradient bottom shadow for text legibility */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(20, 18, 17, 0.7) 0%, rgba(20, 18, 17, 0.1) 45%, transparent 100%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Top Badge: Item count */}
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      left: "1rem",
                    }}
                  >
                    <span
                      style={{
                        padding: "0.3rem 0.75rem",
                        background: "rgba(255, 253, 249, 0.92)",
                        color: "var(--text-primary)",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-delicate)",
                        boxShadow: "var(--shadow-sm)",
                      }}
                    >
                      {cat.itemCount} Designs
                    </span>
                  </div>

                  {/* Overlaid Title at base of image */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "1rem",
                      left: "1.25rem",
                      right: "1.25rem",
                      color: "#FFFFFF",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.75rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--gold-light)",
                        fontWeight: 600,
                        display: "block",
                        marginBottom: "0.2rem",
                      }}
                    >
                      Collection
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.65rem",
                        fontWeight: 600,
                        color: "#FFFFFF",
                        letterSpacing: "0.01em",
                        lineHeight: 1.15,
                      }}
                    >
                      {cat.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body & CTA */}
                <div
                  style={{
                    padding: "1.25rem 1.25rem 1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.55,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {cat.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "0.75rem",
                      borderTop: "1px solid var(--border-delicate)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--gold-dark)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                      }}
                    >
                      Browse Catalogue
                    </span>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "var(--bg-cream)",
                        border: "1px solid var(--border-delicate)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--text-primary)",
                      }}
                    >
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
