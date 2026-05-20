import {useEffect} from "react";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {ConnectionSocketEvents} from "./connectionSocketEvents.ts";
import {useNavigate} from "react-router-dom";
import {useResetAllStates} from "../../useResetAllStates.ts";

export default function useDisconnect() {
    const [{ socket }] = useConnectionStateProvider();
    const navigate = useNavigate();
    const resetAllStates = useResetAllStates();

    useEffect(() => {
        if (!socket) return;

        const handleDisconnect = () => {
            navigate("/");
            resetAllStates();
        };

        socket.on(ConnectionSocketEvents.DISCONNECT, handleDisconnect);

        return () => {
            socket.off(ConnectionSocketEvents.DISCONNECT, handleDisconnect);
        };
    }, [socket, navigate, resetAllStates]);
}