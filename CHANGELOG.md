# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-02-24
### Added
- Next.js 14 app router implementation
- Authentication system using NextAuth.js
  - Environment-based user management
  - Session handling and middleware protection
  - Login form with error handling
- Analytics integration
  - Event tracking for authentication
  - User behavior monitoring
- Core pages and components
  - Login page with form validation
  - Meet Aika page for AI interaction
  - Learn page with investor resources
  - Protected routes and middleware
- API Routes
  - Authentication endpoints
  - Chat interface
  - Investment notification system

### Known Issues
- User authentication requires proper environment variable setup
- Login credentials need to be properly configured in AUTH_USERS
- Some TypeScript and ESLint warnings present

### Technical Debt
- Improve error handling in authentication system
- Add proper TypeScript types for NextAuth session
- Implement proper test coverage
- Add proper documentation for environment variables

### Added
- Enhanced login experience:
  - Clean, dedicated login layout without navigation
  - Glassmorphic login form with modern styling
  - Automatic redirection from root to login page
  - Improved form field styling and interactions

### Added
- Added global navigation with animated transitions:
  - Glassmorphic navigation bar with hover effects
  - Smooth tab transitions with Framer Motion
  - Consistent navigation between Chat and Learn More pages
  - Prominent Invest Now CTA button

### Added
- Enhanced mobile responsiveness:
  - Fixed auto-zoom issues on mobile input fields
  - Optimized chat interface for mobile devices
  - Improved message bubble sizing and spacing
  - Added proper viewport meta settings
  - Adjusted font sizes for better mobile readability

### Added
- Created comprehensive Learn More page with interactive elements:
  - Glassmorphic design with gradient backgrounds
  - Interactive FAQ accordion with animations
  - Downloadable resources section
  - Feature cards with hover effects
  - Clear call-to-action sections
- Added reusable components:
  - GlassCard for consistent glassmorphic styling
  - GradientButton for primary actions
  - FeatureCard for showcasing features
  - ResourceCard for downloadable content
  - FAQAccordion for expandable Q&As

### Added
- Enhanced user profiles with rich professional and personal information:
  - Professional context (company, role, industry, company size)
  - Business context (interests, expertise, business goals)
  - Communication preferences
  - Location and timezone information
- Updated test webhook with formatted user parameters for easy testing
- Added personalized AI responses based on user profile

### Added
- Created LoginForm component with email and first name fields
- Implemented responsive login page UI with gradient background
- Added Aiko logo to login page
- Set up basic form validation and error handling
- Created authentication API endpoint with JSON file storage
- Implemented JWT-based authentication
- Added ChatInterface component with real-time messaging
- Created chat page with n8n webhook integration
- Implemented responsive chat UI with gradient background
- Added interactive suggestion buttons for chat options
- Implemented spinning glow animation for Aika's avatar during loading
- Added British English formatting for chat messages

### Changed
- Switched from firstName to password-based authentication
- Updated login form to use email/password instead of email/firstName
- Added password hashing with bcrypt
- Created separate registration endpoint
- Cleaned up page.tsx to remove template code
- Updated layout.tsx with proper metadata and Inter font
- Customized app title and description
- Improved HTML structure and styling
- Removed hardcoded context from chat interface in favor of n8n configuration
- Enhanced chat message styling with proper alignment and spacing
- Updated Aika's initial greeting to match brand voice

## [0.1.0] - 2025-02-23

### Added
- Initial project setup with Next.js 14, TypeScript, and Tailwind CSS
- Project structure with src directory
- Basic type definitions for authentication (User, AuthState, LoginCredentials)
- Authentication configuration with JSON-based user storage
- Environment variables setup
- Restored project assets (Aiko logo and Aika profile images)
- Added essential dependencies:
  - @headlessui/react for UI components
  - @heroicons/react for icons
  - framer-motion for animations
  - next-auth for authentication

### Changed
- Migrated from previous codebase to new structure
- Updated environment variables to new format

### Removed
- Legacy codebase and configurations
- Unused dependencies and configurations

### Security
- Implemented basic JSON-based authentication system
- Environment variables restructured for better security
