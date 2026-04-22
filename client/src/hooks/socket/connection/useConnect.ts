import {useEffect} from "react";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {connectionReducerCases} from "../../../stateProvider/connection/ConnectionReducerCases.ts";
import {WS_SERVER_URL} from "../../../config/url.ts";
import {ConnectionSocketEvents} from "./connectionSocketEvents.ts";
import {io} from "socket.io-client";

export default function useConnect() {
    const [{ socket, roomId }, connectionDispatch] = useConnectionStateProvider();

    useEffect(() => {
        const newRoomId = window.location.pathname.substring(1) || "";
        if (socket || !newRoomId) return;

        const newSocket = io(WS_SERVER_URL);

        const handleConnect = () => {
            connectionDispatch({type: connectionReducerCases.SET_SOCKET, socket: newSocket});
        };

        if (newSocket.connected) {
            handleConnect();
        } else {
            newSocket.on(ConnectionSocketEvents.CONNECT, handleConnect);
        }

        return () => {
            newSocket.off(ConnectionSocketEvents.CONNECT, handleConnect);
        };
    }, [socket, roomId, connectionDispatch]);
}