/**
 * Chaudhary Fashion Mark - Central Store Configuration
 * All business details and WhatsApp integration settings are configured here.
 */

export const shopConfig = {
  shopName: "Chaudhary Fashion Mart",
  tagline: "Traditional Elegance. Modern Style.",
  shortDescription:
    "A premier Indian clothing boutique featuring handcrafted sarees, designer suits, and festive ethnic wear for boys and girls.",

  // WhatsApp Configuration (Configurable placeholder - replace with actual store WhatsApp)
  whatsapp: {
    displayNumber: "+91 76328 97577",
    cleanNumber: "917632897577", // International format without spaces or symbols
    defaultGreeting:
      "Hello Chaudhary Fashion Mark! I am visiting your digital catalogue and would like to inquire about your collections and store visit.",
  },

  // Physical Store Address & Timings (Configurable placeholders)
  store: {
    addressLine1: "Jarang chowk",
    addressLine2: "Near Royal Palace Gate, M.I. Road",
    cityStateZip: "Muzaffarpur, Bihar — 843118 ",
    landmark: "Opposite Rajputana Jewel Plaza",
    mapQueryUrl: "https://maps.google.com/?q=Heritage+Market+Jaipur",
    phonePrimary: "+91 76328 97577",
    phoneSecondary: "+91 76328 97577",
    email: "inquiry@chaudharyfashionmart.com",
    timings: [
      { days: "Monday – Saturday", hours: "10:30 AM – 8:30 PM" },
      { days: "Sunday", hours: "11:30 AM – 7:00 PM" },
    ],
    amenities: [
      "Custom Stitching & In-store Tailoring",
      "Trial Rooms with Stylist Assistance",
      "Personalized Bridal & Trousseau Consultation",
      "Valet Parking Available",
    ],
  },

  // Catalogue Disclaimer
  disclaimer: {
    badge: "Digital Boutique Catalogue",
    notice:
      "This website serves as our digital product showcase. Prices and products shown are sample boutique inventory. To verify current in-store availability, colors, or reserve pieces for trial, please connect with our boutique team on WhatsApp.",
  },

  // Social Channels
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    whatsapp: "https://wa.me/9176328 97577",
  },
};

/**
 * Generate a prefilled WhatsApp link for inquiring about a specific product.
 */
export function getProductWhatsAppUrl(product) {
  const number = shopConfig.whatsapp.cleanNumber;
  const message = [
    `*Inquiry for Chaudhary Fashion Mark:*`,
    `Hello! I am interested in inquiring about this product from your catalogue:`,
    `• *Product:* ${product.name}`,
    `• *Product ID:* ${product.id}`,
    `• *Category:* ${product.categoryLabel || product.category}`,
    `• *Catalogue Price:* ₹${product.price.toLocaleString("en-IN")}`,
    ``,
    `Could you please let me know if this piece is available in-store for viewing or purchase?`,
  ].join("\n");

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate a prefilled WhatsApp link for general boutique queries or appointments.
 */
export function getGeneralWhatsAppUrl(subject = "") {
  const number = shopConfig.whatsapp.cleanNumber;
  let message = shopConfig.whatsapp.defaultGreeting;
  if (subject) {
    message = `Hello Chaudhary Fashion Mark! I would like to inquire about: *${subject}*. Please share available designs and store assistance details.`;
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
