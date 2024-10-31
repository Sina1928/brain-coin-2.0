import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.scss";

import About from "./components/About/About";

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
