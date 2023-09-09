import "./App.css";
import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import { AuthProvider } from "./chat/context/AuthContext";
import AdminModal from "./adminModal/AdminModal";

function App() {
  return (
    <>
      <Header />
      <AuthProvider>
        <Main />
        <Footer />
        <AdminModal />
      </AuthProvider>
    </>
  );
}

export default App;
