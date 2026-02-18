import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootRouter from "./RootRouter";
import SpotifyCallbackPage from "./pages/SpotifyCallbackPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootRouter />} />
        <Route path="/:roomId" element={<RootRouter />} />
        <Route path="/spotify-callback" element={<SpotifyCallbackPage />} />
      </Routes>
    </Router>
  );
}
