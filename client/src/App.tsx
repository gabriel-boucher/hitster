import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootRouter from "./RootRouter";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootRouter />} />
        <Route path="/:roomId" element={<RootRouter />} />
      </Routes>
    </Router>
  );
}
