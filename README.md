# Aiko Investor Hub

A modern, AI-driven investor relations platform built with Next.js 14, featuring:
- AI-powered chat interface with Aika
- Investor resources and documentation
- Secure user authentication
- Analytics tracking

## Prerequisites

- Node.js 18.x or later
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AikoGroup/website.git
cd website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Required environment variables:
```env
NEXTAUTH_URL=https://investors.aiko.insure
NEXTAUTH_SECRET=your-secret-key
AUTH_USERS=[{"id":"1","email":"user@example.com","password":"hashed-password"}]
NEXT_PUBLIC_N8N_WEBHOOK_URL=your-webhook-url
ANTHROPIC_API_KEY=your-api-key
DISCORD_WEBHOOK_URL=your-webhook-url
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Known Issues

1. Authentication System:
   - AUTH_USERS environment variable must be properly configured
   - Password must be bcrypt hashed
   - Contact admin for valid credentials

2. Development Setup:
   - All environment variables must be set
   - Some TypeScript/ESLint warnings may appear during build
node scripts/test-webhook.js

# Test with custom profile (edit userProfile in test-webhook.js)
# - Modify user details
# - Update preferences
# - Change business context
# Then run the test script
```

The webhook test script sends a simulated user profile to the n8n workflow endpoint, allowing you to test:
- User onboarding flow
- Preference processing
- Notification triggers
- Integration responses

### User Management

#### Add New User
```bash
node scripts/add-user.js --email user@example.com --name "User Name" --role investor
```
Available roles: `investor`, `admin`

#### List Users
```bash
node scripts/list-users.js
```

#### Remove User
```bash
node scripts/remove-user.js --email user@example.com
```

### Build and Deploy

#### Build for Production
```bash
npm run build
# or
yarn build
```

#### Start Production Server
```bash
npm run start
# or
yarn start
```

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   ├── auth/            # Authentication pages
│   ├── chat/            # Chat interface
│   ├── learn/           # Learn More page
│   └── page.tsx         # Home page
├── components/          # React components
├── public/              # Static files
│   └── investor-resources/  # Downloadable resources
├── scripts/             # Utility scripts
└── src/                 # Source files
    ├── config/          # Configuration files
    └── lib/             # Library code
```

## Contributing

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git commit -m "feat: add new feature"
```

3. Push to your branch:
```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string in `.env.local`

2. **Authentication Issues**
   - Clear browser cookies and local storage
   - Verify user exists in database
   - Check auth configuration in `src/config/auth.json`

3. **Build Errors**
   - Clear `.next` directory: `rm -rf .next`
   - Delete `node_modules` and reinstall: `rm -rf node_modules && yarn install`

For more help, check the [documentation](https://docs.aiko.com) or contact the development team.
