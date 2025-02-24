import { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'

// Extend the built-in types
declare module 'next-auth' {
  interface User {
    id: string
    email: string
    firstName?: string
    lastName?: string
    company?: string
    role?: string
    industry?: string
    companySize?: string
    department?: string
    location?: string
    timezone?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: User
  }
}

interface StoredUser {
  id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  role?: string;
  industry?: string;
  companySize?: string;
  department?: string;
  location?: string;
  timezone?: string;
}

// Get users from environment variables
const getUsers = (): StoredUser[] => {
  console.error('=== AUTH DEBUG START ===');
  const usersJson = process.env.AUTH_USERS;
  console.error('AUTH_USERS env var exists:', !!usersJson);
  console.error('AUTH_USERS env var type:', typeof usersJson);
  console.error('AUTH_USERS length:', usersJson?.length);
  
  if (!usersJson) {
    console.error('No users found in environment variables');
    console.error('=== AUTH DEBUG END ===');
    return [];
  }

  try {
    // Clean the JSON string - remove any whitespace at start/end
    const cleanJson = usersJson.trim();
    console.error('AUTH_USERS after trim length:', cleanJson.length);
    
    const users = JSON.parse(cleanJson);
    console.error('Successfully parsed users array. Count:', users.length);
    console.error('Available emails:', users.map(u => u.email).join(', '));
    console.error('=== AUTH DEBUG END ===');
    return users;
  } catch (error) {
    console.error('Failed to parse users from environment variables');
    console.error('Parse error:', error);
    console.error('=== AUTH DEBUG END ===');
    return [];
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          const users = getUsers();
          const storedUser = users.find(u => u.email === credentials.email)
          
          if (!storedUser) {
            return null
          }

          // Compare password with bcrypt
          const isValidPassword = await bcrypt.compare(credentials.password, storedUser.password)
          if (!isValidPassword) {
            return null
          }

          // Return all user data except password
          const { password: _password, ...userData } = storedUser; // eslint-disable-line @typescript-eslint/no-unused-vars
          return userData;
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  callbacks: {
    async jwt({ token, user }) {
      // Pass user data to the token on sign in
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        // Pass all user data from token to session
        session.user = {
          ...session.user,
          ...token.user,
        };
      }
      return session;
    }
  }
}
