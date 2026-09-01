import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes.tsx";

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
