import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  companyId?: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      try {
        const base64Url = token.split('.')[1] || ''; // Get the payload part
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Adjust for URL encoding
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));
        const parsedUser = JSON.parse(jsonPayload);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return user;
}
