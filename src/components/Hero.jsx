import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Pause, Play } from "lucide-react";
import "./HeroSlider.css";

const SLIDES = [
  {
    id: 1,
    image: "/hero/slide-1.jpg",
    alt: "Chaudhary Fashion Mart — Saree Heritage Collection",
    isFirstSlide: true,
    title: "CHAUDHARY FASHION MART",
    tagline: "Traditional Elegance. Modern Style.",
    description:
      "Discover our exquisite collection of sarees, suits, boys' and girls' clothing, crafted for every occasion.",
    buttonText: "EXPLORE COLLECTION",
    buttonLink: "/category/sarees",
    categoryIcons: [
      { label: "Sarees", icon: "🥻", link: "/category/sarees" },
      { label: "Suits", icon: "👗", link: "/category/suits" },
      { label: "Boys Wear", icon: "👔", link: "/category/boys" },
      { label: "Girls Wear", icon: "✨", link: "/category/girls" },
    ],
  },
  {
    id: 2,
    image: "/hero/slide-2.jpg",
    alt: "Women's Collection — Chaudhary Fashion Mart",
    isFirstSlide: false,
    eyebrow: "Women's Collection",
    title: "Elegance Woven in Every Thread",
    tagline: "Timeless Silhouettes & Royal Drapes",
    description: "Discover timeless ethnic styles designed for every special moment.",
    buttonText: "Explore Women's Collection",
    buttonLink: "/category/suits",
  },
  {
    id: 3,
    image: "/hero/slide-3.png",
    alt: "Boys' Collection — Chaudhary Fashion Mart",
    isFirstSlide: false,
    eyebrow: "Boys' Collection",
    title: "Style for Every Little Gentleman",
    tagline: "Festive Sherwanis & Embroidered Kurtas",
    description: "Discover stylish outfits for everyday adventures and special occasions.",
    buttonText: "Explore Boys' Collection",
    buttonLink: "/category/boys",
  },
  {
    id: 4,
    image: "/hero/slide-4.png",
    alt: "New Arrivals — Chaudhary Fashion Mart",
    isFirstSlide: false,
    eyebrow: "New Arrivals",
    title: "A New Look. A Timeless Tradition.",
    tagline: "Fresh Weaves for the Entire Family",
    description: "Explore fresh styles and beautiful designs for the entire family.",
    buttonText: "Discover New Arrivals",
    buttonLink: "/category/all",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(null);
  const [direction, setDirection] = useState("ltr"); // 'ltr' (left-to-right) or 'rtl'
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const AUTOPLAY_INTERVAL = 5000;
  const PROGRESS_TICK = 50;

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Slide transition handlers
  // Note: For left-to-right flow as requested: incoming enters from left, previous exits right
  const goToNextSlide = useCallback(() => {
    setPrevSlide(currentSlide);
    setDirection("ltr");
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, [currentSlide]);

  const goToPrevSlide = useCallback(() => {
    setPrevSlide(currentSlide);
    setDirection("rtl");
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, [currentSlide]);

  const goToSlide = (index) => {
    if (index === currentSlide) return;
    setPrevSlide(currentSlide);
    setDirection(index > currentSlide ? "ltr" : "rtl");
    setCurrentSlide(index);
    setProgress(0);
  };

  // Autoplay countdown and progress tracker
  useEffect(() => {
    if (prefersReducedMotion || isHovered) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    setProgress(0);
    const startTime = Date.now();

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / AUTOPLAY_INTERVAL) * 100);
      setProgress(pct);
    }, PROGRESS_TICK);

    timerRef.current = setTimeout(() => {
      goToNextSlide();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentSlide, isHovered, prefersReducedMotion, goToNextSlide]);

  // Clean exit animation state after transition completes (1000ms)
  useEffect(() => {
    if (prevSlide !== null) {
      const timeout = setTimeout(() => {
        setPrevSlide(null);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentSlide, prevSlide]);

  const quickCategories = [
    { label: "Sarees", path: "/category/sarees", icon: "🥻" },
    { label: "Suits", path: "/category/suits", icon: "👗" },
    { label: "Boys' Wear", path: "/category/boys", icon: "👔" },
    { label: "Girls' Wear", path: "/category/girls", icon: "✨" },
  ];

  return (
    <section
      style={{
        position: "relative",
        background: "var(--bg-body)",
        paddingTop: "1.25rem",
        paddingBottom: "3rem",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Main Luxury Hero Slider Frame */}
        <div
          className="hero-slider-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Slides Loop */}
          {SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            const isExiting = index === prevSlide;

            // Compute sliding classes based on direction
            let slideClass = "hero-slide";
            if (isActive) {
              slideClass += direction === "ltr" ? " slide-ltr-active" : " slide-rtl-active";
            } else if (isExiting) {
              slideClass += direction === "ltr" ? " slide-ltr-exit" : " slide-rtl-exit";
            }

            return (
              <div key={slide.id} className={slideClass}>
                {/* Background Image (Model strictly aligned right/center) */}
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="hero-slide-image"
                />

                {/* Subtle Luxury Gradient Scrim on Left Side (Leaves Model Visible on Right) */}
                <div className="hero-slide-scrim" />

                {/* Text Content Block (Left Side Only) */}
                {isActive && (
                  <div className="hero-text-container hero-text-animated">
                    {/* Slide 1 Royal Insignia Crest */}
                    {slide.isFirstSlide ? (
                      <div
                        style={{
                          marginBottom: "0.5rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          color: "var(--gold-dark)",
                        }}
                      >
                        <span style={{ fontSize: "1.3rem" }}>👑</span>
                        <span
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "0.82rem",
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            fontWeight: 600,
                            color: "var(--gold-dark)",
                          }}
                        >
                          Royalty • Heritage • Boutique
                        </span>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.45rem",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "var(--radius-full)",
                          background: "rgba(197, 160, 89, 0.15)",
                          border: "1px solid rgba(197, 160, 89, 0.35)",
                          color: "var(--gold-dark)",
                          fontSize: "0.74rem",
                          fontWeight: 600,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <Sparkles size={12} />
                        <span>{slide.eyebrow}</span>
                      </div>
                    )}

                    {/* Main Title */}
                    <h1
                      style={{
                        fontFamily: slide.isFirstSlide ? "var(--font-display)" : "var(--font-serif)",
                        fontSize: slide.isFirstSlide
                          ? "clamp(1.85rem, 3.2vw, 2.9rem)"
                          : "clamp(1.75rem, 3.1vw, 2.75rem)",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        lineHeight: 1.15,
                        letterSpacing: slide.isFirstSlide ? "0.04em" : "-0.015em",
                        margin: "0 0 0.5rem 0",
                        textTransform: slide.isFirstSlide ? "uppercase" : "none",
                      }}
                    >
                      {slide.title}
                    </h1>

                    {/* Tagline */}
                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
                        color: "var(--gold-dark)",
                        margin: "0 0 0.85rem 0",
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {slide.tagline}
                    </p>

                    {/* Description Paragraph */}
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "clamp(0.85rem, 1.05vw, 0.98rem)",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                        margin: "0 0 1.5rem 0",
                        maxWidth: "460px",
                      }}
                    >
                      {slide.description}
                    </p>

                    {/* Primary Call-to-Action Button */}
                    <Link
                      to={slide.buttonLink}
                      className="btn btn-primary btn-lg"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        textDecoration: "none",
                        boxShadow: "0 6px 20px rgba(31, 28, 27, 0.2)",
                        border: "1.5px solid var(--gold-primary)",
                      }}
                    >
                      <span>{slide.buttonText}</span>
                      <ArrowRight size={16} />
                    </Link>

                    {/* Slide 1 Special: Category Quick Anchors preview */}
                    {slide.isFirstSlide && slide.categoryIcons && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1.25rem",
                          marginTop: "1.75rem",
                          paddingTop: "1rem",
                          borderTop: "1px solid rgba(197, 160, 89, 0.35)",
                          flexWrap: "wrap",
                        }}
                      >
                        {slide.categoryIcons.map((cat, i) => (
                          <Link
                            key={i}
                            to={cat.link}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.4rem",
                              fontSize: "0.78rem",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              color: "var(--text-primary)",
                              transition: "var(--transition-smooth)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "var(--gold-dark)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "var(--text-primary)";
                            }}
                          >
                            <span>{cat.icon}</span>
                            <span>{cat.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Golden Filigree Inner Framing Line */}
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              right: "12px",
              bottom: "12px",
              border: "1px solid rgba(223, 202, 141, 0.38)",
              pointerEvents: "none",
              borderRadius: "4px",
              zIndex: 15,
            }}
          />

          {/* Hover Status Badge */}
          {isHovered && (
            <div className="hero-pause-badge">
              <Pause size={10} />
              <span>Autoplay Paused</span>
            </div>
          )}

          {/* Navigation Controls: Previous Slide Arrow */}
          <button
            onClick={goToPrevSlide}
            className="hero-nav-arrow hero-nav-prev"
            aria-label="Previous banner slide"
            title="Previous slide"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Navigation Controls: Next Slide Arrow */}
          <button
            onClick={goToNextSlide}
            className="hero-nav-arrow hero-nav-next"
            aria-label="Next banner slide"
            title="Next slide"
          >
            <ChevronRight size={22} />
          </button>

          {/* Slide Indicators: Four Bars with Real-time Progress Countdown */}
          <div className="hero-indicators">
            {SLIDES.map((_, idx) => {
              const isDotActive = idx === currentSlide;
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`hero-indicator-dot ${isDotActive ? "active" : ""}`}
                  aria-label={`Go to slide ${idx + 1}`}
                  title={`Slide ${idx + 1} of ${SLIDES.length}`}
                >
                  {isDotActive && (
                    <span
                      className="hero-indicator-progress"
                      style={{
                        width: prefersReducedMotion ? "100%" : `${progress}%`,
                        transition: isHovered ? "none" : "width 50ms linear",
                      }}
                    />
                  )}
                </button>
              );
            })}

            {/* Slide Index Badge */}
            <span
              style={{
                fontSize: "0.72rem",
                color: "var(--gold-light)",
                fontWeight: 600,
                letterSpacing: "0.08em",
                marginLeft: "0.35rem",
              }}
            >
              0{currentSlide + 1} / 0{SLIDES.length}
            </span>
          </div>
        </div>

        {/* Interactive Quick Bar Under Hero */}
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#FFFFFF",
            padding: "1.1rem 1.75rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-delicate)",
            boxShadow: "var(--shadow-sm)",
            gap: "1rem",
          }}
        >
          {/* Left: Boutique Statement */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(197, 160, 89, 0.15)",
                color: "var(--gold-dark)",
              }}
            >
              <Sparkles size={18} />
            </span>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.15rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Heritage Indian Clothing & Custom Fit Boutique
              </p>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
                Explore digital catalogue • Connect on WhatsApp for physical store viewing
              </p>
            </div>
          </div>

          {/* Center / Right: Quick Category Anchors & WhatsApp Inquiry */}
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {quickCategories.map((cat) => (
                <Link
                  key={cat.label}
                  to={cat.path}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.45rem 0.95rem",
                    background: "var(--bg-cream)",
                    border: "1px solid var(--border-delicate)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    transition: "var(--transition-smooth)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--gold-primary)";
                    e.currentTarget.style.background = "#FFFFFF";
                    e.currentTarget.style.color = "var(--gold-dark)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-delicate)";
                    e.currentTarget.style.background = "var(--bg-cream)";
                    e.currentTarget.style.color = "var(--text-primary)";
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </Link>
              ))}
            </div>

            <Link
              to="/category/sarees"
              className="btn btn-primary btn-sm"
              style={{ display: "inline-flex", textDecoration: "none" }}
            >
              <span>Explore Collection</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
