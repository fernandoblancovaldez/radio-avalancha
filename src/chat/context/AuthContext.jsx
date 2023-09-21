import { useState, useEffect, createContext, useContext } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";

import { Container, Spinner } from "react-bootstrap";

//creando contexto
const AuthContext = createContext();

//proveyendo contexto
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIp, setCurrentIp] = useState("");
  const [loading, setLoading] = useState(true);
  //sign-in with google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  //sing-out
  const logout = () => signOut(auth);

  const value = {
    currentIp,
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

  //set current ip
  useEffect(() => {
    const unsuscribe = async () => {
      try {
        const ip = await fetch("https://api.ipify.org?format=json");
        const json = await ip.json();
        setCurrentIp(json.ip);
      } catch (err) {
        console.log(err);
      }
    };

    return unsuscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <Container className="loader-container d-flex align-items-center justify-content-center">
          <Spinner animation="grow" variant="light" />
        </Container>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
