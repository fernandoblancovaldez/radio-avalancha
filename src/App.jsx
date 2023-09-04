import "./App.css";
import RadioPlayerNav from "./radio-player-nav/RadioPlayerNav";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import { AuthProvider } from "./chat/context/AuthContext";

function App() {
  return (
    <>
      <RadioPlayerNav />
      <AuthProvider>
        <Main />
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
