import {useEffect} from "react";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {ConnectionSocketEvents} from "./connectionSocketEvents.ts";
import {useNavigate} from "react-router-dom";
import {useResetAllStates} from "../../useResetAllStates.ts";

export default function useLeaveRoom() {
    const [{ socket }] = useConnectionStateProvider();
    const navigate = useNavigate();
    const resetAllStates = useResetAllStates();

    useEffect(() => {
        if (!socket) return;

        const handleLeaveRoom = () => {
            navigate("/");
            resetAllStates();
        };

        socket.on(ConnectionSocketEvents.LEAVE_ROOM, handleLeaveRoom);

        return () => {
            socket.off(ConnectionSocketEvents.LEAVE_ROOM, handleLeaveRoom);
        };
    }, [socket, navigate, resetAllStates]);
}