import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const payload = await api.loadData();
      setData(payload);
      setError(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : String(err ?? "Unknown error");
      setError(message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);
  const contextValue = useMemo(() => {
    const events = data?.events ?? [];
    const focus = data?.focus ?? [];
    const last = events.reduce((latest, current) => {
      if (!latest) return current;
      return new Date(current.date) > new Date(latest.date) ? current : latest;
    }, null);
    return {
      data,
      events,
      focus,
      last,
      error,
      loading,
    };
  }, [data, error, loading]);

  return (
    <DataContext.Provider
      value={contextValue}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;

