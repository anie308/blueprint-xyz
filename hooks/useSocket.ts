// React hook for WebSocket connection
import { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { createSocketConnection, disconnectSocket, getSocketInstance, SocketEvent } from '../lib/socketClient'
import { useSelector } from 'react-redux'
import { selectToken } from '../lib/store/slices/authSlice'

interface UseSocketOptions {
  onConnect?: () => void
  onDisconnect?: () => void
  onError?: (error: Error) => void
  onMessage?: (data: any) => void
  onNotification?: (data: any) => void
  onTypingStart?: (data: { userId: string; conversationId: string }) => void
  onTypingStop?: (data: { userId: string; conversationId: string }) => void
  onUserOnline?: (data: { userId: string }) => void
  onUserOffline?: (data: { userId: string }) => void
}

export const useSocket = (options: UseSocketOptions = {}) => {
  const token = useSelector(selectToken)
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (!token) {
      // Disconnect if no token
      if (socketRef.current?.connected) {
        disconnectSocket()
        socketRef.current = null
        setIsConnected(false)
      }
      return
    }

    // Create socket connection
    const socket = createSocketConnection(token)
    socketRef.current = socket

    // Connection event handlers
    socket.on(SocketEvent.CONNECT, () => {
      setIsConnected(true)
      options.onConnect?.()
    })

    socket.on(SocketEvent.DISCONNECT, () => {
      setIsConnected(false)
      options.onDisconnect?.()
    })

    socket.on(SocketEvent.CONNECT_ERROR, (error: Error) => {
      console.error('Socket connection error:', error)
      options.onError?.(error)
    })

    // Message event handlers
    socket.on(SocketEvent.MESSAGE, (data: any) => {
      options.onMessage?.(data)
    })

    socket.on(SocketEvent.MESSAGE_RECEIVED, (data: any) => {
      options.onMessage?.(data)
    })

    // Notification event handlers
    socket.on(SocketEvent.NOTIFICATION, (data: any) => {
      options.onNotification?.(data)
    })

    // Typing event handlers
    socket.on(SocketEvent.TYPING_START, (data: { userId: string; conversationId: string }) => {
      options.onTypingStart?.(data)
    })

    socket.on(SocketEvent.TYPING_STOP, (data: { userId: string; conversationId: string }) => {
      options.onTypingStop?.(data)
    })

    // Presence event handlers
    socket.on(SocketEvent.USER_ONLINE, (data: { userId: string }) => {
      options.onUserOnline?.(data)
    })

    socket.on(SocketEvent.USER_OFFLINE, (data: { userId: string }) => {
      options.onUserOffline?.(data)
    })

    // Cleanup on unmount
    return () => {
      if (socketRef.current?.connected) {
        socketRef.current.removeAllListeners()
        disconnectSocket()
      }
      socketRef.current = null
      setIsConnected(false)
    }
  }, [token])

  // Helper functions
  const sendMessage = (conversationId: string, content: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(SocketEvent.MESSAGE, {
        conversationId,
        content,
      })
    }
  }

  const startTyping = (conversationId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(SocketEvent.TYPING_START, { conversationId })
    }
  }

  const stopTyping = (conversationId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(SocketEvent.TYPING_STOP, { conversationId })
    }
  }

  const markMessageAsRead = (messageId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(SocketEvent.MESSAGE_READ, { messageId })
    }
  }

  return {
    socket: socketRef.current,
    isConnected,
    sendMessage,
    startTyping,
    stopTyping,
    markMessageAsRead,
  }
}
