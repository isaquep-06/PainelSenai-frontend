import { useEffect, useState } from "react";
import { getSalasDisponiveis } from "../services/salaServices";
import { toast } from "react-toastify";

export const useSalasDisponiveis = (turno) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!turno) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await getSalasDisponiveis(turno);

        setData(response);
      } catch (err) {
        toast.error("Tente novamente mais tarde");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [turno]);

  return { data, loading };
};