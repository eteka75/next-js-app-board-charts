"use client";
import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
import { User } from 'next-auth';

interface State {
  user: User | null;
}

interface Action {
  type: 'SET_USER';
  payload: User | null;
}

const initialState: State = {
  user: null,
};

function userReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

const UserContext = createContext<{ state: State; dispatch: Dispatch<Action> }>({
  state: initialState,
  dispatch: () => null,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
