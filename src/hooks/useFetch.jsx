import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFromDB = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFromDB();
    // eslint-disable-next-line
  }, []);

  return [data, isLoading, error];
}

export default useFetch;
