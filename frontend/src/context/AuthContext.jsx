/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { getCurrentUser } from "../api/authApi";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("Auth state changed:", firebaseUser);
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        console.log("Firebase user:", firebaseUser.uid);
        const idToken = await firebaseUser.getIdToken(true);
        console.log("Getting application user...");
        const response = await getCurrentUser(idToken);
        console.log("Application user:", response.user);
        setUser(response.user);
      } catch (error) {
        console.error("Failed to get application user:", error);
        setUser(null);
        await signOut(auth);
      } finally {
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {" "}
      {children}{" "}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
