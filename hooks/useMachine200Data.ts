import { useState, useEffect, useCallback, useRef } from "react";

interface MachineData {
  [key: string]: any;
}

interface ErrorType {
  message: string;
}

export function useMachine200Data({ id }: { id: number }) {
  const [data, setData] = useState<MachineData | null>(null);
  const [error, setError] = useState<ErrorType | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://grain-backend.onrender.com/api/alldata/alldata`
      );
      const result = await response.json();
      console.log(result, "result");

      if (result.success) {
        setData(result.data);
        setIsConnected(true);
        setError(null);
      } else {
        setError({ message: result.message });
        setIsConnected(false);
      }
    } catch (err: any) {
      console.error("Fetch failed:", err);
      setError({ message: "Fetch error" });
      setIsConnected(false);
    }
  };

  useEffect(() => {
    fetchData(); // fetch once immediately

    intervalRef.current = setInterval(() => {
      fetchData();
    }, 5000); // every 1 second

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchData]);

  return {
    data,
    error,
    isConnected,
  };
}
