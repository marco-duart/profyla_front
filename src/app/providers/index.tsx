import { type PropsWithChildren } from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import { globalStyles } from "../../theme/global";

type AppProvidersProps = PropsWithChildren;

export function AppProviders({ children }: AppProvidersProps) {
  globalStyles();

  return <AuthProvider>{children}</AuthProvider>;
}
