import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Pause, Hand } from "lucide-react";
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

// Showcase gallery items for the continuous right-to-left scrolling reel
const GALLERY_REEL_ITEMS = [
  {
    id: "g1",
    title: "Pure Banarasi Silk",
    desc: "Handcrafted Zari Weaves",
    badge: "Heritage",
    image: "/hero/slide-1.jpg",
    link: "/category/sarees",
  },
  {
    id: "g2",
    title: "Royal Anarkali Suits",
    desc: "Artisanal Chikankari Sets",
    badge: "Designer",
    image: "/hero/slide-2.jpg",
    link: "/category/suits",
  },
  {
    id: "g3",
    title: "Boys' Sherwanis",
    desc: "Festive Silk & Jacquard",
    badge: "Celebratory",
    image: "/hero/slide-3.png",
    link: "/category/boys",
  },
  {
    id: "g4",
    title: "Girls' Festive Lehengas",
    desc: "Miniature Brocade Drapes",
    badge: "Festive Edit",
    image: "/hero/slide-4.png",
    link: "/category/girls",
  },
  {
    id: "g5",
    title: "Golden Courtyard Drapes",
    desc: "Tissue & Organza Silks",
    badge: "Exclusive",
    image: "/hero/slide-golden-courtyard.png",
    link: "/category/sarees",
  },
  {
    id: "g6",
    title: "Luxe Bandhgala Kurtas",
    desc: "Velvet & Rich Textures",
    badge: "Royal Wear",
    image: "/hero/slide-warm-luxe.png",
    link: "/category/boys",
  },
  {
    id: "g7",
    title: "Classic Kadwa Weaves",
    desc: "Varanasi Handloom Art",
    badge: "Authentic",
    image: "/hero/slide-saree-clean.png",
    link: "/category/sarees",
  },
  {
    id: "g8",
    title: "Grand Trunk Collection",
    desc: "Celebratory Family Attire",
    badge: "Boutique",
    image: "/hero-banner.jpg",
    link: "/category/all",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(null);
  const [direction, setDirection] = useState("rtl"); // Default Right-to-Left
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  const AUTOPLAY_INTERVAL = 5500;
  const PROGRESS_TICK = 50;

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Next Slide: Slides Right-to-Left (new slide enters from right, old exits to left)
  const goToNextSlide = useCallback(() => {
    setPrevSlide(currentSlide);
    setDirection("rtl");
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, [currentSlide]);

  // Prev Slide: Slides Left-to-Right
  const goToPrevSlide = useCallback(() => {
    setPrevSlide(currentSlide);
    setDirection("ltr");
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, [currentSlide]);

  const goToSlide = (index) => {
    if (index === currentSlide) return;
    setPrevSlide(currentSlide);
    setDirection(index > currentSlide ? "rtl" : "ltr");
    setCurrentSlide(index);
    setProgress(0);
  };

  // Touch swipe detection for mobile devices (Right-to-Left / Left-to-Right)
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 45;

    // Swiped left (finger moved right to left) -> Go to next slide (right-to-left motion)
    if (distance > minSwipeDistance) {
      goToNextSlide();
    }
    // Swiped right -> Go to previous slide
    else if (distance < -minSwipeDistance) {
      goToPrevSlide();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goToPrevSlide();
      if (e.key === "ArrowRight") goToNextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextSlide, goToPrevSlide]);

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

  // Clean exit animation state after transition completes (850ms)
  useEffect(() => {
    if (prevSlide !== null) {
      const timeout = setTimeout(() => {
        setPrevSlide(null);
      }, 850);
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
        {/* Main Luxury Hero Slider Frame with Touch Swipe */}
        <div
          className="hero-slider-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slides Loop */}
          {SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            const isExiting = index === prevSlide;

            // Compute sliding classes based on Right-to-Left or Left-to-Right direction
            let slideClass = "hero-slide";
            if (isActive) {
              slideClass += direction === "rtl" ? " slide-rtl-active" : " slide-ltr-active";
            } else if (isExiting) {
              slideClass += direction === "rtl" ? " slide-rtl-exit" : " slide-ltr-exit";
            }

            return (
              <div key={slide.id} className={slideClass}>
                {/* Background Image (Vibrant & 100% visible) */}
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="hero-slide-image"
                />

                {/* Subtle Luxury Vignette Scrim (Ultra-light, keeps image clear) */}
                <div className="hero-slide-scrim" />

                {/* Text Content Block in Luxury Glassmorphism Card */}
                {isActive && (
                  <div className="hero-text-container hero-text-animated">
                    <div className="hero-glass-card">
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
                          <span style={{ fontSize: "1.2rem" }}>👑</span>
                          <span
                            style={{
                              fontFamily: "var(--font-serif)",
                              fontSize: "0.82rem",
                              letterSpacing: "0.2em",
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
                            ? "clamp(1.5rem, 2.8vw, 2.5rem)"
                            : "clamp(1.45rem, 2.7vw, 2.4rem)",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          lineHeight: 1.15,
                          letterSpacing: slide.isFirstSlide ? "0.03em" : "-0.015em",
                          margin: "0 0 0.4rem 0",
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
                          fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)",
                          color: "var(--gold-dark)",
                          margin: "0 0 0.65rem 0",
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
                          fontSize: "clamp(0.82rem, 0.95vw, 0.92rem)",
                          color: "var(--text-secondary)",
                          lineHeight: 1.5,
                          margin: "0 0 1.25rem 0",
                          maxWidth: "460px",
                        }}
                      >
                        {slide.description}
                      </p>

                      {/* Primary Call-to-Action Button */}
                      <Link
                        to={slide.buttonLink}
                        className="btn btn-primary"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.55rem",
                          textDecoration: "none",
                          boxShadow: "0 6px 20px rgba(31, 28, 27, 0.18)",
                          border: "1.5px solid var(--gold-primary)",
                        }}
                      >
                        <span>{slide.buttonText}</span>
                        <ArrowRight size={15} />
                      </Link>

                      {/* Slide 1 Special: Category Quick Anchors preview */}
                      {slide.isFirstSlide && slide.categoryIcons && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            marginTop: "1.25rem",
                            paddingTop: "0.85rem",
                            borderTop: "1px solid rgba(197, 160, 89, 0.3)",
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
                                gap: "0.35rem",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
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
              border: "1px solid rgba(223, 202, 141, 0.35)",
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
            aria-label="Next banner slide (Right to Left)"
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

        {/* ==========================================================================
            CONTINUOUS RIGHT-TO-LEFT LIVE SHOWCASE IMAGE REEL (Marquee Gallery)
            Seamless high-res photography scrolling continuously from right to left
           ========================================================================== */}
        <div className="hero-gallery-reel-section">
          <div className="hero-gallery-reel-header">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "rgba(197, 160, 89, 0.2)",
                  color: "var(--gold-dark)",
                }}
              >
                <Sparkles size={13} />
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  letterSpacing: "0.02em",
                }}
              >
                Live Boutique Visual Edit
              </span>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--gold-dark)",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  background: "rgba(197, 160, 89, 0.12)",
                  padding: "0.15rem 0.55rem",
                  borderRadius: "var(--radius-full)",
                }}
              >
                Right-to-Left Reel ✦
              </span>
            </div>

            <Link
              to="/category/all"
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "var(--gold-dark)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <span>View All Pieces</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="hero-gallery-reel-track-wrapper">
            <div className="hero-gallery-reel-track">
              {/* Duplicate array for seamless infinite loop from right to left */}
              {[...GALLERY_REEL_ITEMS, ...GALLERY_REEL_ITEMS].map((item, i) => (
                <Link
                  key={`${item.id}-${i}`}
                  to={item.link}
                  className="hero-gallery-card"
                  title={`${item.title} — ${item.desc}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="hero-gallery-card-img"
                    loading="lazy"
                  />
                  <div className="hero-gallery-card-overlay">
                    <span className="hero-gallery-card-badge">{item.badge}</span>
                    <h3 className="hero-gallery-card-title">{item.title}</h3>
                    <p className="hero-gallery-card-desc">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================================================
            UNDER-HERO QUICK BAR (100% Mobile Responsive - No Overflow)
            Fixes the horizontal button blowout shown in user's screenshot
           ========================================================================== */}
        <div className="hero-quick-bar">
          {/* Left: Boutique Statement */}
          <div className="hero-quick-statement">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "rgba(197, 160, 89, 0.15)",
                color: "var(--gold-dark)",
                flexShrink: 0,
              }}
            >
              <Sparkles size={18} />
            </span>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  margin: 0,
                  lineHeight: 1.25,
                }}
              >
                Heritage Indian Clothing & Custom Fit Boutique
              </p>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: "0.2rem 0 0 0" }}>
                Explore digital catalogue • Connect on WhatsApp for physical store viewing
              </p>
            </div>
          </div>

          {/* Right: Quick Category Anchors & CTA (Clean grid/wrap on mobile) */}
          <div className="hero-quick-actions-wrap">
            <div className="hero-quick-pills-wrap">
              {quickCategories.map((cat) => (
                <Link
                  key={cat.label}
                  to={cat.path}
                  className="hero-quick-pill"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </Link>
              ))}
            </div>

            <Link
              to="/category/sarees"
              className="btn btn-primary btn-sm hero-quick-cta"
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
