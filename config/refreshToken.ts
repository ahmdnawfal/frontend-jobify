'use client';

import { customRevalidatePath } from '@/lib/action';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export const refreshTokenHandler = () => {
  const refreshToken = getCookie('refresh_token');

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
        {
          method: 'POST',
          body: JSON.stringify({ refreshToken }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const user = await response.json();

      await setCookie('access_token', user.token);
      await customRevalidatePath('/:path*');
    } catch (error) {
      console.error('Error refreshing token:', error);
      deleteCookie('access_token');
      deleteCookie('refresh_token');
      window.location.reload();
    }
  };

  fetchData();
};
