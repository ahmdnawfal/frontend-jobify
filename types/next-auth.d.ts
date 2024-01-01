import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    token: string;
    refreshToken: string;
    accessTokenExpiration: number;
    user: {
      _id: string;
      email: string;
      name: string;
      lastName: string;
      location: string;
      role: string;
      token: string;
      refreshToken: string;
      exp: number;
    };
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      _id: string;
      email: string;
      name: string;
      lastName: string;
      location: string;
      role: string;
      token: string;
      refreshToken: string;
      accessTokenExpiration: number;
      exp: number;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id: string;
    email: string;
    name: string;
    lastName: string;
    location: string;
    role: string;
    token: string;
    refreshToken: string;
    accessTokenExpiration: number;
    exp: number;
  }
}
