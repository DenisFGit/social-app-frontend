import { createContext } from "react";
import type { Socket } from "socket.io-client";
import type { DefaultEventsMap } from "@socket.io/component-emitter";

export const SocketContext = createContext<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);