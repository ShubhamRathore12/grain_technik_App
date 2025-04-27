import { useState, useEffect, useCallback, useRef } from "react";

interface MachineData {
  [key: string]: any;
}

interface ErrorType {
  message: string;
}

export function useMachineData() {
  const [data, setData] = useState<MachineData | null>(null);
  const [error, setError] = useState<ErrorType | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    if (socketRef.current) return; // already connected

    const ws = new WebSocket("wss://grain-backend.onrender.com");

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case "connected":
          console.log("Connected to WebSocket server");
          break;
        case "update":
          setData(message.data);
          setError(null);
          break;
        case "error":
          setError({ message: message.message });
          break;
        default:
          console.log("Unknown WebSocket message:", message);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      setError({ message: "WebSocket error occurred" });
      // Do not close connection on error here!
    };

    ws.onclose = (event) => {
      console.log("WebSocket closed", event.reason);
      setIsConnected(false);
      socketRef.current = null;

      // Reconnect after 5 seconds
      reconnectTimerRef.current = setTimeout(() => {
        console.log("Reconnecting WebSocket...");
        connect();
      }, 5000);
    };

    socketRef.current = ws;
  }, []);

  const disconnect = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.close();
    }
    socketRef.current = null;

    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
    }
  }, []);

  const fetchInitialData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://grain-backend.onrender.com/api/ws/current-data"
      );
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        setError({ message: result.message || "Failed to load data" });
      }
    } catch (err) {
      console.error("Fetch initial data error:", err);
      setError({ message: "Failed to fetch initial data" });
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
    connect(); // Connect WebSocket on mount

    return () => {
      disconnect(); // Clean everything properly on unmount
    };
  }, [fetchInitialData, connect, disconnect]);

  return {
    data,
    error,
    isConnected,
    connect,
    disconnect,
  };
}
