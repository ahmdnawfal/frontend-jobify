import { getServerSession } from 'next-auth';
import authOptions from './authOptions';

export default async function useAuthSession() {
  const user = await getServerSession(authOptions);
  return user?.user;
}
