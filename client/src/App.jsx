import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DisplayAll from "./components/DisplayAll";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<DisplayAll />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
