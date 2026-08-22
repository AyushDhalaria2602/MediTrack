import { createContext, useContext, useCallback, useMemo } from "react";
import { staff } from "../data/mockData";
import { useLocalStorage } from "../hooks/useLocalStorage";

// ---------------------------------------------------------------------------
// WHY THIS FILE EXISTS (lifting state up / prop drilling):
// The logged-in user is needed by the Navbar, the ProtectedRoute guard,
// and several pages. Passing it down as props from App -> Layout -> Page
// -> Navbar would mean "drilling" the same prop through components that
// don't otherwise care about it. Lifting the auth state into a Context
// lets any component read/update it directly with `useAuth()`.
// ---------------------------------------------------------------------------

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("meditrack:user", null);

  const login = useCallback(
    (username, password) => {
      const match = staff.find(
        (s) => s.username === username && s.password === password
      );
      if (!match) return { ok: false, message: "Invalid username or password." };
      const { password: _pw, ...safeUser } = match; // never store the password
      setUser(safeUser);
      return { ok: true };
    },
    [setUser]
  );

  const logout = useCallback(() => setUser(null), [setUser]);

  // Memoize the context value so consumers don't re-render needlessly.
  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an <AuthProvider>");
  return ctx;
}
