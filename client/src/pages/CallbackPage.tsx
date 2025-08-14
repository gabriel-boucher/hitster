import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export default function CallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      const socket = io("http://localhost:3000");
      socket.emit("spotify_auth_code", code);

      socket.on("access_token", (accessToken: string) => {
        localStorage.setItem("spotify_token", accessToken);

        // ✅ After getting token → redirect to /lobby
        navigate("/lobby");
      });
    } else {
      navigate("/");
    }
  }, []);

  return <p>Authenticating...</p>;
}
