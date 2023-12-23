import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
          {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          }
        );

        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else {
          const error = user.msg;
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          _id: user.user._id,
          email: user.user.email,
          name: user.user.name,
          lastName: user.user.lastName,
          location: user.user.location,
          role: user.user.role,
          token: user.token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;

      return session;
    },
  },
};

export default authOptions;
