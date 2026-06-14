export function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export function formatDate(date = new Date()) {
  return date.toLocaleDateString([], {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDay(date = new Date()) {
  return date.toLocaleDateString([], { weekday: 'long' })
}

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function openInNewTab(url) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

export const SITE_MAP = {
  google: 'https://www.google.com',
  youtube: 'https://www.youtube.com',
  github: 'https://www.github.com',
  linkedin: 'https://www.linkedin.com',
  gmail: 'https://mail.google.com',
  twitter: 'https://www.twitter.com',
  x: 'https://www.x.com',
}
