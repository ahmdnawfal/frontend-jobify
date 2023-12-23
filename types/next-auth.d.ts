import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    token: string;
    user: {
      _id: string;
      email: string;
      name: string;
      lastName: string;
      location: string;
      role: string;
      token: string;
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
  }
}
