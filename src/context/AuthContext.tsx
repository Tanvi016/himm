import React, { createContext, useContext, useState } from 'react';

interface AuthContextValue {
  authenticated: boolean;
  setAuthenticated: (v: boolean) => void;
  /** Build a media URL — cookie handles auth automatically */
  mediaUrl: (id: string) => string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  // No token in URL — the httpOnly cookie is sent automatically by the browser
  const mediaUrl = (id: string): string => `/api/media?id=${id}`;

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, mediaUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

export default AuthContext;
