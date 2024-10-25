import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

interface IAuthContext {
  user?: User | null;
  isAuthenticated?: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; data: User | null; msg: string }>;
  register: (
    email: string,
    password: string,
    username: string,
    profileUrl: string
  ) => Promise<{ success: boolean; data: User | null; msg: string }>;
  logout: () => Promise<{ success: boolean; msg: string }>;
}

const initialValue = {
  user: null,
  isAuthenticated: undefined,
  login: () =>
    new Promise<{ success: boolean; data: User | null; msg: string }>(
      (resovle, reject) => {
        resovle({ success: false, data: null, msg: "" });
      }
    ),
  register: () =>
    new Promise<{ success: boolean; data: User | null; msg: string }>(
      (resovle, reject) => {
        resovle({ success: false, data: null, msg: "" });
      }
    ),
  logout: () =>
    new Promise<{ success: boolean; msg: string }>((resolve, reject) => {
      resolve({ success: true, msg: "" });
    }),
};

const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>();

  useEffect(() => {
    const subscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return subscription;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, data: response.user, msg: "" };
    } catch (error) {
      return { success: false, data: null, msg: (error as Error).message };
    }
  };

  const register = async (
    email: string,
    password: string,
    username: string,
    profileUrl: string
  ) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", response.user.uid), {
        username,
        userId: response.user.uid,
        profileUrl,
      });

      return { success: true, data: response.user, msg: "" };
    } catch (error) {
      return { success: false, data: null, msg: (error as Error).message };
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      return { success: true, msg: "" };
    } catch (error) {
      return { success: false, msg: (error as Error).message };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAuth must be wrapped in a <AuthProvider />");
    }
  }

  return value;
}
