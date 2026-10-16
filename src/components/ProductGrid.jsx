import React, { useState } from "react";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import { Sparkles, PackageSearch } from "lucide-react";

export default function ProductGrid({
  products = [],
  emptyMessage = "No items match your selected filter.",
  emptySubtext = "Try clearing your filters or exploring our other heritage categories.",
  columns = 4,
}) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  if (!products || products.length === 0) {
    return (
      <div
        style={{
          padding: "4rem 2rem",
          textAlign: "center",
          background: "#FFFFFF",
          borderRadius: "var(--radius-md)",
          border: "1px dashed var(--border-delicate)",
          margin: "1.5rem 0",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "var(--bg-cream)",
            color: "var(--gold-dark)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <PackageSearch size={28} />
        </div>
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.5rem",
            color: "var(--text-primary)",
            marginBottom: "0.5rem",
          }}
        >
          {emptyMessage}
        </h3>
        <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", maxWidth: "480px", margin: "0 auto" }}>
          {emptySubtext}
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            columns === 3
              ? "repeat(auto-fill, minmax(300px, 1fr))"
              : "repeat(auto-fill, minmax(270px, 1fr))",
          gap: "1.75rem",
        }}
      >
        {products.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ))}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
}
