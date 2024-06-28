"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useUser } from '@/app/context/UserContext';
import {User} from '@/app/lib/definitions'

const UserConnected = () => {
  const { data: session, status } = useSession();
  const { state, dispatch } = useUser();

  useEffect(() => {
    if (session) {
      dispatch({ type: 'SET_USER', payload: session.user as User });
    }
  }, [session, dispatch]);

  if (status === "loading" || !state.user) {
    return <p></p>; // Vous pouvez afficher un spinner ou un message de chargement ici
  }

  return (
    <div className="text-xs py-2 px-4 absolute  bg-white pe-12 top-10 min-w-40 right-0">
      Bonjour <b>{state.user?.name}</b>
    </div>
  );
}

export default UserConnected;
