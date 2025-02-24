# Aiko Investor Hub

A modern, AI-driven investor relations platform built with Next.js, featuring:
- AI-powered chat interface with Aika
- Investor resources and documentation
- User authentication and management
- Real-time updates and notifications


## Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- MongoDB (for user management)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AikoGroup/website.git
cd website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

## Development Commands

### Start Development Server
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

### Run Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run workflow tests
npm run test:workflow
```

### Test n8n Webhooks
```bash
# Test with default user profile
node scripts/test-webhook.js

# Test with custom profile (edit userProfile in test-webhook.js)
# - Modify user details
# - Update preferences
# - Change business context
# Then run the test script
```

test@aiko.insure
Test123!@#

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
