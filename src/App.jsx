import "./App.css";
import RadioPlayerNav from "./radio-player-nav/RadioPlayerNav";
import Main from "./main/Main";
import Footer from "./footer/Footer";

function App() {
  return (
    <>
      <RadioPlayerNav />
      <Main className="h-50" />
      <Footer />
    </>
  );
}

export default App;
