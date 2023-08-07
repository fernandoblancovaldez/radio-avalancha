import "./App.css";
import Footer from "./Footer/Footer";
import Main from "./main/Main";

import RadioPlayerNav from "./radio-player-nav/RadioPlayerNav";

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
