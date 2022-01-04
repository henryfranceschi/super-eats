import React from 'react';
import { useUserQuery } from '../../generated/graphql';
import { useRequireAuth } from '../../util/useRequireAuth';

export const Dashboard: React.FC = (): JSX.Element => {
  // const { appState: { user: {id} }, updateState } = useContext(AppContext);
  // const id = 'c370bf08-d052-442f-a74e-4063c8cea2da';
  const id = '6212c433-df67-4117-b26b-8ef3bd126b0c';
  const { data, loading, error } = useUserQuery({ variables: { id } });

  useRequireAuth();

  if (loading || !data) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;

  const { email, firstName, lastName, role } = data.user;
  return (
    <div>
      <p>{id}</p>
      <p>{email}</p>
      <p>{firstName}</p>
      <p>{lastName}</p>
      <p>{role}</p>
    </div>
  );
};
