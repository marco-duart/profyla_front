import { createContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { signIn, signOut, validateToken, hasStoredSession } from "../services/auth";
import type { SignIn } from "../services/auth/dto";

type AuthContextValue = {
  user: SignIn.User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<SignIn.User>;
  signOutSession: () => Promise<void>;
};

// The context and its provider live together on purpose.
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  signInWithEmail: async () => ({ id: 0, email: "", name: "", role: "user" }),
  signOutSession: async () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<SignIn.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function bootstrapSession() {
      if (!hasStoredSession()) {
        setLoading(false);
        return;
      }

      try {
        const validatedUser = await validateToken();
        setUser(validatedUser);
      } catch {
        await signOut();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    void bootstrapSession();
  }, []);

  async function signInWithEmail(email: string, password: string): Promise<SignIn.User> {
    const loggedUser = await signIn({ email, password });
    setUser(loggedUser);
    return loggedUser;
  }

  async function signOutSession(): Promise<void> {
    await signOut();
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      signInWithEmail,
      signOutSession,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
