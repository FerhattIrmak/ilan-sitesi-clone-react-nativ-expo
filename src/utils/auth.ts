import { PUBLIC_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${PUBLIC_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, token: data.jwt };
    } else {
      return { success: false, message: data.error.message }; // 'message' anahtarı eklendi
    }
  } catch (error) {
    return { success: false, message: error.message || 'Something went wrong' };
  }
};

export const register = async (email, password, username) => {
  try {
    const response = await fetch(`${PUBLIC_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, token: data.jwt };
    } else {
      return { success: false, message: data.error.message };
    }
  } catch (error) {
    return { success: false, message: error.message || 'Something went wrong' };
  }
};

export const getCurrentUser = async (token) => {
  try {
    const response = await fetch(`${PUBLIC_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { success: false, error: 'Something went wrong' };
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('token');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Something went wrong' };
  }
};
