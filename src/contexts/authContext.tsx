import React, { useCallback, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import {
  signInWithEmail,
  signUpWithEmail,
  signOut as signOutUser,
  supabase,
} from "../authClient";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const defaultAuthContext: AuthContextValue = {
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
};

export const AuthContext = React.createContext<AuthContextValue>(defaultAuthContext);

const AuthContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error(error);
      }

      if (mounted) {
        setUser(data.session?.user ?? null);
        setLoading(false);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    await signInWithEmail(email, password);
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    await signUpWithEmail(email, password);
  }, []);

  const signOut = useCallback(async () => {
    await signOutUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );

  
};

export default AuthContextProvider;
