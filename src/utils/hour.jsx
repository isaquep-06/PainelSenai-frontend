import { useState, useEffect } from "react"


export default function HoraAtual() {
  const [agora, setAgora] = useState(new Date())

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAgora(new Date())
    }, 1000)

    return intervalo
  }, []);

  const hora = agora.getHours().toString().padStart(2, '0')

  return hora
}