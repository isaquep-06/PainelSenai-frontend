import { useEffect, useState } from "react";
import { getSalas } from "../services/salaServices";
import { toast } from "react-toastify";

export const useSalas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await getSalas();

        setData(response);
      } catch (err) {
        toast.error("Tente novamente mais tarde");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
};