import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RoutesComponent from "./components/Routes";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <div className={darkTheme ? "dark" : ""}>
      <div className="bg-gray-200 dark:bg-gray-900 dark:text-gray-200 black min-h-screen">
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <RoutesComponent />
        <Footer />
      </div>
    </div>
  );
}

export default App;
