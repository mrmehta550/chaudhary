import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, MessageCircle, Menu, X, ChevronDown, MapPin, Sparkles } from "lucide-react";
import { shopConfig, getGeneralWhatsAppUrl } from "../config/shopConfig";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Sarees", path: "/category/sarees" },
    { label: "Suits", path: "/category/suits" },
    { label: "Boys' Wear", path: "/category/boys" },
    { label: "Girls' Wear", path: "/category/girls" },
    { label: "About", path: "/about" },
    { label: "Visit Store", path: "/contact" },
  ];

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: isScrolled ? "rgba(255, 253, 249, 0.98)" : "#FAF7F2",
          backdropFilter: isScrolled ? "blur(10px)" : "none",
          borderBottom: isScrolled
            ? "1px solid var(--gold-border)"
            : "1px solid var(--border-delicate)",
          boxShadow: isScrolled ? "var(--shadow-sm)" : "none",
          transition: "var(--transition-smooth)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: isScrolled ? "0.85rem" : "1.15rem",
            paddingBottom: isScrolled ? "0.85rem" : "1.15rem",
            transition: "var(--transition-smooth)",
          }}
        >
          {/* Brand Logo & Monogram */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              textDecoration: "none",
            }}
          >
            {/* Elegant Royal Emblem */}
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "var(--bg-deep-charcoal)",
                border: "1.5px solid var(--gold-primary)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 10px rgba(197, 160, 89, 0.25)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--gold-light)",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "0.05em",
                }}
              >
                CFM
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.15rem, 2vw, 1.45rem)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "var(--text-primary)",
                  lineHeight: 1.1,
                  textTransform: "uppercase",
                }}
              >
                Chaudhary
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.26em",
                  color: "var(--gold-dark)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  marginTop: "0.15rem",
                }}
              >
                Fashion Mart
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.85rem",
            }}
            className="desktop-nav"
          >
            {navLinks.map((item) => {
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  style={{
                    position: "relative",
                    fontSize: "0.88rem",
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: "0.04em",
                    color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                    textTransform: "uppercase",
                    padding: "0.4rem 0",
                    transition: "var(--transition-smooth)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--gold-dark)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isActive
                      ? "var(--text-primary)"
                      : "var(--text-secondary)";
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-2px",
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: "var(--gold-gradient)",
                        borderRadius: "2px",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Items (Search + WhatsApp CTA) */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            {/* Search Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.55rem 0.85rem",
                borderRadius: "var(--radius-sm)",
                background: "rgba(0,0,0,0.03)",
                border: "1px solid var(--border-delicate)",
                color: "var(--text-secondary)",
                fontSize: "0.82rem",
              }}
              title="Search Catalogue (Ctrl+K or click)"
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-delicate)")}
            >
              <Search size={16} style={{ color: "var(--gold-dark)" }} />
              <span className="search-label" style={{ display: "none" }}>Search</span>
            </button>

            {/* WhatsApp Inquiry CTA */}
            <a
              href={getGeneralWhatsAppUrl("Catalogue Inquiry")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              style={{ display: "inline-flex", textDecoration: "none" }}
            >
              <MessageCircle size={15} />
              <span className="wa-text">WhatsApp Inquiry</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                width: "38px",
                height: "38px",
                border: "1px solid var(--border-delicate)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-primary)",
              }}
              className="mobile-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              background: "#FFFDF9",
              borderTop: "1px solid var(--border-delicate)",
              borderBottom: "1px solid var(--gold-border)",
              padding: "1.25rem 1.5rem",
              animation: "fadeIn 0.2s ease",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: "0.6rem 0.5rem",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    borderBottom: "1px solid rgba(0,0,0,0.04)",
                  }}
                >
                  {item.label}
                </Link>
              ))}

              <div style={{ paddingTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchModalOpen(true);
                  }}
                  className="btn btn-outline btn-sm"
                  style={{ justifyContent: "center" }}
                >
                  <Search size={16} />
                  <span>Search All Designs</span>
                </button>
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm"
                  style={{ justifyContent: "center" }}
                >
                  <MessageCircle size={16} />
                  <span>Chat with Us on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      <style>{`
        @media (min-width: 900px) {
          .search-label { display: inline !important; }
        }
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
          .wa-text { display: none; }
        }
      `}</style>
    </>
  );
}
