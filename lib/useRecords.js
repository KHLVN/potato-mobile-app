import { useState, useEffect, useCallback } from "react";
import { fetchRecords } from "./api";

/**
 * Shared hook for fetching records from Raspberry Pi Flask API (MongoDB)
 * - Automatically loads once on mount
 * - Auto-refreshes every 5 seconds
 * - Provides manual refresh
 */
export function useRecords(autoRefresh = true) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRecords = useCallback(async () => {
    try {
      const data = await fetchRecords();
      setRecords(data);
    } catch (err) {
      console.error("Error fetching records:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecords();
    if (!autoRefresh) return;
    const interval = setInterval(loadRecords, 5000); // every 5s
    return () => clearInterval(interval);
  }, [autoRefresh, loadRecords]);

  return { records, loading, refresh: loadRecords };
}
