import "./App.css";
import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import { AuthProvider } from "./chat/context/AuthContext";

function App() {
  return (
    <>
      <Header />
      <AuthProvider>
        <Main />
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
