import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCurrentUserQuery } from '../generated/graphql';

export const useRequireAuth = (): void => {
  const { data, loading } = useCurrentUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !data?.currentUser) {
      navigate('/sign-in');
    }
  }, [data, loading, navigate]);
};
