import axios from 'axios';
import api from '../api';

const refreshAuthToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const response = await api.post(
      '/auth/refresh-token',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    localStorage.setItem('authToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    console.log('Token refreshed successfully');
  } catch (error) {
    console.error('Failed to refresh token', error);
  }
};

export default refreshAuthToken;
