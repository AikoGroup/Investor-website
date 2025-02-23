import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const AUTH_FILE_PATH = path.join(process.cwd(), 'src/config/auth.json')

export const authOptions: NextAuthOptions = {
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

          // Read users from JSON file
          const authData = JSON.parse(fs.readFileSync(AUTH_FILE_PATH, 'utf-8'))
          interface User {
            email: string;
            password: string;
            name?: string;
            role?: string;
          }
          const user = authData.users.find((u: User) => u.email === credentials.email)

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
