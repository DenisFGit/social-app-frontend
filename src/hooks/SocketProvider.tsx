import { useEffect, useState, type ReactNode } from "react";
import { io } from "socket.io-client";
import { SocketContext } from "./SocketContext";
import { useAppDispatch } from "../store/hooks";
import { fetchPosts } from "../store/slices/exhibitSlices";
import toast from 'react-hot-toast';

export function SocketProvider({ children }: { children: ReactNode }) {
    const dispatch = useAppDispatch();

    const [socket] = useState(() => io("https://playground.zenberry.one/notifications", {
        transports: ['websocket'],
        autoConnect: true,
        reconnection: true,
        reconnectionDelay: 1000,
    }));

    useEffect(() => {
        socket.on("connect", () => console.log("Connected!"));
        socket.on("connect_error", (err) => console.log("Failed:", err));

        socket.on("newPost", (post) => {
            toast.success(`${post.user} created post with description: ${post.message}`);
            dispatch(fetchPosts(1));
        });

        return () => {
            socket.off("connect");
            socket.off("connect_error");
            socket.off("newPost");
        };
    }, [socket, dispatch]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}