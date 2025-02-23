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
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          // Read users from JSON file
          const authData = JSON.parse(fs.readFileSync(AUTH_FILE_PATH, 'utf-8'))
          const user = authData.users.find((u: any) => u.email === credentials.email)

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
        session.user.id = token.sub || session.user.email
      }
      return session
    }
  }
}
