// WebSocket client for real-time features
import { io, Socket } from 'socket.io-client'

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3000'

let socketInstance: Socket | null = null

/**
 * Creates a new Socket.IO connection
 */
export const createSocketConnection = (token: string | null): Socket => {
  // Disconnect existing connection if any
  if (socketInstance?.connected) {
    socketInstance.disconnect()
  }

  socketInstance = io(WS_URL, {
    auth: {
      token,
    },
    transports: ['websocket', 'polling'],
    autoConnect: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  })

  return socketInstance
}

/**
 * Gets the current socket instance
 */
export const getSocketInstance = (): Socket | null => {
  return socketInstance
}

/**
 * Disconnects the socket connection
 */
export const disconnectSocket = (): void => {
  if (socketInstance?.connected) {
    socketInstance.disconnect()
    socketInstance = null
  }
}

/**
 * Socket event types
 */
export enum SocketEvent {
  // Connection events
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  CONNECT_ERROR = 'connect_error',
  
  // Message events
  MESSAGE = 'message',
  MESSAGE_SENT = 'message:sent',
  MESSAGE_RECEIVED = 'message:received',
  MESSAGE_READ = 'message:read',
  
  // Typing events
  TYPING_START = 'typing:start',
  TYPING_STOP = 'typing:stop',
  
  // Presence events
  USER_ONLINE = 'user:online',
  USER_OFFLINE = 'user:offline',
  
  // Notification events
  NOTIFICATION = 'notification',
  
  // Error events
  ERROR = 'error',
}
