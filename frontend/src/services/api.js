import { projectsData } from '../data/projectsData';
import profileData from '../data/profileData.json';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Robust API service that tries the Laravel / Mock API endpoint first,
 * and automatically falls back to bundled static data if offline or unavailable.
 */
export const api = {
  async getProfile() {
    try {
      const res = await fetch(`${API_BASE_URL}/profile`, { method: 'GET' });
      if (res.ok) {
        const json = await res.json();
        return { data: json.data || profileData, source: 'live-api' };
      }
    } catch {
      // Fallback
    }
    return { data: profileData, source: 'local-mock' };
  },

  async getProjects() {
    try {
      const res = await fetch(`${API_BASE_URL}/projects`, { method: 'GET' });
      if (res.ok) {
        const json = await res.json();
        return { data: json.data || projectsData, source: 'live-api' };
      }
    } catch {
      // Fallback
    }
    return { data: projectsData, source: 'local-mock' };
  },

  async sendChatMessage(message) {
    try {
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      if (res.ok) {
        const json = await res.json();
        return { reply: json.reply, agent: json.agent, source: 'live-api' };
      }
    } catch {
      // Fallback
    }
    return null; // Will trigger client-side AI engine
  },

  async sendContact(formData) {
    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const json = await res.json();
        return { success: true, message: json.message || "Message sent successfully!", source: 'live-api' };
      }
    } catch {
      // Fallback
    }
    return { success: true, message: `Thank you, ${formData.name}! Your message was logged (Mock mode).`, source: 'local-mock' };
  }
};

