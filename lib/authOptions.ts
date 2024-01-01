import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dayjs from 'dayjs';

async function refreshAccessToken(token: any) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      token: refreshedTokens.token,
      accessTokenExpiration: refreshedTokens.accessTokenExpiration * 1000,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
      exp: refreshedTokens.accessTokenExpiration,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

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
          refreshToken: user.refreshToken,
          accessTokenExpiration: user.accessTokenExpiration * 1000,
          exp: user.accessTokenExpiration,
        };
      }

      if (Date.now() < token.accessTokenExpiration) {
        console.log('Token has valid');
        return token;
      }

      console.log('token refreshed....');
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      const timestamp = token.accessTokenExpiration / 1000;
      const formattedDate = dayjs
        .unix(timestamp)
        .format('YYYY-MM-DDTHH:mm:ss.SSSZ');

      session.user = token;
      session.expires = formattedDate;

      return session;
    },
  },
};

export default authOptions;
