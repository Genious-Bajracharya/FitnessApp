

import refreshAuthToken from './refreshtoken';

const startTokenRefresh = () => {
 
  refreshAuthToken();

  const refreshTokenInterval = setInterval(() => {
    refreshAuthToken();
  }, 15 * 60 * 1000); // 15 minutes in milliseconds

  return () => {
    clearInterval(refreshTokenInterval);
  };
};

export default startTokenRefresh;
