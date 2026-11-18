import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const me = await base44.auth.me();
        if (active) setUser(me);
      } catch (e) {
        if (active) {
          setUser(null);
          if (e?.status === 401) setAuthError({ type: "auth_required" });
        }
      } finally {
        if (active) {
          setIsLoadingAuth(false);
          setAuthChecked(true);
        }
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const navigateToLogin = useCallback(() => {
    base44.auth.redirectToLogin(window.location.href);
  }, []);

  const logout = useCallback((redirectUrl) => base44.auth.logout(redirectUrl), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        authChecked,
        isAuthenticated: Boolean(user),
        navigateToLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};