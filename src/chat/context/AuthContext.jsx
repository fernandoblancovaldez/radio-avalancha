import { useState, useEffect, createContext, useContext } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";

import Stack from "react-bootstrap/Stack";
import Spinner from "react-bootstrap/Spinner";

//creando contexto
const AuthContext = createContext();

//proveyendo contexto
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //sign-in with google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  //sing-out
  const logout = () => signOut(auth);

  const value = {
    currentUser,
    signInWithGoogle,
    logout,
    loading,
  };

  // set current user
  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsuscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <Stack className="h-100 align-items-center">
          <Spinner animation="grow" variant="light" />
        </Stack>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
