import { auth } from 'apis/auth';
import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoutes = () => {
  const [isCurrentUserSignedIn, setIsCurrentUserSignedIn] = useState<boolean>(true);
  const confirmCurrentUserSignedInState = async () => {
    try {
      await auth.isSignedIn();
      setIsCurrentUserSignedIn(true);
    } catch {
      setIsCurrentUserSignedIn(false);
    }
  };

  useEffect(() => {
    confirmCurrentUserSignedInState();
  }, []);

  return isCurrentUserSignedIn ? <Outlet /> : <Navigate to="auth/signin" />;
};
