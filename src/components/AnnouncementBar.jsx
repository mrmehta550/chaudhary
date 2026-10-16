import React from "react";
import { MessageCircle, MapPin, Sparkles } from "lucide-react";
import { shopConfig, getGeneralWhatsAppUrl } from "../config/shopConfig";
import "./AnnouncementBar.css";

export default function AnnouncementBar() {
  const announcements = [
    {
      icon: <Sparkles size={13} className="text-gold" />,
      text: "Festive Edit 2026: Sarees, Suits & Kids' Celebratory Wear",
    },
    {
      icon: <MapPin size={13} className="text-gold" />,
      text: `Physical Boutique: ${shopConfig.store.cityStateZip} • Mon–Sat: 10:30 AM – 8:30 PM`,
    },
    {
      icon: <MessageCircle size={13} style={{ color: "#25D366" }} />,
      text: `WhatsApp Concierge: ${shopConfig.whatsapp.displayNumber}`,
      isLink: true,
      url: getGeneralWhatsAppUrl("Catalogue Inquiry"),
    },
  ];

  return (
    <div className="announcement-wrapper">
      {/* Desktop View (>= 992px): 3 items spaced evenly */}
      <div className="container announcement-desktop">
        {/* Left: Physical Boutique */}
        <div className="announcement-item">
          <MapPin size={13} style={{ color: "var(--gold-primary)" }} />
          <span>Physical Boutique: {shopConfig.store.cityStateZip}</span>
          <span className="announcement-dot">•</span>
          <span style={{ color: "var(--text-light)", opacity: 0.85 }}>
            Mon–Sat: 10:30 AM – 8:30 PM
          </span>
        </div>

        {/* Center: Festive Highlights */}
        <div className="announcement-item announcement-highlight">
          <Sparkles size={13} style={{ color: "var(--gold-primary)" }} />
          <span>Festive Edit 2026: Sarees, Suits & Kids' Celebratory Wear</span>
        </div>

        {/* Right: WhatsApp Concierge */}
        <div className="announcement-item">
          <a
            href={getGeneralWhatsAppUrl("Catalogue Inquiry")}
            target="_blank"
            rel="noopener noreferrer"
            className="announcement-wa-link"
          >
            <MessageCircle size={13} style={{ color: "#25D366" }} />
            <span>WhatsApp Concierge: {shopConfig.whatsapp.displayNumber}</span>
          </a>
        </div>
      </div>

      {/* Mobile & Tablet View (< 992px): Seamless Right-to-Left Marquee Ticker */}
      <div className="announcement-mobile-marquee" aria-label="Store Announcements">
        <div className="marquee-track">
          {/* Double array for infinite seamless looping */}
          {[...announcements, ...announcements].map((item, idx) => (
            <div key={idx} className="marquee-item">
              {item.isLink ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="marquee-link"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </a>
              ) : (
                <span className="marquee-content">
                  {item.icon}
                  <span>{item.text}</span>
                </span>
              )}
              <span className="marquee-separator">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
