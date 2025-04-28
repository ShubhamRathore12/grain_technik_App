import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { User } from "@/types";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo purposes
const mockUser: User = {
  id: "1",
  email: "user@example.com",
  name: "John Doe",
  isLoggedIn: true,
};

const storeUser = async (user: User) => {
  const userJSON = JSON.stringify(user);
  if (Platform.OS === "web") {
    localStorage.setItem("user", userJSON);
  } else {
    await SecureStore.setItemAsync("user", userJSON);
  }
};

const getStoredUser = async () => {
  if (Platform.OS === "web") {
    const userJSON = localStorage.getItem("user");
    return userJSON ? JSON.parse(userJSON) : null;
  } else {
    const userJSON = await SecureStore.getItemAsync("user");
    return userJSON ? JSON.parse(userJSON) : null;
  }
};

const removeStoredUser = async () => {
  if (Platform.OS === "web") {
    localStorage.removeItem("user");
  } else {
    await SecureStore.deleteItemAsync("user");
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await getStoredUser();
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Failed to load user from storage", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    // For demo purposes, accept any non-empty values
    if (email && password) {
      try {
        setIsLoading(true);
        // In a real app, you would make an API call here
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network request

        await storeUser(mockUser);
        setUser(mockUser);
        return true;
      } catch (error) {
        console.error("Sign in failed", error);
        return false;
      } finally {
        setIsLoading(false);
      }
    }
    return false;
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await removeStoredUser();
      setUser(null);
    } catch (error) {
      console.error("Sign out failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
