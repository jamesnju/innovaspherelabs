import type { NextAuthConfig } from 'next-auth';


import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import { compare } from 'bcryptjs';
import { db } from '../firebase/admin';
import type { Account, User, Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

// Define custom user types
declare module 'next-auth' {
  interface User {
    id: string;
    role: 'super_admin' | 'business_owner' | 'manager' | 'employee';
    companyId?: string;
    companyName?: string;
    emailVerified?: Date;
  }

  interface Session {
    user: User & {
      role: 'super_admin' | 'business_owner' | 'manager' | 'employee';
      companyId?: string;
      companyName?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'super_admin' | 'business_owner' | 'manager' | 'employee';
    companyId?: string;
    companyName?: string;
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: any) => {
        try {
          const { email, password } = credentials as { email: string; password: string };
          
          if (!email || !password) {
            throw new Error('Invalid credentials');
          }

          // Get user from Firebase by email
          const usersRef = db.collection('users');
          const snapshot = await usersRef
            .where('email', '==', email)
            .limit(1)
            .get();

          if (snapshot.empty) {
            throw new Error('User not found');
          }

          const userDoc = snapshot.docs[0];
          const userData = userDoc.data();

          // Check if password exists
          if (!userData.password) {
            throw new Error('Invalid credentials');
          }

          // Compare password
          const isValidPassword = await compare(password, userData.password);

          if (!isValidPassword) {
            throw new Error('Invalid credentials');
          }

          // Check if user is active
          if (userData.status === 'suspended') {
            throw new Error('Account has been suspended');
          }

          // Get company data if user is not super admin
          let companyData = null;
          if (userData.role !== 'super_admin' && userData.companyId) {
            const companyDoc = await db.collection('companies')
              .doc(userData.companyId)
              .get();
            
            if (companyDoc.exists) {
              companyData = companyDoc.data();
              
              // Check if company subscription is active
              if (companyData?.subscription?.status === 'inactive') {
                throw new Error('Company subscription is inactive');
              }
            }
          }

          // Return user object with proper typing
          const user: User = {
            id: userDoc.id,
            email: userData.email,
            name: userData.name,
            role: userData.role,
            companyId: userData.companyId,
            companyName: companyData?.name || null,
            image: userData.image || null,
            emailVerified: userData.emailVerified || null,
          };

          return user;
        } catch (error) {
          console.error('Authorization error:', error);
          throw error;
        }
      },
    }) as any,
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      // Handle social sign-in
      if (account?.provider !== 'credentials') {
        try {
          // Check if user exists
          const usersRef = db.collection('users');
          const snapshot = await usersRef
            .where('email', '==', user.email)
            .limit(1)
            .get();

          if (snapshot.empty) {
            // Create new user for social sign-in
            // User will need to complete registration
            return false;
          }

          const userDoc = snapshot.docs[0];
          const userData = userDoc.data();

          // Check if user is active
          if (userData.status === 'suspended') {
            return false;
          }

          // Add user data to the session
          user.role = userData.role;
          user.companyId = userData.companyId;
          
          return true;
        } catch (error) {
          console.error('Social sign-in error:', error);
          return false;
        }
      }
      
      return true;
    },
    
    async jwt({ token, user, trigger }: { token: JWT; user?: User; trigger?: 'signIn' | 'signUp' | 'update' }) {
      // Initial sign in
      if (user) {
        token.role = user.role;
        token.companyId = user.companyId;
        token.companyName = user.companyName;
      }
      
      // Update token when user is updated
      if (trigger === 'update') {
        try {
          const userDoc = await db.collection('users')
            .doc(token.sub!)
            .get();
          
          if (userDoc.exists) {
            const userData = userDoc.data();
            token.role = userData?.role || token.role;
            token.companyId = userData?.companyId || token.companyId;
            
            if (userData?.companyId) {
              const companyDoc = await db.collection('companies')
                .doc(userData.companyId)
                .get();
              token.companyName = companyDoc.data()?.name || null;
            }
          }
        } catch (error) {
          console.error('Token update error:', error);
        }
      }

      return token;
    },
    
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.role = token.role as 'super_admin' | 'business_owner' | 'manager' | 'employee';
        session.user.companyId = token.companyId as string;
        session.user.companyName = token.companyName as string;
        session.user.id = token.sub!;
      }
      return session;
    },
    
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Handle redirects after sign in
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
  
  pages: {
    signIn: '/login',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
} as any;