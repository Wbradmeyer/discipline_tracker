import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DisplayAll from "./components/DisplayAll";
import GoalForm from "./components/GoalForm";
import EntryForm from "./components/EntryForm";
import UpdateGoal from "./components/UpdateGoal";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<DisplayAll />} />
          <Route path="/goals/create" element={<GoalForm />} />
          <Route path="/goals/update/:id" element={<UpdateGoal />} />
          <Route path="/entries/create" element={<EntryForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
