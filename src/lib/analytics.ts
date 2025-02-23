'use client';

export interface UserProfile {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  company?: string;
  industry?: string;
}

export interface PageViewEvent {
  path: string;
  title: string;
  referrer?: string;
}

export interface InteractionEvent {
  category: 'document' | 'chat' | 'investment' | 'authentication' | 'navigation';
  action: string;
  label?: string;
  value?: number;
}

export const Events = {
  // Authentication Events
  LOGIN_SUCCESS: 'login_success',
  LOGIN_FAILURE: 'login_failure',
  SIGNUP_START: 'signup_start',
  SIGNUP_COMPLETE: 'signup_complete',
  LOGOUT: 'logout',
  
  // Document Events
  DOCUMENT_VIEW: 'document_view',
  DOCUMENT_DOWNLOAD: 'document_download',
  
  // Chat Events
  CHAT_START: 'chat_start',
  CHAT_MESSAGE_SENT: 'chat_message_sent',
  CHAT_ENDED: 'chat_ended',
  
  // Investment Events
  INVESTMENT_INTEREST: 'investment_interest',
  SCHEDULE_MEETING: 'schedule_meeting',
  
  // Feature Usage
  FEATURE_USED: 'feature_used',
  ERROR_OCCURRED: 'error_occurred',
} as const;

class Analytics {
  private static instance: Analytics;
  private initialized: boolean = false;

  private constructor() {}

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  init() {
    if (this.initialized) {
      console.warn('Analytics already initialized');
      return;
    }
    
    this.initialized = true;
    console.log('Analytics initialized');
  }

  identifyUser(user: UserProfile) {
    if (!this.initialized) return;
    console.log('User identified:', user.id);
  }

  trackPageView({ path, title, referrer }: PageViewEvent) {
    if (!this.initialized) return;
    console.log('Page view:', { path, title, referrer });
  }

  trackEvent({ category, action, label, value }: InteractionEvent) {
    if (!this.initialized) return;
    console.log('Event:', { category, action, label, value });
  }
}

export const analytics = Analytics.getInstance();
export default analytics;
