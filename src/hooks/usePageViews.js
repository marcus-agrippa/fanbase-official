// usePageViews.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from "react-ga4";

export const usePageViews = () => {
  const location = useLocation();

  useEffect(() => {
    try {
      console.log('Sending pageview:', location.pathname + location.search);
      ReactGA.set({ page: location.pathname + location.search });
      ReactGA.pageview(location.pathname + location.search);
    } catch (error) {
      console.error('Google Analytics error:', error);
    }
  }, [location]);
}

