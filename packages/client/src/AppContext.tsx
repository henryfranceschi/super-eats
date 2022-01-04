import React, { createContext, useEffect, useState } from 'react';
import { useCurrentUserQuery } from './generated/graphql';

export interface IAppState {
  user?: {
    id: string;
  };
}

export interface IAppContext {
  appState: IAppState;
  updateState: (state: IAppState) => void;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const defaultState: IAppState = {};

export const AppContextProvider: React.FC = ({ children }) => {
  const { data, loading, error } = useCurrentUserQuery();
  const [appState, setState] = useState(defaultState);

  const updateState = (state: Partial<IAppState>) => {
    setState({
      ...appState,
      ...state,
    });
  };

  useEffect(() => {
    if (!loading && !error) {
      if (data?.currentUser) {
        const id = data.currentUser.id;
        setState((state) => ({ ...state, user: { id } }));
      }
    } else if (error) {
      console.error(error);
    }
  }, [data, loading, error, setState]);

  return (
    <AppContext.Provider
      value={{
        appState,
        updateState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
