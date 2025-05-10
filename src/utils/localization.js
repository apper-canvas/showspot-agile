/**
 * Utility functions for localization specific to Indian context
 */

// Format currency in INR
export function formatCurrency(amount, options = {}) {
  const { compact = false } = options;
  
  if (compact) {
    return formatIndianCompactCurrency(amount);
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

// Format date in Indian format
export function formatDate(dateString, options = {}) {
  const { format = 'medium' } = options;
  
  const date = new Date(dateString);
  
  switch (format) {
    case 'short':
      return new Intl.DateTimeFormat('en-IN', { 
        day: 'numeric', 
        month: 'short' 
      }).format(date);
    case 'medium':
      return new Intl.DateTimeFormat('en-IN', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }).format(date);
    case 'long':
      return new Intl.DateTimeFormat('en-IN', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }).format(date);
    default:
      return new Intl.DateTimeFormat('en-IN').format(date);
  }
}

// Format large numbers in Indian number system (lakhs, crores)
export function formatIndianCompactCurrency(amount) {
  if (amount >= 10000000) { // 1 crore
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) { // 1 lakh
    return `₹${(amount / 100000).toFixed(2)} L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  } else {
    return `₹${amount}`;
  }
}

// Get translation map for different languages
export const translations = {
  en: { language: 'English', home: 'Home', bookTickets: 'Book Tickets', findEvents: 'Find Events' },
  hi: { language: 'हिंदी', home: 'होम', bookTickets: 'टिकट बुक करें', findEvents: 'इवेंट्स ढूंढें' }
};