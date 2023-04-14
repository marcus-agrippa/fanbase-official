// usePageViews.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4'; // Change the import here

export const usePageViews = () => {
  const location = useLocation();

  useEffect(() => {
    try {
      ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
    } catch (error) {
      console.error('Google Analytics error:', error);
    }
  }, [location]);
}

