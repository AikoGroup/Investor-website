import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'

interface User {
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
const getUsers = (): User[] => {
  const usersJson = process.env.AUTH_USERS;
  if (!usersJson) {
    console.error('No users found in environment variables');
    return [];
  }
  try {
    return JSON.parse(usersJson);
  } catch (error) {
    console.error('Failed to parse users from environment variables:', error);
    return [];
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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
          const user = users.find(u => u.email === credentials.email)

          if (!user) {
            return null
          }

          // Compare password with bcrypt
          const isValidPassword = await bcrypt.compare(credentials.password, user.password)
          if (!isValidPassword) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.firstName || user.email.split('@')[0]
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // Extend the user type to include id
        const user = session.user as {
          name?: string | null;
          email?: string | null;
          image?: string | null;
          id?: string;
        };
        user.id = token.sub || user.email || '';
        session.user = user;
      }
      return session;
    }
  }
}
