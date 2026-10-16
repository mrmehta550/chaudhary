import React, { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, ArrowUpDown, Sparkles, Filter, X } from "lucide-react";
import { products, categories } from "../data/products";
import ProductGrid from "../components/ProductGrid";
import { shopConfig } from "../config/shopConfig";

export default function CategoryPage() {
  const { categoryId = "all" } = useParams();
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState("featured"); // 'featured', 'price-asc', 'price-desc', 'name'
  const [selectedStock, setSelectedStock] = useState("all");

  const currentCategoryObj = categories.find((c) => c.id === categoryId);

  // Compute filtered & sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (categoryId && categoryId !== "all") {
      result = result.filter((p) => p.category.toLowerCase() === categoryId.toLowerCase());
    }

    // Keyword search
    if (searchKeyword.trim()) {
      const term = searchKeyword.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          (p.fabric && p.fabric.toLowerCase().includes(term)) ||
          (p.craft && p.craft.toLowerCase().includes(term)) ||
          p.id.toLowerCase().includes(term)
      );
    }

    // Stock availability filter
    if (selectedStock !== "all") {
      result = result.filter((p) => p.availabilityStatus === selectedStock);
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // 'featured'
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [categoryId, searchKeyword, sortBy, selectedStock]);

  const activeCategoryTitle = currentCategoryObj ? currentCategoryObj.name : "All Collections";
  const activeCategoryDesc = currentCategoryObj
    ? currentCategoryObj.description
    : "Browse our complete digital boutique catalogue spanning handwoven Sarees, bespoke Women's Suits, and celebratory Boys' and Girls' attire.";

  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* Category Hero / Header Banner */}
      <section
        style={{
          background: "linear-gradient(180deg, var(--bg-cream) 0%, var(--bg-body) 100%)",
          padding: "3.5rem 0 2.5rem",
          borderBottom: "1px solid var(--border-delicate)",
        }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              marginBottom: "1rem",
            }}
          >
            <Link to="/" style={{ color: "var(--text-secondary)" }}>
              Home
            </Link>
            <span>/</span>
            <Link to="/category/all" style={{ color: "var(--text-secondary)" }}>
              Catalogue
            </Link>
            <span>/</span>
            <span style={{ color: "var(--gold-dark)", fontWeight: 600 }}>
              {activeCategoryTitle}
            </span>
          </nav>

          <div style={{ maxWidth: "780px" }}>
            <span className="section-eyebrow">
              <Sparkles size={14} />
              Digital Boutique Showcase
            </span>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: "0.85rem",
                letterSpacing: "-0.015em",
              }}
            >
              {activeCategoryTitle}
            </h1>
            <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
              {activeCategoryDesc}
            </p>
          </div>

          {/* Category Navigation Pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
              marginTop: "2rem",
            }}
          >
            <button
              onClick={() => navigate("/category/all")}
              style={{
                padding: "0.6rem 1.25rem",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.85rem",
                fontWeight: categoryId === "all" ? 600 : 500,
                background: categoryId === "all" ? "var(--bg-deep-charcoal)" : "#FFFFFF",
                color: categoryId === "all" ? "#FFFFFF" : "var(--text-secondary)",
                border:
                  categoryId === "all"
                    ? "1px solid var(--gold-primary)"
                    : "1px solid var(--border-delicate)",
                cursor: "pointer",
                transition: "var(--transition-smooth)",
              }}
            >
              All Departments ({products.length})
            </button>

            {categories.map((c) => {
              const isSelected = categoryId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => navigate(`/category/${c.id}`)}
                  style={{
                    padding: "0.6rem 1.25rem",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.85rem",
                    fontWeight: isSelected ? 600 : 500,
                    background: isSelected ? "var(--bg-deep-charcoal)" : "#FFFFFF",
                    color: isSelected ? "#FFFFFF" : "var(--text-secondary)",
                    border: isSelected
                      ? "1px solid var(--gold-primary)"
                      : "1px solid var(--border-delicate)",
                    cursor: "pointer",
                    transition: "var(--transition-smooth)",
                  }}
                >
                  {c.name} ({c.itemCount})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter and Catalogue Content */}
      <section style={{ paddingTop: "2.5rem" }}>
        <div className="container">
          {/* Controls Bar: Search, Sort, Count */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid var(--border-delicate)",
              borderRadius: "var(--radius-md)",
              padding: "1.1rem 1.5rem",
              marginBottom: "2rem",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.25rem",
            }}
          >
            {/* Search within category */}
            <div style={{ display: "flex", alignItems: "center", position: "relative", minWidth: "260px", flex: 1 }}>
              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: "0.85rem",
                  color: "var(--gold-dark)",
                }}
              />
              <input
                type="text"
                placeholder="Search by fabric, work, or piece name..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.65rem 2.2rem 0.65rem 2.5rem",
                  background: "var(--bg-cream)",
                  border: "1px solid var(--border-delicate)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.88rem",
                  color: "var(--text-primary)",
                  outline: "none",
                }}
              />
              {searchKeyword && (
                <button
                  onClick={() => setSearchKeyword("")}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    color: "var(--text-muted)",
                    padding: "0.2rem",
                  }}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Right Controls: Sort & Status Filter */}
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.85rem" }}>
              {/* Sort by */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500 }}>
                  Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: "0.6rem 1rem",
                    borderRadius: "var(--radius-sm)",
                    background: "#FFFFFF",
                    border: "1px solid var(--border-delicate)",
                    fontSize: "0.85rem",
                    color: "var(--text-primary)",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>

              {/* Reset filter button if active */}
              {(searchKeyword || selectedStock !== "all") && (
                <button
                  onClick={() => {
                    setSearchKeyword("");
                    setSelectedStock("all");
                  }}
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--gold-dark)",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Results Summary Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
              paddingBottom: "0.75rem",
              borderBottom: "1px solid var(--border-delicate)",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
            }}
          >
            <span>
              Showing <strong style={{ color: "var(--text-primary)" }}>{filteredProducts.length}</strong> creations
              {categoryId !== "all" && ` in ${activeCategoryTitle}`}
            </span>

            <span className="badge-demo">
              Sample Catalogue Prices • Direct WhatsApp Inquiry
            </span>
          </div>

          {/* Products Grid */}
          <ProductGrid
            products={filteredProducts}
            emptyMessage="No creations found matching your filter criteria"
            emptySubtext="Try altering your search keywords or resetting the filters to view all available boutique pieces."
          />
        </div>
      </section>
    </div>
  );
}
