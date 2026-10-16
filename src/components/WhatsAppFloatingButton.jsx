import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { shopConfig, getGeneralWhatsAppUrl } from "../config/shopConfig";

export default function WhatsAppFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <aside
      aria-label="WhatsApp Concierge"
      className="wa-floating-aside"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 90,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.5rem",
      }}
    >
      {/* Tooltip speech bubble (Desktop only) */}
      {showTooltip && (
        <div
          className="wa-floating-tooltip"
          style={{
            background: "#FFFFFF",
            color: "var(--text-primary)",
            padding: "0.6rem 0.95rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-delicate)",
            boxShadow: "var(--shadow-md)",
            fontSize: "0.78rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            animation: "fadeIn 0.3s ease",
            maxWidth: "240px",
          }}
        >
          <span>
            💬 Need help with sizing or store visit? Chat with our Shop team!
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            style={{
              color: "var(--text-muted)",
              padding: "0.1rem",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Close tooltip"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getGeneralWhatsAppUrl("Instant Catalogue Help")}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-floating-btn"
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#25D366",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 20px rgba(37, 211, 102, 0.4)",
          border: "2px solid #FFFFFF",
          transition: "var(--transition-smooth)",
          animation: "pulseGold 3s infinite",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08) translateY(-3px)";
          e.currentTarget.style.background = "#20BA5A";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1.0) translateY(0)";
          e.currentTarget.style.background = "#25D366";
        }}
        title={`Chat with Chaudhary Fashion Mark on WhatsApp: ${shopConfig.whatsapp.displayNumber}`}
      >
        <MessageCircle size={26} />
      </a>

      <style>{`
        @media (max-width: 768px) {
          .wa-floating-aside {
            bottom: 1rem !important;
            right: 1rem !important;
          }
          .wa-floating-tooltip {
            display: none !important;
          }
          .wa-floating-btn {
            width: 48px !important;
            height: 48px !important;
          }
        }
      `}</style>
    </aside>
  );
}
