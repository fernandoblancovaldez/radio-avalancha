import { useState, useEffect, createContext, useContext } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../../firebase";

//creando contexto
const AuthContext = createContext();

//proveyendo contexto
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  //sign-in with google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const value = {
    currentUser,
    setCurrentUser,
    signInWithGoogle,
  };

  // set current user
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsuscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
