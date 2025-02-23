'use client';

let clarity: any;

if (typeof window !== 'undefined') {
  clarity = (window as any).clarity;
}

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

export const ClarityEvents = {
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

export const ClarityTags = {
  // User Properties
  USER_ID: 'user_id',
  USER_TYPE: 'user_type',
  USER_ROLE: 'user_role',
  USER_INDUSTRY: 'user_industry',
  
  // Page Properties
  PAGE_TYPE: 'page_type',
  PAGE_SECTION: 'page_section',
  
  // Feature Properties
  FEATURE_NAME: 'feature_name',
  FEATURE_VERSION: 'feature_version',
  
  // Business Context
  COMPANY_SIZE: 'company_size',
  INVESTMENT_STAGE: 'investment_stage',
  
  // Technical Context
  DEVICE_TYPE: 'device_type',
  BROWSER_NAME: 'browser_name',
  APP_VERSION: 'app_version',
} as const;

class Analytics {
  private static instance: Analytics;
  private initialized: boolean = false;
  private consentGiven: boolean = false;

  private constructor() {}

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  init(projectId: string = 'qecuvif3cp') {
    if (this.initialized) return;
    
    try {
      if (typeof clarity !== 'undefined') {
        clarity(projectId);
      }
      this.initialized = true;
      this.setupDefaultTags();
      console.log('Clarity initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Clarity:', error);
    }
  }

  private setupDefaultTags() {
    // Set app version
    this.setTag(ClarityTags.APP_VERSION, '1.0.0');
    
    // Set device type
    this.setTag(ClarityTags.DEVICE_TYPE, this.getDeviceType());
    
    // Set browser info
    this.setTag(ClarityTags.BROWSER_NAME, this.getBrowserInfo());
  }

  private getDeviceType(): string {
    if (typeof window === 'undefined') return 'unknown';
    
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'mobile';
    }
    return 'desktop';
  }

  private getBrowserInfo(): string {
    if (typeof window === 'undefined') return 'unknown';
    
    const ua = navigator.userAgent;
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    if (ua.includes('MSIE') || ua.includes('Trident/')) return 'IE';
    return 'other';
  }

  setConsent(hasConsent: boolean) {
    this.consentGiven = hasConsent;
    if (typeof clarity !== 'undefined') {
      clarity('consent', hasConsent);
    }
  }

  identifyUser(user: UserProfile) {
    if (!this.initialized || !this.consentGiven) return;

    try {
      // Set user identifier
      if (typeof clarity !== 'undefined') {
        clarity('identify', user.id);
      }
      
      // Set user properties as tags
      if (user.role) this.setTag(ClarityTags.USER_ROLE, user.role);
      if (user.industry) this.setTag(ClarityTags.USER_INDUSTRY, user.industry);
      
      // Upgrade session for identified users
      if (typeof clarity !== 'undefined') {
        clarity('upgrade', 'identified_user');
      }
      
      console.log('User identified in Clarity:', user.id);
    } catch (error) {
      console.error('Failed to identify user in Clarity:', error);
    }
  }

  trackPageView({ path, title, referrer }: PageViewEvent) {
    if (!this.initialized) return;

    try {
      // Set page-specific tags
      this.setTag(ClarityTags.PAGE_TYPE, path.split('/')[1] || 'home');
      if (referrer) this.setTag('referrer', referrer);
      
      // Track custom page view event
      this.trackEvent({
        category: 'navigation',
        action: 'page_view',
        label: path
      });
      
      console.log('Page view tracked:', path);
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }

  trackEvent({ category, action, label, value }: InteractionEvent) {
    if (!this.initialized) return;

    try {
      // Create event name
      const eventName = `${category}_${action}`;
      
      // Track event in Clarity
      if (typeof clarity !== 'undefined') {
        clarity('event', eventName);
      }
      
      // Set additional context as tags
      if (category) this.setTag('event_category', category);
      if (label) this.setTag('event_label', label);
      if (value !== undefined) this.setTag('event_value', value.toString());
      
      console.log('Event tracked:', eventName);
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  setTag(key: string, value: string | string[]) {
    if (!this.initialized) return;

    try {
      if (typeof clarity !== 'undefined') {
        clarity('set', key, value);
      }
    } catch (error) {
      console.error('Failed to set tag:', error);
    }
  }

  upgradeSession(reason: string) {
    if (!this.initialized) return;

    try {
      if (typeof clarity !== 'undefined') {
        clarity('upgrade', reason);
      }
    } catch (error) {
      console.error('Failed to upgrade session:', error);
    }
  }
}

export const analytics = Analytics.getInstance();
export default analytics;
