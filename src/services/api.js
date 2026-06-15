import { PROPERTIES, JOURNAL_POSTS } from '../data/mockData';

// Helper to determine the API base URL
const getApiUrl = (endpoint) => {
  // Use relative paths for serverless endpoints
  return `/api/${endpoint}`;
};

/**
 * apiService - API client providing fetch queries to Vercel Serverless endpoints
 * with automatic fallback logic to local mock data.
 */
export const apiService = {
  /**
   * Fetches property listings
   */
  async getProperties() {
    try {
      const response = await fetch(getApiUrl('properties'));
      if (!response.ok) throw new Error('API server responded with error');
      return await response.json();
    } catch (err) {
      console.warn('API properties endpoint unavailable. Falling back to local mock data.', err);
      // Simulate network latency for mockup fallback matching CMS behaviour
      await new Promise(resolve => setTimeout(resolve, 400));
      return PROPERTIES;
    }
  },

  /**
   * Fetches journal posts
   */
  async getJournalPosts() {
    try {
      const response = await fetch(getApiUrl('journal'));
      if (!response.ok) throw new Error('API server responded with error');
      return await response.json();
    } catch (err) {
      console.warn('API journal endpoint unavailable. Falling back to local mock data.', err);
      await new Promise(resolve => setTimeout(resolve, 300));
      return JOURNAL_POSTS;
    }
  },

  /**
   * Submits contact inquiry form
   */
  async submitInquiry(data) {
    try {
      const response = await fetch(getApiUrl('inquire'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to submit inquiry');
      return result;
    } catch (err) {
      console.warn('API inquire endpoint unavailable. Running local submission fallback.', err);
      // Fallback: simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true, mock: true };
    }
  },

  /**
   * Submits newsletter email subscription
   */
  async subscribeNewsletter(email) {
    try {
      const response = await fetch(getApiUrl('subscribe'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to subscribe email');
      return result;
    } catch (err) {
      console.warn('API subscribe endpoint unavailable. Running local newsletter registry.', err);
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, mock: true };
    }
  }
};

export default apiService;
